import React from "react";
import { genericData } from "./institutionData";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

export const GenericImages = () => {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {genericData.map((report) => (
          <div key={report.id} className=" rounded-lg  flex flex-col">
            <div className="relative">
              {report.imageUrls.length > 0 && (
                <img
                  src={report.imageUrls[0]}
                  alt={`Report ${report.id}`}
                  className="w-full h-48 object-cover rounded-xl"
                />
              )}
              {report.images > 1 && (
                <div className="flex items-center gap-2 absolute top-2 right-2 bg-black opacity-50 text-white text-xs font-semibold rounded-xl px-3 cursor-pointer">
                  <span className="   ">+{report.images - 1} images</span>
                  <Icon type="imageopen" className="w-4 h-6" />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <Icon type="user" className="w-6 h-6" />
                <span className="font-semibold">{report.name}</span>
              </div>
              <span className="text-sm text-gray-500 font-semibold">
                {report.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
