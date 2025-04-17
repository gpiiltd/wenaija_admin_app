import React from 'react'

interface StatusToggleProps {
  isActive: boolean
  onToggle: (status: boolean) => void
  activeLabel?: string
  inactiveLabel?: string
}

const StatusToggle: React.FC<StatusToggleProps> = ({
  isActive,
  onToggle,
  activeLabel = 'Active',
  inactiveLabel = 'Inactive',
}) => {
  return (
    <button
      onClick={() => onToggle(!isActive)}
      className={`relative flex items-center w-16 h-8 rounded-full transition-colors duration-300 ${
        isActive ? 'bg-[#007A61]' : 'bg-[#F2F4F7]'
      }`}
    >
      <div
        className={`left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
          isActive ? 'translate-x-8' : 'translate-x-0'
        }`}
      ></div>
    </button>
  )
}

export default StatusToggle
