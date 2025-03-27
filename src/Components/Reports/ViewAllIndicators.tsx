import React, { useState } from "react";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import ReportDialog from "./ReportDialogs";
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
      {
        title: "Risk Factor Education",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
      {
        title: "Genetic Counselling",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
      {
        title: "Substance Abuse Prevention",
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
      {
        title: "SIT/HIV Awareness Education",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
      {
        title: "Contraceptives and Family Planning",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
      {
        title: "Early Marriage Prevention",
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
      {
        title: "Promotion of Recycling and Bio...",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
      {
        title: "Rest Room Provision Campaign",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
        tasks: 5,
        starPoints: 25,
      },
    ],
  },
];

const IndicatorsView: React.FC = () => {
  const [editCategory, showEditCategory] = useState(false);

  const setToastShown = () => {
    showEditCategory(true);
  };

  const navigate = useNavigate();

  const handleNavigateView = () => {
    navigate("/app/reports/indicators/view");
  };

  return (
    <div className="w-full mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col">
        <div className="mb-10">
          <div className="flex items-center justify-start gap-6 mb-1">
            <Link to="/app/reports/community-task">
              <FiArrowLeft />
            </Link>
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-2xl font-bold"
            >
              Indicators
            </Typography>
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Community task &gt;{" "}
            <span className="text-[#007A61]">Indicators</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <section>
            <div className="mb-10">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-xl font-medium mb-2"
              >
                View all Indicators (34)
              </Typography>
              <p className="text-gray-600">
                Below is the list of indicators, categorized by their
                categories.
              </p>
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

      {/* Categories & Indicators */}
      {categories.map((category, index) => (
        <div key={index} className="mt-4">
          {/* Category Title */}
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-lg font-semibold bg-green-100 text-[#007A61] px-3 py-1 inline-block rounded-full"
          >
            {category.name}
          </Typography>

          {/* Indicator Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
            onClick={handleNavigateView}
          >
            {category.indicators.map((indicator, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200"
              >
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-lg font-semibold text-gray-900"
                >
                  {indicator.title}
                </Typography>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-sm text-gray-600 mt-1"
                >
                  {indicator.description}
                </Typography>

                {/* Tasks & Points */}
                <div className="flex items-center mt-4 text-sm text-gray-700">
                  <div className="flex flex-row mr-3 items-center">
                    <Icon type="file" click={() => {}} className="pr-2" />
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="flex items-center"
                    >
                      {indicator.tasks} tasks
                    </Typography>
                  </div>

                  <div className="flex flex-row mr-3 items-center">
                    <Icon type="star" click={() => {}} className="" />
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="flex items-center text-active_color"
                    >
                      25 star points
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndicatorsView;
