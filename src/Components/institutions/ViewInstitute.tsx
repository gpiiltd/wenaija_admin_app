import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FaAngleRight } from 'react-icons/fa6'
import {
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from 'react-icons/hi'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'

import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { resetUpdateInstitution } from '../../features/institutions/institutionManagementSlice'
import {
  triggerListASingleInstitute,
  triggerListInstituteIndicator,
  triggerUpdateInstitute,
} from '../../features/institutions/institutionManagementThunk'
import { AppDispatch, RootState } from '../../state'
import Button from '../Button'
import showCustomToast from '../CustomToast'
import { getColor, institutions } from './institutionData'

const ViewInstitute: React.FC = () => {
  const location = useLocation()
  const {
    name,
    address,
    operation_days,
    mobile_number,
    email,
    icon,
    opening_time,
    closing_time,
  } = location.state || {}
  const navigate = useNavigate()

  const handleViewResponse = () => {
    navigate('/app/instutitions/view-institute/view-response', {
      state: {
        name,
        address,
        mobile_number,
        email,
        icon,
        operation_days,
        opening_time,
        closing_time,
      },
    })
  }

  const dispatch: AppDispatch = useDispatch()
  const { institution, updateInstitute, instituteIndicators } = useSelector(
    (state: RootState) => state.institutionManagement
  )
  const { userId } = useParams<{ userId: string }>()
  const [isEditable, setIsEditable] = useState(false)
  const [editedName, setEditedName] = useState(name)
  const [editedAddress, setEditedAddress] = useState(address)
  const [editedPhone, setEditedPhone] = useState(mobile_number)
  const [editedEmail, setEditedEmail] = useState(email)
  const [editedOperationDays, setEditedOperationDays] = useState(
    institution?.data?.results?.operation_days || ''
  )
  const [editedOpeningTime, setEditedOpeningTime] = useState(
    institution?.data?.results?.opening_time || ''
  )
  const [editedClosingTime, setEditedClosingTime] = useState(
    institution?.data?.results?.closing_time || ''
  )

  const handleEdit = () => {
    setIsEditable(!isEditable)
  }

  useEffect(() => {
    if (userId) {
      dispatch(triggerListASingleInstitute(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (institution.statusCode === 200 || institution.data) {
      console.log('Institute seen', institution.data)
    }
    if (institution.error && institution.message) {
      console.log('Error fetching institute')
    }
  }, [
    institution.statusCode,
    institution.message,
    institution.data,
    institution.error,
  ])

  useEffect(() => {
    if (userId) {
      dispatch(triggerListInstituteIndicator(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    if (instituteIndicators.statusCode === 200 || instituteIndicators.data) {
      console.log('Institute indicator seen', instituteIndicators.data)
    }
    if (instituteIndicators.error && instituteIndicators.message) {
      console.log('Error fetching institute indicator')
    }
  }, [
    instituteIndicators.data,
    instituteIndicators.error,
    instituteIndicators.message,
    instituteIndicators.statusCode,
    institution.data,
  ])

  //Update institute
  const handleUpdateInstitute = async () => {
    const payload = {
      id: userId!,
      name: editedName || institution.data.results.name,
      email: editedEmail || institution.data.results.email,
      mobile_number: editedPhone || institution.data.results.mobile_number,
      address: editedAddress || institution.data.results.address,
      state: 1,
      local_government: 10,
      ward: 1,
      operation_days:
        editedOperationDays || institution.data.results.operation_days,
      opening_time: editedOpeningTime || institution.data.results.opening_time,
      closing_time: editedClosingTime,
      logo: 'https://example.com/logo.png',
    }
    console.log('payload', payload)
    dispatch(triggerUpdateInstitute(payload))
  }

  useEffect(() => {
    if (
      updateInstitute?.statusCode === 200 &&
      Object.keys(updateInstitute?.data).length > 0
    ) {
      console.log('Institute created SUCCESSFULLY', updateInstitute?.data)
      showCustomToast('Success', updateInstitute.message)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
    if (updateInstitute?.error && updateInstitute?.message) {
      console.log('Unsuccessful', updateInstitute?.message)
      toast.error(updateInstitute.message)
    }
    dispatch(resetUpdateInstitution())
  }, [
    updateInstitute?.loading,
    updateInstitute?.error,
    updateInstitute.message,
  ])

  return (
    <div className=" mx-auto mb-4">
      <ToastContainer />
      <div className="flex items-center justify-start gap-6 mb-8">
        <Link to="/app/instutitions">
          <Icon type="arrowBack" className="w-10 h-10" />
        </Link>
        <h1 className="text-2xl font-bold">View Institute</h1>
      </div>
      {institution?.data?.results && (
        <div className="bg-white rounded-lg p-6 border mb-4 ">
          <div className="flex items-center gap-4 mb-4">
            <Icon type="quotient" className="w-fit" />
            <input
              type="text"
              value={isEditable ? editedName : institution.data.results.name}
              onChange={e => setEditedName(e.target.value)}
              className={`text-lg font-semibold bg-transparent focus:outline-none ${
                isEditable ? 'border-b-2 border-gray-300' : ''
              }`}
              readOnly={!isEditable}
            />
          </div>

          <div className="flex">
            <div className="w-1/2">
              <div className="flex items-center gap-2 text-gray-600">
                <HiOutlineLocationMarker className="text-green-600" />

                <input
                  type="text"
                  value={
                    isEditable
                      ? editedAddress
                      : institution?.data?.results?.address
                  }
                  onChange={e => setEditedAddress(e.target.value)}
                  className={`w-full focus:outline-none ${
                    isEditable ? 'border-b-2 ' : ''
                  }`}
                  readOnly={!isEditable}
                />
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <HiOutlineClock className="text-green-600" />
                {isEditable ? (
                  <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
                    <select
                      value={editedOperationDays}
                      onChange={e => setEditedOperationDays(e.target.value)}
                      className="border-b-2 focus:outline-none w-full md:w-1/3 bg-transparent"
                    >
                      <option value="">Select operation days</option>
                      <option value="monday_to_friday">Monday to Friday</option>
                      <option value="monday_to_saturday">
                        Monday to Saturday
                      </option>
                      <option value="monday_to_sunday">Monday to Sunday</option>
                      <option value="saturday_only">Saturday only</option>
                      <option value="sunday_only">Sunday only</option>
                    </select>

                    <input
                      type="time"
                      value={editedOpeningTime}
                      onChange={e => setEditedOpeningTime(e.target.value)}
                      className="border-b-2 focus:outline-none w-full md:w-1/4"
                    />
                    <span>-</span>
                    <input
                      type="time"
                      value={editedClosingTime}
                      onChange={e => setEditedClosingTime(e.target.value)}
                      className="border-b-2 focus:outline-none w-full md:w-1/4"
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    value={`${institution?.data?.results?.operation_days?.replace(
                      /_/g,
                      ' '
                    )} (${institution?.data?.results?.opening_time} - ${
                      institution?.data?.results?.closing_time
                    })`}
                    readOnly
                    className="w-full bg-transparent focus:outline-none"
                  />
                )}
              </div>
            </div>

            <div className="mx-10 ">
              <div className=" md:col-span-1 md:border-l md:border-gray-300 md:h-full md:mx-4"></div>
            </div>

            <div className="w-1/2">
              <div className="flex items-center gap-2 text-gray-600">
                <HiOutlinePhone className="text-green-600" />
                <input
                  type="text"
                  value={
                    isEditable
                      ? editedPhone
                      : institution.data.results.mobile_number
                  }
                  onChange={e => setEditedPhone(e.target.value)}
                  className={`w-[70%] focus:outline-none ${
                    isEditable ? 'border-b-2 ' : ''
                  }`}
                  readOnly={!isEditable}
                />
              </div>{' '}
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <HiOutlineMail className="text-green-600" />
                <input
                  type="text"
                  value={
                    isEditable ? editedEmail : institution.data.results.email
                  }
                  onChange={e => setEditedEmail(e.target.value)}
                  className={`w-[70%] focus:outline-none ${
                    isEditable ? 'border-b-2 ' : ''
                  }`}
                  readOnly={!isEditable}
                />
              </div>{' '}
            </div>

            <div className="flex justify-center items-center">
              {' '}
              <Button
                icon={
                  isEditable ? (
                    <Icon type="savebutton" className="w-32 h-6" />
                  ) : (
                    <Icon type="edit" className="w-32 h-12" />
                  )
                }
                text=""
                bg_color="#007A61"
                text_color="white"
                border_color="border-green-500"
                active={true}
                loading={updateInstitute.loading}
                onClick={isEditable ? handleUpdateInstitute : handleEdit}
              />
            </div>
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-4 mt-8">Indicator</h2>
      <p className="text-gray-600 mb-4">
        See hospital performance based on their indicators.
      </p>
      <table className="min-w-full bg-white border rounded-xl border-gray-300">
        <thead>
          <tr className="text-left uppercase">
            <th className=" px-4 py-2">No</th>
            <th className=" px-4 py-2">Categories</th>
            <th className=" px-4 py-2">Score</th>
            <th className=" px-4 py-2">Hospital Rank</th>
            <th className=" px-4 py-2">Number of Responses</th>
            <th className=" px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {institutions.indicators.map(indicator => (
            <tr key={indicator.no}>
              <td className=" px-4 py-2">{indicator.no}</td>
              <td className=" px-4 py-2">{indicator.category}</td>
              <td className=" px-4 py-2">
                <CircularProgressbar
                  className="w-10 h-10"
                  value={indicator.score}
                  text={`${indicator.score}%`}
                  styles={{
                    path: { stroke: getColor(indicator.score) },
                    text: { fill: '#000', fontSize: '26px' },
                    trail: { stroke: '#d6d6d6' },
                  }}
                />
              </td>
              <td className=" px-4 py-2">{indicator.rank}th</td>
              <td className=" px-4 py-2 ">
                <div className="flex items-center gap-2 bg-[#f1fffc] w-36 rounded-xl pl-2">
                  <span className="text-[#007A61] font-bold">
                    {indicator.responses}{' '}
                  </span>{' '}
                  <span className="text-[#007A61]">responses</span>
                </div>
              </td>
              <td className="flex  px-4 py-2">
                <button
                  onClick={handleViewResponse}
                  className="flex items-center  gap-2 bg-white text-gray-600 py-2 px-4 border rounded-xl"
                >
                  View responses <FaAngleRight className="text-gray-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white rounded-lg p-6 border mb-4  mt-12">
        <h2 className="text-lg font-semibold mb-8">
          Generic reports or feedback on this facility
        </h2>
        <div className="flex">
          <div className="flex items-center  gap-4 w-1/2">
            <p className="text-gray-600">
              Uploaded images{' '}
              <span className="text-[#007A61] font-bold ml-4">{40} </span>{' '}
            </p>
            <button
              onClick={() =>
                navigate('/app/instutitions/view-institute/generic-report')
              }
              className="flex items-center  gap-2 bg-white text-gray-600 py-2 px-4 border rounded-xl ml-4"
            >
              See images <FaAngleRight className="text-gray-600" />
            </button>{' '}
          </div>

          <div className="mx-10 ">
            <div className=" md:col-span-1 md:border-l md:border-gray-300 md:h-full md:mx-4"></div>
          </div>

          <div className="flex items-center justify-center gap-4 w-1/2">
            <p className="text-gray-600">
              Reports{' '}
              <span className="text-[#007A61] font-bold ml-4">{12}</span>
            </p>
            <button
              onClick={() =>
                navigate('/app/instutitions/view-institute/generic-report')
              }
              className="flex items-center  gap-2 bg-white text-gray-600 py-2 px-4 border rounded-xl ml-4"
            >
              View reports <FaAngleRight className="text-gray-600" />
            </button>{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewInstitute
