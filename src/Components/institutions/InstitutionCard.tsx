import React from "react";
import {
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { InstitutionProps } from "../types";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

const InstitutionCard: React.FC<InstitutionProps> = ({
  name,
  address,
  hours,
  phone,
  email,
  icon,
}) => (
  <div className="bg-white rounded-lg p-6 border mb-4">
    <div className="flex items-center gap-4 mb-4">
      <Icon type={icon} className="w-fit" />
      <h4 className="text-lg font-semibold">{name}</h4>
    </div>

    <div className="grid grid-cols-1 lg:hidden">
      <div className="flex items-center gap-2 text-gray-600">
        <HiOutlineLocationMarker className="text-green-600" />
        <span>{address}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <HiOutlinePhone className="text-green-600 mt-1" />
        <span>{phone}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <HiOutlineClock className="text-green-600" />
        <span>{hours}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <HiOutlineMail className="text-green-600 mt-1" />
        <span>{email}</span>
      </div>
    </div>

    {/* large screen display */}

    <div className="lg:flex hidden">
      <div className="w-1/2">
        <div className="flex items-center gap-2 text-gray-600">
          <HiOutlineLocationMarker className="text-green-600" />
          <span>{address}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <HiOutlineClock className="text-green-600 mt-1" />
          <span>{hours}</span>
        </div>
        
      </div>

      <div className="mx-10 lg:mx-20">
        <div className="hidden md:block md:col-span-1 md:border-l md:border-gray-300 md:h-full md:mx-4"></div>
      </div>

      <div className="w-1/2">
      <div className="flex items-center gap-2 text-gray-600">
          <HiOutlinePhone className="text-green-600" />
          <span>{phone}</span>
        </div>{" "}
        <div className="flex items-center gap-2 text-gray-600 mt-1">
          <HiOutlineMail className="text-green-600" />
          <span>{email}</span>
        </div>{" "}
      </div>
    </div>
  </div>
);

export default InstitutionCard;
