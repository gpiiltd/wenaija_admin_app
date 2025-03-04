import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "../Assets/svgImages/Svg_icons_and_images";

interface ToastContentProps {
  title?: string;
  body?: string;
}

const ToastContent: React.FC<ToastContentProps> = ({ title, body }) => (
  <div className="flex items-start gap-3">
    <Icon type="successIcon" />
    <div>
      <h6 className="font-bold text-[#5E5959]">{title}</h6>
      <p className="font-light text-[#5E5959]">{body}</p>
    </div>
  </div>
);

const showCustomToast = (title?: string, body?: string) => {
  toast.success(<ToastContent title={title} body={body} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false,
    className: "bg-white shadow-lg shadow-gray-400 rounded-md",
  });
};

export default showCustomToast;
