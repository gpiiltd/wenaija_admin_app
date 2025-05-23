import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import Icon from '../../../Assets/svgImages/Svg_icons_and_images'
import { triggerGetHISMetrics } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../../state'
import Card from '../../Card'
import GoBack from '../../GoBack'
import Toast from '../../Toast'
import { TypographyVariant } from '../../types'
import Typography from '../../Typography'
import CreateCategory from '../AddCategory'
import AddIndicator from '../AddIndicators'

const ReportSurveyIndicatorView = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false)
  const [toast, showToast] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const { resData, loading } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )

  const navigate = useNavigate()

  const handleAddQuestion = () => {
    navigate('/app/reports/institutional-survey/add-question')
  }

  const handleNavigateSurveyCategories = () => {
    navigate('/app/reports/institutional-survey/categories')
  }

  const handleNavigateSurveyIndicators = () => {
    navigate('/app/reports/institutional-survey/indicators')
  }

  const handleNavigateQuestions = () => {
    navigate('/app/reports/institutional-survey/questions')
  }

  useEffect(() => {
    dispatch(triggerGetHISMetrics({}))
  }, [dispatch])

  if (loading || !resData) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#667085" size={50} />
      </div>
    )
  }
  return (
    <div className="">
      <Toast
        isVisible={toast}
        onCancel={() => showToast(false)}
        title={'Category created successfully'}
        subText={'“MNCH category” created successfully'}
      />
      <div className="flex items-center justify-start gap-6 mb-4">
        <GoBack label={'Institutional survey'} />
      </div>
      <div className="text-sm text-gray-500 mb-8">
        Reports &gt;{' '}
        <span className="text-[#007A61]">Institutional survey </span>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button
          className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50"
          onClick={() => setIsCategoryModalOpen(true)}
        >
          <FiPlus />
          Create category
        </button>
        <button
          className="flex items-center gap-2 px-6 py-4 border rounded-lg hover:bg-gray-50"
          onClick={() => setIsIndicatorModalOpen(true)}
        >
          <FiPlus />
          Add indicator
        </button>
        <button
          className="flex items-center gap-2 px-6 py-4 bg-[#007A61] text-white rounded-lg"
          onClick={handleAddQuestion}
        >
          <FiPlus />
          Add questions
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1 */}
        <Card titleLeft={undefined} titleRight={undefined} className="p-4">
          <div className="flex flex-col gap-y-10">
            <div className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray"
              >
                Responses
              </Typography>
              <Icon
                type="reportsStickRed"
                className="outline-blue-500 fill-current"
              />
            </div>

            <div>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {resData?.total_responses ? resData?.total_responses : 0}
              </Typography>
            </div>
          </div>
        </Card>
        {/* Card 2 */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="p-3"
          onClick={handleNavigateSurveyCategories}
        >
          <div className="flex flex-col gap-y-10">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Categories
              </Typography>
              <Icon type="task" className="outline-blue-500 fill-current" />
            </section>

            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {resData?.total_categories ? resData?.total_categories : 0}
              </Typography>
            </section>
          </div>
        </Card>
        {/* Card 3 */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="p-3"
          onClick={handleNavigateSurveyIndicators}
        >
          <div className="flex flex-col gap-y-10">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Indicators
              </Typography>
              <Icon
                type="taskSquare"
                className="outline-blue-500 fill-current"
              />
            </section>
            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {resData?.total_indicators ? resData?.total_indicators : 0}
              </Typography>
            </section>
          </div>
        </Card>
        {/* Card 4 */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="p-3"
          onClick={handleNavigateQuestions}
        >
          <div className="flex flex-col gap-y-10">
            <section className="flex justify-between items-center">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-l_gray w-2/3"
              >
                Survey questions
              </Typography>
              <Icon type="messageText" className="text-green fill-current" />
            </section>

            <section>
              <Typography
                variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                className="text-['#2D3648'] font-semibold"
              >
                {resData?.total_questions ? resData?.total_questions : 0}
              </Typography>
            </section>
          </div>
        </Card>
      </section>

      {/* below section  */}
      <div className="mb-8 mt-12">
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-2xl font-bold mb-1"
        >
          Recent responses
        </Typography>
        <Typography
          variant={TypographyVariant.NORMAL}
          className="text-gray-600 font-light"
        >
          Kindly view recent responses
        </Typography>
      </div>
      <div className="space-y-4">
        {resData?.recent_responses?.map((response: any, index: number) => (
          <div
            key={index}
            className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center gap-4"
          >
            {/* Name & Email */}
            <div className="flex flex-col w-[200px] shrink-0">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-semibold text-lg"
              >
                {response.user}
              </Typography>
              <span className="text-gray-500 font-light">
                {response.user_email}
              </span>
            </div>

            {/* Separator */}
            <div className="h-12 w-[1px] bg-gray-300"></div>

            {/* Institution */}
            <div className="flex flex-col w-[180px] shrink-0">
              <span className="text-sm text-[#717D96] font-medium">
                Institution
              </span>
              <span className="text-gray-700 font-light">
                {response.institution}
              </span>
            </div>

            <div className="h-12 w-[1px] bg-gray-300"></div>

            {/* Indicator */}
            <div className="flex flex-col w-[180px] shrink-0">
              <span className="text-sm text-[#717D96] font-medium">
                Indicator
              </span>
              <span className="text-gray-700 font-light">
                {response.indicator_name}
              </span>
            </div>

            <div className="h-12 w-[1px] bg-gray-300"></div>

            {/* Date Submitted */}
            <div className="flex flex-col w-[180px] shrink-0">
              <span className="text-sm text-[#717D96] font-medium">
                Date submitted
              </span>
              <span className="text-[#FF725E] font-light">
                {new Date(response.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        ))}

        {/* ))} */}
      </div>

      <CreateCategory
        isOpen={isCategoryModalOpen}
        setIsOpen={setIsCategoryModalOpen}
      />

      <AddIndicator
        isOpen={isIndicatorModalOpen}
        setIsOpen={setIsIndicatorModalOpen}
      />
    </div>
  )
}

export default ReportSurveyIndicatorView
