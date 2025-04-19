import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'

interface SelectOptionProps {
  value: string
  label: string
}

interface SelectComponentProps {
  label?: string
  options: SelectOptionProps[]
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
  required?: boolean
}

const SelectOption: React.FC<SelectComponentProps> = ({
  label,
  options,
  value,
  onChange,
  className = '',
  disabled = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className={`relative flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label className="text-base font-medium text-[#17191C] font-title">
          {label}
        </label>
      )}
      <div
        className={`w-full p-3 border border-gray-300 rounded-md cursor-pointer bg-white flex items-center justify-between focus:ring-2 focus:ring-[#007A61] ${
          disabled ? 'bg-gray-200 cursor-not-allowed' : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 text-sm">
          {selectedOption?.label || 'Select an option'}
        </span>
        <IoIosArrowDown className="text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10 overflow-y-auto h-fit max-h-48">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => {
                if (!disabled) {
                  onChange(option.value)
                  setIsOpen(false)
                }
              }}
              className={`flex justify-between items-center px-3 py-2 cursor-pointer text-sm text-gray-700 hover:bg-[#F6FFFD] ${
                value === option.value ? 'bg-[#F6FFFD]' : ''
              }`}
            >
              {option.label}
              {value === option.value && <FaCheck color="#007A61" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectOption
