import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { triggerAddInstitution } from "../../features/institutions/institutionManagementThunk";
import CustomModal from "../Modal";
import Typography from "../Typography";
import { TypographyVariant } from "../types";
import { OperationTimePicker } from "./OperationaTimeKeeper";
import showCustomToast from "../CustomToast";
import Button from "../Button";
import { FaCheckCircle } from "react-icons/fa";
import { fields } from "./institutionData";
import { toast } from "react-toastify";

interface FormData {
  hospitalName: string;
  phoneNumber: string;
  email: string;
  state: string;
  localGovt: string;
  address: string;
  ward: string;
  [key: string]: string;
}
const AddInstitution = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showOperationHours, setShowOperationHours] = useState(false);
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
  const { createInstitution } = useSelector(
    (state: RootState) => state.institutionManagement
  );
  const [formData, setFormData] = useState<FormData>({
    hospitalName: "",
    phoneNumber: "",
    email: "",
    state: "",
    localGovt: "",
    address: "",
    ward: "",
  });
  let operation_days = "";
  let opening_time = "";
  let closing_time = "";

  if (allWeekToggle) {
    operation_days = "monday_to_sunday";
    opening_time = allWeekStart;
    closing_time = allWeekEnd;
  } else if (weekdaysToggle) {
    operation_days = "monday_to_friday";
    opening_time = weekdaysStart;
    closing_time = weekdaysEnd;
  } else if (weekendsToggle) {
    operation_days = "saturday_to_sunday";
    opening_time = weekendsStart;
    closing_time = weekendsEnd;
  }
  const steps = [
    { id: 1, label: "Profile Details" },
    { id: 2, label: "Operational Hours" },
    { id: 3, label: "Add Logo" },
  ];
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

  const handleCreateInstitution = () => {
    const form = new FormData();
    form.append("name", formData.hospitalName);
    form.append("email", formData.email);
    form.append("mobile_number", formData.phoneNumber);
    form.append("address", formData.address);
    form.append("operation_days", operation_days);
    form.append("opening_time", opening_time);
    form.append("closing_time", closing_time);
    form.append("state", '2');
    form.append("local_government", '2');
    form.append("ward",  '2');
    if (image) {
      form.append("institution_file", image); 
    }
    console.log("Payload (FormData):");
    for (let pair of form.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }    dispatch(triggerAddInstitution(form));
  };
  

  useEffect(() => {
    if (createInstitution?.statusCode === 200 && createInstitution?.data) {
      console.log("successfull***");
      showCustomToast("Success", createInstitution.message);
    }
    if (createInstitution?.error && createInstitution?.message) {
      console.log("Unsuccessful");
      toast.error(createInstitution.message);
    }
    // dispatch(resetKycStatusUpdateState());
  }, [
    createInstitution.data,
    createInstitution?.error,
    createInstitution.message,
    createInstitution?.statusCode,
  ]);

  return (
    <div className="flex flex-col  justify-center p-6 w-full">
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
                    id === 1 ? "ml-0" : ""
                  } ${id === steps.length ? "mr-0" : ""}`}
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
                    step === id ? "text-[#007A61]" : "text-gray-500"
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
                Please fill in the hospital details{" "}
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
                    onChange={handleChange}
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
                      {options.map((opt, idx) => (
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
                  // onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#007A61] text-white font-bold py-2 px-4 rounded-xl"
                  onClick={() => {
                    console.log("form data", formData);
                    setStep(step + 1);
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
                    // onClick={onCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-[#007A61] text-white font-bold py-2 px-4 rounded-xl"
                    onClick={() => setStep(step + 1)}
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
                  <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-full bg-gray-100">
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
                    onClick={() => setStep(1)}
                  />
                  <Button
                    text="Submit"
                    bg_color="#007A61"
                    text_color="white"
                    border_color="border-green-500"
                    active={true}
                    loading={createInstitution.loading}
                    onClick={handleCreateInstitution} // Add your submit logic here
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddInstitution;
