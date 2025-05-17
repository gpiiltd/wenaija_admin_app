import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { resetCreateinstitutionState } from '../../features/institutions/institutionManagementSlice'
import {
  triggerAddInstitution,
  triggerListAllStates,
  triggerListStateLgas,
  triggerListWards,
} from '../../features/institutions/institutionManagementThunk'
import { AppDispatch, RootState } from '../../state'
import Button from '../Button'
import showCustomToast from '../CustomToast'
import { TypographyVariant } from '../types'
import Typography from '../Typography'
import { fields } from './institutionData'
import { OperationTimePicker } from './OperationaTimeKeeper'

interface FormData {
  hospitalName: string
  phoneNumber: string
  email: string
  state: string
  localGovt: string
  address: string
  ward: string
  [key: string]: string
}

type StateOption = {
  id: number
  name: string
}
type LgaOption = {
  id: number
  name: string
  state: string
}
type wardOption = {
  id: number
  name: string
  state: string
  local_government: number
}
interface AddInstitutionProps {
  onClose: () => void
}
const AddInstitution: React.FC<AddInstitutionProps> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch()
  const [image, setImage] = useState<File | null>(null)
  const [step, setStep] = useState(1)
  const [allWeekToggle, setAllWeekToggle] = useState(false)
  const [weekdaysToggle, setWeekdaysToggle] = useState(false)
  const [weekendsToggle, setWeekendsToggle] = useState(false)
  const [allWeekStart, setAllWeekStart] = useState('00:00')
  const [allWeekEnd, setAllWeekEnd] = useState('23:59')
  const [weekdaysStart, setWeekdaysStart] = useState('00:00')
  const [weekdaysEnd, setWeekdaysEnd] = useState('23:59')
  const [weekendsStart, setWeekendsStart] = useState('00:00')
  const [weekendsEnd, setWeekendsEnd] = useState('23:59')
  const [allState, setAllState] = useState<StateOption[]>([])
  const [allLgas, setAllLgas] = useState<LgaOption[]>([])
  const [allWards, setAllWards] = useState<wardOption[]>([])

  const { createInstitution, states, lgas, wards } = useSelector(
    (state: RootState) => state.institutionManagement
  )

  const [formData, setFormData] = useState<FormData>({
    hospitalName: '',
    phoneNumber: '',
    email: '',
    state: '',
    localGovt: '',
    address: '',
    ward: '',
  })
  let operation_days = ''
  let opening_time = ''
  let closing_time = ''

  if (allWeekToggle) {
    operation_days = 'monday_to_sunday'
    opening_time = allWeekStart
    closing_time = allWeekEnd
  } else if (weekdaysToggle) {
    operation_days = 'monday_to_friday'
    opening_time = weekdaysStart
    closing_time = weekdaysEnd
  } else if (weekendsToggle) {
    operation_days = 'saturday_to_sunday'
    opening_time = weekendsStart
    closing_time = weekendsEnd
  }
  const steps = [
    { id: 1, label: 'Profile Details' },
    { id: 2, label: 'Operational Hours' },
    { id: 3, label: 'Add Logo' },
  ]
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // setShowOperationHours(true)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  const handleCreateInstitution = () => {
    const form = new FormData()
    form.append('name', formData.hospitalName)
    form.append('email', formData.email)
    form.append('mobile_number', formData.phoneNumber)
    form.append('state', '5')
    form.append('local_government', '1')
    form.append('ward', '1')
    form.append('address', formData.address)
    form.append('operation_days', operation_days)
    form.append('opening_time', opening_time)
    form.append('closing_time', closing_time)
    if (image) {
      form.append('institution_file', image)
    }
    dispatch(triggerAddInstitution(form))

    console.log('Payload (FormData):')
    for (let pair of form.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`)
    }
    setTimeout(() => {
      onClose()
    }, 5000)
  }
  useEffect(() => {
    if (createInstitution?.statusCode === 201) {
      showCustomToast('Success', createInstitution.message)
      setTimeout(() => {
        onClose()
        dispatch(resetCreateinstitutionState())
        window.location.reload()
      }, 3000)
    } else if (
      createInstitution?.statusCode !== null &&
      createInstitution?.error
    ) {
      toast.error(createInstitution.message)
      dispatch(resetCreateinstitutionState())
    }
  }, [
    createInstitution?.statusCode,
    createInstitution?.error,
    createInstitution?.message,
    dispatch,
    onClose,
  ])
  useEffect(() => {
    dispatch(triggerListAllStates({}))
  }, [dispatch])

  useEffect(() => {
    if (states.statusCode === 200 || states.data) {
      console.log('STATES GOTTEN', JSON.stringify(states?.data, null, 2))
      setAllState(states.data?.results)
    }
    if (states.error && states.message) {
      console.log('Error fetching instituitons')
    }
  }, [states.data, states.error, states.message, states.statusCode])

  useEffect(() => {
    const selectedState = allState?.find(state => state.name === formData.state)
    if (selectedState?.id) {
      dispatch(triggerListStateLgas({ stateId: selectedState.id, data: {} }))
    }
  }, [formData.state, allState, dispatch])

  useEffect(() => {
    if (lgas.statusCode === 200 || lgas.data) {
      console.log('LGAS GOTTEN', JSON.stringify(lgas?.data, null, 2))
      setAllLgas(lgas.data.results)
    }
    if (lgas.error && lgas.message) {
      console.log('Error fetching instituitons')
    }
  }, [lgas.data, lgas.error, lgas.message, lgas.statusCode])

  useEffect(() => {
    const selectedLga = allLgas?.find(lga => lga.name === formData.localGovt)
    if (selectedLga?.id) {
      dispatch(triggerListWards({ lgaId: selectedLga.id, data: {} }))
    }
  }, [formData.localGovt, allLgas, dispatch])

  useEffect(() => {
    if (wards.statusCode === 200 && wards.data?.results) {
      console.log('WARDS GOTTEN', JSON.stringify(wards?.data, null, 2))
      setAllWards(wards.data.results)
    }
    if (wards.error && wards.message) {
      console.log('Error fetching wards')
    }
  }, [wards.data, wards.error, wards.message, wards.statusCode])

  return (
    <div className="flex flex-col  justify-center p-6 w-full">
      <ToastContainer />

      <h1 className="text-2xl font-bold  px-8">Add Institution</h1>
      <div className="w-full ">
        <div className="flex flex-col h-full px-11 py-6">
          {/* progress bar */}
          <div className="mb-6 mt-1">
            <div className="w-full h-1 bg-gray-200 rounded-full" />
            {/* Check icons */}
            <div className="flex justify-between items-center mt-[-12px] mb-2">
              {steps.map(({ id }) => (
                <div
                  key={id}
                  className={`w-5 h-5 flex items-center justify-center ${
                    id === 1 ? 'ml-0' : ''
                  } ${id === steps.length ? 'mr-0' : ''}`}
                >
                  {step >= id ? (
                    <FaCheckCircle color="#007A61" size={20} />
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded-full" />
                  )}
                </div>
              ))}
            </div>

            {/* Step labels */}
            <div className="flex justify-between mb-4 mt-2">
              {steps.map(({ id, label }) => (
                <div
                  key={id}
                  className={`text-sm text-center ${
                    step === id ? 'text-[#007A61]' : 'text-gray-500'
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Profile Details */}
          {step === 1 && (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded px-8 pt-3 pb-8 "
            >
              <Typography variant={TypographyVariant.NORMAL}>
                Please fill in the hospital details{' '}
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-3  mt-4">
                <div className="">
                  <label
                    className="block text-gray-600 text-sm  mb-2"
                    htmlFor="hospitalName"
                  >
                    Hospital name
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder="Enter Institution name"
                    className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                    required
                  />
                </div>

                <div className="">
                  <label
                    className="block text-gray-600 text-sm  mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter institution email"
                    className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="">
                  <label
                    className="block text-gray-600 text-sm  mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={e => {
                      const onlyNums = e.target.value.replace(/\D/g, '')
                      setFormData({ ...formData, phoneNumber: onlyNums })
                    }}
                    placeholder="Enter Institution phone number"
                    className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                    required
                  />
                </div>

                {fields.map(({ label, name, placeholder, options }) => (
                  <div key={name}>
                    <label
                      className="block text-gray-600 text-sm mb-2"
                      htmlFor={name}
                    >
                      {label}
                    </label>
                    <select
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                      required
                    >
                      <option value="">{placeholder}</option>

                      {name === 'state'
                        ? allState?.map(state => (
                            <option key={state.id} value={state.name}>
                              {state.name}
                            </option>
                          ))
                        : name === 'localGovt'
                          ? allLgas?.map(lga => (
                              <option key={lga.id} value={lga.name}>
                                {lga.name}
                              </option>
                            ))
                          : name === 'ward'
                            ? allWards?.map(ward => (
                                <option key={ward.id} value={ward.name}>
                                  {ward.name}
                                </option>
                              ))
                            : options.map((opt, idx) => (
                                <option key={idx} value={opt}>
                                  {opt}
                                </option>
                              ))}
                    </select>
                  </div>
                ))}

                <div className="">
                  <label
                    className="block text-gray-600 text-sm  mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Institution phone number"
                    className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:w-1/2 mx-auto">
                <button
                  type="button"
                  className="bg-white text-gray-700 font-bold py-2 px-4 border rounded-xl"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#007A61] text-white font-bold py-2 px-4 rounded-xl"
                  onClick={e => {
                    e.preventDefault()

                    const isStep1Complete =
                      formData.hospitalName?.trim() &&
                      formData.email?.trim() &&
                      formData.phoneNumber?.trim() &&
                      formData.address?.trim() &&
                      fields.every(({ name }) => formData[name]?.trim())

                    if (!isStep1Complete) {
                      alert('Please fill in all fields before proceeding.')
                      return
                    }

                    setStep(step + 1)
                  }}
                >
                  Proceed
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Operational Hours */}
          {step === 2 && (
            <>
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto">
                  <OperationTimePicker
                    label="Monday to Sunday"
                    isToggled={allWeekToggle}
                    onToggle={() => setAllWeekToggle(!allWeekToggle)}
                    startTime={allWeekStart}
                    endTime={allWeekEnd}
                    onStartTimeChange={setAllWeekStart}
                    onEndTimeChange={setAllWeekEnd}
                  />

                  <OperationTimePicker
                    label="Monday to Friday"
                    isToggled={weekdaysToggle}
                    onToggle={() => setWeekdaysToggle(!weekdaysToggle)}
                    startTime={weekdaysStart}
                    endTime={weekdaysEnd}
                    onStartTimeChange={setWeekdaysStart}
                    onEndTimeChange={setWeekdaysEnd}
                  />

                  <OperationTimePicker
                    label="Saturday to Sunday"
                    isToggled={weekendsToggle}
                    onToggle={() => setWeekendsToggle(!weekendsToggle)}
                    startTime={weekendsStart}
                    endTime={weekendsEnd}
                    onStartTimeChange={setWeekendsStart}
                    onEndTimeChange={setWeekendsEnd}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-1/2 mx-auto mt-36">
                  <button
                    type="button"
                    className="bg-white text-gray-700 font-bold py-2 px-4 border rounded-xl"
                    onClick={() => setStep(step - 1)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-[#007A61] text-white font-bold py-2 px-4 rounded-xl"
                    onClick={() => {
                      const isAllWeekValid =
                        !allWeekToggle || (allWeekStart && allWeekEnd)
                      const isWeekdaysValid =
                        !weekdaysToggle || (weekdaysStart && weekdaysEnd)
                      const isWeekendsValid =
                        !weekendsToggle || (weekendsStart && weekendsEnd)

                      const atLeastOneToggleOn =
                        allWeekToggle || weekdaysToggle || weekendsToggle

                      if (!atLeastOneToggleOn) {
                        alert(
                          'Please enable and configure at least one operating schedule.'
                        )
                        return
                      }

                      if (
                        !isAllWeekValid ||
                        !isWeekdaysValid ||
                        !isWeekendsValid
                      ) {
                        alert(
                          'Please select valid start and end times for enabled schedules.'
                        )
                        return
                      }

                      setStep(step + 1)
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Add Logo */}
          {step === 3 && (
            <>
              <Typography variant={TypographyVariant.NORMAL}>
                Please upload institution logo
              </Typography>
              <div className="flex flex-col items-center justify-center p-6">
                <span className="text-gray-500 mb-2">Upload logo</span>
                <div className="relative w-48 h-48 mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-full bg-gray-100 relative"
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      e.preventDefault()
                      const file = e.dataTransfer.files[0]
                      if (file && file.type.startsWith('image/')) {
                        setImage(file)
                      } else {
                        alert('Only image files are allowed.')
                      }
                    }}
                  >
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded logo"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-gray-500">No image selected</span>
                      </div>
                    )}

                    {/* Click-to-select (images only) */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file && file.type.startsWith('image/')) {
                          setImage(file)
                        } else {
                          alert('Only image files are allowed.')
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center w-[50%] mt-8 gap-8">
                  <Button
                    text="Back"
                    bg_color="white"
                    text_color="black"
                    border_color="border-green-500"
                    active={true}
                    loading={false}
                    onClick={() => setStep(step - 1)}
                  />
                  <Button
                    text="Submit"
                    bg_color="#007A61"
                    text_color="white"
                    border_color="border-green-500"
                    active={true}
                    loading={createInstitution.loading}
                    onClick={handleCreateInstitution}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddInstitution
