import { useState } from "react";

export interface Option {
    value: string;
    weight: string;
    requires_comment: boolean;
    requires_image: boolean;
  }
  
  export interface Question {
    id: number;
    title: string;
    type: "Multiple choice" | "Yes/No";
    options: Option[];
  }
  
  export interface Indicator {
    identifier: string;
    name: string;
    description: string;
    total_sp: number;
    question_count: number;
  }
  
  export interface Category {
    identifier: string;
    name: string;
    category_type: string;
    description: string;
    created_at: string;
    indicator_count: number;
  }

  // questionUtils.ts

  export const useQuestionBuilder = () => {
    const [questions, setQuestions] = useState<Question[]>([
      {
        id: 1,
        title: "",
        type: "Multiple choice",
        options: [
          {
            value: "",
            weight: "",
            requires_comment: false,
            requires_image: false,
          },
        ],
      },
    ]);
  
    const addNewQuestion = () => {
      setQuestions((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: "",
          type: "Multiple choice",
          options: [
            {
              value: "",
              weight: "",
              requires_comment: false,
              requires_image: false,
            },
          ],
        },
      ]);
    };
  
    const handleQuestionChange = (id: number, value: string) => {
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, title: value } : q))
      );
    };
  
    const addOption = (questionId: number) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                options: [
                  ...(q.options || []),
                  {
                    value: `Option ${q.options?.length + 1 || 1}`,
                    weight: "",
                    requires_comment: false,
                    requires_image: false,
                  },
                ],
              }
            : q
        )
      );
    };
  
    const removeOption = (questionId: number, index: number) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? { ...q, options: q.options?.filter((_, i) => i !== index) }
            : q
        )
      );
    };
  
    const removeQuestion = (id: number) => {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    };
  
    const handleOptionChange = (
      questionId: number,
      index: number,
      value: string | boolean,
      field: "value" | "weight" | "requires_comment" | "requires_image"
    ) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                options: q.options?.map((opt, i) =>
                  i === index ? { ...opt, [field]: value } : opt
                ),
              }
            : q
        )
      );
    };
  
    return {
      questions,
      setQuestions,
      addNewQuestion,
      handleQuestionChange,
      addOption,
      removeOption,
      removeQuestion,
      handleOptionChange,
    };
  };
  