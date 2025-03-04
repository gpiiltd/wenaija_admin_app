import { useState } from "react";
import React from "react";
import ReportDialog from "./ReportDialogs";
import Button from "../Button";

interface CreateCategoryProps {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  isOpen: externalIsOpen,
  setIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = externalIsOpen ?? internalIsOpen;
  const setIsOpenState = setIsOpen ?? setInternalIsOpen;

  return (
    <>
      <ReportDialog
        title="Create new category"
        isOpen={isOpen}
        onClose={() => setIsOpenState(false)}
      >
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal">Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              className="border rounded w-full p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-normal">Description</label>
            <textarea
              placeholder="Write description here"
              className="border rounded w-full p-2 mt-1"
            />
          </div>
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

export default CreateCategory;
