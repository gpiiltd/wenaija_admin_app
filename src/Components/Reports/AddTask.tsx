import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { IoIosAddCircle } from 'react-icons/io'
import { TiDeleteOutline } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { CommunityTaskPayload } from '../../features/reports/communityTaskManagement/communityTaskService'
import {
  resetCommunityTaskState,
  resetCreateCommunityTaskState,
} from '../../features/reports/communityTaskManagement/communityTaskSlice'
import {
  triggerCreateCommunityTask,
  triggerGetCommunityTasksCategories,
} from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { triggerGetACategory } from '../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../state'
import Button from '../Button'
import showCustomToast from '../CustomToast'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import { Category, Indicator } from './SurveyIndicator/helper'

interface Question {
  id: number
  title: string
  type: string
  options?: string[]
  description?: string
  maxPoints?: number | null
}

const AddTask: React.FC = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: '',
      type: 'Multiple choice',
      options: ['Option 1'],
      description: '',
      maxPoints: null,
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('')
  const dispatch: AppDispatch = useDispatch()
  const { communityTaskCategories, createCommunityTask } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )
  const { category } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )
  const addNewQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        id: prev.length + 1,
        title: '',
        type: 'Multiple choice',
        options: ['Option 1'],
      },
    ])
  }

  const handleQuestionChange = (id: number, value: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, title: value } : q))
    )
  }

  const handleTypeChange = (id: number, value: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === id
          ? {
              ...q,
              type: value,
              options: value === 'Yes/No' ? ['Yes', 'No'] : ['Option 1'],
            }
          : q
      )
    )
  }

  const handleOptionChange = (
    questionId: number,
    index: number,
    value: string
  ) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              options: q.options?.map((opt, i) => (i === index ? value : opt)),
            }
          : q
      )
    )
  }

  const addOption = (questionId: number) => {
    setQuestions(prev =>
      prev.map(q =>
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
    )
  }

  const removeOption = (questionId: number, index: number) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? { ...q, options: q.options?.filter((_, i) => i !== index) }
          : q
      )
    )
  }

  const removeQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

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

  //Get A category
  useEffect(() => {
    if (selectedCategoryId && selectedCategoryId !== '') {
      dispatch(triggerGetACategory(selectedCategoryId))
    }
  }, [dispatch, selectedCategoryId])

  useEffect(() => {
    if (category.statusCode === 200 || category.data) {
      setIndicators(category?.data.indicators)
    }
    if (category.error && category.message) {
    }
  }, [category.statusCode, category.message, category.data, category.error])
  useEffect(() => {
    dispatch(triggerGetCommunityTasksCategories({}))
  }, [dispatch])

  useEffect(() => {
    if (
      communityTaskCategories.statusCode === 200 ||
      communityTaskCategories.data
    ) {
      if (Array.isArray(communityTaskCategories.data)) {
        setAllCategories(communityTaskCategories.data)
        console.log('indicator id', communityTaskCategories.data)
      } else {
        console.error(
          'communityTaskCategories.data is not an array:',
          communityTaskCategories.data
        )
      }
    }
    if (
      communityTaskCategories.error &&
      communityTaskCategories.message !== ''
    ) {
      console.log('Error fetching ALL CATEGORIES')
    }
    dispatch(resetCommunityTaskState())
  }, [
    dispatch,
    communityTaskCategories.data,
    communityTaskCategories.error,
    communityTaskCategories.message,
    communityTaskCategories.statusCode,
  ])
  const handleCreateTask = () => {
    if (!selectedCategoryId && !selectedIndicatorId) {
      toast.error('Fields not filled')
      return
    }

    const firstQuestion = questions[0]

    if (!firstQuestion?.title || !firstQuestion?.options?.length) {
      toast.error('Question title or options missing')
      return
    }
    let optionsPayload: string | string[] = ''
    if (['Multiple choice', 'Yes/No'].includes(firstQuestion.type)) {
      optionsPayload =
        firstQuestion.type === 'Multiple choice'
          ? firstQuestion.options
          : ['Yes', 'No']
    } else if (firstQuestion.type === 'File upload') {
      optionsPayload = ['Audio', 'Video', 'Image', 'Document']
    } else if (firstQuestion.type === 'Paragraph') {
      optionsPayload = inputValue || ''
    }
    const payload: CommunityTaskPayload = [
      {
        question: firstQuestion.title,
        indicator_identifier: selectedIndicatorId,
        question_type: firstQuestion.type
          .toLowerCase()
          .replace('yes/no', 'multiple_choice')
          .replace(' ', '_'),
        max_points: firstQuestion.maxPoints ?? 0,
        options: optionsPayload,
      },
    ]

    console.log('Payload:', payload)
    dispatch(triggerCreateCommunityTask(payload))
  }

  useEffect(() => {
    if (createCommunityTask.statusCode === 201 && createCommunityTask.data) {
      showCustomToast('Success', `${createCommunityTask.message}`)
      setTimeout(() => {
        navigate('/app/reports/community-task')
      }, 3000)
      dispatch(resetCreateCommunityTaskState())
    }
    if (createCommunityTask.error && createCommunityTask.message !== '') {
      toast.error(createCommunityTask.message)
    }
  }, [
    createCommunityTask.data,
    createCommunityTask.error,
    createCommunityTask.message,
    createCommunityTask.statusCode,
    dispatch,
  ])
  const handleMaxPointsChange = (id: number, maxPoints: number | null) => {
    setQuestions(
      questions.map(question =>
        question.id === id ? { ...question, maxPoints } : question
      )
    )
  }
  return (
    <>
      <ToastContainer />
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex flex-row items-center mb-2">
          <Link to="/app/reports/community-task">
            <FiArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold ml-4">Add task</h1>
        </div>
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-4">
          Reports &gt; Community task &gt;{' '}
          <span className="text-[#007A61]">Add Task</span>
        </div>

        {/* Category & Indicator Dropdowns */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="font-light text-md mb-1 "
            >
              Select category
            </Typography>
            <select
              className="border p-3 rounded-md w-full"
              onChange={handleCategoryChange}
            >
              <option value="">Select Category name</option>
              {allCategories?.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}{' '}
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
              onChange={handleIndicatorChange}
              className="border p-3 rounded-md w-full"
            >
              <option>Select indicator</option>
              {indicators &&
                indicators.map((indicator, index) => (
                  <option key={index} value={indicator.name} className="px-2">
                    {indicator.name}
                  </option>
                ))}{' '}
            </select>
          </div>
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
                onChange={e =>
                  handleQuestionChange(question.id, e.target.value)
                }
                placeholder="Enter question here"
                className="border p-[11px] basis-2/3 rounded-md mr-3"
              />

              {/* Question Type Dropdown */}
              <select
                value={question.type}
                onChange={e => handleTypeChange(question.id, e.target.value)}
                className="border p-3 basis-1/3 rounded-md"
              >
                <option value="Multiple choice">Multiple choice</option>
                <option value="Yes/No">Yes/No</option>
                <option value="Paragraph">Paragraph</option>
                <option value="File upload">File upload</option>
              </select>
            </div>

            {/* Extra UI (If needed) */}
            {question.type === 'File upload' && (
              <div className="mt-2">
                <label className="block font-medium mb-2">
                  Select file type
                </label>
                <div className="flex gap-2">
                  <label className="flex items-center mr-8">
                    <input type="checkbox" className="mr-2 accent-[#007A61]" />{' '}
                    Audio
                  </label>
                  <label className="flex items-center mr-8">
                    <input type="checkbox" className="mr-2 accent-[#007A61]" />{' '}
                    Video
                  </label>
                  <label className="flex items-center mr-8">
                    <input type="checkbox" className="mr-2 accent-[#007A61]" />{' '}
                    Image
                  </label>
                  <label className="flex items-center mr-8">
                    <input type="checkbox" className="mr-2 accent-[#007A61]" />{' '}
                    Document
                  </label>
                </div>
              </div>
            )}

            {question.type === 'Paragraph' && (
              <div className="mt-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Long answer text"
                  className=" w-full font-light text-sm border-b-2 p-[11px] rounded-md mr-3"
                />
              </div>
            )}

            {/* Multiple Choice Options */}
            {question.type === 'Multiple choice' && (
              <div className="mt-2">
                <h3 className="font-medium">Options</h3>
                {question.options?.map((option, i) => (
                  <div key={i} className="flex items-center mt-2">
                    <input
                      type="text"
                      value={option}
                      onChange={e =>
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
                <button
                  onClick={() => addOption(question.id)}
                  className="mt-2 bg-white text-[#007A61] px
          py-1 px-1 mt-2 rounded border-[1.5px] border-[#007A61] flex flex-row mr-4 items-center justify-center"
                >
                  <IoIosAddCircle className="mr-1" /> Add Option
                </button>
              </div>
            )}

            {/* Yes/No Options (Fixed) */}
            {question.type === 'Yes/No' && (
              <div className="mt-2">
                <h3 className="font-medium">Options</h3>
                <p className="border p-2 rounded-md bg-gray-100">Yes</p>
                <p className="border p-2 rounded-md bg-gray-100 mt-2">No</p>
              </div>
            )}

            {/* Max Point */}
            <div className="flex flex-row items-center justify-end mt-6">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="mr-2 text-[#5E5959] font-light"
              >
                {' '}
                Select Max point
              </Typography>
              <div className="flex items-center mr-7">
                <select
                  className="border p-3 rounded-md"
                  value={question.maxPoints ?? ''}
                  onChange={e =>
                    handleMaxPointsChange(
                      question.id,
                      parseInt(e.target.value) || null
                    )
                  }
                >
                  <option value="">Select</option>
                  <option value="5">5.00</option>
                  <option value="4">4.00</option>
                  <option value="3">3.00</option>
                  <option value="2">2.00</option>
                  <option value="1">1.00</option>
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
              loading={createCommunityTask.loading}
              onClick={handleCreateTask}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTask
