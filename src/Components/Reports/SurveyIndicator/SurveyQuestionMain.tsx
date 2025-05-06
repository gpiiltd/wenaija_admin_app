import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import Icon from '../../../Assets/svgImages/Svg_icons_and_images'
import { resetCategoriesState } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import {
  triggerGetACategory,
  triggerGetCategories,
} from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../../state'
import GoBack from '../../GoBack'
import { TypographyVariant } from '../../types'
import Typography from '../../Typography'
import { Indicator } from './helper'

const SurveyQuestionMainView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>()
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const dispatch: AppDispatch = useDispatch()
  const { surveyCategories, category } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )
  const navigate = useNavigate()

  // const handleNavigateView = () => {
  //   navigate('/app/reports/institutional-survey/questions-single')
  // }

  //GET surveyCategories
  useEffect(() => {
    dispatch(triggerGetCategories({}))
  }, [dispatch])

  useEffect(() => {
    if (surveyCategories.statusCode === 200 || surveyCategories.data) {
      if (Array.isArray(surveyCategories.data)) {
        setActiveTab(surveyCategories.data[0]?.name)
        setSelectedCategoryId(surveyCategories.data[0]?.identifier)
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

  return (
    <div className="w-full mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col">
        <div className="mb-3">
          <GoBack label={'Survey questions'} />
          <div className="text-sm text-gray-500 mb-2">
            Reports &gt; Institutional survey &gt;{' '}
            <span className="text-[#007A61]">Questions</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <section>
            <div className="mb-6">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-lg font-medium mb-2"
              >
                View all Questions
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-gray-600 font-light"
              >
                Below is the list of surveys questions according to their
                categories.
              </Typography>
            </div>
          </section>
        </div>
      </div>

      <div className="flex space-x-6 border-b pb-2 overflow-x-auto scrollbar-hide">
        {Array.isArray(surveyCategories?.data) &&
          surveyCategories.data.map((category: any) => (
            <button
              key={category.identifier}
              className={`text-md whitespace-nowrap font-normal ${
                activeTab === category.name
                  ? 'text-primary_green border-b-2 border-primary_green'
                  : 'text-gray-500'
              }`}
              onClick={() => {
                setActiveTab(category.name)
                setSelectedCategoryId(category?.identifier)
              }}
            >
              {category.name}
            </button>
          ))}
      </div>
      {/* Indicator Cards */}
      <div className="min-h-[200px] flex justify-center items-center">
        {category.loading ? (
          <ClipLoader color="#D0D5DD" />
        ) : category.error ? (
          <div className="text-center text-red-600">
            <h4 className="text-lg font-semibold">Error: {category.message}</h4>
          </div>
        ) : Array.isArray(indicators) && indicators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {indicators?.map((indicator, idx) => (
              <div
                key={indicator.identifier || idx}
                className="border rounded-lg p-6 shadow-md hover:shadow-lg transition duration-200 bg-white"
                onClick={() =>
                  navigate(
                    `/app/reports/institutional-survey/questions-single/${indicator.identifier}`
                  )
                }
              >
                {/* Title */}
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-xl font-bold text-gray-900"
                >
                  {indicator.name}
                </Typography>

                {/* Description */}
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="text-sm text-gray-600 mt-2"
                >
                  {indicator.description}
                </Typography>

                {/* Tasks & Star Points */}
                <div className="flex items-center justify-start mt-4 space-x-6 text-sm text-gray-700">
                  {/* Tasks */}
                  <div className="flex items-center">
                    <Icon
                      type="messageText"
                      className="text-green fill-current h-5 w-5 mr-1"
                    />
                    <span>{indicator.question_count} tasks</span>
                  </div>

                  {/* Star Points */}
                  <div className="flex items-center">
                    <Icon type="star" className="text-orange-500 mr-1" />
                    <span className="text-[#ED7D31]">
                      {indicator.total_sp} star points
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-base">
            No task found for this category.
          </div>
        )}
      </div>
    </div>
  )
}

export default SurveyQuestionMainView
