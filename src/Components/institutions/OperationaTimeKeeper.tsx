import React from 'react'
import Typography from '../Typography';
import { TypographyVariant } from '../types';
import StatusToggle from '../Toggle';

export const OperationTimePicker = ({
    label,
    isToggled,
    onToggle,
    startTime,
    endTime,
    onStartTimeChange,
    onEndTimeChange,
  }: {
    label: string;
    isToggled: boolean;
    onToggle: () => void;
    startTime: string;
    endTime: string;
    onStartTimeChange: (value: string) => void;
    onEndTimeChange: (value: string) => void;
  }) => (
    <div className="pt-11">
      <div className="flex gap-2 items-center">
        <Typography variant={TypographyVariant.NORMAL}>
          {label}
        </Typography>
        <StatusToggle isActive={isToggled} onToggle={onToggle} />
      </div>
  
      {isToggled && (
        <div className="mb-4 mt-4 w-full max-w-md">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Time
          </label>
          <div className="flex items-center gap-4">
            <div className="flex flex-col relative w-full">
              <input
                type="time"
                value={startTime}
                onChange={(e) => onStartTimeChange(e.target.value)}
                className="appearance-none border border-[#007A61] rounded-xl px-10 py-2 text-sm w-full cursor-pointer"
              />
            </div>
            <span className="text-gray-500 text-sm">to</span>
            <div className="flex flex-col relative w-full">
              <input
                type="time"
                value={endTime}
                onChange={(e) => onEndTimeChange(e.target.value)}
                className="appearance-none border border-[#007A61] rounded-xl px-10 py-2 text-sm w-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
  