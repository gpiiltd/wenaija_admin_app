import React, { useState } from "react";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import ReportDialog from "./ReportDialogs";
import Button from "../Button";
import { Link } from "react-router";
import { FiArrowLeft, FiChevronDown, FiChevronUp } from "react-icons/fi";

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
  { id: 2, title: "Risk Factor Education", description: "", tasks: [] },
  { id: 3, title: "Substance Abuse Prevention", description: "", tasks: [] },
  { id: 4, title: "Genetic Counselling", description: "", tasks: [] },
  {
    id: 5,
    title: "Hepatitis Sanitization and Prevention",
    description: "",
    tasks: [],
  },
  { id: 6, title: "Healthy Food Choices", description: "", tasks: [] },
];

const IndividualCategory: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleSection = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const [editCategory, showEditCategory] = useState(false);

  const setToastShown = () => {
    showEditCategory(true);
  };

  return (
    <div className="w-full mx-auto p-6">
      <ReportDialog
        title="Edit Category"
        isOpen={editCategory}
        onClose={() => {
          showEditCategory(false);
        }}
        children={
          <div>
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
                <label className="block text-sm font-nor">Description</label>
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
                  onClick={setToastShown}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        }
      />

      <div className="mb-4">
        <div className="flex flex-row items-center">
          <Link to="/app/reports/categories">
            <FiArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold ml-4">NCD Prevention</h1>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-8">
        Reports &gt; Community task &gt; Categories &gt;{" "}
        <span className="text-[#007A61]">View</span>
      </div>
      {/* Header Section */}
      <div className="bg-white p-4 border rounded-lg mb-4 flex flex-row justify-between">
        <div className="max-w-[30rem]">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-2xl font-bold"
          >
            NCD Prevention
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-gray-600"
          >
            NCD prevention tasks focus on reducing risks of chronic diseases
            through promoting healthy habits, raising awareness, and encouraging
            early detection.
          </Typography>
        </div>

        <div className="flex gap-4 mt-3">
          {/* Buttons */}
          <div className="flex justify-start mt-4 gap-2">
            <div className="w-[7rem] mr-2">
              <Button
                text="Delete"
                active={true}
                border_color="#D0D5DD"
                bg_color="#FFFFFF"
                text_color="#344054"
                icon={<Icon type="deleteIcon" className="w-4 h-4" />}
                loading={false}
              />
            </div>

            <div className="w-[7rem]">
              <Button
                text="Edit"
                active={true}
                bg_color="#007A61"
                text_color="white"
                icon={<Icon type="editIcon" className="w-4 h-4" />}
                loading={false}
                onClick={setToastShown}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicators List */}
      <Typography
        variant={TypographyVariant.NORMAL}
        className="text-md font-semibold mb-4"
      >
        Indicators ({indicators.length})
      </Typography>

      <div className="border rounded-lg overflow-hidden">
        {indicators.map((indicator) => (
          <div key={indicator.id} className="border-b last:border-0 ">
            {/* Accordion Header */}
            <button
              onClick={() => toggleSection(indicator.id)}
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-[#007A61] underline hover:bg-gray-50"
            >
              {indicator.title}
              <span>
                {expandedId === indicator.id ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </span>
            </button>
            <div className="w-[34rem] text-left text-[#5E5959] pl-4">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-[#5E5959] "
              >
                {indicator.description}
              </Typography>
            </div>

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
                        <div className="flex items-center basis-2/3 text-[#7A0019]">
                          <span className="w-6 h-6 flex items-center justify-center border-2 border-[#7A0019] text-red-500 font-normal rounded-full mr-3 p-3">
                            {index + 1}
                          </span>
                          <span className="text-[#5E5959] font-light">
                            {task}
                          </span>
                        </div>

                        <span className="text-orange-500 flex items-center basis-1/3 text-[#ED7D31] font-normal">
                          <Icon type="star" className="w-8 h-8" />5 star points
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
  );
};

export default IndividualCategory;
