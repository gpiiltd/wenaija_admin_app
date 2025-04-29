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
import { individualResponses } from './institutionData'
import { NextArrow, PrevArrow } from './SliderArrows'

const ViewResponse: React.FC = () => {
  const location = useLocation()
  const { name, icon } = location.state || {}
  const [activeTab, setActiveTab] = useState<string>('summary')
  const [indicatorId, setIndicatorId] = useState<string>('')
  const { institutionId } = useParams<{ institutionId: string }>()
  const [questionId, seQuestionId] = useState('')
  const [questionTitles, seQuestionTitles] = useState<string[]>([])
  const [responses] = useState(individualResponses)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen1, setIsModalOpen1] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [individualActiveTab, setIndividualActiveTab] =
    useState<string>('veryClean')
  const [expandedIndices, setExpandedIndices] = useState<number[]>([])

  const toggleExpand = (index: number) => {
    setExpandedIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }
  const handleImageClick = (images: string[]) => {
    setCurrentImages(images)
    setIsModalOpen(true)
  }

  const handleComment = () => {
    setIsModalOpen1(true)
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

  // const toggleExpand = (index: number) => {
  //   setExpandedIndex(expandedIndex === index ? null : index)
  // }
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
  console.log('indicatorId', indicatorId)
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
    if ((statusCode === 200 || resData) && resData) {
      if (Array.isArray(resData)) {
        const questionIds = resData.map(q => q.identifier)
        seQuestionId(questionIds[0])
      } else if (Array.isArray(resData.results)) {
        const questionTitles = resData.results.map(q => q.title)
        const questionIds = resData.results.map(q => q.identifier)
        seQuestionTitles(questionTitles)
        seQuestionId(questionIds[0])
      } else {
        console.warn(
          'resData is not an array or does not contain results array'
        )
      }
    }
    if (error && message) {
      toast.error(message)
    }
  }, [error, message, resData, statusCode])

  //Get responses
  useEffect(() => {
    if (institutionId && indicatorId && questionId) {
      dispatch(
        triggerGetSurveyResponses({
          institution_id: institutionId!,
          indicator_id: indicatorId,
          question_id: questionId,
          data: {},
        })
      )
    }
  }, [dispatch, indicatorId, institutionId, questionId])

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
      console.log(
        'Response analytics seen',
        JSON.stringify(responseAnalytics.data, null, 2)
      )
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

                    <div className="flex flex-col items-center justify-center   py-2 mt-4">
                      <h2 className="text-lg mb-2">Question 1 of 3</h2>
                      <h3 className="text-lg mb-4">
                        Was the outside of the facility clean?
                      </h3>
                    </div>

                    <div className="flex items-center justify-center mb-4">
                      <div className="flex gap-4 bg-[#F2F4F7] rounded-lg p-2">
                        <button
                          className={` text-gray-600 py-2 px-3 rounded ${
                            individualActiveTab === 'veryClean'
                              ? 'bg-white  text-black'
                              : ''
                          }`}
                          onClick={() => setActiveTab('veryClean')}
                        >
                          Very Clean
                        </button>
                        <button
                          className={` text-gray-600 py-1 px-3 rounded ${
                            individualActiveTab === 'somewhatClean'
                              ? 'bg-white  text-black'
                              : ''
                          }`}
                          onClick={() => setActiveTab('somewhatClean')}
                        >
                          Somewhat Clean
                        </button>
                        <button
                          className={` text-gray-600 py-1 px-3 rounded ${
                            individualActiveTab === 'neutral'
                              ? 'bg-white  text-black'
                              : ''
                          }`}
                          onClick={() => setActiveTab('neutral')}
                        >
                          Neutral
                        </button>
                        <button
                          className={` text-gray-600 py-1 px-3 rounded ${
                            individualActiveTab === 'somewhatUnclean'
                              ? 'bg-white  text-black'
                              : ''
                          }`}
                          onClick={() => setActiveTab('somewhatUnclean')}
                        >
                          Somewhat Unclean
                        </button>
                        <button
                          className={` text-gray-600 py-1 px-3 rounded ${
                            individualActiveTab === 'veryUnclean'
                              ? 'bg-white  text-black'
                              : ''
                          }`}
                          onClick={() => setActiveTab('veryUnclean')}
                        >
                          Very Unclean
                        </button>
                      </div>
                    </div>

                    {individualActiveTab === 'veryClean' &&
                      responses
                        .filter(response => response.comment === 'Very clean')
                        .map((response, index) => (
                          <div
                            key={index}
                            className="relative flex justify-between items-center border-b py-4"
                          >
                            <div className="flex items-center gap-4">
                              <Icon type="user" className="w-6 h-6" />
                              <span>{response.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div onClick={() => toggleExpand(index)}>
                                <Icon
                                  type="morevertical"
                                  className="ml-2 cursor-pointer"
                                />
                              </div>
                              <span className="text-black font-semibold">
                                {response.comment}
                              </span>
                            </div>
                            {expandedIndex === index && (
                              <div className="absolute right-36 bg-white shadow-md rounded-lg p-4 mt-2 ">
                                <button
                                  onClick={() =>
                                    handleImageClick(response.images)
                                  }
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="imageup" className="w-6 h-6" />
                                  View upload image
                                </button>
                                <button
                                  onClick={() => handleComment()}
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="chat" className="w-6 h-6" />
                                  View additional comment
                                </button>
                              </div>
                            )}
                          </div>
                        ))}

                    {individualActiveTab === 'somewhatClean' &&
                      responses
                        .filter(
                          response => response.comment === 'Somewhat clean'
                        )
                        .map((response, index) => (
                          <div
                            key={index}
                            className="relative flex justify-between items-center border-b py-4"
                          >
                            <div className="flex items-center gap-4">
                              <Icon type="user" className="w-6 h-6" />
                              <span>{response.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div onClick={() => toggleExpand(index)}>
                                <Icon
                                  type="morevertical"
                                  className="ml-2 cursor-pointer"
                                />
                              </div>
                              <span className="text-black font-semibold">
                                {response.comment}
                              </span>
                            </div>
                            {expandedIndex === index && (
                              <div className="absolute right-36 bg-white shadow-md rounded-lg p-4 mt-2 ">
                                <button
                                  onClick={() =>
                                    handleImageClick(response.images)
                                  }
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="imageup" className="w-6 h-6" />
                                  View upload image
                                </button>
                                <button
                                  onClick={() => handleComment()}
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="chat" className="w-6 h-6" />
                                  View additional comment
                                </button>
                              </div>
                            )}
                          </div>
                        ))}

                    {individualActiveTab === 'neutral' &&
                      responses
                        .filter(response => response.comment === 'Neutral')
                        .map((response, index) => (
                          <div
                            key={index}
                            className="relative flex justify-between items-center border-b py-4"
                          >
                            <div className="flex items-center gap-4">
                              <Icon type="user" className="w-6 h-6" />
                              <span>{response.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div onClick={() => toggleExpand(index)}>
                                <Icon
                                  type="morevertical"
                                  className="ml-2 cursor-pointer"
                                />
                              </div>
                              <span className="text-black font-semibold">
                                {response.comment}
                              </span>
                            </div>
                            {expandedIndex === index && (
                              <div className="absolute right-36 bg-white shadow-md rounded-lg p-4 mt-2 ">
                                <button
                                  onClick={() =>
                                    handleImageClick(response.images)
                                  }
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="imageup" className="w-6 h-6" />
                                  View upload image
                                </button>
                                <button
                                  onClick={() => handleComment()}
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="chat" className="w-6 h-6" />
                                  View additional comment
                                </button>
                              </div>
                            )}
                          </div>
                        ))}

                    {individualActiveTab === 'somewhatUnclean' &&
                      responses
                        .filter(
                          response => response.comment === 'Somewhat unclean'
                        )
                        .map((response, index) => (
                          <div
                            key={index}
                            className="relative flex justify-between items-center border-b py-4"
                          >
                            <div className="flex items-center gap-4">
                              <Icon type="user" className="w-6 h-6" />
                              <span>{response.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div onClick={() => toggleExpand(index)}>
                                <Icon
                                  type="morevertical"
                                  className="ml-2 cursor-pointer"
                                />
                              </div>
                              <span className="text-black font-semibold">
                                {response.comment}
                              </span>
                            </div>
                            {expandedIndex === index && (
                              <div className="absolute right-36 bg-white shadow-md rounded-lg p-4 mt-2 ">
                                <button
                                  onClick={() =>
                                    handleImageClick(response.images)
                                  }
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="imageup" className="w-6 h-6" />
                                  View upload image
                                </button>
                                <button
                                  onClick={() => handleComment()}
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="chat" className="w-6 h-6" />
                                  View additional comment
                                </button>
                              </div>
                            )}
                          </div>
                        ))}

                    {individualActiveTab === 'veryUnclean' &&
                      responses
                        .filter(response => response.comment === 'Very unclean')
                        .map((response, index) => (
                          <div
                            key={index}
                            className="relative flex justify-between items-center border-b py-4"
                          >
                            <div className="flex items-center gap-4">
                              <Icon type="user" className="w-6 h-6" />
                              <span>{response.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div onClick={() => toggleExpand(index)}>
                                <Icon
                                  type="morevertical"
                                  className="ml-2 cursor-pointer"
                                />
                              </div>
                              <span className="text-black font-semibold">
                                {response.comment}
                              </span>
                            </div>
                            {expandedIndex === index && (
                              <div className="absolute right-36 bg-white shadow-md rounded-lg p-4 mt-2 ">
                                <button
                                  onClick={() =>
                                    handleImageClick(response.images)
                                  }
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="imageup" className="w-6 h-6" />
                                  View upload image
                                </button>
                                <button
                                  onClick={() => handleComment()}
                                  className="flex items-center gap-2 px-2 py-2  text-gray-600 rounded-lg hover:bg-gray-100"
                                >
                                  <Icon type="chat" className="w-6 h-6" />
                                  View additional comment
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                    <CustomModal
                      width="45%"
                      height="65%"
                      isOpen={isModalOpen1}
                      onClose={() => setIsModalOpen1(false)}
                    >
                      <div className="flex flex-col items-center justify-center p-12 m-auto w-[90%]">
                        <h1 className="text-2xl font-semibold">
                          Additional comments based on response
                        </h1>
                        <h2 className="text-xl my-8 text-[#007A61] bg-[#f1fffc] font-semibold">
                          Very unclean
                        </h2>
                        <h3 className="text-lg  text-gray-600 ">
                          QHS is poorly maintained, with unsanitary conditions
                          observed in patient rooms, hallways, and restrooms.
                          Waste is often improperly disposed of, and cleaning
                          protocols seem lacking. These unhygienic conditions
                          raise serious concerns for patient safety and
                          well-being.
                        </h3>
                        <div className="flex justify-between items-center  py-4 w-full mt-8">
                          <div className="flex items-center gap-4">
                            <Icon type="user" className="w-6 h-6" />
                            <span>Deborah N.</span>
                          </div>
                          <span className="text-gray-700 font-semibold">
                            Nov. 12,2024
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
              </div>{' '}
            </div>
          ) : null
        )}
    </div>
  )
}

export default ViewResponse
