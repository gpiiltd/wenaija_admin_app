import React, { useState } from "react";
import { individualResponses } from "./InstitutionData";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

const IndividualResponse: React.FC = () => {
  const [responses] = useState(individualResponses);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const [activeTab, setActiveTab] = useState<string>("veryClean");

  return (
    <div className=" mx-auto ">
      <h2 className="text-lg text-gray-600">
        Below are individual responses for each questions
      </h2>

      <div className="flex flex-col items-center justify-center   py-2 mt-4">
        <h2 className="text-lg mb-2">Question 1 of 3</h2>
        <h3 className="text-lg mb-4">Was the outside of the facility clean?</h3>
      </div>

      <div className="flex items-center justify-center mb-4">
        {/* <span className="text-gray-600">831 responses</span> */}
        <div className="flex gap-4 bg-[#F2F4F7] rounded-lg p-2">
          <button
            className={` text-gray-600 py-2 px-3 rounded ${
              activeTab === "veryClean" ? "bg-white  text-black" : ""
            }`}
            onClick={() => setActiveTab("veryClean")}
          >
            Very Clean
          </button>
          <button
            className={` text-gray-600 py-1 px-3 rounded ${
              activeTab === "somewhatClean" ? "bg-white  text-black" : ""
            }`}
            onClick={() => setActiveTab("somewhatClean")}
          >
            Somewhat Clean
          </button>
          <button
            className={` text-gray-600 py-1 px-3 rounded ${
              activeTab === "neutral" ? "bg-white  text-black" : ""
            }`}
            onClick={() => setActiveTab("neutral")}
          >
            Neutral
          </button>
          <button
            className={` text-gray-600 py-1 px-3 rounded ${
              activeTab === "somewhatUnclean" ? "bg-white  text-black" : ""
            }`}
            onClick={() => setActiveTab("somewhatUnclean")}
          >
            Somewhat Unclean
          </button>
          <button
            className={` text-gray-600 py-1 px-3 rounded ${
              activeTab === "veryUnclean" ? "bg-white  text-black" : ""
            }`}
            onClick={() => setActiveTab("veryUnclean")}
          >
            Very Unclean
          </button>
        </div>
      </div>

      {activeTab === "veryClean" &&
        responses
          .filter((response) => response.comment === "Very clean")
          .map((response, index) => (
            <div
              key={index}
              className="relative flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center gap-4">
                <Icon type="user" className="w-6 h-6" />
                <span>{response.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div onClick={() => toggleExpand(index)}>
                  <Icon type="morevertical" className="ml-2 cursor-pointer" />
                </div>
                <span className="text-black font-semibold">{response.comment}</span>
              </div>
              {expandedIndex === index && (
                <div className="absolute right-36 bg-white shadow-md rounded-lg p-4 mt-2 ">
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="imageup" className="w-6 h-6" />
                    View upload image
                  </button>
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="chat" className="w-6 h-6" />
                    View additional comment
                  </button>
                </div>
              )}
            </div>
          ))}

      {activeTab === "somewhatClean" &&
        responses
          .filter((response) => response.comment === "Somewhat clean")
          .map((response, index) => (
            <div
              key={index}
              className="relative flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center gap-4">
                <Icon type="user" className="w-6 h-6" />
                <span>{response.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div onClick={() => toggleExpand(index)}>
                  <Icon type="morevertical" className="ml-2 cursor-pointer" />
                </div>
                <span className="text-black font-semibold">{response.comment}</span>
              </div>
              {expandedIndex === index && (
                <div className="absolute right-44 bg-white shadow-md rounded-lg p-4 mt-2 ">
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="imageup" className="w-6 h-6" />
                    View upload image
                  </button>
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="chat" className="w-6 h-6" />
                    View additional comment
                  </button>
                </div>
              )}
            </div>
          ))}

      {activeTab === "neutral" &&
        responses
          .filter((response) => response.comment === "Neutral")
          .map((response, index) => (
            <div
              key={index}
              className="relative flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center gap-4">
                <Icon type="user" className="w-6 h-6" />
                <span>{response.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div onClick={() => toggleExpand(index)}>
                  <Icon type="morevertical" className="ml-2 cursor-pointer" />
                </div>
                <span className="text-black font-semibold">{response.comment}</span>
              </div>
              {expandedIndex === index && (
                <div className="absolute right-32 bg-white shadow-md rounded-lg p-4 mt-2 ">
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="imageup" className="w-6 h-6" />
                    View upload image
                  </button>
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="chat" className="w-6 h-6" />
                    View additional comment
                  </button>
                </div>
              )}
            </div>
          ))}

      {activeTab === "somewhatUnclean" &&
        responses
          .filter((response) => response.comment === "Somewhat unclean")
          .map((response, index) => (
            <div
              key={index}
              className="relative flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center gap-4">
                <Icon type="user" className="w-6 h-6" />
                <span>{response.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div onClick={() => toggleExpand(index)}>
                  <Icon type="morevertical" className="ml-2 cursor-pointer" />
                </div>
                <span className="text-black font-semibold">{response.comment}</span>
              </div>
              {expandedIndex === index && (
                <div className="absolute right-48 bg-white shadow-md rounded-lg p-4 mt-2 ">
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="imageup" className="w-6 h-6" />
                    View upload image
                  </button>
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="chat" className="w-6 h-6" />
                    View additional comment
                  </button>
                </div>
              )}
            </div>
          ))}

      {activeTab === "veryUnclean" &&
        responses
          .filter((response) => response.comment === "Very unclean")
          .map((response, index) => (
            <div
              key={index}
              className="relative flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center gap-4">
                <Icon type="user" className="w-6 h-6" />
                <span>{response.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div onClick={() => toggleExpand(index)}>
                  <Icon type="morevertical" className="ml-2 cursor-pointer" />
                </div>
                <span className="text-black font-semibold">{response.comment}</span>
              </div>
              {expandedIndex === index && (
                <div className="absolute right-40 bg-white shadow-md rounded-lg p-4 mt-2 ">
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="imageup" className="w-6 h-6" />
                    View upload image
                  </button>
                  <button className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100">
                    <Icon type="chat" className="w-6 h-6" />
                    View additional comment
                  </button>
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default IndividualResponse;
