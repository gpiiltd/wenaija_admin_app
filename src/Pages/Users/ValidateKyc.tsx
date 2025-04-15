import React, { useEffect, useState } from "react";
import Typography from "../../Components/Typography";
import { TypographyVariant } from "../../Components/types";
import { UserInfoRow } from "./Helpers";
import ButtonComponent from "../../Components/Button";
import { GoArrowSwitch } from "react-icons/go";
import { IoChevronForwardCircle } from "react-icons/io5";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { CgZoomIn } from "react-icons/cg";
import GoBack from "../../Components/GoBack";
import CustomModal from "../../Components/Modal";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import TextAreaField from "../../Components/Input/Textarea";
import SelectOption from "../../Components/Input/SelectOptions";
import { Formik, Form } from "formik";
import Breadcrumb from "../../Components/Breadcrumb";
import showCustomToast from "../../Components/CustomToast";
import { AppDispatch, RootState } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import {
  triggerUpdateKycStatus,
  triggerViewUserProfile,
} from "../../features/usersManagement/userManagementThunk";
import { resetKycStatusUpdateState } from "../../features/usersManagement/userManagementSlice";
import { toast } from "react-toastify";

const items = [
  "Verified users information",
  "Verified user uploaded a correct card",
  "Verified user details match their identity cards.",
];

