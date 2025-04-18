import React from 'react'
import { FiXCircle } from 'react-icons/fi'
import { TypographyVariant } from '../types'
import Typography from '../Typography'

interface DialogProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
  className?: string
  showCloseIcon?: boolean
}

const ReportDialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  onClose,
  children,
  className = '',
  showCloseIcon = true,
}) => {
  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-[30rem]">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-lg font-semibold"
          >
            {title}
          </Typography>
          {showCloseIcon && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiXCircle height={30} width={50} />
            </button>
          )}
        </div>

        {/* Dynamic Content */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export default ReportDialog
