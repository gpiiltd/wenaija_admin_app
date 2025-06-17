import React, { useState } from 'react'
import AccessManagement from '../../Components/Settings/AccessManagement'
import Toast from '../../Components/Toast'
import ResetPassword from './ResetPassword'

const SettingView = () => {
  const [activeTab, setActiveTab] = useState('accessManagement')
  const [pin, setPin] = useState<string[]>(new Array(6).fill(''))
  const [pin2, setPin2] = useState<string[]>(new Array(6).fill(''))
  const [isFirstPinSet, setIsFirstPinSet] = useState(false)
  const [toast, setToast] = useState(false)

  const handleBackspace = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-input-${index - 1}`)
      if (prevInput) (prevInput as HTMLInputElement).focus()
    }
  }

  const handleBackspace2 = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !pin2[index] && index > 0) {
      const prevInput = document.getElementById(`pin2-input-${index - 1}`)
      if (prevInput) (prevInput as HTMLInputElement).focus()
    }
  }
  const handleChangePin = (value: string, index: number) => {
    const newPin = [...pin]
    newPin[index] = value.slice(0, 1)
    setPin(newPin)

    if (value && index < pin.length - 1) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`)
      if (nextInput) (nextInput as HTMLInputElement).focus()
    }
  }

  const handleChangePin2 = (value: string, index: number) => {
    setPin2(prevPin => {
      const newPin = [...prevPin]
      newPin[index] = value.slice(0, 1)
      return newPin
    })

    if (value && index < pin2.length - 1) {
      const nextInput = document.getElementById(`pin2-input-${index + 1}`)
      if (nextInput) (nextInput as HTMLInputElement).focus()
    }
  }

  const handleViewSwitch = () => {
    setIsFirstPinSet(true)
    console.log('First PIN:', pin.join(''))

    setTimeout(() => {}, 1000)
  }

  const handleChangeAuthCall = () => {
    setTimeout(() => {
      //   navigate("/signin");
      setToast(true)
      console.log('First PIN:', pin.join(''))
      console.log('Second PIN:', pin2.join(''))
    }, 0)
  }

  return (
    <div className="w-full  bg-black flex flex-col items-center">
      <Toast
        isVisible={toast}
        onCancel={() => setToast(false)}
        title={'2 factor authentication pin changed successfully'}
        subText={'Great job!'}
      />
      <div className="w-full min-h-screen bg-white p-6">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 text-md ${
              activeTab === 'accessManagement' ? 'font-bold' : 'font-normal'
            } ml-4 ${
              activeTab === 'accessManagement'
                ? 'border-b-2 border-[#007A61] text-[#007A61]'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('accessManagement')}
          >
            Access Management
          </button>
          {/* not integrated yet */}
          <button
            className={`px-4 py-2 text-md  ${
              activeTab === 'password' ? 'font-bold' : 'font-normal'
            }  ${
              activeTab === 'password'
                ? 'border-b-2 border-[#007A61] text-[#007A61]'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('password')}
          >
            Password reset
          </button>
          <button
            className={`px-4 py-2 text-md ${
              activeTab === 'authPin' ? 'font-bold' : 'font-normal'
            } ml-4 ${
              activeTab === 'authPin'
                ? 'border-b-2 border-[#007A61] text-[#007A61]'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('authPin')}
          >
            Change authentication pin
          </button>
          {/* not integrated yet */}
        </div>

        {/* Tab Content */}
        <div className="mt-10">
          {activeTab === 'accessManagement' && <AccessManagement />}
          {activeTab === 'password' && <ResetPassword />}
          {activeTab === 'authPin' && (
            <ChangeAuthPin
              pin={pin}
              pin2={pin2}
              isFirstPinSet={isFirstPinSet}
              handleBackspace={handleBackspace}
              handleChange={handleChangePin}
              handleChangeAuthPin={handleViewSwitch}
              handleSubmitAuthPin={handleChangeAuthCall}
              handleChange2={handleChangePin2}
              handleBackspace2={handleBackspace2}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingView

// Change Authentication PIN Form

interface ChangeAuthPinProps {
  pin: string[]
  pin2: string[]
  isFirstPinSet: boolean
  handleChangeAuthPin: any
  handleSubmitAuthPin: any
  handleChange: (value: string, index: number) => void
  handleBackspace: (e: React.KeyboardEvent, index: number) => void
  handleChange2: (value: string, index: number) => void
  handleBackspace2: (e: React.KeyboardEvent, index: number) => void
}

function ChangeAuthPin({
  pin,
  pin2,
  handleChangeAuthPin,
  handleSubmitAuthPin,
  isFirstPinSet,
  handleChange,
  handleBackspace,
  handleChange2,
  handleBackspace2,
}: ChangeAuthPinProps) {
  return (
    <div>
      {isFirstPinSet ? (
        <div className=" bg-white w-[32rem] mx-auto p-10 rounded-md shadow-md flex flex-col items-center justify-center">
          <div className="text-start w-full">
            <h1 className="text-2xl font-bold mb-1">
              Enter new authentication pin
            </h1>
            <p className="text-gray-500 text-md font-light mb-2">
              Kindly enter your new 6 digit security code{' '}
            </p>
          </div>

          <div className="flex space-x-6 mt-6 w-full">
            {pin2.map((_, index) => (
              <input
                key={index}
                id={`pin2-input-${index}`}
                type="text"
                value={pin2[index]}
                onChange={e => handleChange2(e.target.value, index)}
                onKeyDown={e => handleBackspace2(e, index)}
                className="w-12 h-12 text-center justify-stretch text-xl font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={1}
              />
            ))}
          </div>

          <button
            onClick={handleSubmitAuthPin}
            className="bg-[#007A61] py-3 w-full rounded-lg mt-10 text-white text-sm font-normal"
          >
            Submit Changes
          </button>
        </div>
      ) : (
        <div className=" bg-white w-[32rem] mx-auto p-10 rounded-md shadow-md flex flex-col items-center justify-center">
          <div className="text-start w-full">
            <h1 className="text-2xl font-bold mb-1">
              Enter current authentication Pin
            </h1>
            <p className="text-gray-500 text-md font-light mb-2">
              Kindly enter your 6 digit security code{' '}
            </p>
          </div>

          <div className="flex space-x-6 mt-6 w-full">
            {pin.map((_, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="text"
                value={pin[index]}
                onChange={e => handleChange(e.target.value, index)}
                onKeyDown={e => handleBackspace(e, index)}
                className="w-12 h-12 text-center justify-stretch text-xl font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={1}
              />
            ))}
          </div>

          <button
            onClick={handleChangeAuthPin}
            className="bg-[#007A61] py-3 w-full rounded-lg mt-10 text-white text-sm font-normal"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}
