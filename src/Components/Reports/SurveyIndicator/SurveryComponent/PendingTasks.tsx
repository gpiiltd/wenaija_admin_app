import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import Icon from '../../../../Assets/svgImages/Svg_icons_and_images'
import { triggerGetPendingTasks } from '../../../../features/reports/communityTaskManagement/communityTaskThunk'
import { get } from '../../../../network/https'
import { AppDispatch, RootState } from '../../../../state'
import { TypographyVariant } from '../../../types'
import Typography from '../../../Typography'

const PendingTasks = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { pendingTasks } = useSelector(
    (state: RootState) => state.communityTaskManagement
  )
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)
  const [tasks, setTasks] = useState<any[]>([])
  useEffect(() => {
    dispatch(triggerGetPendingTasks({}))
  }, [dispatch])

  useEffect(() => {
    if (pendingTasks.statusCode === 200 || pendingTasks.data) {
      console.log(
        'PT',
        JSON.stringify(pendingTasks.data.results?.results, null, 2)
      )
      setNextPageUrl(pendingTasks.data.results?.next || null)
      setTasks(pendingTasks.data.results?.results || [])
    }
    if (pendingTasks.error && pendingTasks.message !== '') {
      toast.error(pendingTasks.message)
      console.log('Error fetching ALL PT')
    }
  }, [
    dispatch,
    pendingTasks.data,
    pendingTasks.error,
    pendingTasks.message,
    pendingTasks.statusCode,
  ])

  const loadMore = async () => {
    if (!nextPageUrl) return
    try {
      const httpsUrl = nextPageUrl.replace(/^http:\/\//i, 'https://')
      const res = await get({
        url: httpsUrl,
      })
      const newResults =
        Array.isArray(res.results?.results) && res.results?.results
          ? res.results?.results
          : []
      if (newResults.length > 0) {
        setTasks(prev => prev.concat(newResults))
      }
      setNextPageUrl(res.results?.next)
    } catch (error) {
      toast.error('Failed to load more tasks')
      console.error('Load more error', error)
    }
  }

  return (
    <div>
      <div className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200">
        {pendingTasks.loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#D0D5DD" />
          </div>
        ) : pendingTasks.error ? (
          <div className="text-center mt-10 text-red-600">
            <h4 className="text-lg font-semibold">
              Error: {pendingTasks.message}
            </h4>
          </div>
        ) : Array.isArray(pendingTasks?.data?.results?.results) &&
          pendingTasks.data.results.results.length > 0 ? (
          <div className="flex flex-col gap-4">
            {pendingTasks.data.results.results.map(
              (submission: any, index: number) => (
                <div
                  key={submission.identifier}
                  className="flex justify-between items-center gap-6 border-b pb-4"
                >
                  {/* Name & Email */}
                  <div className="flex flex-col  max-w-[250px] flex-grow">
                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="font-semibold text-lg"
                    >
                      {submission.agent_name}
                    </Typography>
                    <span className="text-gray-500 font-light">
                      {submission.agent_email}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="flex flex-col min-w-[150px] max-w-[200px] flex-grow">
                    <span className="text-sm text-[#717D96] font-medium">
                      Category
                    </span>
                    <span
                      className="text-gray-700 font-light truncate"
                      title={submission.indicator?.category_name}
                    >
                      {submission.indicator?.category_name ?? 'N/A'}
                    </span>
                  </div>

                  {/* Indicator */}
                  <div className="flex flex-col min-w-[150px] max-w-[200px] flex-grow">
                    <span className="text-sm text-[#717D96] font-medium">
                      Indicator
                    </span>
                    <span
                      className="text-gray-700 font-light truncate"
                      title={submission.indicator?.name}
                    >
                      {submission.indicator?.name ?? 'N/A'}
                    </span>
                  </div>

                  {/* Date Submitted */}
                  <div className="flex flex-col min-w-[150px] max-w-[200px] flex-grow">
                    <span className="text-sm text-[#717D96] font-medium">
                      Date submitted
                    </span>
                    <span className="text-[#FF725E] font-light">
                      {new Date(submission.created_at).toLocaleString()}
                    </span>
                  </div>

                  {/* Review Button */}
                  <div className="min-w-[130px] flex justify-end">
                    <button
                      className="flex items-center gap-2 px-6 py-3 bg-[#007A61] text-white rounded-lg"
                      onClick={() =>
                        navigate(
                          `/app/reports/view-pending-response/${submission.identifier}`
                        )
                      }
                    >
                      Review
                      <span>
                        <Icon type="searchZoom" className="w-6 h-6" />
                      </span>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="text-center mt-10 text-gray-600">
            <h4 className="text-lg font-semibold">
              No pending tasks available.
            </h4>
          </div>
        )}
      </div>
      {nextPageUrl && (
        <button
          className="flex items-center mx-auto mt-5 mb-10 gap-2 px-[10rem] py-4 border border-[#000000] rounded-lg hover:bg-gray-50"
          onClick={loadMore}
        >
          Load More
        </button>
      )}
    </div>
  )
}

export default PendingTasks
