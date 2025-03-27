import React from "react";
import { TiStopwatch } from "react-icons/ti";
import { TypographyVariant } from "../types";
import Typography from "../Typography";
import { FiArrowLeft } from "react-icons/fi";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { Link, useNavigate } from "react-router";

interface Category {
  id: number;
  title: string;
  description: string;
  indicator: number;
  dateCreated: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: "NCD Prevention",
    description:
      "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
    indicator: 6,
    dateCreated: "22 Sep 2024",
  },
  {
    id: 2,
    title: "Sexual Health",
    description:
      "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
    indicator: 6,
    dateCreated: "22 Sep 2024",
  },
  {
    id: 3,
    title: "Climate, Environment, and health",
    description:
      "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
    indicator: 8,
    dateCreated: "22 Sep 2024",
  },
  {
    id: 4,
    title: "Health Service Delivery",
    description:
      "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
    indicator: 5,
    dateCreated: "22 Sep 2024",
  },
  {
    id: 5,
    title: "Immunization and vaccines",
    description:
      "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
    indicator: 3,
    dateCreated: "22 Sep 2024",
  },
  {
    id: 6,
    title: "MNCH",
    description:
      "NCD prevention tasks focus on reducing risks of chronic diseases through promoting healthy habits, raising awareness, and encouraging early detection.",
    indicator: 10,
    dateCreated: "22 Sep 2024",
  },
];

const CategoriesView: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateView = () => {
    navigate("/app/reports/categories/view");
  };
  return (
    <div className="">
      <div className="mb-6">
        <div className="flex flex-row items-center">
          <Link to="/app/reports/community-task">
            <FiArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold ml-4">Categories</h1>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-8">
        Reports &gt; Community task &gt;{" "}
        <span className="text-[#007A61]">Categories</span>
      </div>
      <div className="flex flex-row justify-between">
        <section>
          <div className="mb-10">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-xl font-medium mb-2"
            >
              View all categories (7)
            </Typography>
            <p className="text-gray-600">See all active categories</p>
          </div>
        </section>
        <section>
          <div className="flex justify-end gap-4 mb-6">
            <button className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50">
              <Icon type="archive" className="w-6 h-6" />
              View archive
            </button>
            <button className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg">
              <Icon type="plus" className="w-6 h-6" />
              Add institution
            </button>
          </div>
        </section>
      </div>

      {/* //this is the categories section */}
      <div className="border rounded-lg overflow-hidden mb-">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 border-b last:border-0 bg-white hover:bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <div className="basis-2/3 ">
                <Typography
                  variant={TypographyVariant.TITLE}
                  className="text-lg "
                >
                  {category.title}
                </Typography>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-gray-500 text-sm"
                >
                  {category.description}
                </Typography>
              </div>
              <div className="flex items-center gap-6 basis-1/3 border-l-2 border-gray-300 pl-4">
                <div className="flex flex-col justify-start basis-1/3">
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="text-[#717D96] text-sm font-semibold"
                  >
                    Indicator
                  </Typography>
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="text-lg font-light"
                  >
                    {category.indicator}
                  </Typography>
                </div>
                <div className="flex-col justify-start basis-1/3 border-l-2 border-gray-300 pl-4 ">
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="text-[#717D96] text-sm font-semibold"
                  >
                    Date Created
                  </Typography>
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="text-[#FF725E] font-light"
                  >
                    {category.dateCreated}
                  </Typography>
                </div>
                <div className=" border-l-2 border-gray-300">
                  <button
                    onClick={handleNavigateView}
                    className="border ml-4 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 basis-1/3"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesView;
