import React from "react";
import { genericData } from "./institutionData";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

const GenericReview: React.FC = () => {
  return (
    <div className="">
      <div className="space-y-8">
        {genericData.map((review) => (
          <div key={review.id} className="border shadow-md rounded-lg p-4 text-dark_gray ">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Icon type="user" className="w-6 h-6 mr-2" />
                <span className="font-semibold">{review.name}</span>
              </div>
              <span className="text-sm text-gray-500 ml-2">{review.date}</span>
            </div>
            <div className="flex items-center justify-center">
              <p className="w-[70%] text-gray-700 text-sm ">
                {review.reportReview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenericReview;
