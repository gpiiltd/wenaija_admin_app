import React, { useState } from "react";
import OperationHours from "./OperationHours";

const AddInstitution: React.FC = () => {
  const [showOperationHours, setShowOperationHours] = useState(false); // State to manage visibility of OperationHours
  const [formData, setFormData] = useState({
    hospitalName: "",
    phoneNumber: "",
    email: "",
    state: "",
    localGovt: "",
    address: "",
    ward: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    setShowOperationHours(true); // Show OperationHours on form submission
  };

  if (showOperationHours) {
    return <OperationHours />; // Render OperationHours if the state is true
  }

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
      </div>
    </div>
  );
};

export default AddInstitution;
