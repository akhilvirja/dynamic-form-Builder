import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

function CheckboxWithLabel({label, name, checked=false, handleChange, required = false}) {
  return (
    <>
    <div className='flex gap-5'>
      <Checkbox
          checked={checked}
          required={required}
          onCheckedChange={(checked) =>
          handleChange(name, checked)
          }
      />
      <Label>
        {label}
      </Label>
    </div>
    </>
  )
}

export default CheckboxWithLabel