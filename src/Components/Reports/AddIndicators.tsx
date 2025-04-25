import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  resetCategoriesState,
  resetCreateIndicatorsState,
} from '../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import {
  triggerCreateIndicators,
  triggerGetCategories,
} from '../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../state'
import Button from '../Button'
import showCustomToast from '../CustomToast'
import ReportDialog from './ReportDialogs'

interface AddIndicatorProps {
  isOpen?: boolean
  setIsOpen?: (value: boolean) => void
}
interface Category {
  identifier: string
  name: string
  category_type: string
  description: string
  created_at: string
  indicator_count: number
}
const AddIndicator: React.FC<AddIndicatorProps> = ({
  isOpen: externalIsOpen,
  setIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  const [indicatorName, setIndicatorName] = useState('')

  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')
  const [description, setDescription] = useState('')
  const isOpen = externalIsOpen ?? internalIsOpen
  const setIsOpenState = setIsOpen ?? setInternalIsOpen
  const dispatch: AppDispatch = useDispatch()
  const { surveyCategories, createIndicators } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )
  //CRAETE INDICATORS
  const handleCreateIndicator = () => {
    if (!selectedCategoryName || !description || !indicatorName) {
      toast.error('fields not filled')
      return
    }
    const payload = {
      name: indicatorName,
      description: description,
      category_identifier: selectedCategoryId,
    }
    console.log('Paload', payload)
    dispatch(triggerCreateIndicators(payload))
  }
  useEffect(() => {
    if (createIndicators.statusCode === 201 && createIndicators.data) {
      showCustomToast('Success', `${createIndicators.message}`)
      console.log(
        'INDICATOR DISPATCHED',
        JSON.stringify(createIndicators.data.results)
      )
      setSelectedCategoryName('')
      setDescription('')
      setIndicatorName('')
      setTimeout(() => {
        setIsOpenState(false)
        window.location.reload()
      }, 3000)
    }
    if (createIndicators.error && createIndicators.message !== '') {
      console.log('Error creating indicator')
      toast.error(createIndicators.message)
      setSelectedCategoryName('')
      setDescription('')
      setTimeout(() => {
        setIsOpenState(false)
      }, 2000)
    }
    dispatch(resetCreateIndicatorsState())
  }, [
    createIndicators.data,
    createIndicators.error,
    createIndicators.message,
    createIndicators.statusCode,
    dispatch,
    setIsOpenState,
  ])

  //GET surveyCategories
  useEffect(() => {
    dispatch(triggerGetCategories({}))
  }, [dispatch])

  useEffect(() => {
    if (surveyCategories.statusCode === 200 || surveyCategories.data) {
      if (Array.isArray(surveyCategories.data)) {
        setAllCategories(surveyCategories.data)
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = allCategories.find(
      category => category.name === e.target.value
    )
    setSelectedCategoryId(selectedCategory ? selectedCategory.identifier : '')
    setSelectedCategoryName(e.target.value)
  }
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value)
  }
  const handleIndicatorNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIndicatorName(e.target.value)
  }

  return (
    <>
      <ReportDialog
        title="Add Indicator"
        isOpen={isOpen}
        onClose={() => setIsOpenState(false)}
      >
        <form className="flex flex-col gap-4">
          {/* Select Category Dropdown */}
          <div>
            <label className="block text-sm font-normal">Select Category</label>
            <select
              className="border rounded w-full p-2 mt-1"
              onChange={handleCategoryChange}
            >
              <option value="">Select category</option>
              {allCategories?.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Indicator Dropdown (Filtered by Category) */}
          <div>
            <label className="block text-sm font-normal">Indicator Name</label>
            <input
              type="text"
              value={indicatorName}
              onChange={handleIndicatorNameChange}
              className="border rounded w-full p-2 mt-1"
              placeholder="Enter Indicator Name"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-normal">Description</label>
            <textarea
              placeholder="Write description here"
              className="border rounded w-full p-2 mt-1"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <div className="w-[7rem] mr-2">
              <Button
                text="Cancel"
                active={true}
                border_color="#D0D5DD"
                bg_color="#FFFFFF"
                text_color="black"
                loading={false}
                onClick={() => setIsOpenState(false)}
              />
            </div>

            <div className="w-[7rem]">
              <Button
                text="Submit"
                active={!!indicatorName && !!description}
                bg_color="#007A61"
                text_color="white"
                loading={createIndicators.loading}
                onClick={handleCreateIndicator}
              />
            </div>
          </div>
        </form>
      </ReportDialog>
    </>
  )
}

export default AddIndicator
