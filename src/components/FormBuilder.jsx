import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DynamicForm from './DynamicForm'
import FieldSidebar from './FieldSidebar'
import { Button } from './ui/button'
import { Trash2, Edit, Save, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

function FormBuilder() {
  const { formId } = useParams()
  const navigate = useNavigate()
  const [schema, setSchema] = useState([
    { id: '1', type: 'title', label: 'New Form' }
  ])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarType, setSidebarType] = useState(null)
  const [draft, setDraft] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)
  const [formTitle, setFormTitle] = useState('New Form')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (formId) {
      // edit existing form
      const savedForms = JSON.parse(localStorage.getItem('savedForms') || '[]')
      const existingForm = savedForms.find(f => f.id === formId)
      if (existingForm) {
        setSchema(existingForm.schema)
        setFormTitle(existingForm.title)
        setIsEditing(true)
      } else {
        navigate('/builder')
      }
    } else {
      // Create new form and if draft exist load it
      const draftSchema = JSON.parse(localStorage.getItem('formDraft') || 'null')
      if (Array.isArray(draftSchema) && draftSchema.length > 0) {
        setSchema(draftSchema)
        const titleField = draftSchema.find(field => field.type === 'title')
        if (titleField) {
          setFormTitle(titleField.label)
        }
      }
    }
  }, [formId, navigate])

  // Update form title when schema changes
  useEffect(() => {
    const titleField = schema.find(field => field.type === 'title')
    if (titleField) {
      setFormTitle(titleField.label)
    }
  }, [schema])

  // save draft to localStorage whenever schema changes (for new forms only)
  useEffect(() => {
    if (!isEditing && !formId) {
      localStorage.setItem('formDraft', JSON.stringify(schema))
    }
  }, [schema, isEditing, formId])

  function generateId() {
    return Date.now().toString()
  }

  function nextName(base) {
    const existing = new Set(schema.map(f => f.name).filter(Boolean))
    let i = 1
    while (existing.has(`${base}_${i}`)) i++
    return `${base}_${i}`
  }

  const handleAddField = (type) => {
    setSidebarType(type)
    setEditingIndex(null)
    // create a default draft
    if (type === 'text') setDraft({ type: 'text', inputType: 'text' ,label: 'Text', name: nextName('text'), required: false, placeholder: '',minLength: 8, reqNumber: true, reqSpecial: true, reqUpper: true })
    if (type === 'title') setDraft({ type: 'title', label: 'Section' })
    if (type === 'dropdown') setDraft({ type: 'dropdown', label: 'Select', name: nextName('dropdown'), options: ['Option 1','Option 2'], default: 'Option 1', required: false })
    if (type === 'checkbox') setDraft({ type: 'checkbox', label: 'Accept', name: nextName('checkbox'), default: false })
    if (type === 'radio') setDraft({ type: 'radio', label: 'Choose one', name: nextName('radio'), options: ['Option 1','Option 2'], default: 'Option 1' })
    setSidebarOpen(true)
  }

  const handleEditField = (index) => {
    const field = schema[index]
    setSidebarType(field.type)
    setEditingIndex(index)
    setDraft({ ...field })
    setSidebarOpen(true)
  }

  const handleDeleteField = (index) => {
    setSchema(prev => prev.filter((_, i) => i !== index))
  }

  const handleSaveDraft = (finalField) => {
    if (!finalField) return setSidebarOpen(false)
    
    if (editingIndex !== null) {
      // Update existing field
      setSchema(prev => prev.map((field, index) => 
        index === editingIndex ? { ...finalField, id: field.id } : field
      ))
    } else {
      // Add new field
      setSchema(prev => [...prev, { ...finalField, id: generateId() }])
    }
    
    setSidebarOpen(false)
    setSidebarType(null)
    setDraft(null)
    setEditingIndex(null)
  }

  const handleSaveForm = () => {
    const currentFormId = formId || generateId()
    const formData = {
      id: currentFormId,
      title: formTitle,
      schema: schema,
      createdAt: isEditing ? 
        JSON.parse(localStorage.getItem('savedForms') || '[]')
          .find(f => f.id === currentFormId)?.createdAt || new Date().toISOString() :
        new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Get existing forms
    const existingForms = JSON.parse(localStorage.getItem('savedForms') || '[]')
    
    if (isEditing) {
      // Update existing form
      const updatedForms = existingForms.map(f => f.id === currentFormId ? formData : f)
      localStorage.setItem('savedForms', JSON.stringify(updatedForms))
    } else {
      // Add new form
      existingForms.push(formData)
      localStorage.setItem('savedForms', JSON.stringify(existingForms))
    }
    
    // Clear draft for new forms
    if (!isEditing) {
      localStorage.removeItem('formDraft')
      setSchema([{ id: '1', type: 'title', label: 'New Form' }])
      setFormTitle('New Form')
    }
    
    toast.success(`Form ${isEditing ? 'updated' : 'saved'} successfully!`)
    navigate('/forms')
  }

  return (
    <>
      <div className='p-4'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-4'>
            <Button onClick={() => navigate('/forms')} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forms
            </Button>
            <h1 className='text-2xl font-bold'>
              {isEditing ? 'Edit Form' : 'Form Builder'}
            </h1>
          </div>
          <Button onClick={handleSaveForm} className='flex items-center gap-2'>
            <Save className="h-4 w-4" />
            {isEditing ? 'Update Form' : 'Save Form'}
          </Button>
        </div>
        
        <div className='grid md:grid-cols-[1fr_280px] gap-6'>
          <div>
            <DynamicForm schema={schema} setFieldType={handleAddField} />
          </div>
          <div className='border rounded-md p-3 h-fit'>
            <div className='font-semibold mb-2'>Fields</div>
            <ul className='space-y-2'>
              {schema.map((field, idx) => (
                <li key={field.id || idx} className='flex items-center justify-between gap-2 p-2 border rounded hover:bg-gray-50'>
                  <div className='flex-1 min-w-0'>
                    <div className='text-sm font-medium truncate'>{field.label}</div>
                    <div className='text-xs text-gray-500'>{field.type === "text" ? `${field.type}-${field.inputType}` : field.type}</div>
                  </div>
                  <div className='flex gap-1'>
                    <Button size="sm" variant="ghost" onClick={() => handleEditField(idx)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteField(idx)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <FieldSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        type={sidebarType} 
        draft={draft} 
        onChangeDraft={setDraft} 
        onSave={handleSaveDraft} 
      />
    </>
  )
}

export default FormBuilder