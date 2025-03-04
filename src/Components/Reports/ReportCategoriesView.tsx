import React, { useState } from "react";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import Card from "../Card";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import { FaPlus } from "react-icons/fa";
import { submissions } from "./communityTaskReport";
import SubmissionCard from "./SubmissionCard";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiPlus,
  FiUserPlus,
} from "react-icons/fi";
import { TbReportMedical } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import CreateCategory from "./AddCategory";
import Toast from "../Toast";
import AddIndicator from "./AddIndicators";
import { Link, useNavigate } from "react-router";

const ReportCategoryView = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false);
  const [toast, showToast] = useState(false);

  const setToastShown = () => {
    if (isCategoryModalOpen === false) {
      showToast(true);
    } else {
      return;
    }
  };

  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate("/app/reports/add-task");
  };

  const handleNavigateAllCategories = () => {
    navigate("/app/reports/categories");
  };

  const handleNavigateIndicators = () => {
    navigate("/app/reports/indicators");
  };

  const handleNavigateTask = () => {
    navigate("/app/reports/task-poser");
  };

  return (
    <div className="">
      <Toast
        isVisible={toast}
        onCancel={() => showToast(false)}
        title={"Category created successfully"}
        subText={"“MNCH category” created successfully"}
      />
      <div className="flex items-center justify-start gap-6 mb-4">
        <Link to="/app/reports">
          <FiArrowLeft />
        </Link>
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-2xl font-bold"
        >
          Community task
        </Typography>
      </div>
      <div className="text-sm text-gray-500 mb-8">
        Reports &gt; <span className="text-[#007A61]">Community task </span>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button
          className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50"
          onClick={() => setIsCategoryModalOpen(true)}
        >
          <FiPlus />
          Create category
        </button>
        <button
          className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50"
          onClick={() => setIsIndicatorModalOpen(true)}
        >
          <FiPlus />
          Add indicator
        </button>
        <button
          className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
          onClick={handleAddTask}
        >
          <FiPlus />
          Add task
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1 */}
        <Card titleLeft={undefined} titleRight={undefined} className="p-4 ">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray"
              >
                PENDING ITEMS
              </Typography>
              <Icon
                type="reportsStickRed"
                className="outline-blue-500 fill-current"
              />
            </div>

            <section className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-l_gray font-semibold"
                  >
                    Pending
                  </Typography>
                </div>
                <div className="flex items-center justify-between space-x-6">
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    1,234
                  </Typography>
                  <div className="flex items-center">
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-primary_green font-semibold"
                    >
                      View
                    </Typography>
                    <FiArrowUpRight color="#007A61" />
                  </div>
                </div>
              </div>

              <div className="h-6 border-l border-gray-300"></div>
              <div>
                <div className="flex items-center gap-2">
                  <Typography
                    variant={TypographyVariant.SMALL}
                    className="text-l_gray font-semibold"
                  >
                    Reviewed
                  </Typography>
                </div>
                <div className="flex items-center justify-between space-x-6">
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    1,234
                  </Typography>
                  <div className="flex items-center">
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="text-primary_green font-semibold"
                    >
                      View
                    </Typography>
                    <FiArrowUpRight color="#007A61" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Card>
        {/* Card 2 */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="p-3"
          onClick={handleNavigateAllCategories}
        >
          <div className="flex flex-col gap-y-10">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Categories
              </Typography>
              <Icon type="task" className="outline-blue-500 fill-current" />
            </section>

            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                1,234
              </Typography>
            </section>
          </div>
        </Card>
        {/* Card 3 */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="p-3"
          onClick={handleNavigateIndicators}
        >
          <div className="flex flex-col gap-y-10">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Indicators
              </Typography>
              <Icon
                type="taskSquare"
                className="outline-blue-500 fill-current"
              />
            </section>
            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                1,234
              </Typography>
            </section>
          </div>
        </Card>
        {/* Card 4 */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="p-3"
          onClick={handleNavigateTask}
        >
          <div className="flex flex-col gap-y-10">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Posers/Task
              </Typography>
              <Icon type="messageText" className="text-green fill-current" />
            </section>

            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                1,234
              </Typography>
            </section>
          </div>
        </Card>
      </section>

      {/* below section  */}
      <div className="mb-6 mt-12">
        <h1 className="text-2xl font-bold mb-2">Pending community task</h1>
        <p className="text-gray-600">
          Kindly review and score reponses from users
        </p>
      </div>
      <div className="space-y-4">
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
      </div>
      <button className="flex items-center mx-auto mt-5 mb-10 gap-2 px-[10rem] py-4 border border-[#000000] rounded-lg hover:bg-gray-50 ">
        View all
      </button>
      <CreateCategory
        isOpen={isCategoryModalOpen}
        setIsOpen={setIsCategoryModalOpen}
      />

      <AddIndicator
        isOpen={isIndicatorModalOpen}
        setIsOpen={setIsIndicatorModalOpen}
      />
    </div>
  );
};

export default ReportCategoryView;
