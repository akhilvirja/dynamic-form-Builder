import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

function Dropdown({label, name, defaultValue = "", required, options, handleChange}) {
  return (
    <>
        <Label>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Select
            onValueChange={(value) => handleChange(name, value)}
            defaultValue={defaultValue}
            required={required}
            name={name}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
                {options?.map((opt, i) => (
                <SelectItem key={i} value={opt}>
                    {opt}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </>
  )
}

export default Dropdown