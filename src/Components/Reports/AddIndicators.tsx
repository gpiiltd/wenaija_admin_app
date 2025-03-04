import React, { useState } from "react";
import ReportDialog from "./ReportDialogs";
import Button from "../Button";

interface AddIndicatorProps {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
}

const AddIndicator: React.FC<AddIndicatorProps> = ({
  isOpen: externalIsOpen,
  setIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = externalIsOpen ?? internalIsOpen;
  const setIsOpenState = setIsOpen ?? setInternalIsOpen;

  return (
    <>
      <ReportDialog
        title="Add Indicator"
        isOpen={isOpen}
        onClose={() => setIsOpenState(false)}
      >
        <form className="flex flex-col gap-4">
          {/* Select Category Dropdown */}
          <div>
            <label className="block text-sm font-normal">Select Category</label>
            <select className="border rounded w-full p-2 mt-1">
              <option value="">Select category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>

          {/* Indicator Name Input */}
          <div>
            <label className="block text-sm font-normal">Indicator Name</label>
            <input
              type="text"
              placeholder="Enter indicator name"
              className="border rounded w-full p-2 mt-1"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-normal">Description</label>
            <textarea
              placeholder="Write description here"
              className="border rounded w-full p-2 mt-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <div className="w-[7rem] mr-2">
              <Button
                text="Cancel"
                active={true}
                border_color="#D0D5DD"
                bg_color="#FFFFFF"
                text_color="black"
                loading={false}
                onClick={() => setIsOpenState(false)}
              />
            </div>

            <div className="w-[7rem]">
              <Button
                text="Submit"
                active={true}
                bg_color="#007A61"
                text_color="white"
                loading={false}
                onClick={() => setIsOpenState(false)}
              />
            </div>
          </div>
        </form>
      </ReportDialog>
    </>
  );
};

export default AddIndicator;
