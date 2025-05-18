import React, { useEffect, useState } from 'react'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { TypographyVariant } from '../types'
import Typography from '../Typography'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import {
  resetDeleteIndicator,
  resetEditIndicator,
  resetState,
} from '../../features/reports/communityTaskManagement/communityTaskSlice'
import {
  triggerDeleteIndicator,
  triggerEditIndicator,
  triggerGetIndicator,
} from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../state'
import Button from '../Button'
import showCustomToast from '../CustomToast'
import GoBack from '../GoBack'
import CustomModal from '../Modal'
import ReportDialog from './ReportDialogs'

const IndividualIndicator: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  // const [expandedId, setExpandedId] = useState(1)
  const { indicatorId } = useParams<{ indicatorId: string }>()
  const [editCategory, showEditCategory] = useState(false)
  const {
    resData,
    loading,
    error,
    statusCode,
    message,
    editIndcator,
    deleteIndcator,
  } = useSelector((state: RootState) => state.communityTaskManagement)
  const [indicatorName, setIndicatorName] = useState('')
  const [description, setDescription] = useState('')
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    if (!indicatorId) return
    dispatch(triggerGetIndicator({ indicatorId }))
  }, [dispatch, indicatorId])

  useEffect(() => {
    if (statusCode === 200 || resData) {
      setIndicatorName(resData?.results?.name || '')
      setDescription(resData?.results?.description || '')
    }
    if (error && message) {
      console.log(message)
    }
  }, [dispatch, error, message, resData, statusCode])

  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [dispatch])

  const setDialogShown = () => {
    showEditCategory(true)
  }

  const handleEditIndicator = () => {
    if (!indicatorName && description) return
    const payload = {
      indicatorId: indicatorId!,
      name: indicatorName,
      description: description,
    }
    dispatch(triggerEditIndicator(payload))
  }
  useEffect(() => {
    if (editIndcator.statusCode === 200 && editIndcator.data) {
      showCustomToast('Success', editIndcator.message)
      setTimeout(() => {
        showEditCategory(false)
        window.location.reload()
      }, 2000)
    }
    if (editIndcator.error && editIndcator.message) {
      toast.error(editIndcator.message)
    }
    dispatch(resetEditIndicator())
  }, [
    dispatch,
    editIndcator.data,
    editIndcator.error,
    editIndcator.message,
    editIndcator.statusCode,
  ])

  //DELETE INDICATOR
  const handleDeleteIndicator = () => {
    if (!indicatorId) return
    dispatch(triggerDeleteIndicator({ indicatorId }))
  }
  useEffect(() => {
    if (deleteIndcator.statusCode === 200 && deleteIndcator.data) {
      showCustomToast(undefined, deleteIndcator.message)
      setTimeout(() => {
        navigate(-1)
      }, 3000)
    }

    if (deleteIndcator.error && deleteIndcator.message) {
      toast.error(deleteIndcator.message)
    }
    dispatch(resetDeleteIndicator())
  }, [
    deleteIndcator.data,
    deleteIndcator.error,
    deleteIndcator.message,
    deleteIndcator.statusCode,
    dispatch,
    navigate,
  ])

  if (loading || !resData) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#D0D5DD" size={50} />
      </div>
    )
  }

  if (statusCode === 404) {
    return (
      <div className="text-red-500 text-center text-sm bg-red-100 p-4 rounded">
        <Typography
          variant={TypographyVariant.NORMAL}
          className="px-3 py-1 inline-block rounded-full text-sm mb-4 font-semibold"
        >
          {message}
        </Typography>
      </div>
    )
  }

  return (
    <div className="w-full p-6">
      <ToastContainer />
      <ReportDialog
        title="Edit Indicator"
        isOpen={editCategory}
        onClose={() => {
          showEditCategory(false)
        }}
        children={
          <div>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="bg-green-100 text-[#007A61] px-3 py-1 inline-block rounded-full text-sm mb-4 font-semibold"
            >
              {resData?.results?.name}
            </Typography>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-normal">
                  Category Name
                </label>
                <input
                  type="text"
                  value={indicatorName}
                  onChange={e => setIndicatorName(e.target.value)}
                  placeholder="NCD Prevention"
                  className="border rounded w-full p-2 mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-normal">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="NCD prevention tasks..."
                  className="border rounded w-full p-2 mt-1 text-sm"
                />
              </div>
              <div className="flex justify-center gap-2">
                <Button
                  text="Cancel"
                  active={true}
                  border_color="#D0D5DD"
                  bg_color="#FFFFFF"
                  text_color="#344054"
                  loading={false}
                  onClick={() => showEditCategory(false)}
                />
                <Button
                  text="Submit"
                  active={
                    !!indicatorName.trim() &&
                    !!description.trim() &&
                    (indicatorName.trim() !== resData?.results?.name?.trim() ||
                      description.trim() !==
                        resData?.results?.description?.trim())
                  }
                  bg_color="#007A61"
                  text_color="white"
                  loading={editIndcator.loading}
                  onClick={handleEditIndicator}
                />
              </div>
            </form>
          </div>
        }
      />

      {/* Header Section */}
      <div className="">
        <div className="mb-6">
          <GoBack label={resData?.results?.name} />
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Community Task &gt; Indicators &gt;{' '}
            <span className="text-[#007A61]">View</span>
          </div>
        </div>

        <div className="bg-white p-6 border rounded-lg mb-8 flex flex-row justify-between">
          <div className="basis-2/3">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-xl font-bold"
            >
              {resData?.results?.name}
            </Typography>
            <Typography
              variant={TypographyVariant.NORMAL}
              className="text-gray-600"
            >
              {resData?.results?.description}
            </Typography>
          </div>
          <div className="flex flex-row gap-2 mx-auto my-4">
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 px-6 border rounded-lg h-14"
            >
              <Icon type="deleteIcon" className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={setDialogShown}
              className="flex items-center gap-2 px-6  text-white border rounded-lg bg-[#007A61]"
            >
              <Icon type="editIcon" className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
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
            Are you sure you want to delete this indicator?
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
                loading={deleteIndcator.loading}
                onClick={handleDeleteIndicator}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default IndividualIndicator
