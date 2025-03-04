import React, { useState } from "react";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import ReportDialog from "./ReportDialogs";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { FaRegEye } from "react-icons/fa";

const IndividualTaskPoser: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateEditView = () => {
    navigate("/app/reports/task-poser/view/edit");
  };
  return (
    <div className="w-full p-6">
      {/* Header Section */}
      <div className="">
        <div className="mb-6">
          <Typography
            variant={TypographyVariant.TITLE}
            className="font-bold mb-2 flex flex-row items-center"
          >
            <Link to="/app/reports/task-poser">
              <FiArrowLeft className="mr-3" />
            </Link>{" "}
            Indicators
          </Typography>
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Community Task &gt; Indicators &gt;{" "}
            <span className="text-[#007A61]">View</span>
          </div>
        </div>

        <div className=" mx-[15rem] mt-16 p-6  bg-white border border-1 border-[#000000] rounded-md">
          {/* Tags */}
          <div className="flex gap-2 mb-3">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold "
            >
              NCD Prevention
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="px-3 bg-[#ffdee5] text-[#7A0019] py-1 text-sm font-semibold bg-red-100 rounded-full"
            >
              Mental Health Promotion
            </Typography>
          </div>

          {/* Question */}
          <h2 className="text-lg font-semibold text-gray-900">
            Mental health only refer to only when someone loses his/her mind and
            roams the streets. True or false? Argue your reasons in 50 words
          </h2>

          {/* Points & Responses */}
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <span className="text-[#ED7D31] flex flex-row items-center justify-center">
              <Icon type="star" className="" /> 5 star points
            </span>
            <span className="mx-2">|</span>
            <Typography variant={TypographyVariant.NORMAL}>
              256 responses
            </Typography>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="mt-4 mr-[15rem] gap-3 flex justify-end">
        <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md flex flex-row items-center">
          <Icon type="deleteIcon" className="pr-2" />
          Delete
        </button>
        <button
          onClick={handleNavigateEditView}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md flex flex-row items-center"
        >
          <Icon type="editdark" className="pr-2" />
          Edit
        </button>
        <button className="px-4 py-2 text-white bg-[#007A61] rounded-md flex flex-row items-center">
          <FaRegEye className="mr-2" />
          View responses
        </button>
      </div>
    </div>
  );
};

export default IndividualTaskPoser;
