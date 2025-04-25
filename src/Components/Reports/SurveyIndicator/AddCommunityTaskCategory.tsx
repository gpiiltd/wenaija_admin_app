import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { resetCreateCategoriesState } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import { triggerCreateCategories } from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../../state'
import Button from '../../Button'
import showCustomToast from '../../CustomToast'
import ReportDialog from '../ReportDialogs'

interface CreateCategoryProps {
  isOpen?: boolean
  setIsOpen?: (value: boolean) => void
}

const CreateCommunityTaskCategory: React.FC<CreateCategoryProps> = ({
  isOpen: externalIsOpen,
  setIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')
  const dispatch: AppDispatch = useDispatch()
  const { createCategories } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )

  const handleCreateCategory = () => {
    const payload = {
      name: categoryName.trim(),
      description: description.trim(),
      category_type: 'community_task',
    }
    dispatch(triggerCreateCategories(payload))
  }

  useEffect(() => {
    if (createCategories.statusCode === 201 && createCategories.data) {
      showCustomToast('Success', `${createCategories.message}`)
      console.log(
        'CATEGORY DISPATCHED',
        JSON.stringify(createCategories.data.results)
      )
      setTimeout(() => {
        setCategoryName('')
        setDescription('')
        setIsOpenState(false)
        window.location.reload()
      }, 2000)
    }
    if (createCategories.error && createCategories.message !== '') {
      console.log('Error creating category')
      const fieldErrors = createCategories.data?.name
      const detailedError = Array.isArray(fieldErrors) ? fieldErrors[0] : ''
      toast.error(
        `${createCategories.message}${
          detailedError ? `: ${detailedError}` : ''
        }`
      )
      setTimeout(() => {
        setCategoryName('')
        setDescription('')
        setIsOpenState(false)
      }, 2000)
    }
    dispatch(resetCreateCategoriesState())
  }, [
    createCategories.data,
    createCategories.error,
    createCategories.message,
    createCategories.statusCode,
    dispatch,
  ])

  const isOpen = externalIsOpen ?? internalIsOpen
  const setIsOpenState = setIsOpen ?? setInternalIsOpen

  return (
    <>
      <ToastContainer />
      <ReportDialog
        title="Create new category"
        isOpen={isOpen}
        onClose={() => setIsOpenState(false)}
      >
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal">Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              className="border rounded w-full p-2 mt-1"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-normal">Description</label>
            <textarea
              placeholder="Write description here"
              className="border rounded w-full p-2 mt-1"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
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
                active={categoryName.trim() !== '' && description.trim() !== ''}
                bg_color="#007A61"
                text_color="white"
                loading={createCategories.loading}
                onClick={handleCreateCategory}
              />
            </div>
          </div>
        </form>
      </ReportDialog>
    </>
  )
}

export default CreateCommunityTaskCategory
