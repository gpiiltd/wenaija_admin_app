import React, { useState } from "react";
import ReportDialog from "./ReportDialogs";
import Button from "../Button";
import Typography from "../Typography";
import { TypographyVariant } from "../types";

interface AddIndicatorProps {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
}

const RateResponseDialog: React.FC<AddIndicatorProps> = ({
  isOpen: externalIsOpen,
  setIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = externalIsOpen ?? internalIsOpen;
  const setIsOpenState = setIsOpen ?? setInternalIsOpen;

  const [rating, setRating] = useState(75);
  const [feedback, setFeedback] = useState("");

  return (
    <>
      <ReportDialog
        title=""
        isOpen={isOpen}
        onClose={() => setIsOpenState(false)}
      >
        <form className="flex flex-col gap-4">
          {/* Slider */}
          <div className="mb-4 relative">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="flex items-center justify-center font-semibold text-lg"
            >
              Rate response
            </Typography>

            <Typography
              variant={TypographyVariant.NORMAL}
              className="flex items-center justify-center font-light text-sm text-[#5E5959]"
            >
              Kindly rate this reviewed response
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="block font-semibold text-black my-7"
            >
              How will you rate this response?
            </Typography>

            <div className="relative w-full">
              {/* Slider Track */}
              <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                <div
                  className="absolute top-0 left-0 h-2 rounded-lg transition-all"
                  style={{
                    width: `${rating}%`,
                    backgroundColor: `hsl(${120 * (rating / 100)}, 100%, 40%)`, // Dynamic green hue
                  }}
                ></div>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
              />

              {/* Tooltip Display */}
              <div
                className="absolute top-[-30px] left-0 px-2 py-1 text-sm font-semibold text-white rounded-md shadow-md transition-all"
                style={{
                  left: `calc(${rating}% - 20px)`, // Adjust for width of the tooltip
                  backgroundColor: `hsl(${120 * (rating / 100)}, 100%, 40%)`, // Dynamic green
                }}
              >
                {rating}%
              </div>
            </div>
          </div>

          {/* Feedback Box */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Reason for your score
            </label>
            <textarea
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
              placeholder="Write here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-2">
            <div className="w-36">
              <Button
                text="Cancel"
                active={true}
                bg_color="#FFFFFF"
                border_color="#D0D5DD"
                text_color="#344054"
                loading={false}
                onClick={() => setIsOpenState(false)}
              />
            </div>
            <div className="w-36">
              <Button
                text="Submit"
                active={true}
                bg_color="#007A61"
                text_color="white"
                loading={false}
                onClick={() => {}}
              />
            </div>
          </div>
        </form>
      </ReportDialog>
    </>
  );
};

export default RateResponseDialog;
