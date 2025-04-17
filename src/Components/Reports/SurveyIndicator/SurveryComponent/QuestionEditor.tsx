import React, { useState } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import { TiDeleteOutline } from 'react-icons/ti'
import Icon from '../../../../Assets/svgImages/Svg_icons_and_images'

type QuestionType = 'multiple_choice' | 'yes_no' | 'file_upload'

interface Option {
  label: string
  additionalComments?: string[]
}

interface Question {
  id: number
  title: string
  questionType: QuestionType
  options: Option[]
  required: boolean
}

const QuestionEditor: React.FC<{
  question: Question
  onUpdate: (q: Question) => void
}> = ({ question, onUpdate }) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>(question)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedQuestion({ ...editedQuestion, title: e.target.value })
  }

  const handleToggleRequired = () => {
    setEditedQuestion({
      ...editedQuestion,
      required: !editedQuestion.required,
    })
  }

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...editedQuestion.options]
    updatedOptions[index].label = value
    setEditedQuestion({ ...editedQuestion, options: updatedOptions })
  }

  const handleAddOption = () => {
    if (editedQuestion.questionType !== 'multiple_choice') return
    const updatedOptions = [...editedQuestion.options, { label: 'New Option' }]
    setEditedQuestion({ ...editedQuestion, options: updatedOptions })
  }

  const handleDeleteOption = (index: number) => {
    if (editedQuestion.questionType !== 'multiple_choice') return
    const updatedOptions = editedQuestion.options.filter((_, i) => i !== index)
    setEditedQuestion({ ...editedQuestion, options: updatedOptions })
  }

  return (
    <div className="border px-8 py-8 mb-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg">Question {question.id}</h3>
      <div className="flex flex-row  gap-4 mt-4">
        <div className="flex flex-col items-start basis-3/4">
          <label
            htmlFor="category"
            className="block text-sm font-light text-gray-700 mb-1"
          >
            Question Title
          </label>
          <input
            type="text"
            value={editedQuestion.title}
            onChange={handleTitleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex flex-col items-start basis-1/4 ">
          <label
            htmlFor="category"
            className="block text-sm font-light text-gray-700 mb-1"
          >
            Question Type
          </label>
          <select
            value={editedQuestion.questionType}
            className="border py-[10px] px-5 mr-2 rounded"
            disabled // Cannot change question type after creation
          >
            <option value="multiple_choice">Multiple Choice</option>
            <option value="yes_no">Yes/No</option>
            <option value="file_upload">File Upload</option>
          </select>
        </div>
      </div>

      {/* Render different UI based on question type */}
      {editedQuestion.questionType === 'multiple_choice' && (
        <div className="mt-8">
          <div className="mx-auto flex flex-row justify-between items-center">
            <h4 className="font-semibold">Options</h4>
            <button
              onClick={handleAddOption}
              className="mt-2 bg-white text-[#007A61] px-3 py-1 rounded border-[1.5px] border-[#007A61] flex flex-row mr-4 items-center justify-center"
            >
              <IoIosAddCircle className="mr-1" /> Add Option
            </button>
          </div>
          {editedQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <div className="h-6 w-6 rounded-full border-[2px]" />
              <input
                type="text"
                value={option.label}
                onChange={e => handleOptionChange(index, e.target.value)}
                className="border-b-[1.5px] p-2 rounded w-full"
              />

              <button
                onClick={() => handleDeleteOption(index)}
                className="text-red-500"
              >
                <TiDeleteOutline className="text-red" />
              </button>
            </div>
          ))}
        </div>
      )}

      {editedQuestion.questionType === 'yes_no' && (
        <div className="mt-4">
          <h4 className="font-semibold">Options</h4>
          <div className="flex items-center gap-2">
            <input type="radio" id="yes" name={`question-${question.id}`} />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" id="no" name={`question-${question.id}`} />
            <label htmlFor="no">No</label>
          </div>
        </div>
      )}

      {editedQuestion.questionType === 'file_upload' && (
        <div className="mt-4">
          <h4 className="font-semibold">File Upload</h4>
          <input type="file" className="border p-2 rounded w-full" />
          <textarea
            placeholder="Add comments..."
            className="border p-2 rounded w-full mt-2"
          ></textarea>
        </div>
      )}

      {/* Toggle required */}
      <div className="flex flex-row items-center justify-end mt-8">
        <div className=" flex items-center mr-7">
          <span className="mr-2">Required</span>
          <input
            type="checkbox"
            checked={editedQuestion.required}
            onChange={handleToggleRequired}
          />
        </div>
        <button
          //   onClick={() => handleDeleteOption(index)}
          className="text-red-500 border-l-2 pl-7 flex flex-row"
        >
          <Icon type="deleteIcon" className="w-5 h-5 mr-1" />
          Archive
        </button>
      </div>

      {/* Save Button */}
    </div>
  )
}

export default QuestionEditor
