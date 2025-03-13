import { useState, useEffect } from "react";
import Icon from "../../../Assets/svgImages/Svg_icons_and_images";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import Typography from "../../Typography";
import { TypographyVariant } from "../../types";
import ReportDialog from "./../ReportDialogs";
import { Link, useNavigate } from "react-router";
import React from "react";
import QuestionEditor from "./SurveryComponent/QuestionEditor";
import Button from "../../Button";

type QuestionType = "multiple_choice" | "yes_no" | "file_upload";

// Define option type
interface Option {
  label: string;
  additionalComments?: string[];
}

// Define Question type
interface Question {
  id: number;
  title: string;
  questionType: QuestionType;
  options: Option[];
  required: boolean;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    title: "Was the outside of the facility clean?",
    questionType: "multiple_choice", // ✅ Correct: Explicitly one of the allowed values
    options: [
      { label: "Very clean" },
      { label: "Clean" },
      { label: "Neutral" },
      { label: "Somewhat unclean", additionalComments: ["comment"] },
      { label: "Very unclean", additionalComments: ["comment", "image"] },
    ],
    required: true,
  },
  {
    id: 2,
    title: "Do you find this app useful?",
    questionType: "yes_no", // ✅ Correct
    options: [{ label: "Yes" }, { label: "No" }],
    required: true,
  },
];

const SurveyQuestionSingleView: React.FC = () => {
  const [questions, setQuestions] = useState(initialQuestions);

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  // Function to save all questions
  const handleSaveQuestions = () => {
    console.log("Saving updated questions:", questions);

    // Example API request (uncomment when ready to use)
    // fetch("/api/save-questions", {
    //   method: "POST",
    //   body: JSON.stringify(questions),
    //   headers: { "Content-Type": "application/json" }
    // }).then(response => console.log("Saved successfully!", response));
  };

  return (
    <div className="w-full mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col">
        <div className="mb-10">
          <Typography
            variant={TypographyVariant.TITLE}
            className="font-bold mb-2 flex flex-row items-center"
          >
            <Link to="/app/reports/institutional-survey">
              <FiArrowLeft className="mr-3" />
            </Link>
            Survey questions
          </Typography>
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Institutional survey &gt; Questions &gt;{" "}
            <span className="text-[#007A61]">View</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="bg-white p-6 border rounded-lg mb-8 flex flex-row justify-between">
          <div className="basis-2/4">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-xl font-bold"
            >
              Acceptability of service
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-600 font-light"
            >
              An acceptability of service survey for a health institute measures
              patient satisfaction, comfort, and trust in the services provided
            </Typography>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {questions.map((question) => (
          <QuestionEditor
            key={question.id}
            question={question}
            onUpdate={handleUpdateQuestion}
          />
        ))}
      </div>
      <div className="w-[14rem] mx-auto">
        <Button
          text="Save"
          active={true}
          bg_color="#007A61"
          text_color="white"
          loading={false}
          onClick={() => handleSaveQuestions()}
        />
      </div>
    </div>
  );
};

export default SurveyQuestionSingleView;
// Removed conflicting local declaration of useEffect
