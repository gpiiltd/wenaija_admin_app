import React, { useEffect, useState } from 'react'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { TypographyVariant } from '../types'
import Typography from '../Typography'

import { FaRegEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import { resetDeleteTask } from '../../features/reports/communityTaskManagement/communityTaskSlice'
import {
  triggerDeleteTask,
  triggerGetIndicator,
  triggerViewTask,
} from '../../features/reports/communityTaskManagement/communityTaskThunk'
import { AppDispatch, RootState } from '../../state'
import Button from '../Button'
import showCustomToast from '../CustomToast'
import GoBack from '../GoBack'
import CustomModal from '../Modal'

const IndividualTaskPoser: React.FC = () => {
  const navigate = useNavigate()
  const { taskId } = useParams<{ taskId: string }>()
  const location = useLocation()
  const indicatorId = location.state?.indicatorId
  const responseCount = location.state?.responseCount
  const [openModal, setOpenModal] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  const { viewTask, resData, loading, deleteTask } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )

  const handleNavigateEditView = () => {
    navigate('/app/reports/task-poser/view/edit')
  }

  useEffect(() => {
    if (taskId) {
      dispatch(triggerViewTask({ taskId }))
    }
  }, [dispatch, taskId])

  useEffect(() => {
    if (indicatorId) {
      dispatch(triggerGetIndicator({ indicatorId }))
    }
  }, [dispatch, indicatorId])

  const handledeleteTask = () => {
    if (taskId) {
      dispatch(triggerDeleteTask({ taskId }))
    }
  }
  useEffect(() => {
    if (deleteTask.statusCode === 200 && deleteTask.data) {
      showCustomToast('Success', `${deleteTask.message}`)
      setTimeout(() => {
        setOpenModal(false)
        navigate(-1)
      }, 2000)
    } else if (deleteTask.error) {
      toast.error(deleteTask.message)
    }
    dispatch(resetDeleteTask())
  }, [
    deleteTask.data,
    deleteTask.error,
    deleteTask.message,
    deleteTask.statusCode,
    dispatch,
    navigate,
  ])
  if (viewTask.loading || loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#D0D5DD" size={50} />
      </div>
    )
  }

  return (
    <div className="w-full p-6">
      <ToastContainer />
      {/* Header Section */}
      <div className="">
        <div className="mb-6">
          <GoBack label={'Task View'} />

          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-4">
            Reports &gt; Community Task &gt; Task &gt;{' '}
            <span className="text-[#007A61]">View</span>
          </div>
        </div>

        <div className="mx-[15rem] mt-16 p-6 bg-white border border-1 border-[#000000] rounded-md">
          {/* Tags (static or dynamic if needed) */}
          <div className="flex gap-2 mb-3">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="px-3 bg-[#ffdee5] text-[#7A0019] py-1 text-sm font-semibold bg-red-100 rounded-full"
            >
              {resData?.results?.name}
            </Typography>
          </div>

          {/* Rendered Question */}
          <h2 className="text-lg font-semibold text-gray-900">
            {viewTask.data?.results?.question}
          </h2>

          {/* Max Points */}
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <span className="text-[#ED7D31] flex flex-row items-center justify-center">
              <Icon type="star" className="" />{' '}
              {viewTask.data?.results?.max_points} star points
            </span>
            <span className="mx-2">|</span>
            <Typography variant={TypographyVariant.NORMAL}>
              {responseCount} responses
            </Typography>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 mr-[15rem] gap-3 flex justify-end">
        <button
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md flex flex-row items-center"
          onClick={() => setOpenModal(true)}
        >
          <Icon type="deleteIcon" className="pr-2" />
          <span>Delete</span>
        </button>

        <button
          className="px-4 py-2 text-white bg-[#007A61] rounded-md flex flex-row items-center"
          onClick={() => navigate('/app/reports/view-pending-task')}
        >
          <FaRegEye className="mr-2" />
          View responses
        </button>
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
            Are you sure you want to delete this task?
          </Typography>

          <div className="flex justify-center mt-4 gap-2">
            <div className="w-[7rem] mr-2">
              <Button
                text="No"
                active={true}
                border_color="#D0D5DD"
                bg_color="#FFFFFF"
                text_color="#344054"
                loading={false}
              />
            </div>

            <div className="w-[7rem]">
              <Button
                text="Yes"
                active={true}
                bg_color="#007A61"
                text_color="white"
                loading={deleteTask.loading}
                onClick={handledeleteTask}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default IndividualTaskPoser
