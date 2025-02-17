import React, { FC } from "react";

interface Modalprops {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}
const CustomModal: FC<Modalprops> = ({
  isOpen,
  onClose,
  children,
  width = "70%",
  height = "90%",
}) => {
  if (!isOpen) return null;
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center  justify-center z-40 ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg overflow-y-auto`}
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mr-4 mt-4">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5329 14.2055C19.9235 13.8149 19.9235 13.1818 19.5329 12.7912C19.1424 12.4007 18.5092 12.4007 18.1187 12.7912L15.9974 14.9126L13.8761 12.7912C13.4856 12.4007 12.8524 12.4007 12.4619 12.7912C12.0713 13.1818 12.0713 13.8149 12.4619 14.2055L14.5832 16.3268L12.4619 18.4481C12.0713 18.8386 12.0713 19.4718 12.4619 19.8623C12.8524 20.2528 13.4856 20.2528 13.8761 19.8623L15.9974 17.741L18.1187 19.8623C18.5092 20.2528 19.1424 20.2528 19.5329 19.8623C19.9235 19.4718 19.9235 18.8386 19.5329 18.4481L17.4116 16.3268L19.5329 14.2055Z"
                fill="#5E5959"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.9974 1.66992C8.08132 1.66992 1.66406 8.08717 1.66406 16.0033C1.66406 23.9193 8.08132 30.3366 15.9974 30.3366C23.9135 30.3366 30.3307 23.9193 30.3307 16.0033C30.3307 8.08717 23.9135 1.66992 15.9974 1.66992ZM3.66406 16.0033C3.66406 9.19174 9.18588 3.66992 15.9974 3.66992C22.8089 3.66992 28.3307 9.19174 28.3307 16.0033C28.3307 22.8148 22.8089 28.3366 15.9974 28.3366C9.18588 28.3366 3.66406 22.8148 3.66406 16.0033Z"
                fill="#5E5959"
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
