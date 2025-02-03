import React, { useState } from "react";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

const UploadLogo: React.FC<{ onPrevious: () => void }> = ({ onPrevious }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <>
      <h2 className="text-xl font-normal mb-4 p-8">
        Please upload institution logo
      </h2>
      <div className="flex flex-col items-center justify-center p-6">
        <span className="text-gray-500 mb-2">Upload logo</span>
        <div className="relative w-48 h-48 mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-full bg-gray-100">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded logo"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center">
                <Icon type="defaultUpload" className="pt-4" />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center w-full mt-28 gap-8">
          <button
            type="button"
            className="border border-gray-300 text-gray-700 font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline w-[25%]"
            onClick={onPrevious}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-[#007A61] text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline w-[25%]"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadLogo;
