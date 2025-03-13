import React from "react";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import Card from "../Card";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import { submissions } from "./communityTaskReport";
import SubmissionCard from "./SubmissionCard";
import { useNavigate } from "react-router";
import { FiPlus } from "react-icons/fi";

const ReportMain = () => {
  const navigate = useNavigate();

  const handleNavigateViewAllPendingTasks = () => {
    navigate("/app/reports/view-pending-task");
  };

  const handleCardClick = () => {
    navigate("/app/reports/community-task");
  };

  const handleCardClickSurvey = () => {
    navigate("/app/reports/institutional-survey");
  };

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Reports</h1>
        <p className="text-gray-600">Manage reports</p>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50">
          <FiPlus />
          Create community task
        </button>
        <button className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg">
          <FiPlus className="text-white" />
          Create institution survey
        </button>
      </div>

      <div className="w-full h-[20rem] flex flex-row space-x-4">
        <div className="basis-1/3  h-full">
          <div className="flex flex-col h-full gap-y-2">
            <Card
              titleLeft={undefined}
              titleRight={undefined}
              className="p-3 flex-1"
            >
              <div className="flex flex-col gap-5">
                <section className="flex items-center">
                  <Icon
                    type="sticky_note"
                    className="outline-blue-500 fill-current mr-1"
                  />
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                    className="text-l_gray w-2/3"
                  >
                    Total Reports Submitted
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    6,444
                  </Typography>
                </section>
              </div>
            </Card>
            <Card
              titleLeft={undefined}
              titleRight={undefined}
              className="p-3 flex-1"
              onClick={handleCardClickSurvey}
            >
              <div className="flex flex-col gap-5">
                <section className="flex items-center">
                  <Icon
                    type="sticky_note"
                    className="outline-blue-500 fill-current mr-1"
                  />
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                    className="text-l_gray w-2/3"
                  >
                    Institution Survey
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    64
                  </Typography>
                </section>
              </div>
            </Card>
            <Card
              titleLeft={undefined}
              titleRight={undefined}
              className="p-3 flex-1"
              onClick={handleCardClick}
            >
              <div className="flex flex-col gap-5">
                <section className="flex items-center">
                  <Icon
                    type="sticky_note"
                    className="outline-blue-500 fill-current mr-1"
                  />
                  <Typography
                    variant={TypographyVariant.SUBTITLE}
                    className="text-l_gray w-2/3"
                  >
                    Community Task responses
                  </Typography>
                </section>

                <section>
                  <Typography
                    variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                    className="text-['#2D3648'] font-semibold"
                  >
                    64
                  </Typography>
                </section>
              </div>
            </Card>
          </div>
        </div>
        <div className="basis-2/3 bg-primary_color">qklwnelekw</div>
      </div>
      <div className="mb-4 mt-10">
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
      <button
        onClick={handleNavigateViewAllPendingTasks}
        className="flex items-center mx-auto mt-5 mb-10 gap-2 px-[10rem] py-4 border border-[#000000] rounded-lg hover:bg-gray-50 "
      >
        View all
      </button>
    </div>
  );
};

export default ReportMain;
