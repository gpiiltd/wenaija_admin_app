import React, { useState } from "react";
import { hoursArray } from "./InstitutionData";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

interface OperationHoursProps {
  onProceed: () => void;
  onPrevious: () => void;
}

const OperationHours: React.FC<OperationHoursProps> = ({ onProceed, onPrevious }) => {
  const [isOpenAllDays, setIsOpenAllDays] = useState(true);
  const [allDaysStartTime, setAllDaysStartTime] = useState("12:00 am");
  const [allDaysEndTime, setAllDaysEndTime] = useState("11:59 pm");
  const [isWeekdays, setIsWeekdays] = useState(false);
  const [weekdaysStartTime, setWeekdaysStartTime] = useState("12:00 am");
  const [weekdaysEndTime, setWeekdaysEndTime] = useState("11:59 pm");
  const [isWeekend, setIsWeekend] = useState(false);
  const [weekendStartTime, setWeekendStartTime] = useState("12:00 am");
  const [weekendEndTime, setWeekendEndTime] = useState("11:59 pm");

  const handleToggleAllDays = () => {
    setIsOpenAllDays(!isOpenAllDays);
    if (!isOpenAllDays) {
      setIsWeekdays(false);
      setIsWeekend(false);
    }
  };

  const handleToggleWeekdays = () => {
    setIsWeekdays(!isWeekdays);
    if (isWeekdays) {
      setIsOpenAllDays(false);
    }
  };

  const handleToggleWeekend = () => {
    setIsWeekend(!isWeekend);
    if (isWeekend) {
      setIsOpenAllDays(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      isOpenAllDays,
      allDaysStartTime,
      allDaysEndTime,
      isWeekdays,
      weekdaysStartTime,
      weekdaysEndTime,
      isWeekend,
      weekendStartTime,
      weekendEndTime,
    });
    onProceed();
  };

  // Function to filter options based on selected start time
  const getFilteredOptions = (startTime: string) => {
    const startIndex = hoursArray.indexOf(startTime);
    return hoursArray.slice(startIndex + 1); // Return options after the selected start time
  };

  return (
    <div className="flex flex-col p-8">
      <h1 className="text-2xl font-bold mb-4">Operation Hours</h1>
      <p className="mb-4">Please select operation hours</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white   pt-6 pb-8 mb-4 w-full"
      >
        {/* Toggle for All Days */}
        <div className="flex items-center ">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isOpenAllDays}
              onChange={handleToggleAllDays}
              className="hidden"
            />
            <div
              className={`toggle-bg w-12 h-6 rounded-full shadow-inner ${
                isOpenAllDays ? "bg-[#007A61]" : "bg-gray-300"
              }`}
            >
              <div
                className={`toggle-dot w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  isOpenAllDays ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
            <span className="ml-2 text-gray-700">Monday to Sunday</span>
          </label>
        </div>

        {/* Conditionally Render Time Selection for All Days */}
        {isOpenAllDays && (
          <div className="mb-4 mt-4 w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time
            </label>
            <div className="flex items-center">
              <select
                value={allDaysStartTime}
                onChange={(e) => setAllDaysStartTime(e.target.value)}
                className=" appearance-none border rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {hoursArray.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-center w-16 h-[38px] border-r border-t border-b rounded-r-lg -ml-1 bg-gray-100">
                <Icon type="clock" className="w-4 h-4" />
              </div>
              <span className="mx-4">to</span>
              <select
                value={allDaysEndTime}
                onChange={(e) => setAllDaysEndTime(e.target.value)}
                className=" appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {getFilteredOptions(allDaysStartTime).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-center w-16 h-[38px] border-r border-t border-b rounded-r-lg -ml-1 bg-gray-100">
                <Icon type="clock" className="w-4 h-4" />
              </div>{" "}
            </div>
          </div>
        )}

        {/* Toggle for Weekdays */}
        <div className="flex items-center mt-10">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isWeekdays}
              onChange={handleToggleWeekdays}
              className="hidden"
            />
            <div
              className={`toggle-bg w-12 h-6 rounded-full shadow-inner ${
                isWeekdays ? "bg-[#007A61]" : "bg-gray-300"
              }`}
            >
              <div
                className={`toggle-dot w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  isWeekdays ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
            <span className="ml-2 text-gray-700">Monday to Friday</span>
          </label>
        </div>

        {/* Conditionally Render Time Selection for Weekdays */}
        {isWeekdays && (
          <div className="mb-4 mt-4 w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time
            </label>
            <div className="flex items-center">
              <select
                value={weekdaysStartTime}
                onChange={(e) => setWeekdaysStartTime(e.target.value)}
                className=" appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {hoursArray.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-center w-16 h-[38px] border-r border-t border-b rounded-r-lg -ml-1 bg-gray-100">
                <Icon type="clock" className="w-4 h-4" />
              </div>{" "}
              <span className="mx-4">to</span>
              <select
                value={weekdaysEndTime}
                onChange={(e) => setWeekdaysEndTime(e.target.value)}
                className=" appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {getFilteredOptions(weekdaysStartTime).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-center w-16 h-[38px] border-r border-t border-b rounded-r-lg -ml-1 bg-gray-100">
                <Icon type="clock" className="w-4 h-4" />
              </div>{" "}
            </div>
          </div>
        )}

        {/* Toggle for Weekend */}
        <div className="flex items-center mt-10">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isWeekend}
              onChange={handleToggleWeekend}
              className="hidden"
            />
            <div
              className={`toggle-bg w-12 h-6 rounded-full shadow-inner ${
                isWeekend ? "bg-[#007A61]" : "bg-gray-300"
              }`}
            >
              <div
                className={`toggle-dot w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  isWeekend ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
            <span className="ml-2 text-gray-700">Saturday to Sunday</span>
          </label>
        </div>

        {/* Conditionally Render Time Selection for Weekend */}
        {isWeekend && (
          <div className="mb-4 mt-4 w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time
            </label>
            <div className="flex items-center">
              <select
                value={weekendStartTime}
                onChange={(e) => setWeekendStartTime(e.target.value)}
                className=" appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {hoursArray.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-center w-16 h-[38px] border-r border-t border-b rounded-r-lg -ml-1 bg-gray-100">
                <Icon type="clock" className="w-4 h-4" />
              </div>{" "}
              <span className="mx-4">to</span>
              <select
                value={weekendEndTime}
                onChange={(e) => setWeekendEndTime(e.target.value)}
                className=" appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {getFilteredOptions(weekendStartTime).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-center w-16 h-[38px] border-r border-t border-b rounded-r-lg -ml-1 bg-gray-100">
                <Icon type="clock" className="w-4 h-4" />
              </div>{" "}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center w-full mt-36 gap-8">
          <button
            type="button"
            className="border border-gray-300 text-gray-700 font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline w-[25%]"
            onClick={onPrevious}
            >
            Previous
          </button>
          <button
            type="submit"
            className="bg-[#007A61] text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline w-[25%]"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default OperationHours;
