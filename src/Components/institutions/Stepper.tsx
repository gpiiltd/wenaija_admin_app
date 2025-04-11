import React, { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { FaRegCircle } from "react-icons/fa";
import AddInstitution from "./AddInstitution";
import OperationHours from "./OperationHours";
import UploadLogo from "./UploadLogo";

interface StepperProps {
  onClose: () => void;
}

const Stepper: React.FC<StepperProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className=" p-6">
      <div className="flex justify-between mb-6 mx-32 relative">
        <div className="flex-1 ">
          {currentStep > 1 ? (
            <HiCheckCircle className="text-[#007A61] w-8 h-8" />
          ) : (
            <FaRegCircle className="text-gray-400 w-8 h-8" />
          )}
          <span
            className={currentStep === 1 ? "text-[#007A61]" : "text-gray-400"}
          >
            Profile details
          </span>
        </div>
        <div className="flex-1 ">
          {currentStep > 2 ? (
            <HiCheckCircle className="text-[#007A61] w-8 h-8" />
          ) : (
            <FaRegCircle className="text-gray-400 w-8 h-8" />
          )}
          <span
            className={currentStep === 2 ? "text-[#007A61]" : "text-gray-400"}
          >
            Operation hours
          </span>
        </div>
        <div className="flex-1 ">
          {currentStep === 3 ? (
            <HiCheckCircle className="text-[#007A61] w-8 h-8" />
          ) : (
            <FaRegCircle className="text-gray-400 w-8 h-8" />
          )}
          <span
            className={currentStep === 3 ? "text-[#007A61]" : "text-gray-400"}
          >
            Add logo
          </span>
        </div>
        <div className="absolute top-4 left-0 right-0 mr-52 h-1 bg-gray-200" />
      </div>

      <div className="mb-6">
        {currentStep === 1 && (
          <AddInstitution
            // onProceed={nextStep}
            // onCancel={onClose}
            // onPrevious={prevStep}
          />
        )}
        {currentStep === 2 && (
          <OperationHours onProceed={nextStep} onPrevious={prevStep} />
        )}
        {currentStep === 3 && (
          <UploadLogo
            onPrevious={prevStep}
            onCancel={ onClose}
          />
        )}
        {currentStep === 1 && (
          <AddInstitution
            // onProceed={nextStep}
            // onCancel={onClose}
            // onPrevious={prevStep}
          />
        )}
        {currentStep === 2 && (
          <OperationHours onProceed={nextStep} onPrevious={prevStep} />
        )}
        {currentStep === 3 && (
          <UploadLogo onCancel={onClose} onPrevious={prevStep} />
        )}
      </div>
    </div>
  );
};

export default Stepper;
