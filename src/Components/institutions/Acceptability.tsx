import React, { useState } from "react";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import Summary from "./Summary";
import IndividualResponse from "./IndividualResponse";
import Typography from "../Typography";
import { TypographyVariant } from "../types";

const Acceptability: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("summary");

  return (
    <div className="mx-auto p-6 border-2 rounded-lg">
      <div className="flex justify-start items-center gap-4 mb-4">
        <Typography variant={TypographyVariant.TITLE} className="font-semibold">
          Acceptability of Services
        </Typography>
        <Typography
          variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
          className="text-lg px-2  text-[#007A61] bg-[#f1fffc]"
        >
          {" "}
          <span className="font-bold">1240</span> responses
        </Typography>
      </div>

      <div className="flex mb-6 w-full space-x-4  rounded-xl ">
        <button
          className={`py-2  flex items-center gap-2 font-semibold ${
            activeTab === "summary"
              ? "bg-white border-b-2 border-b-black text-black "
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("summary")}
        >
          <Icon type="summary" className="w-6 h-6" />
          Summary
        </button>
        <button
          className={`py-2 px-4 flex items-center gap-2 font-semibold ${
            activeTab === "individual"
              ? "bg-white border-b-2 border-b-black text-black "
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("individual")}
        >
          <Icon type="individual" className="w-6 h-6" />
          Individual responses
        </button>
      </div>

      {activeTab === "summary" && <Summary />}
      {activeTab === "individual" && <IndividualResponse />}
    </div>
  );
};

export default Acceptability;
