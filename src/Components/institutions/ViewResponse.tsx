import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineChevronDown } from "react-icons/hi";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import Acceptability from "./Acceptability";

const ViewResponse: React.FC = () => {
  const location = useLocation();
  const { name, indicator, totalResponses, icon } = location.state || {}; // Destructure the passed details

  // Sample data for responses
  const responses = {
    question: "Was the outside of the facility clean?",
    summary: {
      veryClean: 67,
      somewhatClean: 13,
      neutral: 6,
      somewhatUnclean: 8,
      veryUnclean: 6,
    },
    additionalComments: {
      somewhatUnclean: 99,
      veryUnclean: 74,
    },
    waitTime: "Less than 10 minutes",
    waitReason: "N/A",
    additionalCommentsPercentage: 24,
  };

  const [activeTab, setActiveTab] = useState<string>("acceptability");


  return (
    <div className=" mx-auto p-6">
      <div className="flex items-center justify-start gap-6 mb-8">
        <Link to="/app/instutitions/view-institute">
          <Icon type="arrowBack" className="w-10 h-10" />
        </Link>
        <h1 className="text-2xl font-bold">View Response</h1>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Icon type={icon} className="w-fit" />
        <h4 className="text-lg font-semibold">{name}</h4>
      </div>

      <div className="flex mb-6 w-full space-x-4  rounded-xl ">
        <button
          className={`py-2  ${
            activeTab === "acceptability" ? "bg-white border-b-2 border-b-[#007A61] text-[#007A61]" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("acceptability")}
        >
          Acceptability of Service
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "competency" ? "bg-white border-b-2 border-b-[#007A61] text-[#007A61]" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("competency")}
        >
          Competency of health workers
        </button>

        <button
          className={`py-2 px-4 ${
            activeTab === "privacy" ? "bg-white border-b-2 border-b-[#007A61] text-[#007A61]" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("privacy")}
        >
          Privacy and confidentiality
        </button>

        <button
          className={`py-2 px-4 ${
            activeTab === "global" ? "bg-white border-b-2 border-b-[#007A61] text-[#007A61]" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("global")}
        >
          Global assessment
        </button>
      </div>


      {activeTab === "acceptability" && <Acceptability />}
      {activeTab === "competency" && "Competency of health workers"}
      {activeTab === "privacy" && "Privacy and confidentiality"}
      {activeTab === "global" && "Global assessment"}
    </div>
  );
};

export default ViewResponse;
