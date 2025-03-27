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
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detect",
        starPoints: 25,
      },
      {
        title: "Hepatitis Sensitization and Prevention",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "Risk Factor Education",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "Genetic Counselling",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "Substance Abuse Prevention",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
    ],
  },
  {
    name: "Risk Factor Education",
    indicators: [
      {
        title: "Abortion Prevention",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "Sex Worker Education",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "SIT/HIV Awareness Education",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "Contraceptives and Family Planning",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "Early Marriage Prevention",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
    ],
  },
  {
    name: "Vaccine and Immunization",
    indicators: [
      {
        title: "Sanitation and Waste Management",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "Pollution",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "Promotion of Recycling and Bio...",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
      {
        title: "Rest Room Provision Campaign",
        description:
          "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",

        starPoints: 25,
      },
    ],
  },
];

const TaskPoserView: React.FC = () => {
  const [editCategory, showEditCategory] = useState(false);

  const setToastShown = () => {
    showEditCategory(true);
  };

  const navigate = useNavigate();

  const handleNavigateView = () => {
    navigate("/app/reports/task-poser/view");
  };

  return (
    <div className="w-full mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col">
        <div className="mb-6">
          <Typography
            variant={TypographyVariant.TITLE}
            className="font-bold flex flex-row items-center mb-1"
          >
            <Link to="/app/reports/community-task">
              <FiArrowLeft className="mr-3" />
            </Link>{" "}
            Poser/Task
          </Typography>
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Community Task &gt;{" "}
            <span className="text-[#7A0019]">View</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <section>
            <div className="mb-10">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-xl font-medium mb-1"
              >
                View all Posers (100)
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-gray-600"
              >
                Kindly view recent responses
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

      {/* Categories & Indicators */}
      {categories.map((category, index) => (
        <div key={index} className="mt-4">
          {/* Category Title */}
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-md font-semibold bg-[#ffdee5] text-[#7A0019] px-3 py-1 inline-block rounded-full"
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
                    <Icon type="star" click={() => {}} className="" />
                    <span className="flex items-center text-[#ED7D31]">
                      25 star points
                    </span>
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

export default TaskPoserView;
