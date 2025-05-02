import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import Icon from '../../../Assets/svgImages/Svg_icons_and_images'
import { resetCategoriesState } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import {
  triggerGetACategory,
  triggerGetCategories,
} from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../../state'
import { TypographyVariant } from '../../types'
import Typography from '../../Typography'
import { Category, Indicator } from './helper'

// interface Indicator {
//   title: string
//   description: string
//   tasks: number
//   starPoints: number
// }

// interface Category {
//   name: string
//   indicators: Indicator[]
// }

const SurveyIndicatorsMainView: React.FC = () => {
  const [editCategory, showEditCategory] = useState(false)
  const [activeTab, setActiveTab] = useState<string>()
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

  const dispatch: AppDispatch = useDispatch()
  const { surveyCategories, category } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )

  //GET surveyCategories
  useEffect(() => {
    dispatch(triggerGetCategories({}))
  }, [dispatch])

  useEffect(() => {
    if (surveyCategories.statusCode === 200 || surveyCategories.data) {
      if (Array.isArray(surveyCategories.data)) {
        setAllCategories(surveyCategories.data)
        // setActiveTab(surveyCategories.data[0]?.name)
        // setSelectedCategoryId(surveyCategories.data[0].identifier)
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

  const setToastShown = () => {
    showEditCategory(true)
  }

  const navigate = useNavigate()

  const handleNavigateView = () => {
    navigate('/app/reports/institutional-survey/indicators-single')
  }

  if (surveyCategories.loading || !surveyCategories.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#D0D5DD" size={50} />
      </div>
    )
  }

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
            Indicators
          </Typography>
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Institutional survey &gt;{' '}
            <span className="text-[#007A61]">Indicators</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <section>
            <div className="mb-10">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-lg font-medium mb-2"
              >
                View all Indicators (34)
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-gray-600 font-light"
              >
                Below is the list of indicators, categorized by their
                categories.
              </Typography>
            </div>
          </section>

          <section>
            <div className="flex justify-end gap-4 mb-6">
              <button className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50">
                <Icon type="archive" className="w-6 h-6" />
                View archive
              </button>
              <button
                className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
                onClick={setToastShown}
              >
                <FiPlus />
                Add Indicator
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b pb-2 overflow-x-auto scrollbar-hide">
        {surveyCategories?.data?.map((category: any) => (
          <button
            key={category.identifier}
            className={`text-md whitespace-nowrap font-normal ${
              activeTab === category.name
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500'
            }`}
            onClick={() => {
              setActiveTab(category.name)
              setSelectedCategoryId(category?.identifier) // 👈 This is critical
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Indicator Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        onClick={handleNavigateView}
      >
        {' '}
        {category.loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <ClipLoader color="#D0D5DD" />
          </div>
        ) : category.error ? (
          <div className="text-center mt-10 text-red-600">
            <h4 className="text-lg font-semibold">Error: {category.message}</h4>
          </div>
        ) : (
          Array.isArray(indicators) &&
          indicators.map((indicator, idx) => (
            <div
              key={indicator.identifier || idx}
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition duration-200 bg-white"
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
          ))
        )}
      </div>
    </div>
  )
}

export default SurveyIndicatorsMainView
