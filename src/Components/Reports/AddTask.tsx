import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router";
import Button from "../Button";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

interface Question {
  id: number;
  title: string;
  type: string;
  options?: string[]; // Optional for multiple choice
}

const AddTask: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, title: "", type: "Multiple choice", options: [""] },
  ]);

  const addNewQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "",
        type: "Multiple choice",
        options: [""],
      },
    ]);
  };

  const handleQuestionChange = (id: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title: value } : q))
    );
  };

  const handleTypeChange = (id: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, type: value } : q))
    );
  };

  const removeQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
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
        <select className="border p-3 rounded-md">
          <option>Select indicator</option>
        </select>
      </div>

      {/* Task List */}
      {questions.map((question, index) => (
        <div
          key={question.id}
          className="border p-4 mb-4 rounded-lg shadow-md bg-white"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Task {index + 1}</h2>
            <button
              onClick={() => removeQuestion(question.id)}
              className="text-red-500"
            >
              <Icon type="deleteIcon" className="w-6 h-6" />
            </button>
          </div>

          {/* Question Title */}
          <input
            type="text"
            value={question.title}
            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
            placeholder="Enter question here"
            className="border p-3 w-full rounded-md mb-3"
          />

          {/* Question Type Dropdown */}
          <select
            value={question.type}
            onChange={(e) => handleTypeChange(question.id, e.target.value)}
            className="border p-3 w-full rounded-md mb-3"
          >
            <option value="Multiple choice">Multiple choice</option>
            <option value="Paragraph">Paragraph</option>
            <option value="File upload">File upload</option>
          </select>

          {/* Extra UI (If needed) */}
          {question.type === "File upload" && (
            <div className="mt-2">
              <label className="block font-medium mb-2">Select file type</label>
              <div className="flex gap-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Audio
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Video
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Image
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Document
                </label>
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
          />
        </div>
      </div>
    </div>
  );
};

export default AddTask;
