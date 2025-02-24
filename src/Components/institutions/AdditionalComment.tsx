import React from "react";
import { genericData } from "./institutionData";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

const AdditionalComment: React.FC = () => {
  return (
    <div className="mx-auto ">
        <div className="flex flex-col items-center justify-center   py-2 mt-4">
        <h2 className="text-lg mb-2">Additional comments and images uploaded based on response</h2>
        <h3 className="text-lg mb-4 font-semibold">Was the outside of the facility clean?</h3>
      </div>
      <div className="space-y-8">
        {genericData.map((review) => (
          <div
            key={review.id}
            className="border shadow-md rounded-lg p-6 text-dark_gray "
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Icon type="user" className="w-6 h-6 mr-2" />
                <span className="font-semibold">{review.name}</span>
              </div>
              <span className="text-sm text-gray-500 ml-2">{review.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-[80%] text-gray-700 text-sm ">
                {review.reportReview}
              </p>
              <div className="flex items-center gap-2  text-[#007A61] bg-[#f1fffc]   text-xs font-semibold rounded-xl px-3 py-1 cursor-pointer">
                <span className="   ">+{review.images - 1} images</span>
                <Icon type="imageplus" className="w-4 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalComment;
