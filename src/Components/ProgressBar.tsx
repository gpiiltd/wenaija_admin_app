import React from 'react'

interface ProgressBarProps {
  percentage: number
  bgColor?: string
  textColor?: string
  label?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  bgColor = '#007A61',
  textColor = '#344054',
  label,
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            minWidth: '10px',
            backgroundColor: bgColor,
          }}
        ></div>
      </div>
      <div>
        <span className="ml-4 font-normal text-sm" style={{ color: textColor }}>
          {label || `${percentage}%`}{' '}
        </span>
      </div>
    </div>
  )
}

export default ProgressBar
