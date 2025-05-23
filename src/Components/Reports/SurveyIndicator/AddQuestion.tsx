import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import { TiDeleteOutline } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import Icon from '../../../Assets/svgImages/Svg_icons_and_images'
import { QuestionPayload } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyService'
import {
  resetCategoriesState,
  resetCreateQuestionsState,
} from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import {
  triggerCreateQuestions,
  triggerGetACategory,
  triggerGetCategories,
} from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../../state'
import Button from '../../Button'
import showCustomToast from '../../CustomToast'
import GoBack from '../../GoBack'
import { TypographyVariant } from '../../types'
import Typography from '../../Typography'
import { Category, Indicator, useQuestionBuilder } from './helper'

const AddQuestion: React.FC = () => {
  const {
    questions,
    addNewQuestion,
    handleQuestionChange,
    addOption,
    removeOption,
    removeQuestion,
    handleOptionChange,
  } = useQuestionBuilder()
  const dispatch: AppDispatch = useDispatch()
  const { surveyCategories, category, createQuestions } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('')

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = allCategories.find(
      category => category.name === e.target.value
    )
    setSelectedCategoryId(selectedCategory ? selectedCategory.identifier : '')
    setSelectedCategoryName(e.target.value)
  }

  const handleIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndicator = indicators.find(
      indicator => indicator.name === e.target.value
    )
    setSelectedIndicatorId(
      selectedIndicator ? selectedIndicator.identifier : ''
    )
  }
  //GET surveyCategories
  useEffect(() => {
    dispatch(triggerGetCategories({}))
  }, [dispatch])

  useEffect(() => {
    if (surveyCategories.statusCode === 200 || surveyCategories.data) {
      if (Array.isArray(surveyCategories.data)) {
        setAllCategories(surveyCategories.data)
      } else {
        console.error(
          'surveyCategories.data is not an array:',
          surveyCategories.data
        )
      }
    }
    if (surveyCategories.error && surveyCategories.message !== '') {
      console.log('Error fetching ALL INSTITUTIONS')
    }
    dispatch(resetCategoriesState())
  }, [
    dispatch,
    surveyCategories.data,
    surveyCategories.error,
    surveyCategories.message,
    surveyCategories.statusCode,
  ])

  //Get a category
  useEffect(() => {
    if (selectedCategoryId && selectedCategoryId !== '') {
      dispatch(triggerGetACategory(selectedCategoryId))
    }
  }, [dispatch, selectedCategoryId])

  useEffect(() => {
    if (category.statusCode === 200 || category.data) {
      setIndicators(category.data.indicators)
    }
    if (category.error && category.message) {
    }
  }, [category.statusCode, category.message, category.data, category.error])

  const handleCreateQuestions = () => {
    if (!selectedCategoryId || !selectedIndicatorId) {
      toast.error('fields not filled')
      return
    }
    const firstQuestion = questions[0]
    if (!firstQuestion?.title || !firstQuestion?.options?.length) {
      toast.error('Question title or options missing')
      return
    }

    const formattedOptions = firstQuestion.options.map(opt => ({
      text: opt.value,
      weight: parseFloat(opt.weight) || 0,
      requires_comment: opt.requires_comment,
      requires_image: opt.requires_image,
    }))

    const payload: QuestionPayload = [
      {
        title: firstQuestion.title,
        options: formattedOptions,
      },
    ]
    dispatch(
      triggerCreateQuestions({
        indicator_id: selectedIndicatorId,
        data: payload,
      })
    )
  }

  useEffect(() => {
    if (createQuestions.statusCode === 201 && createQuestions.data) {
      showCustomToast('Success', `${createQuestions.message}`)
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
    if (createQuestions.error && createQuestions.message !== '') {
      toast.error(createQuestions.message)
    }
    dispatch(resetCreateQuestionsState())
  }, [
    createQuestions.data,
    createQuestions.error,
    createQuestions.message,
    createQuestions.statusCode,
    dispatch,
  ])
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ToastContainer />
      <GoBack label="Add Questions" />
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        Reports &gt; Institutional survey &gt;{' '}
        <span className="text-[#007A61]">Add questions</span>
      </div>

      {/* Category & Indicator Dropdowns */}
      <div className="grid grid-cols-2  gap-4 mb-6">
        <div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-light text-md mb-1"
          >
            Select category
          </Typography>

          <select
            className="border rounded w-full p-2 mt-1"
            onChange={handleCategoryChange}
          >
            <option value="">Select category</option>
            {allCategories?.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="font-light text-md mb-1"
          >
            Indicator name
          </Typography>
          <select
            className="border rounded w-full p-2 mt-1"
            onChange={handleIndicatorChange}
          >
            <option value="">Select Indicator name</option>
            {indicators &&
              indicators.map((indicator, index) => (
                <option key={index} value={indicator.name} className="px-2">
                  {indicator.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Question List */}
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
              onChange={e => handleQuestionChange(question.id, e.target.value)}
              placeholder="Enter question here"
              className="border p-[11px] basis-2/3 rounded-md mr-3"
            />
          </div>

          {/* Multiple Choice Options */}
          {question.type === 'Multiple choice' && (
            <div className="mt-2">
              <h3 className="font-medium">Options</h3>
              {question.options?.map((option, i) => (
                <div key={i} className="flex flex-col items-center mt-2 mb-5">
                  <div className="flex w-full">
                    {/* Option Value Input */}
                    <input
                      type="text"
                      value={option.value}
                      onChange={e =>
                        handleOptionChange(
                          question.id,
                          i,
                          e.target.value,
                          'value'
                        )
                      }
                      className="border p-2 rounded-md w-full mr-2"
                    />

                    {/* Weight Input */}
                    <input
                      type="text"
                      value={option.weight}
                      placeholder="3.00"
                      onChange={e =>
                        handleOptionChange(
                          question.id,
                          i,
                          e.target.value,
                          'weight'
                        )
                      }
                      className="border p-2 rounded-md max-w-[5rem] mr-2"
                    />

                    {/* Remove Option Button */}
                    <button
                      onClick={() => removeOption(question.id, i)}
                      className="text-red-500"
                    >
                      <TiDeleteOutline className="text-red" />
                    </button>
                  </div>

                  {/* Comment and Image Upload Options */}
                  <div>
                    <label className="flex flex-row justify-center items-center pt-2 gap-1">
                      Additional comments?{' '}
                      <span className="font-light italic text-sm text-gray-500">
                        (Based on Response)
                      </span>
                    </label>
                    <div className="flex gap-2 mt-2 flex-row justify-center">
                      <label className="flex items-center mr-8 text-[#5E5959] font-normal">
                        <input
                          type="checkbox"
                          className="mr-2 accent-[#007A61]"
                          checked={option.requires_comment}
                          onChange={e =>
                            handleOptionChange(
                              question.id,
                              i,
                              e.target.checked,
                              'requires_comment'
                            )
                          }
                        />
                        Comment
                      </label>

                      <label className="flex items-center mr-8 text-[#5E5959] font-normal">
                        <input
                          type="checkbox"
                          className="mr-2 accent-[#007A61]"
                          checked={option.requires_image}
                          onChange={e =>
                            handleOptionChange(
                              question.id,
                              i,
                              e.target.checked,
                              'requires_image'
                            )
                          }
                        />
                        Image upload
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-row items-center justify-between mt-8 mb-3">
                <button
                  onClick={() => addOption(question.id)}
                  className="mt-2 bg-white text-[#007A61] px-3 py-1 rounded border-[1.5px] border-[#007A61] flex flex-row mr-4 items-center justify-center"
                >
                  <IoIosAddCircle className="mr-1" /> Add Option
                </button>
                <div className="flex flex-row items-center justify-end">
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

        <div className="w-[8rem]">
          <Button
            text="Submit"
            active={true}
            bg_color="#007A61"
            text_color="white"
            loading={createQuestions.loading}
            onClick={handleCreateQuestions}
          />
        </div>
      </div>
    </div>
  )
}

export default AddQuestion
