import React, { FC } from 'react'
import { MdOutlineCancel } from 'react-icons/md'

interface Modalprops {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  width?: string
  height?: string
}
const CustomModal: FC<Modalprops> = ({
  isOpen,
  onClose,
  children,
  width = '70%',
  height = '90%',
}) => {
  if (!isOpen) return null
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center  justify-center z-40 ${
        isOpen ? 'block' : 'hidden'
      }`}
      onClick={onClose}
    >
      <div
        className={'bg-white rounded-lg shadow-lg overflow-y-auto'}
        style={{ width, height }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-end mr-4 mt-4">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <MdOutlineCancel color="#5E5959" size={26} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CustomModal
