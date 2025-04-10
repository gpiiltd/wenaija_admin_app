import React, { useState } from "react";
import { AppDispatch, RootState } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { triggerAddInstitution } from "../../features/institutions/institutionManagementThunk";
import CustomModal from "../Modal";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import { OperationTimePicker } from "./OperationaTimeKeeper";
import showCustomToast from "../CustomToast";
import Button from "../Button";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";

interface AddInstitutionProps {
  onProceed: () => void;
  onCancel: () => void;
  onPrevious: () => void;
}
const AddInstitution: React.FC<AddInstitutionProps> = ({ onCancel }) => {
  const [showOperationHours, setShowOperationHours] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: "",
    phoneNumber: "",
    email: "",
    state: "",
    localGovt: "",
    address: "",
    ward: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const { createInstitution } = useSelector(
    (state: RootState) => state.institutionManagement
  );
  const [image, setImage] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [allWeekToggle, setAllWeekToggle] = useState(false);
  const [weekdaysToggle, setWeekdaysToggle] = useState(false);
  const [weekendsToggle, setWeekendsToggle] = useState(false);
  const [allWeekStart, setAllWeekStart] = useState("00:00");
  const [allWeekEnd, setAllWeekEnd] = useState("23:59");
  const [weekdaysStart, setWeekdaysStart] = useState("00:00");
  const [weekdaysEnd, setWeekdaysEnd] = useState("23:59");
  const [weekendsStart, setWeekendsStart] = useState("00:00");
  const [weekendsEnd, setWeekendsEnd] = useState("23:59");
  const [showUploadSection, setShowUploadSection] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setShowOperationHours(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleCreateInstitution = (values: any) => {
    const payload = {
      institution_file: "string",
      name: formData.hospitalName,
      email: formData.email,
      mobile_number: formData.phoneNumber,
      address: formData.address,
      operation_days: "monday_to_sunday",
      opening_time: "string",
      closing_time: "string",
      logo: "string",
      state: 1,
      local_government: 1,
      ward: 1,
    };
    // dispatch(triggerAddInstitution(payload));
  };

  return (
    <div className="flex flex-col  justify-center p-6 w-full">
      <h1 className="text-2xl font-bold  px-8">Add Institution</h1>

      <div className="w-full ">
        <form
          onSubmit={handleSubmit}
          className="bg-white  rounded px-8 pt-6 pb-8 "
        >
          <h5 className="text-lg mb-4">Please fill in the hospital details</h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                onChange={handleChange}
                placeholder="Enter Institution phone number"
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              />
            </div>

            <div className="">
              <label
                className="block text-gray-600 text-sm  mb-2"
                htmlFor="state"
              >
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select institution state</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Abuja">Abuja</option>
                {/* Add state options here */}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="">
              <label
                className="block text-gray-600 text-sm  mb-2"
                htmlFor="localGovt"
              >
                Local govt.
              </label>
              <select
                name="localGovt"
                value={formData.localGovt}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select institution local govt</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Abuja">Abuja</option>
                {/* Add local govt options here */}
              </select>
            </div>

            <div className="">
              <label
                className="block text-gray-600 text-sm  mb-2"
                htmlFor="ward"
              >
                Ward
              </label>
              <select
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              >
                <option value="">Select institution ward</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Abuja">Abuja</option>
                {/* Add ward options here */}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                placeholder="Enter Institution address"
                className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:w-1/2 mx-auto">
            <button
              type="button"
              className="bg-white text-gray-700 font-bold py-2 px-4 border rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#007A61] text-white font-bold py-2 px-4 rounded"
            >
              Proceed
            </button>
          </div>
        </form>

        {/* opretiona hours */}
        <CustomModal
          isOpen={showOperationHours}
          onClose={() => setShowOperationHours(false)}
        >
          <div className="flex flex-col h-full px-11 py-6">
            <Typography variant={TypographyVariant.NORMAL}>
              Add Institution
            </Typography>

            {/* Progress Tracker */}
            <div className="mb-6">
              <div className="flex justify-between mb-4">
                <div
                  className={`text-sm font-bold ${
                    step >= 1 ? "text-[#007A61]" : "text-gray-500"
                  }`}
                >
                  Profile Details
                </div>
                <div
                  className={`text-sm font-bold ${
                    step >= 2 ? "text-[#007A61]" : "text-gray-500"
                  }`}
                >
                  Operational Hours
                </div>
                <div
                  className={`text-sm font-bold ${
                    step >= 3 ? "text-[#007A61]" : "text-gray-500"
                  }`}
                >
                  Add Logo
                </div>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full">
                <div
                  className="h-1 bg-[#007A61] rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Profile Details */}
            {step === 1 && (
              <form
                onSubmit={handleSubmit}
                className="bg-white  rounded px-8 pt-6 pb-8 "
              >
                <h5 className="text-lg mb-4">
                  Please fill in the hospital details
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                      onChange={handleChange}
                      placeholder="Enter Institution phone number"
                      className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                      required
                    />
                  </div>

                  <div className="">
                    <label
                      className="block text-gray-600 text-sm  mb-2"
                      htmlFor="state"
                    >
                      State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                      required
                    >
                      <option value="">Select institution state</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Kano">Kano</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="Abuja">Abuja</option>
                      {/* Add state options here */}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="">
                    <label
                      className="block text-gray-600 text-sm  mb-2"
                      htmlFor="localGovt"
                    >
                      Local govt.
                    </label>
                    <select
                      name="localGovt"
                      value={formData.localGovt}
                      onChange={handleChange}
                      className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                      required
                    >
                      <option value="">Select institution local govt</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Kano">Kano</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="Abuja">Abuja</option>
                      {/* Add local govt options here */}
                    </select>
                  </div>

                  <div className="">
                    <label
                      className="block text-gray-600 text-sm  mb-2"
                      htmlFor="ward"
                    >
                      Ward
                    </label>
                    <select
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                      required
                    >
                      <option value="">Select institution ward</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Kano">Kano</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="Abuja">Abuja</option>
                      {/* Add ward options here */}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                      placeholder="Enter Institution address"
                      className=" appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:w-1/2 mx-auto">
                  <button
                    type="button"
                    className="bg-white text-gray-700 font-bold py-2 px-4 border rounded"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#007A61] text-white font-bold py-2 px-4 rounded"
                    onClick={()=>                         setStep(step + 1)
                    }
                  >
                    Proceed
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Operational Hours */}
            {step === 2 && (
              <>
                <div className="flex-1 overflow-y-auto mt-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-1/2 mx-auto mb-8">
                  <button
                    type="button"
                    className="bg-white text-gray-700 font-bold py-2 px-4 border rounded-xl"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-[#007A61] text-white font-bold py-2 px-4 rounded-xl"
                    onClick={() =>                          setStep(step + 1)
                    }
                  >
                    Proceed
                  </button>
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
                    <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-full bg-gray-100">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Uploaded logo"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-gray-500">
                            No image selected
                          </span>
                        </div>
                      )}
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
                      onClick={() => setStep(1)} // Go back to step 1
                    />
                    <Button
                      text="Submit"
                      bg_color="#007A61"
                      text_color="white"
                      border_color="border-green-500"
                      active={true}
                      loading={false}
                      onClick={() => {
                         setStep(step + 1)
                      }} // Add your submit logic here
                    />
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-1/2 mx-auto mb-8">
              {/* {step < 3 && (
                <button
                  type="button"
                  className="bg-[#007A61] text-white font-bold py-2 px-4 rounded-xl"
                  onClick={() => setStep(step + 1)} // Move to the next step
                >
                  Proceed
                </button>
              )} */}
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default AddInstitution;
