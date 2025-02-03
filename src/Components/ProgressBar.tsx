import React from "react";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    return (
      <div className="flex items-center w-full">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#007A61] h-2 rounded-full"
            style={{
              width: `${percentage}%`,
              minWidth: "10px",
            }}
          ></div>
        </div>
        <span className="ml-4 text-[#344054] font-normal text-sm">
          {percentage}%
        </span>
      </div>
    );
  };
  

export default ProgressBar;
