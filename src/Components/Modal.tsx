import React, { FC } from 'react';

interface Modalprops {
isOpen: boolean;
onClose: () => void;
children: React.ReactNode;
}
const CustomModal : FC<Modalprops> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center  justify-center z-40 ${
        isOpen ? 'block' : 'hidden'
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg  w-[70%] h-[90%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mr-4 mt-4">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;