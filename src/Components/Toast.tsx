import React from "react";
import Icon from "../Assets/svgImages/Svg_icons_and_images";
import Typography from "./Typography";
import { TypographyVariant } from "./types";

interface ToastProps {
  isVisible: boolean;
  onCancel: () => void;
}

const Toast: React.FC<ToastProps> = ({ isVisible, onCancel }) => {
  if (!isVisible) {
    return null; // Do not render anything if not visible
  }

  return (
    <div className="absolute bg-white border-[1px] p-4 w-[400px] lg:right-10 rounded-md flex flex-row shadow-lg">
      <div className="flex flex-row pr-2">
        <Icon type="toastCheck" className="pr-2" />
        <div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-black text-md font-semibold"
          >
            2 factor authentication pin changed successfully
          </Typography>

          <Typography
            variant={TypographyVariant.SMALL}
            className="text-[#667085] text-sm font-light font[12px] mt-2"
          >
            Great job!
          </Typography>
        </div>
      </div>

      <Icon type="cancel" click={onCancel} className="pr-2" />
    </div>
  );
};

export default Toast;
