import React, { useState, useEffect } from "react"
import Textbox from "./common/Textbox"
import Title from "./common/Title"
import Dropdown from "./common/Dropdown"
import CheckboxWithLabel from "./common/CheckboxWithLabel"
import Radio from "./common/Radio"
import { Plus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

function DynamicForm({ schema = [], setFieldType }) {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    // set default value
    const defaults = {}
    schema.forEach((f) => {
      if (f.default !== undefined) {
        defaults[f.name] = f.default
      }
    })
    setFormData(defaults)
  }, [schema])

  // handle change
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem("formResponses", JSON.stringify(formData))
    console.log("formResponses", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">

      {schema.map((field, idx) => {
        switch (field.type) {
          case "text":
            return (
              <div key={idx} className="space-y-1">
                <Textbox name={field.name} label={field.label} required={field.required} value={formData[field.name]} handleChange={handleChange} />
              </div>
            )

          case "title":
            return (
              <div key={idx}>
                <Title text={field.label} />
              </div>
            )

          case "dropdown":
            return (
              <div key={idx} className="space-y-1">
                <Dropdown label={field.label} name={field.name} defaultValue={field.default} required={field.required} options={field.options} handleChange={handleChange} />
              </div>
            )

          case "checkbox":
            return (
              <div key={idx} className="flex items-center space-x-2">
                <CheckboxWithLabel label={field.label} name={field.name} checked={formData[field.name]} handleChange={handleChange} />
              </div>
            )

          case "radio":
            return (
              <div key={idx} className="space-y-1">
                <Radio label={field.label} defaultValue={field.default} options={field.options} name={field.name} handleChange={handleChange}  />
              </div>
            )

          default:
            return null
        }
      })}
      
      <Popover>
        <div className="flex flex-col justify-center items-center">
          <PopoverTrigger>
            <div className="rounded-full border-2 border-gray-400 inline-block p-7 ">
              <Plus className="text-gray-700" />
            </div>
          </PopoverTrigger>
            <p className="text-gray-400">Click + to add your first field</p>
          <PopoverContent>
            <div className="flex flex-col space-y-2">
              {["text", "title", "dropdown", "checkbox", "radio"].map((type) => (
                <button
                  key={type}
                  className="px-3 py-1 rounded hover:bg-gray-100 text-left"
                  onClick={() => setFieldType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </PopoverContent>
        </div>
      </Popover>

    </form>
  )
}

export default DynamicForm
