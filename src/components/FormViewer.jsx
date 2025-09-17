import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowLeft, Send } from 'lucide-react'
import Title from './common/Title'
import Textbox from './common/Textbox'
import Dropdown from './common/Dropdown'
import CheckboxWithLabel from './common/CheckboxWithLabel'
import Radio from './common/Radio'

function FormViewer() {
  const { formId } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Load data from localStorage
    const savedForms = JSON.parse(localStorage.getItem('savedForms') || '[]')
    const foundForm = savedForms.find(f => f.id === formId)
    
    if (foundForm) {
      setForm(foundForm)
    } else {
      navigate('/forms')
      return
    }
  }, [formId, navigate])

  useEffect(() => {
    if (!form) return
    
    // initialize form data with default values
    const initialData = {}
    form.schema.forEach(field => {
      if (field.type === 'title') return
      const name = field.name || field.label?.toLowerCase().replace(/\s+/g, '_')
      if (field.type === 'checkbox') {
        initialData[name] = Boolean(field.default)
      } else if (field.type === 'dropdown' || field.type === 'radio') {
        initialData[name] = field.default ?? (field.options?.[0] ?? '')
      } else {
        initialData[name] = field.default ?? ''
      }
    })
    setFormData(initialData)
  }, [form])

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const submission = {
      formId: form.id,
      formTitle: form.title,
      responses: formData,
      submittedAt: new Date().toISOString()
    }

    // save to localStorage
    const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]')
    existingSubmissions.push(submission)
    localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions))

    // log to console
    console.log('Form Submission:', submission)

    setIsSubmitted(true)
  }

  const renderField = (field, index) => {
    const name = field.name || field.label?.toLowerCase().replace(/\s+/g, '_')
    const value = formData[name]

    switch (field.type) {
      case 'title':
        return (
          <div key={index} className="text-2xl font-bold mb-4">
            <Title text={field.label} />
          </div>
        )

      case 'text':
        return (
          <div key={index} className="space-y-2">
            <Textbox name={name} label={field.label} required={field.required} value={value} handleChange={handleChange} placeholder={field.placeholder} />          </div>
        )

      case 'dropdown':
        return (
          <div key={index} className="space-y-2">
            <Dropdown label={field.label} name={name} defaultValue={field.default} required={field.required} options={field.options} handleChange={handleChange} />
          </div>
        )

      case 'checkbox':
        return (
          <div key={index} className="space-y-2 flex gap-5 items-center">
            <CheckboxWithLabel label={field.label} name={name} checked={Boolean(value)} handleChange={handleChange} />
          </div>
        )

      case 'radio':
        return (
          <div key={index} className="space-y-2">
            <Radio label={field.label} defaultValue={field.default} name={name} options={field.options}  handleChange={handleChange}/>
          </div>
        )

      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Form Submitted Successfully!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Thank you for filling out the form. Your responses have been saved.</p>
              <div className="flex gap-2">
                <Button onClick={() => navigate('/forms')} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Forms
                </Button>
                <Button onClick={() => setIsSubmitted(false)}>
                  Fill Another Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => navigate('/forms')} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forms
          </Button>
          <h1 className="text-2xl font-bold">{form.title}</h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {form.schema.map((field, index) => renderField(field, index))}
              
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FormViewer
