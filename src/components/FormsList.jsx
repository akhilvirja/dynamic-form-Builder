import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Eye, Trash2, Calendar, Edit } from 'lucide-react'

function FormsList() {
  const navigate = useNavigate()
  const [forms, setForms] = useState([])

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem('savedForms') || '[]')
    setForms(savedForms)
  }, [])

  const handleViewForm = (form) => {
    navigate(`/form/${form.id}`)
  }

  const handleEditForm = (form) => {
    navigate(`/builder/${form.id}`)
  }

  const handleDeleteForm = (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      const updatedForms = forms.filter(form => form.id !== formId)
      setForms(updatedForms)
      localStorage.setItem('savedForms', JSON.stringify(updatedForms))
    }
  }

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>My Forms</h1>
        <div className='text-sm text-gray-500'>
          {forms.length} form{forms.length !== 1 ? 's' : ''} created
        </div>
      </div>

      {forms.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-gray-500 mb-4'>No forms created yet</div>
          <div className='text-sm text-gray-400'>Create your first form using the Form Builder</div>
        </div>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {forms.map((form) => (
            <Card key={form.id} className='hover:shadow-md transition-shadow'>
              <CardHeader>
                <CardTitle className='text-lg'>{form.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='flex gap-2'>
                    <Button 
                      size="sm" 
                      onClick={() => handleViewForm(form)}
                      className='flex items-center gap-2'
                    >
                      <Eye className='h-4 w-4' />
                      View & Fill
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEditForm(form)}
                      className='flex items-center gap-2'
                    >
                      <Edit className='h-4 w-4' />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteForm(form.id)}
                      className='flex items-center gap-2'
                    >
                      <Trash2 className='h-4 w-4' />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default FormsList
