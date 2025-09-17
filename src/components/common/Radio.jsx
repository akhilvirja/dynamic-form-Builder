import React from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

function Radio({label, defaultValue="", options, name, handleChange}) {
  return (
    <>
        <Label>{label}</Label>
        <RadioGroup
            onValueChange={(value) => handleChange(name, value)}
            defaultValue={defaultValue}
        >
            {options?.map((opt, i) => (
            <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={opt} id={`${name}-${i}`} />
                <Label htmlFor={`${name}-${i}`}>{opt}</Label>
            </div>
            ))}
        </RadioGroup>
    </>
  )
}

export default Radio