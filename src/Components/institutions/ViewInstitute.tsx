import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { getColor, institutions } from "./institutionData";
import { AppDispatch, RootState } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { triggerListASingleInstitute } from "../../features/institutions/institutionManagementThunk";

const ViewInstitute: React.FC = () => {
  const location = useLocation();
  const {  name,
    address,
    operation_days,
    mobile_number,
    email,
    icon,
    opening_time,
    closing_time } = location.state || {};
  const navigate = useNavigate();

  const handleViewResponse = () => {
    navigate("/app/instutitions/view-institute/view-response", {
      state: { name, address, mobile_number, email, icon, operation_days,opening_time,closing_time },
    });
  };
  const [isEditable, setIsEditable] = useState(false);
  const [editedAddress, setEditedAddress] = useState(address);
  const [editedHours, setEditedHours] = useState(opening_time);
  const [editedPhone, setEditedPhone] = useState(mobile_number);
  const [editedEmail, setEditedEmail] = useState(email);

  const dispatch: AppDispatch = useDispatch();
  const { institution } = useSelector(
    (state: RootState) => state.institutionManagement
  );
  const { userId } = useParams<{ userId: string }>();


  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = () => {
    setIsEditable(!isEditable);
    console.log("Edited Address:", editedAddress);
  };

    useEffect(() => {
      if (userId) {
        dispatch(triggerListASingleInstitute(userId));
      }
    }, [dispatch, userId]);
  
    useEffect(() => {
      if (institution.statusCode === 200 || institution.data) {
        console.log("Institute seen", institution.data);
      }
      if (institution.error && institution.message) {
        console.log("Error fetching institute");
      }
    }, [institution.statusCode, institution.message, institution.data, institution.error]);


  return (
    <div className=" mx-auto mb-4">
      <div className="flex items-center justify-start gap-6 mb-8">
        <Link to="/app/instutitions">
          <Icon type="arrowBack" className="w-10 h-10" />
        </Link>
        <h1 className="text-2xl font-bold">View Institute</h1>
      </div>
      {institution?.data?.results && (

      <div className="bg-white rounded-lg p-6 border mb-4 " >
        <div className="flex items-center gap-4 mb-4">
          <Icon type='quotient' className="w-fit" />
          <h4 className="text-lg font-semibold">{institution.data.results.name}</h4>
        </div>

        <div className="flex">
          <div className="w-1/2">
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineLocationMarker className="text-green-600" />
              <input
                type="text"
                value={isEditable ? editedAddress : institution.data.results.address}
                onChange={(e) => setEditedAddress(e.target.value)}
                className={`w-full focus:outline-none ${
                  isEditable ? "border-b-2 " : ""
                }`}
                readOnly={!isEditable}
              />
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <HiOutlineClock className="text-green-600 mt-1" />
              <input
                type="text"
                value={isEditable ? editedHours : institution.data.results.opening_time}
                onChange={(e) => setEditedHours(e.target.value)}
                className={`w-full focus:outline-none ${
                  isEditable ? "border-b-2 " : ""
                }`}
                readOnly={!isEditable}
              />
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
                value={isEditable ? editedPhone : institution.data.results.mobile_number}
                onChange={(e) => setEditedPhone(e.target.value)}
                className={`w-[70%] focus:outline-none ${
                  isEditable ? "border-b-2 " : ""
                }`}
                readOnly={!isEditable}
              />
            </div>{" "}
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <HiOutlineMail className="text-green-600" />
              <input
                type="text"
                value={isEditable ? editedEmail : institution.data.results.email}
                onChange={(e) => setEditedEmail(e.target.value)}
                className={`w-[70%] focus:outline-none ${
                  isEditable ? "border-b-2 " : ""
                }`}
                readOnly={!isEditable}
              />
            </div>{" "}
          </div>

          <button
            className="flex items-center cursor-pointer bg-[#007A61] text-white rounded-lg"
            onClick={isEditable ? handleSave : handleEdit}
          >
            {isEditable ? (
              <Icon type="savebutton" className="w-32 h-6" />
            ) : (
              <Icon type="edit" className="w-32 h-12" />
            )}
          </button>
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
          {institutions.indicators.map((indicator) => (
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
                    text: { fill: "#000", fontSize: "26px" },
                    trail: { stroke: "#d6d6d6" },
                  }}
                />
              </td>
              <td className=" px-4 py-2">{indicator.rank}th</td>
              <td className=" px-4 py-2 ">
                <div className="flex items-center gap-2 bg-[#f1fffc] w-36 rounded-xl pl-2">
                  <span className="text-[#007A61] font-bold">
                    {indicator.responses}{" "}
                  </span>{" "}
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
              Uploaded images{" "}
              <span className="text-[#007A61] font-bold ml-4">{40} </span>{" "}
            </p>
            <button
              onClick={() =>
                navigate("/app/instutitions/view-institute/generic-report")
              }
              className="flex items-center  gap-2 bg-white text-gray-600 py-2 px-4 border rounded-xl ml-4"
            >
              See images <FaAngleRight className="text-gray-600" />
            </button>{" "}
          </div>

          <div className="mx-10 ">
            <div className=" md:col-span-1 md:border-l md:border-gray-300 md:h-full md:mx-4"></div>
          </div>

          <div className="flex items-center justify-center gap-4 w-1/2">
            <p className="text-gray-600">
              Reports{" "}
              <span className="text-[#007A61] font-bold ml-4">{12}</span>
            </p>
            <button
              onClick={() =>
                navigate("/app/instutitions/view-institute/generic-report")
              }
              className="flex items-center  gap-2 bg-white text-gray-600 py-2 px-4 border rounded-xl ml-4"
            >
              View reports <FaAngleRight className="text-gray-600" />
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInstitute;
