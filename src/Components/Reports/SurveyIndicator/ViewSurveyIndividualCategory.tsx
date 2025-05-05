import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import Icon from '../../../Assets/svgImages/Svg_icons_and_images'
import {
  resetDeleteCategory,
  resetEditCategory,
  resetGetACategoryState,
} from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import {
  triggerDeleteCategory,
  triggerEditCategory,
  triggerGetACategory,
} from '../../../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveyThunk'
import { AppDispatch, RootState } from '../../../state'
import Button from '../../Button'
import showCustomToast from '../../CustomToast'
import GoBack from '../../GoBack'
import CustomModal from '../../Modal'
import { TypographyVariant } from '../../types'
import Typography from '../../Typography'
import ReportDialog from './../ReportDialogs'
import { Indicator } from './helper'

const SurveyViewIndividualCategory: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { categoryId } = useParams<{ categoryId: string }>()
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch()
  const { category, editCategory, deleteCategory } = useSelector(
    (state: RootState) => state.healthInstitutionSurveyManagement
  )

  const toggleSection = (id: string) => {
    setExpandedId(prevId => (prevId === id ? null : id))
  }
  const [editCategoryy, showeditCategoryy] = useState(false)

  const setToastShown = () => {
    showeditCategoryy(true)
  }
  const handleEditCategory = () => {
    if (!categoryId) {
      toast.error('Category ID is missing.')
      return
    }
    const payload = {
      id: categoryId,
      data: {
        name,
        description,
        is_active: 'true',
      },
    }
    console.log('PAYLOAD', payload)
    dispatch(triggerEditCategory(payload))
    setHasSubmitted(true)
  }

  useEffect(() => {
    // if (!hasSubmitted) return
    if (editCategory.statusCode === 200) {
      showCustomToast('Success', `${editCategory.message}`)
      setName(category.data.name || '')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else if (editCategory.error) {
      toast.error(editCategory.message)
    }

    dispatch(resetEditCategory())
  }, [
    dispatch,
    editCategory.statusCode,
    editCategory.error,
    editCategory.message,
    hasSubmitted,
    category.data.name,
  ])

  //delete category
  const handleDeleteCategory = (categoryId: string) => {
    if (!categoryId) {
      toast.error('Service ID is missing.')
      return
    }
    dispatch(triggerDeleteCategory(categoryId))
  }

  useEffect(() => {
    // if (!hasSubmitted) return
    if (deleteCategory.statusCode === 200 && deleteCategory.data) {
      showCustomToast('Success', `${deleteCategory.message}`)
      setTimeout(() => {
        navigate(-1)
      }, 3000)
    } else if (deleteCategory.error) {
      toast.error(deleteCategory.message)
    }

    dispatch(resetDeleteCategory())
  }, [
    deleteCategory.data,
    deleteCategory.error,
    deleteCategory.message,
    deleteCategory.statusCode,
    dispatch,
    navigate,
  ])

  useEffect(() => {
    if (categoryId && categoryId !== '') {
      dispatch(triggerGetACategory(categoryId))
    }
  }, [dispatch, categoryId])

  useEffect(() => {
    if (category.statusCode === 200 || category.data) {
      setIndicators(category.data.indicators)
    }
    if (category.error && category.message) {
    }
    dispatch(resetGetACategoryState())
  }, [
    category.statusCode,
    category.message,
    category.data,
    category.error,
    dispatch,
  ])
  if (category.loading || !category.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#D0D5DD" size={50} />
      </div>
    )
  }
  return (
    <div className="w-full mx-auto p-6">
      <ToastContainer />
      <ReportDialog
        title="Edit Category"
        isOpen={editCategoryy}
        onClose={() => showeditCategoryy(false)}
        children={
          <form className="flex flex-col gap-4" onSubmit={handleEditCategory}>
            <div>
              <label className="block text-sm font-normal">Category Name</label>
              <input
                type="text"
                placeholder="NCD Prevention"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border rounded w-full p-2 mt-1 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-normal">Description</label>
              <textarea
                placeholder="Description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="border rounded w-full p-2 mt-1 text-sm"
                required
              />
            </div>
            <div className="flex justify-center gap-2">
              <Button
                text="Cancel"
                active={true}
                border_color="#D0D5DD"
                bg_color="#FFFFFF"
                text_color="black"
                loading={false}
                onClick={() => showeditCategoryy(false)}
              />

              <Button
                text="Submit"
                active={!!name && !!description}
                bg_color="#007A61"
                text_color="white"
                loading={editCategory.loading}
                onClick={handleEditCategory}
              />
            </div>
          </form>
        }
      />
      <div className="mb-4">
        <div className="flex flex-row items-center">
          <GoBack label={category.data?.name} />
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-8">
        Reports &gt; Community task &gt; Categories &gt;{' '}
        <span className="text-[#007A61]">View</span>
      </div>
      {/* Header Section */}
      <div className="bg-white p-4 border rounded-lg mb-4 flex flex-row justify-between">
        <div className="max-w-[30rem]">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-2xl font-bold"
          >
            {category.data?.name}
          </Typography>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-gray-600"
          >
            {category.data?.description}
          </Typography>
        </div>

        <div className="flex gap-4 mt-3">
          {/* Buttons */}
          <div className="flex justify-start mt-4 gap-2">
            <div className="w-[7rem] mr-2">
              <Button
                text="Delete"
                active={true}
                border_color="#D0D5DD"
                bg_color="#FFFFFF"
                text_color="#344054"
                icon={<Icon type="deleteIcon" className="w-4 h-4" />}
                loading={false}
                onClick={() => setOpenModal(true)}
              />
            </div>

            <div className="w-[7rem]">
              <Button
                text="Edit"
                active={true}
                bg_color="#007A61"
                text_color="white"
                icon={<Icon type="editIcon" className="w-4 h-4" />}
                loading={false}
                onClick={setToastShown}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicators List */}
      <Typography
        variant={TypographyVariant.NORMAL}
        className="text-md font-semibold mb-4"
      >
        Indicators ({indicators?.length})
      </Typography>

      <div className="border rounded-lg overflow-hidden">
        {indicators?.map(indicator => (
          <div key={indicator.identifier} className="border-b last:border-0">
            {/* Accordion Header */}
            <button
              onClick={() => toggleSection(indicator.identifier)}
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-[#007A61] underline hover:bg-gray-50"
            >
              {indicator.name}
              <span>
                {expandedId === indicator.identifier ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </span>
            </button>

            {/* Indicator Description */}
            <div className="w-[34rem] text-left text-[#5E5959] pl-4">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="text-[#5E5959]"
              >
                {indicator.description}
              </Typography>
            </div>

            {/* Accordion Content */}
            {expandedId === indicator.identifier && (
              <div className="p-4 bg-white">
                {(indicator.tasks?.length ?? 0) > 0 ? (
                  <ul className="mt-2 space-y-3">
                    {indicator.tasks!.map((task, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center text-gray-700"
                      >
                        <div className="flex items-center basis-2/3 text-[#7A0019]">
                          <span className="w-6 h-6 flex items-center justify-center border-2 border-[#7A0019] text-red-500 font-normal rounded-full mr-3 p-3">
                            {index + 1}
                          </span>
                          <span className="text-[#5E5959] font-light">
                            {task.task_question}
                          </span>
                        </div>

                        <span className="text-orange-500 flex items-center basis-1/3 text-[#ED7D31] font-normal">
                          <Icon type="star" className="w-8 h-8" />
                          {task.task_star_point.toLocaleString()} star points
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No tasks available</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <CustomModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        width="200"
        height="fit"
      >
        <div className="px-5 py-3 pb-5">
          <Typography
            variant={TypographyVariant.SUBTITLE}
            className="text-[#5E5959] text-center"
          >
            Are you sure you want to delete this category?
          </Typography>

          <div className="flex justify-center mt-4 gap-2">
            <div className="w-[7rem] mr-2">
              <Button
                text="Cancel"
                active={true}
                border_color="#D0D5DD"
                bg_color="#FFFFFF"
                text_color="#344054"
                loading={false}
              />
            </div>

            <div className="w-[7rem]">
              <Button
                text="Delete"
                active={true}
                bg_color="#007A61"
                text_color="white"
                loading={deleteCategory.loading}
                onClick={() => handleDeleteCategory(categoryId!)}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default SurveyViewIndividualCategory
