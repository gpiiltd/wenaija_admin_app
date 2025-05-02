import React, { useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import Icon from '../../../Assets/svgImages/Svg_icons_and_images'
import { resetCategoriesState } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import { triggerGetCategories } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../../state'
import { TypographyVariant } from '../../types'
import Typography from '../../Typography'

const SurveyCategoriesView: React.FC = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { surveyCategories } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )

  useEffect(() => {
    dispatch(triggerGetCategories({}))
  }, [dispatch])

  useEffect(() => {
    if (surveyCategories.statusCode === 200 || surveyCategories.data) {
      if (Array.isArray(surveyCategories.data)) {
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
  const categoryCount = Array.isArray(surveyCategories?.data)
    ? surveyCategories.data.length
    : 0
  const handleNavigateView = () => {
    navigate('/app/reports/institutional-survey/category-single')
  }
  return (
    <div className="">
      <div className="mb-6">
        <div className="flex flex-row items-center">
          <Link to="/app/reports/institutional-survey">
            <FiArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold ml-4">Categories</h1>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-8">
        Reports &gt; Institutional survey &gt;{' '}
        <span className="text-[#007A61]">Categories</span>
      </div>
      <div className="flex flex-row justify-between">
        <section>
          <div className="mb-10">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-xl font-medium mb-2"
            >
              View all categories ({categoryCount})
            </Typography>
            <p className="text-gray-600">See all active categories</p>
          </div>
        </section>
        <section>
          <div className="flex justify-end gap-4 mb-6">
            <button className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50">
              <Icon type="archive" className="w-6 h-6" />
              View archive
            </button>
            <button className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg">
              <Icon type="plus" className="w-6 h-6" />
              Create Category
            </button>
          </div>
        </section>
      </div>

      {/* //this is the categories section */}
      <div className="border rounded-lg overflow-hidden mb-4">
        {surveyCategories.loading ? (
          <div className="flex justify-center py-4 w-full">
            <ClipLoader color="#D0D5DD" />
          </div>
        ) : surveyCategories.error ? (
          <div className="text-center mt-10 text-red-600">
            <h4 className="text-lg font-semibold">
              Error: {surveyCategories.message}
            </h4>
          </div>
        ) : (
          Array.isArray(surveyCategories?.data) &&
          surveyCategories.data.map(category => (
            <div
              key={category.identifier}
              className="p-4 border-b last:border-0 bg-white hover:bg-gray-50"
            >
              <div className="flex items-start gap-6 flex-wrap">
                {/* Left Section - Name & Description */}
                <div className="basis-1/2 pr-4 overflow-hidden">
                  <Typography
                    variant={TypographyVariant.TITLE}
                    className="text-lg"
                  >
                    {category.name}
                  </Typography>
                  <Typography
                    variant={TypographyVariant.NORMAL}
                    className="text-gray-500 text-sm"
                  >
                    {category.description}
                  </Typography>
                </div>

                {/* Right Section - Indicator Count & Date */}
                <div className="flex items-center gap-6 basis-1/3 border-l-2 border-gray-300 pl-4 flex-1 w-full">
                  <div className="flex flex-col justify-start basis-1/3 px-3">
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="text-[#717D96] text-sm font-semibold"
                    >
                      Indicator
                    </Typography>
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="text-lg font-light"
                    >
                      {category.indicator_count}
                    </Typography>
                  </div>

                  <div className="flex flex-col justify-start basis-1/3 border-l-2 border-gray-300 pl-4 px-3">
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="text-[#717D96] text-sm font-semibold"
                    >
                      Date Created
                    </Typography>
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="text-[#FF725E] font-light"
                    >
                      {new Date(category.created_at).toLocaleDateString()}
                    </Typography>
                  </div>

                  {/* View Button */}
                  <div className="border-l-2 border-gray-300">
                    <button
                      // onClick={() => handleNavigateView(category.identifier)}
                      className="border ml-4 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SurveyCategoriesView