const options = [
  { value: "Invalid or Expired ID", label: "Invalid or Expired ID" },
  { value: "Poor Image Quality", label: "Poor Image Quality" },
  { value: "Incomplete ID", label: "Incomplete ID" },
  { value: "Forgery or Tampering", label: "Forgery or Tampering" },
  { value: "Mismatch of Information", label: "Mismatch of Information" },
  { value: "Unauthorized Type of ID", label: "Unauthorized Type of ID" },
  {
    value: "Non-Compliance with Guidelines",
    label: "Non-Compliance with Guidelines",
  },
  { value: "Damaged ID", label: "Damaged ID" },
  { value: "Inconsistent Details", label: "Inconsistent Details" },
  { value: "Language Barriers", label: "Language Barriers" },
  { value: "Security Features Missing", label: "Security Features Missing" },
  {
    value: "Unclear or Missing Photograph",
    label: "Unclear or Missing Photograph",
  },
  {
    value: "Incorrect Submission Format",
    label: "Incorrect Submission Format",
  },
];
const ValidateKyc = () => {
  const dispatch: AppDispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [rejectkyc, setRejectkyc] = useState(false);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const { userId } = useParams<{ userId: string }>();
  const { kyc, kycStatusUpdate } = useSelector(
    (state: RootState) => state.userManagement,
  );
  const [isValid, setIsValid] = useState("");
  const cancelAction = () => {
    setModalOpen(false);
    setIsChecked(false);
  };

  //update kyc status
  const handleApproveKyc = async () => {
    if (!userId) return;
    const payload = {
      id: userId,
      kyc_status: isValid,
      rejection_reason: selectedValue,
      comment: "",
    };
    await dispatch(triggerUpdateKycStatus(payload));
  };

  //Reject kyc
  const handleRejectKyc = async (values: { comment: string }) => {
    if (!userId) return;
    const payload = {
      id: userId,
      kyc_status: "",
      rejection_reason: selectedValue,
      comment: values.comment,
    };
    await dispatch(triggerUpdateKycStatus(payload));
  };

  useEffect(() => {
    if (kycStatusUpdate?.statusCode === 200 && kycStatusUpdate?.data) {
      showCustomToast("Account Disabled", `${kycStatusUpdate.message}`);
      setModalOpen(false);
      setIsChecked(false);
      navigate("/app/users");
    }
    if (kycStatusUpdate?.error && kycStatusUpdate?.message) {
      toast.error(`${kycStatusUpdate.message}`);
      setModalOpen(false);
      setRejectkyc(false);
      setIsChecked(false);
    }
    dispatch(resetKycStatusUpdateState());
  }, [
    kycStatusUpdate.data,
    kycStatusUpdate?.error,
    kycStatusUpdate.message,
    kycStatusUpdate?.statusCode,
  ]);

  useEffect(() => {
    if (userId) {
      dispatch(triggerViewUserProfile(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (kyc.statusCode === 200 || kyc.data) {
      console.log("userProfile seen");
    }
    if (kyc.error && kyc.message) {
      console.log("Error fetching user");
    }
  }, [kyc.statusCode, kyc.message, kyc.data, kyc.error]);

  return (
    <section>
      <GoBack
        label={`View User - ${
          kyc.loading
            ? "loading..."
            : `${kyc.data.first_name} ${kyc.data.last_name}`
        }`}
      />
      <Breadcrumb />
      <Typography variant={TypographyVariant.TITLE} className="pt-6">
        Review
      </Typography>
      <Typography variant={TypographyVariant.NORMAL} className="text-l_gray">
        Compare users information with the information on the ID card provided.
      </Typography>

      <div className="flex gap-6 items-stretch w-full pt-6">
        <section className="w-1/2">
          <div className="border border-primary_green bg-[#FCFFFE] p-6 rounded-lg h-full">
            <Typography
              variant={TypographyVariant.NORMAL}
              className="font-bold"
            >
              User Information
            </Typography>
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-primary_green pt-4"
            >
              {kyc.loading
                ? "loading..."
                : `${kyc.data.first_name} ${kyc.data.last_name}`}
            </Typography>

            {/* User Info Fields */}
            <div className="flex flex-col gap-5 pt-8">
              <div className="grid grid-cols-3 gap-4">
                <UserInfoRow
                  label="Sex"
                  value={kyc.data.gender || "Not provided"}
                />
                <div className="h-10 border-l border-gray-300"></div>
                <UserInfoRow
                  label="Date of Birth"
                  value={kyc.data.date_of_birth || "Not provided"}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <UserInfoRow
                  label="ID Type"
                  value={kyc.data.id_type || "Not provided"}
                />
                <div className="h-10 border-l border-gray-300"></div>
                <UserInfoRow
                  label="ID No"
                  value={kyc.data.id_number || "Not provided"}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <UserInfoRow
                  label="Nationality"
                  value={kyc.data.nationality || "Not provided"}
                />
                <div className="h-10 border-l border-gray-300"></div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center w-2/3 mt-4">
            <ButtonComponent
              text="Reject"
              text_color="#344054"
              bg_color="transparent"
              active
              border_color="#D0D5DD"
              loading={false}
              onClick={() => setRejectkyc(!rejectkyc)}
            />
            <ButtonComponent
              text="Approve"
              text_color="#FFFFFF"
              bg_color="#007A61"
              active
              loading={false}
              onClick={() => setModalOpen(true)}
            />
          </div>
        </section>
        <div className="flex-1 flex items-center justify-center">
          <GoArrowSwitch size={30} color="#5E5959" />
        </div>
        <section className="w-1/2 ">
          <div className="border border-[#E4E7EC] bg-[#FFFFFF]  p-3 rounded-lg h-full">
            <section className="pt-2">
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold text-left"
              >
                ID Uploded
              </Typography>
              <Typography
                variant={TypographyVariant.NORMAL}
                className="font-bold text-l_gray text-center"
              >
                Front ID
              </Typography>

              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-6">
                  <IoChevronForwardCircle />
                  <Icon type="idCard" />
                  <IoChevronForwardCircle />
                </div>
                <div className="flex justify-end">
                  <CgZoomIn color="#717D96" size={25} />
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
      <CustomModal
        isOpen={modalOpen}
        onClose={cancelAction}
        width="40%"
        height="fit"
      >
        <div className="flex flex-col pb-11 px-24">
          <Typography
            variant={TypographyVariant.TITLE}
            className="pt-6 text-center"
          >
            Approve KYC
          </Typography>
          <Typography
            variant={TypographyVariant.BODY_SMALL_MEDIUM}
            className="pt-3 text-l_gray text-center"
          >
            Are you sure you want to approve this KYC?
          </Typography>

          <div className="space-y-2 pt-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 items-center pt-2">
                <IoMdCheckmarkCircleOutline color="#007A61" />
                <Typography
                  variant={TypographyVariant.BODY_SMALL_MEDIUM}
                  className="text-[#17191C]"
                >
                  {item}
                </Typography>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              id="confirmCheckbox"
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
                if (e.target.checked) {
                  setIsValid("approved");
                } else {
                  setIsValid("");
                }
              }}
              className="w-5 h-5 cursor-pointer accent-[#007A61]"
            />

            <label
              htmlFor="confirmCheckbox"
              className="text-[#5E5959] text-sm cursor-pointer"
            >
              I confirm to have verified all the above information.
            </label>
          </div>

          {/* Centering the Buttons */}
          <div className="flex gap-2 justify-center items-center w-full mt-6">
            <ButtonComponent
              text="Cancel"
              text_color="#344054"
              bg_color="transparent"
              active
              border_color="#D0D5DD"
              loading={false}
              onClick={cancelAction}
            />
            <ButtonComponent
              text="Approve"
              text_color="#FFFFFF"
              bg_color="#007A61"
              active={isChecked}
              loading={kycStatusUpdate.loading}
              onClick={handleApproveKyc}
            />
          </div>
        </div>
      </CustomModal>

      {/* Reject kyc */}
      <CustomModal
        isOpen={rejectkyc}
        onClose={() => setRejectkyc(!rejectkyc)}
        width="40%"
        height="fit"
      >
        <div className="flex flex-col pb-11 px-24">
          <div className="flex flex-col justify-center items-center gap-1 ">
            <Icon type="warning" />
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-center"
            >
              Reject KYC
            </Typography>
            <Typography
              variant={TypographyVariant.BODY_SMALL_MEDIUM}
              className="text-l_gray text-center"
            >
              Are you sure you want to reject this KYC? Kindly select reason for
              rejection.
            </Typography>
          </div>
          <Formik
            initialValues={{ comment: "" }}
            onSubmit={(values) => {
              handleRejectKyc(values);
            }}
          >
            {({ handleSubmit, isValid, dirty }) => (
              <Form onSubmit={handleSubmit}>
                <CustomModal
                  isOpen={rejectkyc}
                  onClose={() => setRejectkyc(!rejectkyc)}
                  width="40%"
                  height="fit"
                >
                  <div className="flex flex-col pb-11 px-24">
                    <div className="flex flex-col justify-center items-center gap-1">
                      <Icon type="warning" />
                      <Typography
                        variant={TypographyVariant.TITLE}
                        className="text-center"
                      >
                        Reject KYC
                      </Typography>
                      <Typography
                        variant={TypographyVariant.BODY_SMALL_MEDIUM}
                        className="text-l_gray text-center"
                      >
                        Are you sure you want to reject this KYC? Kindly select
                        reason for rejection.
                      </Typography>
                    </div>

                    <div className="">
                      <SelectOption
                        label="Choose reason"
                        options={options}
                        value={selectedValue}
                        onChange={setSelectedValue}
                        className="pb-3"
                      />
                      <TextAreaField
                        label="Add comment"
                        name="comment"
                        required={true}
                      />
                    </div>

                    <div className="flex gap-2 justify-center items-center w-full mt-3">
                      <ButtonComponent
                        text="Cancel"
                        text_color="#344054"
                        bg_color="transparent"
                        active
                        border_color="#D0D5DD"
                        loading={false}
                        onClick={() => setRejectkyc(false)}
                      />
                      <ButtonComponent
                        text="Reject"
                        text_color="#FFFFFF"
                        bg_color="#FF725E"
                        active={isValid && dirty}
                        loading={kycStatusUpdate.loading}
                        onClick={handleSubmit}
                      />
                    </div>
                  </div>
                </CustomModal>
              </Form>
            )}
          </Formik>
          ;
        </div>
      </CustomModal>
    </section>
  );
};

export default ValidateKyc;
