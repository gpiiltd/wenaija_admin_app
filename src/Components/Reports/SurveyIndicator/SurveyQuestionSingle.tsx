import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { resetState } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import { triggerGetQuestions } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../../state'
import GoBack from '../../GoBack'
import { TypographyVariant } from '../../types'
import Typography from '../../Typography'
interface QuestionOption {
  identifier: string
  text: string
  weight: number
  requires_comment: boolean
  requires_image: boolean
}

interface Question {
  identifier: string
  indicator: string
  title: string
  type: 'Multiple choice' | string
  options?: QuestionOption[]
  created_at: string
  updated_at: string
}

const SurveyQuestionSingleView: React.FC = () => {
  const { indicatorId } = useParams<{ indicatorId: string }>()
  const dispatch: AppDispatch = useDispatch()
  const { loading, error, resData, message, statusCode } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )
  const [viewQuestions, setViewQuestions] = useState<Question[]>([])

  useEffect(() => {
    if (!indicatorId) return
    dispatch(triggerGetQuestions({ indicator_id: indicatorId }))
  }, [dispatch, indicatorId])

  useEffect(() => {
    if (statusCode === 200 || resData) {
      console.log('Survy questions', JSON.stringify(resData, null, 2))
      setViewQuestions(resData?.results?.results)
    }
    if (error && message !== '') {
      console.log('Error fetching ALL questions')
    }
    dispatch(resetState())
  }, [dispatch, error, message, resData, statusCode])

  return (
    <div className="w-full mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col">
        <div className="mb-10">
          <GoBack label={'Survey questions'} />
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Institutional survey &gt; Questions &gt;{' '}
            <span className="text-[#007A61]">View</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="bg-white p-6 border rounded-lg mb-8 flex flex-row justify-between">
          <div className="basis-2/4">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-xl font-bold"
            >
              Acceptability of service
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-600 font-light"
            >
              An acceptability of service survey for a health institute measures
              patient satisfaction, comfort, and trust in the services provided
            </Typography>
          </div>
        </div>
      </div>
      <div className="p-6 max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#D0D5DD" />
          </div>
        ) : viewQuestions && viewQuestions.length > 0 ? (
          viewQuestions.map((question, index) => (
            <div
              key={question.identifier}
              className="border p-4 mb-4 rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="font-semibold text-lg"
                >
                  Question {index + 1}
                </Typography>
              </div>

              <div className="w-full flex flex-row items-center mb-3">
                <p className="font-medium">{question.title}</p>
              </div>

              <div className="mt-2">
                <h3 className="font-medium">Options</h3>
                {question.options?.map((option, i) => (
                  <div
                    key={option.identifier}
                    className="flex flex-col items-start mt-2 mb-5 bg-gray-50 p-4 rounded-md"
                  >
                    <div className="w-full mb-2">
                      <p className="text-sm">
                        <strong>Option:</strong> {option.text}
                      </p>
                      <p className="text-sm">
                        <strong>Weight:</strong> {option.weight}
                      </p>
                    </div>

                    <div className="flex gap-6 mt-2">
                      <span className="text-sm text-gray-700">
                        <strong>Comment:</strong>{' '}
                        {option.requires_comment ? 'Yes' : 'No'}
                      </span>
                      <span className="text-sm text-gray-700">
                        <strong>Image Upload:</strong>{' '}
                        {option.requires_image ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg text-gray-600">
            No question available
          </div>
        )}
      </div>
    </div>
  )
}

export default SurveyQuestionSingleView
