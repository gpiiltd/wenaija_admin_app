import React from "react";

interface ProgressBarProps {
  percentage: number;
  bgColor?: string; // Optional background color, default is green
  textColor?: string; // Optional text color, default is dark gray
  label?: string; // Optional custom text for the span
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  bgColor = "#007A61",
  textColor = "#344054",
  label,
}) => {
  return (
    <div className="flex items-center w-full">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${percentage}%`,
            minWidth: "10px",
            backgroundColor: bgColor, // Dynamic background color
          }}
        ></div>
      </div>
      <span
        className="ml-4 font-normal text-sm"
        style={{ color: textColor }} // Dynamic text color
      >
        {label || `${percentage}%`} {/* Show label if provided, otherwise show percentage */}
      </span>
    </div>
  );
};

export default ProgressBar;
