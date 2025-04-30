import React, { useEffect, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { triggerListInstituteIndicator } from '../../features/institutions/institutionManagementThunk'
import { resetResponseAnalyticsState } from '../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import {
  triggerGetResponseAnalytics,
  triggerGetSurveyQuestions,
  triggerGetSurveyResponses,
} from '../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../state'
import GoBack from '../GoBack'
import CustomModal from '../Modal'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import { NextArrow, PrevArrow } from './SliderArrows'
type Option = {
  identifier: string
  text: string
  weight: number
  requires_comment: boolean
  requires_image: boolean
}

type Question = {
  identifier: string
  indicator: string
  title: string
  options: Option[]
  created_at: string
  updated_at: string
}

const ViewResponse: React.FC = () => {
  const location = useLocation()
  const { name, icon } = location.state || {}
  const [activeTab, setActiveTab] = useState<string>('summary')
  const [indicatorId, setIndicatorId] = useState<string>('')
  const { institutionId } = useParams<{ institutionId: string }>()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [individualActiveTab, setIndividualActiveTab] =
    useState<string>('veryClean')
  const [expandedIndices, setExpandedIndices] = useState<number[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  )
  //view responses
  const [isModalOpen1, setIsModalOpen1] = useState(false)
  const [modalComment, setModalComment] = useState<string | null>(null)
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [modalUser, setModalUser] = useState<string>('')
  const [modalDate, setModalDate] = useState<string>('')
  const toggleExpand = (index: number) => {
    setExpandedIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow className={''} style={{}} onClick={() => {}} />,
    nextArrow: <NextArrow className={''} style={{}} onClick={() => {}} />,
  }
  const dispatch: AppDispatch = useDispatch()
  const {
    error,
    resData,
    message,
    statusCode,
    surveyResponses,
    responseAnalytics,
  } = useSelector((state: RootState) => state.healthInstitutionSurveyManagement)
  const { instituteIndicators } = useSelector(
    (state: RootState) => state.institutionManagement
  )
  const navigate = useNavigate()
  // console.log('indicatorId', indicatorId)
  //indicators
  useEffect(() => {
    if (institutionId) {
      dispatch(triggerListInstituteIndicator(institutionId))
    }
  }, [dispatch, institutionId])

  useEffect(() => {
    if (instituteIndicators.statusCode === 200 || instituteIndicators.data) {
    }
    if (instituteIndicators.error && instituteIndicators.message) {
    }
  }, [
    instituteIndicators.data,
    instituteIndicators.error,
    instituteIndicators.message,
    instituteIndicators.statusCode,
  ])

  //Get questions
  useEffect(() => {
    if (indicatorId) {
      dispatch(triggerGetSurveyQuestions({ indicatorId }))
    }
  }, [dispatch, indicatorId])

  useEffect(() => {
    if ((statusCode === 200 || resData) && resData?.results?.length) {
      console.log('q res data', resData)
      setQuestions(resData.results)
      setCurrentIndex(0)
      setCurrentQuestionId(resData.results[0].identifier)
    } else if (error && message) {
      toast.error(message)
    }
  }, [error, message, resData, statusCode])

  //Get responses
  useEffect(() => {
    if (institutionId && indicatorId && currentQuestionId) {
      dispatch(
        triggerGetSurveyResponses({
          institution_id: institutionId!,
          indicator_id: indicatorId,
          question_id: currentQuestionId,
          data: { option: individualActiveTab }, // 👈 send selected option
        })
      )
    }
  }, [
    dispatch,
    indicatorId,
    institutionId,
    currentQuestionId,
    individualActiveTab,
  ])

  useEffect(() => {
    if (surveyResponses.statusCode === 200 || surveyResponses.data) {
      console.log(
        'Survey individual responsese',
        JSON.stringify(surveyResponses.data, null, 2)
      )
    }
    if (surveyResponses.error && surveyResponses.message) {
      toast.error(surveyResponses.message)
    }
  }, [
    surveyResponses.data,
    surveyResponses.error,
    surveyResponses.message,
    surveyResponses.statusCode,
  ])

  useEffect(() => {
    if (
      Array.isArray(instituteIndicators.data?.results?.indicators) &&
      instituteIndicators.data.results.indicators.length > 0
    ) {
      setIndicatorId(
        instituteIndicators.data.results.indicators[0].indicator_id
      )
    }
  }, [instituteIndicators.data?.results?.indicators])

  //Get Response analytics
  useEffect(() => {
    if (!institutionId || !indicatorId) return // <- prevent bad dispatch
    dispatch(resetResponseAnalyticsState())
    dispatch(
      triggerGetResponseAnalytics({
        institution_id: institutionId!,
        indicator_id: indicatorId,
        data: {},
      })
    )
  }, [dispatch, indicatorId, institutionId])

  useEffect(() => {
    if (responseAnalytics.statusCode === 200 || responseAnalytics.data) {
    }
    if (responseAnalytics.error && responseAnalytics.message) {
      console.log('Error fetching analytics')
    }
  }, [
    responseAnalytics.data,
    responseAnalytics.error,
    responseAnalytics.message,
    responseAnalytics.statusCode,
  ])

  useEffect(() => {
    if (
      questions[currentIndex]?.options &&
      questions[currentIndex].options.length > 0
    ) {
      setIndividualActiveTab(questions[currentIndex].options[0].identifier)
    }
  }, [currentIndex, questions])

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setCurrentQuestionId(questions[nextIndex].identifier)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setCurrentQuestionId(questions[prevIndex].identifier)
    }
  }

  return (
    <div className=" mx-auto px-2">
      <div className="flex items-center justify-start gap-6 mb-8">
        <GoBack label="View Response" />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Icon type={icon} className="w-fit" />
        <h4 className="text-lg font-semibold">{name}</h4>
      </div>

      <div className="flex mb-6 w-full space-x-4 rounded-xl overflow-x-auto scrollbar-hide">
        {instituteIndicators.loading ? (
          <div className="flex justify-center  min-h-screen w-full">
            <ClipLoader color="#D0D5DD" />
          </div>
        ) : instituteIndicators.error ? (
          <div className="text-center mt-10 text-red-600">
            <h4 className="text-lg font-semibold">
              Error: {instituteIndicators.message}
            </h4>
          </div>
        ) : (
          Array.isArray(instituteIndicators.data?.results?.indicators) &&
          instituteIndicators.data.results?.indicators.map((indicator: any) => (
            <button
              key={indicator.indicator_id}
              className={`py-2 px-4 whitespace-nowrap ${
                indicatorId === indicator.indicator_id
                  ? 'bg-white border-b-2 border-b-[#007A61] text-[#007A61]'
                  : 'text-gray-600'
              }`}
              onClick={() => setIndicatorId(indicator.indicator_id)}
            >
              {indicator.indicator_name}
            </button>
          ))
        )}
      </div>

      {Array.isArray(instituteIndicators.data?.results?.indicators) &&
        instituteIndicators.data.results.indicators.map((indicator: any) =>
          indicatorId === indicator.indicator_id ? (
            <div key={indicator.indicator_id}>
              <div className="mx-auto p-6 border-2 rounded-lg">
                <div className="flex justify-start items-center gap-4 mb-4">
                  <Typography
                    variant={TypographyVariant.TITLE}
                    className="font-semibold"
                  >
                    {indicator.indicator_name}
                  </Typography>
                  {!responseAnalytics.loading && (
                    <Typography
                      variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                      className="text-lg px-2  text-[#007A61] bg-[#f1fffc]"
                    >
                      {' '}
                      <span className="font-bold px-1">
                        {responseAnalytics?.data?.total_responses || 0}
                      </span>
                      responses
                    </Typography>
                  )}
                </div>

                <div className="flex mb-6 w-full space-x-4  rounded-xl ">
                  <button
                    className={`py-2  flex items-center gap-2 font-semibold ${
                      activeTab === 'summary'
                        ? 'bg-white border-b-2 border-b-black text-black '
                        : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('summary')}
                  >
                    <Icon type="summary" className="w-6 h-6" />
                    Summary
                  </button>
                  <button
                    className={`py-2 px-4 flex items-center gap-2 font-semibold ${
                      activeTab === 'individual'
                        ? 'bg-white border-b-2 border-b-black text-black '
                        : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('individual')}
                  >
                    <Icon type="individual" className="w-6 h-6" />
                    Individual responses
                  </button>
                </div>

                {activeTab === 'summary' && (
                  <div className="mx-auto  rounded-lg">
                    <div className=" mt-4">
                      <h2 className="text-gray-600">
                        Below are summarized aggregates responses for each
                        questions
                      </h2>
                      {responseAnalytics.loading && (
                        <div className="flex justify-center w-full py-8">
                          <ClipLoader color="#D0D5DD" />
                        </div>
                      )}
                      <div>
                        {responseAnalytics?.data?.questions?.length > 0 ? (
                          responseAnalytics?.data?.questions?.map(
                            (questionItem: any, index: number) => (
                              <div
                                className="bg-white border-b-2 p-4 mb-6"
                                key={questionItem.question_id}
                              >
                                <div
                                  className="flex items-center cursor-pointer mb-4"
                                  onClick={() =>
                                    setExpandedIndex(prev =>
                                      prev === index ? null : index
                                    )
                                  }
                                >
                                  <span className="text-md mr-6">
                                    {expandedIndex === index ? (
                                      <Icon
                                        type="minusCircle"
                                        className="w-6 h-6"
                                      />
                                    ) : (
                                      <Icon
                                        type="plusCircle"
                                        className="w-6 h-6"
                                      />
                                    )}
                                  </span>
                                  <h4 className="font-semibold">
                                    {questionItem.question_text}
                                  </h4>
                                </div>

                                {expandedIndex === index && (
                                  <div className="ml-12 my-4">
                                    <div className="flex flex-wrap gap-4 mt-2">
                                      {questionItem.options.map((opt: any) => (
                                        <span
                                          className="text-gray-600"
                                          key={opt.option_id}
                                        >
                                          {opt.option_text}:{' '}
                                          <span className="text-[#007A61] bg-[#f1fffc] font-bold">
                                            {opt.percentage}%
                                          </span>
                                        </span>
                                      ))}
                                    </div>

                                    <div className="mt-4 border-2 rounded-lg p-4">
                                      <h5 className="mt-4 font-semibold">
                                        Additional comments and images uploaded
                                        based on responses
                                      </h5>
                                      <div className="flex flex-col my-4">
                                        {questionItem.options
                                          .filter(
                                            (opt: any) => opt.comments_count > 0
                                          )
                                          .map((opt: any) => (
                                            <div
                                              className="flex space-x-12 items-center"
                                              key={opt.option_id}
                                            >
                                              <span className="text-gray-600 w-48">
                                                {opt.option_text}
                                              </span>
                                              <hr className="my-4 w-44 h-[2px] bg-gray-400" />
                                              <span className="text-[#007A61] underline">
                                                <span className="font-bold">
                                                  {opt.comments_count}
                                                </span>{' '}
                                                responses
                                              </span>
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          )
                        ) : !responseAnalytics.loading &&
                          responseAnalytics?.data?.questions?.length === 0 ? (
                          <div className="text-center text-gray-500 italic mt-8">
                            No response available at the moment.
                          </div>
                        ) : null}
                        <div className="flex items-center justify-between mt-6 border rounded-lg p-4">
                          <p className="text-gray-600">
                            <span className="font-bold text-[#007A61]">
                              {responseAnalytics.loading
                                ? '...'
                                : `${responseAnalytics?.data?.additional_comments_percentage || 0}%`}
                            </span>{' '}
                            of respondents gave additional comments based on
                            this indicator
                          </p>
                          <button
                            className="flex items-center gap-2 bg-[#007A61] text-white py-2 px-4 border rounded-xl"
                            onClick={() =>
                              navigate(
                                '/app/instutitions/view-institute/additional-comment'
                              )
                            }
                          >
                            View responses{' '}
                            <FaAngleRight className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'individual' && (
                  <div className=" mx-auto ">
                    <h2 className="text-lg text-gray-600">
                      Below are individual responses for each questions
                    </h2>
                    {questions.length > 0 && (
                      <div className="p-4">
                        {/* Navigation Header */}
                        <div className="flex justify-between items-center mb-4">
                          <button
                            onClick={goToPrev}
                            disabled={currentIndex === 0}
                            className="text-gray-500"
                          >
                            ← Prev
                          </button>
                          <h2 className="text-lg font-semibold text-gray-800">
                            Question {currentIndex + 1} of {questions.length}
                          </h2>
                          <button
                            onClick={goToNext}
                            disabled={currentIndex === questions.length - 1}
                            className="text-gray-500"
                          >
                            Next →
                          </button>
                        </div>

                        <h3 className="text-xl font-medium mb-3 text-center">
                          {questions[currentIndex].title}
                        </h3>
                      </div>
                    )}
                    {/* Question Titles */}
                    <div className="flex gap-2 flex-wrap justify-center items-center">
                      {questions[currentIndex]?.options &&
                      questions[currentIndex]?.options.length > 0 ? (
                        questions[currentIndex]?.options.map(opt => (
                          <button
                            key={opt.identifier}
                            className={`text-gray-600 py-2 px-3 rounded ${
                              individualActiveTab === opt.identifier
                                ? 'bg-white text-black'
                                : 'bg-gray-100'
                            }`}
                            onClick={() =>
                              setIndividualActiveTab(opt.identifier)
                            } // Ensure state is updated
                          >
                            {opt.text}
                          </button>
                        ))
                      ) : (
                        <p className="text-gray-600 py-2">
                          No options available
                        </p>
                      )}
                    </div>

                    {/* response from users start */}
                    {surveyResponses.loading ? (
                      <div className="flex justify-center w-full py-4">
                        <ClipLoader color="#D0D5DD" />
                      </div>
                    ) : surveyResponses.error ? (
                      <div className="text-center mt-10 text-red-600">
                        <p className="text-lg font-semibold">
                          Error: {surveyResponses.message}
                        </p>
                      </div>
                    ) : surveyResponses.data?.respondents?.results?.length >
                      0 ? (
                      surveyResponses.data.respondents.results.map(
                        (response: any, index: number) => (
                          <div
                            key={index}
                            className="relative flex justify-between items-center border-b py-4"
                          >
                            <div className="flex items-center gap-4">
                              <Icon type="user" className="w-6 h-6" />
                              <span>{response.user_name}</span>
                            </div>

                            <div className="flex relative items-center gap-4">
                              <div onClick={() => toggleExpand(index)}>
                                <Icon
                                  type="morevertical"
                                  className="ml-2 cursor-pointer"
                                />
                              </div>
                              <span className="text-black font-semibold">
                                {response.details.comment || 'No comment'}
                              </span>
                            </div>

                            {/* Expanded options section */}
                            {expandedIndices.includes(index) && (
                              <div className="absolute right-36 bg-white shadow-md rounded-lg p-4 mt-2 z-10">
                                {/* Tooltip for View Additional Comment */}
                                <button
                                  onClick={() => {
                                    setModalComment(
                                      response.details.comment || 'No comment'
                                    )
                                    setModalImage(null)
                                    setModalUser(response.user_name)
                                    setModalDate(response.created_at)
                                    setIsModalOpen1(true)
                                    setExpandedIndices([])
                                  }}
                                  className="flex items-center gap-2 px-2 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="chat" className="w-6 h-6" />
                                  View additional comment
                                </button>

                                {/* Tooltip for View Uploaded Image */}
                                <button
                                  onClick={() => {
                                    setModalImage(
                                      surveyResponses.loading ? (
                                        <ClipLoader color="#D0D5DD" />
                                      ) : (
                                        response.details.images?.[0]?.image ||
                                          null
                                      )
                                    )
                                    setModalComment(null)
                                    setModalUser(response.user_name)
                                    setModalDate(response.created_at)
                                    setIsModalOpen1(true)
                                    setExpandedIndices([])
                                  }}
                                  className="flex items-center gap-2 px-2 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="imageup" className="w-6 h-6" />
                                  View uploaded image
                                </button>
                              </div>
                            )}
                          </div>
                        )
                      )
                    ) : (
                      !surveyResponses.loading && (
                        <p className="py-4 text-center">No responses yet.</p>
                      )
                    )}
                    {/* response from users end */}

                    <CustomModal
                      width="45%"
                      height="65%"
                      isOpen={isModalOpen1}
                      onClose={() => setIsModalOpen1(false)}
                    >
                      <div className="flex flex-col items-center justify-center p-12 m-auto w-[90%]">
                        <Typography
                          variant={TypographyVariant.SUBTITLE}
                          className="text-center text-2xl   bg-green p-5"
                        >
                          {modalComment
                            ? 'Additional comments based on response'
                            : 'Uploaded Image'}
                        </Typography>

                        {modalComment ? (
                          <div className="bg-[#F1FFFC] py-1 px-2 flex justify-center items-center text-[#007A61] rounded-lg">
                            <Typography
                              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                              className="text-center text-2xl  "
                            >
                              {modalComment}
                            </Typography>
                          </div>
                        ) : modalImage ? (
                          <img
                            src={modalImage}
                            alt="Uploaded"
                            className="max-h-[300px] object-contain rounded"
                          />
                        ) : (
                          <Typography
                            variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                            className="text-center mb-6"
                          >
                            No image uploaded.
                          </Typography>
                        )}

                        <div className="flex justify-between items-center py-4 w-full mt-8">
                          <div className="flex items-center gap-4">
                            <Icon type="user" className="w-6 h-6" />
                            <span>{modalUser}</span>
                          </div>
                          <span className="text-gray-700 font-semibold">
                            {new Date(modalDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </CustomModal>

                    <CustomModal
                      width="45%"
                      height="70%"
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                    >
                      <Slider {...settings}>
                        {currentImages.map((image, index) => (
                          <div key={index} className="">
                            <img
                              src={image}
                              alt={`Uploaded ${index + 1}`}
                              className="object-contain h-96 w-full"
                            />
                          </div>
                        ))}
                      </Slider>
                    </CustomModal>
                  </div>
                )}
              </div>
            </div>
          ) : null
        )}
    </div>
  )
}

export default ViewResponse
