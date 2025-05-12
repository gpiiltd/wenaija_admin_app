import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { triggerGetCommunityTasksCategories } from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { triggerGetACategory } from '../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../state'
import GoBack from '../GoBack'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import CreateCommunityTaskIndicator from './SurveyIndicator/AddCommunityTaskIndicator'
import { Category } from './SurveyIndicator/helper'

interface Task {
  task_question: string
  task_star_point: number
}

interface Indicator {
  identifier: string
  name: string
  description: string
  task_count: number
  total_points: number
  tasks: Task[]
}

interface CategoryResults {
  identifier: string
  name: string
  description: string
  category_type: string
  indicator_count: number
  indicators: Indicator[]
}

export interface CategoryWithIndicators {
  name: string
  status_code: number
  status: string
  message: string
  results: CategoryResults
  timeStamp: string
}

const IndicatorsView: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { category } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )
  const { communityTaskCategories } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [categoriesWithIndicators, setCategoriesWithIndicators] = useState<
    CategoryWithIndicators[]
  >([])
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
        setSelectedCategoryId(communityTaskCategories.data[0]?.identifier)
        console.log(
          'All categories',
          JSON.stringify(communityTaskCategories.data, null, 2)
        )
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
      console.log('Error fetching ALL INSTITUTIONS')
    }
  }, [
    dispatch,
    communityTaskCategories.data,
    communityTaskCategories.error,
    communityTaskCategories.message,
    communityTaskCategories.statusCode,
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

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (communityTaskCategories?.data?.length) {
        const responses = await Promise.all(
          communityTaskCategories.data.map(async (cat: any) => {
            try {
              const result = await dispatch(
                triggerGetACategory(cat.identifier)
              ).unwrap()
              return {
                name: cat.name,
                ...result,
              }
            } catch (err) {
              return null
            }
          })
        )
        const validResponses = responses.filter(Boolean)
        setCategoriesWithIndicators(validResponses)
      }
    }

    fetchCategoryDetails()
  }, [communityTaskCategories, dispatch])
  const totalIndicators = categoriesWithIndicators.reduce((sum, category) => {
    return sum + (category.results?.indicators?.length || 0)
  }, 0)

  return (
    <div className="w-full mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col">
        <div className="mb-10">
          <div className="flex items-center justify-start gap-6 mb-1">
            <GoBack label={'Indicators'} />
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Community task &gt;{' '}
            <span className="text-[#007A61]">Indicators</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <section>
            <div className="mb-10">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-xl font-medium mb-2"
              >
                View all Indicators ({totalIndicators})
              </Typography>
              <p className="text-gray-600">
                Below is the list of indicators, categorized by their
                categories.
              </p>
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
                onClick={() => setIsIndicatorModalOpen(true)}
              >
                <FiPlus />
                Add Indicator
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Categories & Indicators */}
      {categoriesWithIndicators.map((category, index) => (
        <div key={index} className="mt-4">
          <Typography
            variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
            className="text-lg font-semibold bg-green-100 text-[#007A61] px-3 py-1 inline-block rounded-full"
          >
            {category.results?.name}
          </Typography>

          {category.results?.indicators?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {category.results.indicators.map(
                (indicator: any, idx: number) => (
                  <div key={idx} className="border rounded-lg p-4 shadow-sm">
                    <Typography
                      variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                      className="text-lg font-semibold text-gray-900"
                    >
                      {indicator.name}
                    </Typography>
                    <Typography
                      variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                      className="text-sm text-gray-600 mt-1"
                    >
                      {indicator.description}
                    </Typography>
                    <div className="flex items-center mt-4 text-sm text-gray-700">
                      <div className="flex flex-row mr-3 items-center">
                        <Icon type="file" className="pr-2" />
                        <span>{indicator.task_count} tasks</span>
                      </div>
                      <div className="flex flex-row mr-3 items-center">
                        <Icon type="star" className="text-orange-500 mr-1" />
                        <span className="text-[#ED7D31]">
                          {indicator.total_points} star points
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-base mt-2 border rounded-lg p-4 shadow-sm w-1/3 my-2">
              No indicator found for this category.
            </div>
          )}
        </div>
      ))}
      <CreateCommunityTaskIndicator
        isOpen={isIndicatorModalOpen}
        setIsOpen={setIsIndicatorModalOpen}
      />
    </div>
  )
}

export default IndicatorsView
