import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import {
  triggerGetSurveyQuestions,
  triggerGetSurveyResponses,
} from '../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../state'
import GoBack from '../GoBack'
import Acceptability from './Acceptability'

const ViewResponse: React.FC = () => {
  const location = useLocation()
  const { name, icon } = location.state || {}
  const [activeTab, setActiveTab] = useState<string>('acceptability')
  const { indicatorId } = useParams<{ indicatorId: string }>()
  const [questionId, seQuestionId] = useState('')
  const dispatch: AppDispatch = useDispatch()
  const { error, resData, message, statusCode, surveyResponses } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )

  //Get questions
  useEffect(() => {
    if (indicatorId) {
      dispatch(triggerGetSurveyQuestions({ indicatorId }))
    }
  }, [dispatch, indicatorId])

  useEffect(() => {
    console.log('Raw resData:', resData)
    if ((statusCode === 200 || resData) && resData) {
      if (Array.isArray(resData)) {
        const questionIds = resData.map(q => q.identifier)
        console.log('Mapped question IDs:', questionIds)
        seQuestionId(questionIds[0])
      } else if (Array.isArray(resData.results)) {
        const questionIds = resData.results.map(q => q.identifier)
        console.log('Mapped question IDs from results:', questionIds)
        seQuestionId(questionIds[0])
      } else {
        console.warn(
          'resData is not an array or does not contain results array'
        )
      }
    }
    if (error && message) {
      console.log('Error fetching questions')
    }
  }, [error, message, resData, statusCode])

  //Get responses
  useEffect(() => {
    if (!indicatorId) {
      toast.error('required data null')
      return
    }
    dispatch(
      triggerGetSurveyResponses({
        institution_id: 'your_institution_id',
        indicator_id: indicatorId,
        question_id: questionId,
        data: {},
      })
    )
  }, [dispatch, indicatorId, questionId])

  useEffect(() => {
    if (surveyResponses.statusCode === 200 || surveyResponses.data) {
      console.log('Response seen', surveyResponses.data)
    }
    if (surveyResponses.error && surveyResponses.message) {
      console.log('Error fetching response')
    }
  }, [
    surveyResponses.data,
    surveyResponses.error,
    surveyResponses.message,
    surveyResponses.statusCode,
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

      <div className="flex mb-6 w-full space-x-4  rounded-xl ">
        <button
          className={`py-2  ${
            activeTab === 'acceptability'
              ? 'bg-white border-b-2 border-b-[#007A61] text-[#007A61]'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('acceptability')}
        >
          Acceptability of Service
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'competency'
              ? 'bg-white border-b-2 border-b-[#007A61] text-[#007A61]'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('competency')}
        >
          Competency of health workers
        </button>

        <button
          className={`py-2 px-4 ${
            activeTab === 'privacy'
              ? 'bg-white border-b-2 border-b-[#007A61] text-[#007A61]'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy and confidentiality
        </button>

        <button
          className={`py-2 px-4 ${
            activeTab === 'global'
              ? 'bg-white border-b-2 border-b-[#007A61] text-[#007A61]'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('global')}
        >
          Global assessment
        </button>
      </div>

      {activeTab === 'acceptability' && <Acceptability />}
      {activeTab === 'competency' && 'Competency of health workers'}
      {activeTab === 'privacy' && 'Privacy and confidentiality'}
      {activeTab === 'global' && 'Global assessment'}
    </div>
  )
}

export default ViewResponse
