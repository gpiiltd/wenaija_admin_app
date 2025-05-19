import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import ClipLoader from 'react-spinners/ClipLoader'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { triggerGetCommunityTasksCategories } from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { triggerGetACategory } from '../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../state'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import { CategoryWithIndicators } from './ViewAllIndicators'

const TaskPoserView: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { category } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )
  const { communityTaskCategories } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [categoriesWithIndicators, setCategoriesWithIndicators] = useState<
    CategoryWithIndicators[]
  >([])

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(triggerGetCommunityTasksCategories({}))
  }, [dispatch])

  useEffect(() => {
    if (
      communityTaskCategories.statusCode === 200 ||
      communityTaskCategories.data
    ) {
      if (Array.isArray(communityTaskCategories.data)) {
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
  const totalTasks = categoriesWithIndicators.reduce((taskSum, category) => {
    const indicators = category.results?.indicators || []

    const tasksInCategory = indicators.reduce((sum, indicator) => {
      return sum + (indicator.tasks?.length || 0)
    }, 0)

    return taskSum + tasksInCategory
  }, 0)

  if (communityTaskCategories.loading || !communityTaskCategories.data) {
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
        <div className="mb-6">
          <Typography
            variant={TypographyVariant.TITLE}
            className="font-bold flex flex-row items-center mb-1"
          >
            <Link to="/app/reports/community-task">
              <FiArrowLeft className="mr-3" />
            </Link>{' '}
            Poser/Task
          </Typography>
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Community Task &gt;{' '}
            <span className="text-primary_green">View</span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <section>
            <div className="mb-10">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-xl font-medium mb-1"
              >
                View all Posers ({totalTasks})
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-gray-600"
              >
                Kindly view recent responses
              </Typography>
            </div>
          </section>
          <section>
            <div className="flex justify-end gap-4 mb-6">
              <button className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50">
                <Icon type="archive" className="w-6 h-6" />
                View archive
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Categories & Indicators */}
      {categoriesWithIndicators.map((category, index) => (
        <div key={index} className="mt-4  ">
          <Typography
            variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
            className="text-lg font-semibold bg-[#7A00191A] text-[#7A0019] px-3 py-1 inline-block rounded-full"
          >
            {category.results?.name}
          </Typography>
          {category.results?.indicators?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 ">
              {category.results.indicators.flatMap((indicator: any) =>
                indicator.tasks?.map((task: any) => (
                  <div
                    key={task.task_id}
                    className="border rounded-lg p-4 shadow-sm bg-white cursor-pointer"
                    onClick={() =>
                      navigate(`/app/reports/task-poser/view/${task.task_id}`, {
                        state: {
                          indicatorId: indicator.identifier,
                          responseCount: task.task_response_count,
                        },
                      })
                    }
                  >
                    <Typography
                      variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                      className=" font-semibold text-gray-900"
                    >
                      ..
                      {task.task_question}
                    </Typography>
                    <div className="flex items-center justify-start mt-2 text-sm text-gray-700">
                      <Icon type="star" className="text-orange-500 " />
                      <span className="text-[#ED7D31]">
                        {task.task_star_point}
                        star points
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="text-start text-gray-500 text-base mt-2 border rounded-lg p-4 shadow-sm w-1/3 my-2">
              No task found for this category.
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TaskPoserView
