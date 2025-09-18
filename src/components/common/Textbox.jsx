import { Label } from '@radix-ui/react-label'
import React from 'react'
import { Input } from '../ui/input'

function Textbox({name, label, required, value = "", handleChange, placeholder='', type="text"}) {
  return (
    <>
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}  
        </Label>
        <Input
            id={name}
            name={name}
            type={type}
            required={required}
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(name, e.target.value)}
        />
    </>
  )
}

export default Textbox