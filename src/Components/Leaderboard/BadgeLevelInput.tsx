import React from "react";

interface BadgeLevelInputProps {
  levelName: string;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  icon?: React.ReactNode;
}
const BadgeLevelInput: React.FC<BadgeLevelInputProps> = ({
  levelName,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  icon,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        {icon}
        <span className="ml-2 text-gray-700 font-semibold2">{levelName}</span>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={minValue}
          onChange={(e) => onMinChange(Number(e.target.value))}
          className="border rounded p-2 w-20 font-bold text-center"
        />
        <span className="mx-2">—</span>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => onMaxChange(Number(e.target.value))}
          className="border rounded p-2 w-20 font-bold text-center"
        />
        <span className="ml-2 text-gray-700">Points</span>
      </div>
    </div>
  );
};

export default BadgeLevelInput;
