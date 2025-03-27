import React, { useState } from "react";
import Icon from "../../../Assets/svgImages/Svg_icons_and_images";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import Typography from "../../Typography";
import { TypographyVariant } from "../../types";
import ReportDialog from "./../ReportDialogs";
import { Link, useNavigate } from "react-router";

interface Indicator {
  title: string;
  description: string;
  tasks: number;
  starPoints: number;
}

interface Category {
  name: string;
  indicators: Indicator[];
}

const categories: Category[] = [
  {
    name: "NCD Prevention",
    indicators: [
      {
        title: "Mental Health Promotion",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
      {
        title: "Hepatitis Sensitization and Prevention",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
    ],
  },
  {
    name: "Sexual and Reproductive Health",
    indicators: [
      {
        title: "Abortion Prevention",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
      {
        title: "Sex Worker Education",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
    ],
  },
  {
    name: "Climate, Environment and Health",
    indicators: [
      {
        title: "Sanitation and Waste Management",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
      {
        title: "Pollution",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
    ],
  },
];

const SurveyIndicatorsMainView: React.FC = () => {
  const [editCategory, showEditCategory] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(categories[0].name);

  const setToastShown = () => {
    showEditCategory(true);
  };

  const navigate = useNavigate();

  const handleNavigateView = () => {
    navigate("/app/reports/institutional-survey/indicators-single");
  };

  return (
    <div className="w-full mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col">
        <div className="mb-10">
          <Typography
            variant={TypographyVariant.TITLE}
            className="font-bold mb-2 flex flex-row items-center"
          >
            <Link to="/app/reports/institutional-survey">
              <FiArrowLeft className="mr-3" />
            </Link>
            Indicators
          </Typography>
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Institutional survey &gt;{" "}
            <span className="text-[#007A61]">Indicators</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <section>
            <div className="mb-10">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-lg font-medium mb-2"
              >
                View all Indicators (34)
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-gray-600 font-light"
              >
                Below is the list of indicators, categorized by their
                categories.
              </Typography>
            </div>
          </section>

          <section>
            <div className="flex justify-end gap-4 mb-6">
              <button className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50">
                <Icon type="archive" className="w-6 h-6" />
                View archive
              </button>
              <button
                className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
                onClick={setToastShown}
              >
                <FiPlus />
                Add Indicator
              </button>
            </div>
          </section>
        </div>
      </div>

      <div className="flex space-x-6 border-b pb-2">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`text-md font-normal ${
              activeTab === category.name
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      {/* Indicator Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        onClick={handleNavigateView}
      >
        {categories
          .find((category) => category.name === activeTab)
          ?.indicators.map((indicator, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition duration-200 bg-white"
            >
              {/* Title */}
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-xl font-bold text-gray-900"
              >
                {indicator.title}
              </Typography>

              {/* Description */}
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-sm text-gray-600 mt-2"
              >
                {indicator.description}
              </Typography>

              {/* Tasks & Star Points */}
              <div className="flex items-center justify-start mt-4 space-x-6 text-sm text-gray-700">
                {/* Tasks */}
                <div className="flex items-center">
                  <Icon
                    type="messageText"
                    className="text-green fill-current h-5 w-5 mr-1"
                  />
                  <span>{indicator.tasks} tasks</span>
                </div>

                {/* Star Points */}
                <div className="flex items-center">
                  <Icon type="star" className="text-orange-500 mr-1" />
                  <span className="text-[#ED7D31]">
                    {indicator.starPoints} star points
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SurveyIndicatorsMainView;
