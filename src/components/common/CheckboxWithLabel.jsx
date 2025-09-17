import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

function CheckboxWithLabel({label, name, checked=false, handleChange}) {
  return (
    <>
        <Checkbox
            checked={checked}
            onCheckedChange={(checked) =>
            handleChange(name, checked)
            }
        />
        <Label>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
    </>
  )
}

export default CheckboxWithLabel