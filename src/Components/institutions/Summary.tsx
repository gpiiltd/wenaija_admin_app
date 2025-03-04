import React, { useState } from "react";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Summary: React.FC = () => {
  const navigate = useNavigate();
  const responses = {
    totalResponses: 1240,
    question: "Was the outside of the facility clean?",
    summary: {
      veryClean: 67,
      somewhatClean: 13,
      neutral: 6,
      somewhatUnclean: 8,
      veryUnclean: 6,
    },
    additionalComments: {
      somewhatUnclean: 99,
      veryUnclean: 74,
    },
    waitTime: "Less than 10 minutes",
    waitReason: "N/A",
    additionalCommentsPercentage: 24,
  };
  const [isExpanded, setIsExpanded] = useState(false); // State to manage expansion

  return (
    <div className="mx-auto  rounded-lg">
      <div className=" mt-4">
        <h2 className="text-gray-600">
          Below are summarized aggregates responses for each questions
        </h2>
        <div className="bg-white border-b-2 p-4 mb-6">
          <div
            className="flex  items-center cursor-pointer mb-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-md mr-6">
              {isExpanded ? (
                <Icon
                  click={() => setIsExpanded(!isExpanded)}
                  type="minusCircle"
                  className="w-6 h-6"
                />
              ) : (
                <Icon
                  click={() => setIsExpanded(!isExpanded)}
                  type="plusCircle"
                />
              )}
            </span>
            <h4 className="font-semibold">{responses.question}</h4>
          </div>
          {isExpanded && (
            <div className="ml-12 my-4">
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">
                  Very Clean:{" "}
                  <span className="text-[#007A61] bg-[#f1fffc] font-bold">
                    {responses.summary.veryClean}%
                  </span>
                </span>
                <span className="text-gray-600">
                  Somewhat Clean:{" "}
                  <span className="text-[#007A61] bg-[#f1fffc] font-bold">
                    {responses.summary.somewhatClean}%
                  </span>
                </span>
                <span className="text-gray-600">
                  Neutral:{" "}
                  <span className="text-[#007A61] bg-[#f1fffc] font-bold">
                    {responses.summary.neutral}%
                  </span>
                </span>
                <span className="text-gray-600">
                  Somewhat Unclean:{" "}
                  <span className="text-[#007A61] bg-[#f1fffc] font-bold">
                    {responses.summary.somewhatUnclean}%
                  </span>
                </span>
                <span className="text-gray-600">
                  Very Unclean:{" "}
                  <span className="text-[#007A61] bg-[#f1fffc] font-bold">
                    {responses.summary.veryUnclean}%
                  </span>
                </span>
              </div>

              <div className="mt-4 border-2  rounded-lg p-4">
                <h5 className="mt-4 font-semibold">
                  Additional comments and images uploaded based on responses
                </h5>
                <div className="flex flex-col  my-4">
                  <div className="flex space-x-12 items-center">
                    <span className="text-gray-600 w-48">Somewhat Unclean</span>
                    <hr className="my-4  w-44 h-[2px] bg-gray-400   " />
                    <span className="text-[#007A61] underline">
                      <span className="font-bold ">
                        {responses.additionalComments.somewhatUnclean}
                      </span>{" "}
                      responses
                    </span>
                  </div>
                  <div className="flex space-x-12 items-center">
                    <span className="text-gray-600 w-48">Very Unclean</span>
                    <hr className="my-4  w-44 h-[2px] bg-gray-400   " />
                    <span className="text-[#007A61] underline">
                      <span className="font-bold ">
                        {responses.additionalComments.veryUnclean}
                      </span>{" "}
                      responses
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border-b-2 p-4 mb-6">
          <div
            className="flex  items-center cursor-pointer mb-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-md mr-6">
              {isExpanded ? (
                <Icon
                  click={() => setIsExpanded(!isExpanded)}
                  type="minusCircle"
                  className="w-6 h-6"
                />
              ) : (
                <Icon
                  click={() => setIsExpanded(!isExpanded)}
                  type="plusCircle"
                />
              )}
            </span>
            <h4 className="font-semibold">
              {" "}
              How long did you wait before being attended to?
            </h4>
          </div>
          <p className="mt-2">{responses.waitTime}</p>
          {/* <HiOutlineChevronDown className="text-gray-600 cursor-pointer" /> */}
        </div>

        <div className="bg-white border-b-2 p-4 mb-6">
          <div
            className="flex  items-center cursor-pointer mb-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-md mr-6">
              {isExpanded ? (
                <Icon
                  click={() => setIsExpanded(!isExpanded)}
                  type="minusCircle"
                  className="w-6 h-6"
                />
              ) : (
                <Icon
                  click={() => setIsExpanded(!isExpanded)}
                  type="plusCircle"
                />
              )}
            </span>
            <h4 className="font-semibold">
              If you waited more than 20 mins, what was the reason?
            </h4>
          </div>
          <p className="mt-2">{responses.waitReason}</p>
        </div>

        <div className="flex items-center justify-between mt-6 border rounded-lg p-4">
          <p className="text-gray-600">
            <span className="font-bold text-[#007A61]">
              {responses.additionalCommentsPercentage}%
            </span>{" "}
            of respondents gave additional comments based on this indicator
          </p>
          <button
            className="flex items-center  gap-2 bg-[#007A61] text-white py-2 px-4 border rounded-xl"
            onClick={() => navigate("/app/instutitions/view-institute/additional-comment")}
          >
            View responses <FaAngleRight className="text-white" />
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Summary;
