import React, { useState } from "react";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import ReportDialog from "./ReportDialogs";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router";
import { GoInfo } from "react-icons/go";

interface Indicator {
  id: number;
  title: string;
  description: string;
  tasks: string[];
}

const indicators: Indicator[] = [
  {
    id: 1,
    title: "Mental health promotion",
    description:
      "Lorem ipsum dolor sit amet consectetur. Mauris adipiscing vel euismod consectetur. Mauris adipiscing vel euismod...",
    tasks: [
      "What do you understand by mental health?",
      "Mental health refers to only when someone loses his/her mind and roams the streets. True or false?",
      "What are the factors affecting mental health in Nigeria?",
      "What are the challenges of mental health service provision in Nigeria?",
      "If given a chance to legislate, what bill will you introduce?",
    ],
  },
];

const SurveyIndividualIndicator: React.FC = () => {
  const [expandedId, setExpandedId] = useState(1);

  //   const toggleSection = (id: number) => {
  //     setExpandedId((prevId) => (prevId === id ? null : id));
  //   };

  const [editCategory, showEditCategory] = useState(false);

  const setDialogShown = () => {
    showEditCategory(true);
  };

  return (
    <div className="w-full p-6">
      <ReportDialog
        title="Edit Category"
        isOpen={editCategory}
        onClose={() => {
          showEditCategory(false);
        }}
        children={
          <div>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="bg-green-100 text-[#007A61] px-3 py-1 inline-block rounded-full text-sm mb-4 font-semibold"
            >
              NCD Prevention
            </Typography>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-normal">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="NCD Prevention"
                  className="border rounded w-full p-2 mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-normal">Description</label>
                <textarea
                  placeholder="NCD prevention tasks focus on reducing risks of chronic diseases
          through promoting healthy habits..."
                  className="border rounded w-full p-2 mt-1 text-sm"
                />
              </div>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => showEditCategory(false)}
                  className=" w-1/3 px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#007A61] text-white px-4 py-2 rounded-lg w-1/3"
                  onClick={setDialogShown}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        }
      />
      {/* Header Section */}
      <div className="">
        <div className="mb-6">
          <Typography
            variant={TypographyVariant.TITLE}
            className="font-bold mb-2 flex flex-row items-center"
          >
            <Link to="/app/reports/institutional-survey/indicators">
              <FiArrowLeft className="mr-3" />
            </Link>
            Acceptability of service
          </Typography>
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Institutional survey &gt; Indicators &gt;{" "}
            <span className="text-[#007A61]">View</span>
          </div>
        </div>

        <div className="bg-white p-6 border rounded-lg mb-8 flex flex-row justify-between">
          <div className="basis-2/4">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-xl font-bold"
            >
              Acceptability of service
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-600 font-light"
            >
              An acceptability of service survey for a health institute measures
              patient satisfaction, comfort, and trust in the services provided
            </Typography>
          </div>
          <div className="flex flex-row gap-2 my-4 basis-1/4">
            <button
              type="button"
              onClick={() => showEditCategory(false)}
              className="flex items-center gap-2 px-6 border rounded-lg"
            >
              <Icon type="deleteIcon" className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={setDialogShown}
              className="flex items-center gap-2 px-6  text-white border rounded-lg bg-[#007A61]"
            >
              <Icon type="editIcon" className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>

        {/* Indicators List */}
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-xl font-semibold mb-4"
        >
          Survey questions
        </Typography>

        <div className="border rounded-lg overflow-hidden">
          {indicators.map((indicator) => (
            <div key={indicator.id} className="border-b last:border-0 ">
              {/* Accordion Header */}
              <div className="max-w-[30rem] flex flex-row items-center justify-start p-4">
                <div className="flex flex-row justify-center border-gray-300 mr-4">
                  <Icon
                    type="messageText"
                    className="text-green fill-current mr-2"
                  />
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="text-md font-normal"
                  >
                    5 questions
                  </Typography>
                </div>

                <span className="text-orange-500 flex items-center justify-center text-[#ED7D31] font-normal">
                  <Icon type="star" className="h-10 w-10" />
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="text-md font-normal text-[#ED7D31]"
                  >
                    5 star points
                  </Typography>
                </span>
              </div>
              <div className="h-[1.5px] bg-[#EEEEEE] mr-4 ml-4" />

              {/* Accordion Content */}
              {expandedId === indicator.id && (
                <div className="p-4 bg-white">
                  {indicator.tasks.length > 0 ? (
                    <ul className="mt-2 space-y-3">
                      {indicator.tasks.map((task, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center text-gray-700 "
                        >
                          {/* Left Section - Number */}
                          <div className="flex items-center basis-2/3 text-[#7A0019]">
                            <span className="w-6 h-6 flex items-center justify-center border-[1px] border-[#7A0019] text-red-500 font-light rounded-full mr-3 p-3">
                              {index + 1}
                            </span>
                            <span className="text-[#5E5959] font-light overflow-auto">
                              {task}
                            </span>
                          </div>

                          {/* Right Section - info iconss */}
                          <span className="text-orange-500 flex items-center basis-1/3 text-[#ED7D31] font-normal">
                            <GoInfo color="#007A61" />
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No tasks available</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyIndividualIndicator;
