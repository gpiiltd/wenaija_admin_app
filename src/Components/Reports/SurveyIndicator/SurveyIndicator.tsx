import React, { useState } from 'react'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import Icon from '../../../Assets/svgImages/Svg_icons_and_images'
import Card from '../../Card'
import Toast from '../../Toast'
import { TypographyVariant } from '../../types'
import Typography from '../../Typography'
import CreateCategory from '../AddCategory'
import AddIndicator from '../AddIndicators'
import { submissions } from '../communityTaskReport'
import SubmissionCard from '../SubmissionCard'

const ReportSurveyIndicatorView = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false)
  const [toast, showToast] = useState(false)

  // const setToastShown = () => {
  //   if (isCategoryModalOpen === false) {
  //     showToast(true);
  //   } else {
  //     return;
  //   }
  // };

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

  return (
    <div className="">
      <Toast
        isVisible={toast}
        onCancel={() => showToast(false)}
        title={'Category created successfully'}
        subText={'“MNCH category” created successfully'}
      />
      <div className="flex items-center justify-start gap-6 mb-4">
        <Link to="/app/reports">
          <FiArrowLeft />
        </Link>
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-2xl font-bold"
        >
          Institutional survey
        </Typography>
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
                1,234
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
                1,234
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
                1,234
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
                1,234
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
        {submissions.map(submission => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
      </div>
      <button className="flex items-center mx-auto mt-5 mb-10 gap-2 px-[10rem] py-4 border border-[#000000] rounded-lg hover:bg-gray-50 ">
        View all
      </button>
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
