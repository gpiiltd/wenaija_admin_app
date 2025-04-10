import React, { useState } from "react";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import showCustomToast from "../../Components/CustomToast";

import Button from "../Button";

interface UploadLogoProps {
  onCancel: () => void;
  onPrevious: () => void;
}
const UploadLogo: React.FC<UploadLogoProps> = ({ onCancel, onPrevious }) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const approveStatus = () => {
    console.log('approve')
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onCancel();
    }, 2000);
    setTimeout(() => {
      showCustomToast(
        "Success",
        "Institution created successfully"
      );
    }, 2000);
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

        <div className="flex items-center justify-center w-[50%] mt-28 gap-8">
          <Button
            text="Back"
            bg_color="white"
            text_color="black"
            border_color="border-green-500"
            active={true}
            loading={false}
            onClick={onPrevious}
          />
          <Button
            text="submit"
            bg_color="#007A61"
            text_color="white"
            border_color="border-green-500"
            active={true}
            loading={loading}
            onClick={approveStatus}
          />
        </div>
      </div>
    </>
  );
};

export default UploadLogo;
