import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import Icon from '../../Assets/svgImages/Svg_icons_and_images'
import { resetinstitutionState } from '../../features/institutions/institutionManagementSlice'
import {
  triggerGetInstitutionsAnalytics,
  triggerListAllInstitutions,
} from '../../features/institutions/institutionManagementThunk'
import { AppDispatch, RootState } from '../../state'
import Button from '../Button'
import CustomModal from '../Modal'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
const AllInstitutions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()
  const [isModalOpen1, setIsModalOpen1] = useState(false)
  const [formData, setFormData] = useState({
    state: '',
    localGovt: '',
    ward: '',
  })

  const { allInstitution, institutionAnalytics } = useSelector(
    (state: RootState) => state.institutionManagement
  )
  const totalPages = Math.ceil(
    parseInt(allInstitution.data.results?.count) / 10
  )
  const itemsPerPage = 10

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(triggerListAllInstitutions({ page: 1 }))
  }, [dispatch])

  const handlePageChange = (page: number) => {
    dispatch(triggerListAllInstitutions({ page }))
    setCurrentPage(page)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    dispatch(triggerListAllInstitutions({}))
    console.log('Dispatching triggerListAllInstitutions...')
  }, [dispatch])

  useEffect(() => {
    console.log(
      'ALL INSTITUTIONS ',
      JSON.stringify(allInstitution.data.results, null, 2)
    )
    if (allInstitution.statusCode === 200 || allInstitution.data) {
      console.log(
        'ALL INSTITUTIONS ',
        JSON.stringify(allInstitution.data.results)
      )
    }
    if (allInstitution.error && allInstitution.message) {
      console.log('Error fetching ALL INSTITUTIONS')
    }
    // dispatch(resetinstitutionState())
  }, [
    dispatch,
    allInstitution.data,
    allInstitution.error,
    allInstitution.message,
    allInstitution.statusCode,
  ])

  useEffect(() => {
    dispatch(triggerGetInstitutionsAnalytics({}))
  }, [dispatch])

  useEffect(() => {
    if (institutionAnalytics.statusCode === 200 || institutionAnalytics.data) {
    }
    if (institutionAnalytics.error && institutionAnalytics.message) {
      console.log('Error fetching INSTITUTIONS ANALYTICS')
    }
    dispatch(resetinstitutionState())
  }, [
    dispatch,
    institutionAnalytics.data,
    institutionAnalytics.error,
    institutionAnalytics.message,
    institutionAnalytics.statusCode,
  ])

  if (allInstitution.loading || !allInstitution.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#667085" size={50} />
      </div>
    )
  }
  return (
    <div className="px-2">
      <div className="flex items-center justify-start gap-6 mb-8">
        <Link to="/app/instutitions">
          <Icon type="arrowBack" className="w-10 h-10" />
        </Link>
        <Typography variant={TypographyVariant.TITLE} className="font-semibold">
          View all institutions
        </Typography>{' '}
      </div>
      <div className="flex justify-between my-6">
        <div>
          <div className="flex items-center gap-2">
            <Typography
              variant={TypographyVariant.SUBTITLE}
              className="text-dark_gray font-bold text-xl"
            >
              All institution
            </Typography>
            <span className="text-[#007A61] px-2 py-1 font-semibold bg-[#f1fffc] rounded-lg">
              {institutionAnalytics?.data?.results?.total_institutions}
            </span>
          </div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-l_gray "
          >
            See recently added institution and keep track of their indicator
            ratings.{' '}
          </Typography>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex items-center border rounded-lg">
            <HiOutlineSearch className="text-l_gray w-6 h-6 ml-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none ml-2"
            />
          </div>
          <Button
            text="Filters"
            bg_color="white"
            text_color="black"
            border_color="border-green-500"
            active={true}
            loading={false}
            icon={<Icon type="filterlines" className="" />}
            onClick={() => setIsModalOpen1(true)}
          />

          <Button
            text="Export"
            bg_color="#007A61"
            text_color="white"
            border_color="border-green-500"
            active={true}
            loading={false}
            icon={<Icon type="export" className="" />}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex items-center gap-2 mr-2 shadow py-3 rounded-lg px-2">
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-dark_gray font-semibold"
          >
            Acceptability of services
          </Typography>
        </div>
        <div className="flex items-center gap-2 mr-2 shadow py-3 rounded-lg px-2">
          <div className="w-6 h-6 bg-[#C379D6] rounded-full"></div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-dark_gray font-semibold"
          >
            Competency of health workers
          </Typography>
        </div>
        <div className="flex items-center gap-2 mr-2 shadow py-3 rounded-lg px-2">
          <div className="w-6 h-6 bg-[#9878E1] rounded-full"></div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-dark_gray font-semibold"
          >
            Privacy and confidentiality
          </Typography>
        </div>
        <div className="flex items-center gap-2 mr-2 shadow py-3 rounded-lg px-2">
          <div className="w-6 h-6 bg-[#DFAA54] rounded-full"></div>
          <Typography
            variant={TypographyVariant.SMALL}
            className="text-dark_gray font-semibold"
          >
            Global assessment
          </Typography>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border-2 border-b-0 mt-8">
        <table className="min-w-full  rounded-t-xl">
          <thead>
            <tr className="text-[#667085] font-semibold text-left border-b-2 rounded-t-xl bg-[#F9FAFB]">
              <th className=" px-4 ">NO</th>
              <th className="px-4  ">Institute name</th>
              <th className="px-4  ">Address</th>
              <th className="px-4  ">Date registered</th>
              <th className="px-4  ">
                <Icon type="greensort" className="w-12 h-12 cursor-pointer" />
              </th>
              <th className="px-4  ">
                <Icon type="purplesort" className="w-12 h-12 cursor-pointer" />
              </th>
              <th className="px-4  ">
                <Icon type="yellowsort" className="w-12 h-12 cursor-pointer" />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allInstitution?.data?.results?.results?.length > 0 ? (
              allInstitution?.data?.results?.results?.map(
                (institution: any, index: number) => (
                  <tr
                    key={institution.identifier}
                    className="border-b-2 text-dark_gray align-middle"
                  >
                    <td className="px-4 py-4 text-center w-12">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="px-4 py-4 w-64">
                      <div className="flex items-center gap-3">
                        {institution.logo ? (
                          <img
                            src={institution.logo}
                            alt={institution.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <Icon type="quotient" className="w-12 h-12" />
                        )}
                        <div className="truncate">
                          <span className="block text-sm font-semibold truncate">
                            {institution.name}
                          </span>
                          <span className="text-sm text-l_gray truncate">
                            {institution.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm w-64 truncate">
                      {institution.address}
                    </td>

                    <td className="px-4 py-4 text-sm w-40">
                      {new Date(institution.date_created).toLocaleDateString()}
                    </td>

                    {['#64D158', '#9878E1', '#DFAA54'].map((color, i) => (
                      <td key={i} className="px-4 py-4 w-20 text-center">
                        <div className="w-10 h-10 mx-auto">
                          <CircularProgressbar
                            value={
                              institution.indicator_rating?.[0]?.score * 100 ||
                              0
                            }
                            text={`${institution.indicator_rating?.[0]?.score * 100 || 0}%`}
                            styles={{
                              path: { stroke: color },
                              text: { fill: '#000', fontSize: '26px' },
                              trail: { stroke: '#d6d6d6' },
                            }}
                          />
                        </div>
                      </td>
                    ))}

                    <td className="px-4 py-4 w-16 text-center">
                      <div
                        onClick={() =>
                          navigate(
                            `/app/instutitions/view-institute/${institution.identifier}`
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Icon type="morevertical" />
                      </div>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 border rounded-md"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!allInstitution.data?.results?.previous}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 border rounded-md"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!allInstitution.data?.results?.next}
        >
          Next
        </button>
      </div>
      <CustomModal
        width="45%"
        height="65%"
        isOpen={isModalOpen1}
        onClose={() => setIsModalOpen1(false)}
      >
        <div className="flex flex-col  px-12 ">
          <Typography
            variant={TypographyVariant.TITLE}
            className="text-dark_gray font-semibold "
          >
            Filter
          </Typography>
          <div className="flex flex-col w-full">
            <div className="mt-5">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="state"
              >
                By State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select state</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Abuja">Abuja</option>
                {/* Add state options here */}
              </select>
            </div>

            <div className="mt-8">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="localGovt"
              >
                By Local government
              </label>
              <select
                name="localGovt"
                value={formData.localGovt}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select local govt</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Abuja">Abuja</option>
                {/* Add local govt options here */}
              </select>
            </div>

            <div className="mt-8">
              <label
                className="block text-dark_gray text-sm  mb-2"
                htmlFor="ward"
              >
                By Ward
              </label>
              <select
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select ward</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Abuja">Abuja</option>
                {/* Add ward options here */}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center my-8 gap-4 mx-auto">
            <Button
              text="Clear filter"
              bg_color="white"
              text_color="black"
              border_color="border-green-500"
              active={true}
              loading={false}
            />

            <Button
              text="Apply filter"
              bg_color="#007A61"
              text_color="white"
              border_color="border-green-500"
              active={true}
              loading={false}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default AllInstitutions
