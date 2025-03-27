import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import Button from "../Button";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { TiDeleteOutline } from "react-icons/ti";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import { IoIosAddCircle } from "react-icons/io";

interface Question {
  id: number;
  title: string;
  type: string;
  options?: string[]; // Only for multiple choice
}

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, title: "", type: "Multiple choice", options: ["Option 1"] },
  ]);

  const [taskName, setTaskName] = useState("");

  // Add New Question
  const addNewQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "",
        type: "Multiple choice",
        options: ["Option 1"], // Default option for multiple choice
      },
    ]);
  };

  // Handle Question Title Change
  const handleQuestionChange = (id: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title: value } : q))
    );
  };

  // Handle Question Type Change
  const handleTypeChange = (id: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              type: value,
              options: value === "Yes/No" ? ["Yes", "No"] : ["Option 1"],
            }
          : q
      )
    );
  };

  // Handle Editing Options (For Multiple Choice)
  const handleOptionChange = (
    questionId: number,
    index: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options?.map((opt, i) => (i === index ? value : opt)),
            }
          : q
      )
    );
  };

  // Add New Option (For Multiple Choice)
  const addOption = (questionId: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...(q.options || []),
                `Option ${q.options!.length + 1}`,
              ],
            }
          : q
      )
    );
  };

  // Remove Option (For Multiple Choice)
  const removeOption = (questionId: number, index: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options?.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  // Remove a Question
  const removeQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSubmit = () => {
    if (!taskName.trim()) return;

    // Navigate back and pass category name as state
    navigate("/app/reports/community-task", { state: { taskName } });
  };

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex flex-row items-center mb-2">
          <Link to="/app/reports/community-task">
            <FiArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold ml-4">Add task</h1>
        </div>
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          Reports &gt; Community task &gt;{" "}
          <span className="text-[#007A61]">Add Task</span>
        </div>

        {/* Category & Indicator Dropdowns */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select className="border p-3 rounded-md">
            <option>Select category</option>
          </select>
          <select
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
            className="border p-3 rounded-md"
          >
            <option>Select indicator</option>
            <option value="Risk Factors">Risk Factors</option>
          </select>
        </div>

        {/* Task List */}
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="border p-4 mb-4 rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-between items-center mb-3">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-semibold text-lg"
              >
                Question {index + 1}
              </Typography>
            </div>

            {/* Question Title */}
            <div className="w-full flex flex-row items-center mb-3">
              <input
                type="text"
                value={question.title}
                onChange={(e) =>
                  handleQuestionChange(question.id, e.target.value)
                }
                placeholder="Enter question here"
                className="border p-[11px] basis-2/3 rounded-md mr-3"
              />

              {/* Question Type Dropdown */}
              <select
                value={question.type}
                onChange={(e) => handleTypeChange(question.id, e.target.value)}
                className="border p-3 basis-1/3 rounded-md"
              >
                <option value="Multiple choice">Multiple choice</option>
                <option value="Yes/No">Yes/No</option>
                <option value="Paragraph">Paragraph</option>
                <option value="File upload">File upload</option>
              </select>
            </div>

            {/* Extra UI (If needed) */}
            {question.type === "File upload" && (
              <div className="mt-2">
                <label className="block font-medium mb-2">
                  Select file type
                </label>
                <div className="flex gap-2">
                  <label className="flex items-center mr-8">
                    <input type="checkbox" className="mr-2 accent-[#007A61]" />{" "}
                    Audio
                  </label>
                  <label className="flex items-center mr-8">
                    <input type="checkbox" className="mr-2 accent-[#007A61]" />{" "}
                    Video
                  </label>
                  <label className="flex items-center mr-8">
                    <input type="checkbox" className="mr-2 accent-[#007A61]" />{" "}
                    Image
                  </label>
                  <label className="flex items-center mr-8">
                    <input type="checkbox" className="mr-2 accent-[#007A61]" />{" "}
                    Document
                  </label>
                </div>

                <div className=" flex flex-row items-center justify-end mt-6">
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="mr-2 text-[#5E5959] font-light"
                  >
                    {" "}
                    Select Max point
                  </Typography>
                  <div className=" flex items-center mr-7">
                    <select className="border p-3 rounded-md">
                      <option>5.00</option>
                      <option>4.00</option>
                      <option>3.00</option>
                      <option>2.00</option>
                      <option>1.00</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-500 border-l-2 pl-7 flex flex-row"
                  >
                    <Icon type="deleteIcon" className="w-5 h-5 mr-1" />
                  </button>
                </div>
              </div>
            )}

            {question.type === "Paragraph" && (
              <div className="mt-2">
                <label className="block font-medium mb-2">
                  Select file type
                </label>
                <input
                  type="text"
                  value=""
                  onChange={(e) => {}}
                  placeholder="Long answer text"
                  className=" w-full font-light text-sm border-b-2 p-[11px] rounded-md mr-3"
                />

                <div className=" flex flex-row items-center justify-end mt-6">
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="mr-2 text-[#5E5959] font-light"
                  >
                    {" "}
                    Select Max point
                  </Typography>
                  <div className=" flex items-center mr-7">
                    <select className="border p-3 rounded-md">
                      <option>5.00</option>
                      <option>4.00</option>
                      <option>3.00</option>
                      <option>2.00</option>
                      <option>1.00</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-500 border-l-2 pl-7 flex flex-row"
                  >
                    <Icon type="deleteIcon" className="w-5 h-5 mr-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Multiple Choice Options */}
            {question.type === "Multiple choice" && (
              <div className="mt-2">
                <h3 className="font-medium">Options</h3>
                {question.options?.map((option, i) => (
                  <div key={i} className="flex items-center mt-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(question.id, i, e.target.value)
                      }
                      className="border p-2 rounded-md w-full mr-2"
                    />
                    <button
                      onClick={() => removeOption(question.id, i)}
                      className="text-red-500"
                    >
                      <TiDeleteOutline className="text-red" />
                    </button>
                  </div>
                ))}

                <div className="flex flex-row items-center justify-between mt-8 mb-3">
                  <button
                    onClick={() => addOption(question.id)}
                    className="mt-2 bg-white text-[#007A61] px-3 py-1 rounded border-[1.5px] border-[#007A61] flex flex-row mr-4 items-center justify-center"
                  >
                    <IoIosAddCircle className="mr-1" /> Add Option
                  </button>
                  <div className=" flex flex-row items-center justify-end">
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="mr-2 text-[#5E5959] font-light"
                    >
                      {" "}
                      Select Max point
                    </Typography>
                    <div className=" flex items-center mr-7">
                      <select className="border p-3 rounded-md">
                        <option>5.00</option>
                        <option>4.00</option>
                        <option>3.00</option>
                        <option>2.00</option>
                        <option>1.00</option>
                      </select>
                    </div>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 border-l-2 pl-7 flex flex-row"
                    >
                      <Icon type="deleteIcon" className="w-5 h-5 mr-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Yes/No Options (Fixed) */}
            {question.type === "Yes/No" && (
              <div className="mt-2">
                <h3 className="font-medium">Options</h3>
                <p className="border p-2 rounded-md bg-gray-100">Yes</p>
                <p className="border p-2 rounded-md bg-gray-100 mt-2">No</p>

                <div className=" flex flex-row items-center justify-end mt-4">
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="mr-2 text-[#5E5959] font-light"
                  >
                    {" "}
                    Select Max point
                  </Typography>
                  <div className=" flex items-center mr-7">
                    <select className="border p-3 rounded-md">
                      <option>5.00</option>
                      <option>4.00</option>
                      <option>3.00</option>
                      <option>2.00</option>
                      <option>1.00</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-500 border-l-2 pl-7 flex flex-row"
                  >
                    <Icon type="deleteIcon" className="w-5 h-5 mr-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-start mt-4 gap-2">
          <div className="w-[14rem] mr-2">
            <Button
              text="Add New Question"
              active={true}
              border_color="#D0D5DD"
              bg_color="#FFFFFF"
              text_color="#344054"
              loading={false}
              onClick={addNewQuestion}
            />
          </div>

          <div className="w-[7rem]">
            <Button
              text="Submit"
              active={true}
              bg_color="#007A61"
              text_color="white"
              loading={false}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
