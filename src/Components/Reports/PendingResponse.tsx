import React, { useState } from "react";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import Button from "../Button";
import RateResponseDialog from "./RateResponsedialog";
import { Link } from "react-router";

const PendingResponse = () => {
  const [isRateResponseModalOpen, setIsRateResponseModalOpen] = useState(false);
  return (
    <div className="w-full mb-20">
      <RateResponseDialog
        isOpen={isRateResponseModalOpen}
        setIsOpen={setIsRateResponseModalOpen}
      />
      {/* Top section */}
      <div className="mb-6">
        <Typography
          variant={TypographyVariant.TITLE}
          className="font-bold mb-2 flex flex-row items-center"
        >
          <Link to="/app/reports/view-pending-task">
            <FiArrowLeft className="mr-3" />
          </Link>{" "}
          Pending Response
        </Typography>
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          Reports &gt; Community Task &gt; Responses &gt;{" "}
          <span className="text-[#007A61]">Review</span>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg p-6 border border-[#717D96]">
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-lg font-semibold text-gray-800"
        >
          COMMUNITY TASK (#897864)
        </Typography>

        <div className="flex justify-between items-center mt-4">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 text-green-700 font-bold text-2xl flex items-center justify-center rounded-full">
              {/* {"Ekene Dulle"}.charAt(0).toUpperCase() */}
              E.A
            </div>
            <div className="flex flex-col">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-lg font-semibold"
              >
                Ekene Dulle
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-green-700 text-sm flex items-center gap-1"
              >
                Active <Icon type="editIconGreen" className="pr-2" />
              </Typography>
            </div>
          </div>

          <div className="h-16 w-0.5 bg-[#717D96]"></div>

          {/* Category */}
          <div className="flex flex-col items-left">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-500 text-sm mb-1 font-semibold"
            >
              CATEGORY
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium"
            >
              NCD Prevention
            </Typography>
          </div>

          <div className="h-16 w-0.5 bg-[#717D96]"></div>

          {/* Indicator */}
          <div className="flex flex-col items-left justify-center">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-500 text-sm mb-1 font-semibold"
            >
              INDICATOR
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="bg-[#ffc5d1] text-[#7A0019] px-4 py-1 rounded-full text-sm font-medium"
            >
              Mental Health Promotion
            </Typography>
          </div>
        </div>
      </div>

      {/* The bottom Part */}
      <div className="mt-4 ml-32 mr-32 m-auto relative  bg-white shadow-md rounded-lg p-6 border border-gray-200">
        {/* Task Header */}
        <div className="flex justify-between items-center mb-4">
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-[#7A0019] font-semibold text-lg"
          >
            Task{" "}
            <span className="text-[#7A0019] border-2 border-[#7A0019] py-1 px-2 rounded-full font-normal text-sm">
              1
            </span>
          </Typography>
          <span className="text-sm text-[#ED7D31] font-medium flex flex-row justify-center items-center">
            <Icon type="star" className="pr-2" /> 5 star points
          </span>
        </div>

        {/* Question */}
        <Typography
          variant={TypographyVariant.NORMAL}
          className="font-semibold text-gray-800 text-lg"
        >
          What do you understand by mental health?
        </Typography>
        <p className="text-sm text-gray-500 mt-1 flex flex-row items-center">
          <FiAlertCircle className="mr-1 text-[#007A61]" /> Allowed a maximum of
          250 characters
        </p>

        {/* Divider */}
        <div className="flex flex-row items-center justify-center mb-7 mt-7">
          <div className="border-b basis-1/3"></div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-[#007A61] font-medium text-center basis-1/3"
          >
            Response
          </Typography>
          <div className="border-b basis-1/3"></div>
        </div>

        {/* Response Section */}

        <div className="mt-2 h-fit overflow-y-auto p-3 border border-gray-300 rounded-lg">
          <p className="text-gray-700 text-md">
            Mental health refers to a person's emotional, psychological, and
            social well-being. It affects how individuals think, feel, and
            behave, influencing how they handle stress, relate to others, and
            make decisions. Mental health is vital at every stage of life, from
            childhood through adulthood, as it impacts overall quality of life.
            Good mental health means being able to cope with daily challenges,
            work productively, and contribute to one's community. It doesn’t
            mean the absence of problems but rather the ability to manage them
            in a healthy way. Mental health issues, such as anxiety, depression,
            or stress disorders, can arise from various factors, including
            genetics, trauma, life experiences, or imbalances in brain
            chemistry. When left unaddressed, these issues can severely impact
            one’s functioning, relationships, and even physical health.
            Maintaining mental health involves self-care practices like regular
            exercise, healthy eating, adequate sleep, mindfulness, and seeking
            social support. Professional help, such as therapy or counseling,
            may also be necessary for managing mental health conditions
            effectively. In summary, mental health is a crucial aspect of
            overall well-being, influencing all areas of life.
          </p>
        </div>
        {/* Floating Button */}
        <div className="mt-7">
          <Button
            text="Rate response "
            active={true}
            bg_color="#007A61"
            text_color="white"
            loading={false}
            onClick={() => setIsRateResponseModalOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default PendingResponse;
