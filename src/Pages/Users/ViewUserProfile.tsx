import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import Typography from "../../Components/Typography";
import { TypographyVariant } from "../../Components/types";
import { FiEdit } from "react-icons/fi";
import ProgressBar from "../../Components/ProgressBar";
import GoBack from "../../Components/GoBack";
import Icon from "../../Assets/svgImages/Svg_icons_and_images";
import { TbReport } from "react-icons/tb";
import Nav from "../../Components/Nav";
import { tabContent, TabKey, UserInfo } from "./Helpers";
import CustomModal from "../../Components/Modal";
import SelectOption from "../../Components/Input/SelectOptions";
import ButtonComponent from "../../Components/Button";
import StatusToggle from "../../Components/Toggle";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import Breadcrumb from "../../Components/Breadcrumb";
import showCustomToast from "../../Components/CustomToast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state";
import { triggerListASingleUser } from "../../features/rbac/rbacThunks";

const options = [{ value: "Campaign is over", label: "Campaign is over" }];
const ViewUserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<TabKey>("Basic information");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);
  const { userId } = useParams<{ userId: string }>();
  const [selectedValue, setSelectedValue] = useState("");
  const {
    userData,
    error: rbacError,
    message: rbacMessage,
    statusCode:rbacStatusCode
  } = useSelector((state: RootState) => state.rbac);

  const approveStatus = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpenModal(false);
    }, 2000);

    setTimeout(() => {
      showCustomToast(
        "Account Disabled",
        "Ekene Dulle account is now inactive"
      );
    }, 2000);
  };



  return (
    <>
      <GoBack label="View user - Ekene Dulle" />
      <Breadcrumb />

      <div className="flex gap-7 pt-4">
        <Card titleLeft={undefined} titleRight={undefined} className="flex-1">
          <div className="flex gap-4  p-6">
            <div className="w-fit h-fit rounded-full p-4 bg-[#F0FEFB]">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="text-primary_green text-center"
              >
                AE
              </Typography>
            </div>
            <section>
              <div>
                <Typography
                  variant={TypographyVariant.SUBTITLE}
                  className="text-l_gray text-center"
                >
                  Ekene Dulle
                </Typography>
                <Typography
                  variant={TypographyVariant.BODY_SMALL_MEDIUM}
                  className="text-l_gray "
                >
                  EKduel
                </Typography>
              </div>

              <section className="flex items-center gap-2 mt-5">
                <div
                  className={`w-fit h-fit rounded-xl p-1 ${
                    status ? " bg-[#F0FEFB]" : "text-[#DB1B24] bg-[#FFFAEB] "
                  }`}
                >
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_MEDIUM}
                    className={`text-center ${
                      status ? "text-primary_green" : "text-[#DB1B24] "
                    }`}
                  >
                    {status ? "Active" : "Inactive"}
                  </Typography>
                </div>
                <FiEdit
                  color="#007A61"
                  cursor="pointer"
                  onClick={() => setOpenModal(true)}
                />
              </section>
            </section>
          </div>
        </Card>

        {/* second  card */}
        <Card
          titleLeft={undefined}
          titleRight={undefined}
          className="flex-1 bg-[#007A61]"
        >
          <div className="p-6 bg-[#007A61]">
            <section>
              <div>
                <Typography
                  variant={TypographyVariant.SUBTITLE}
                  className="text-[#FFFFFF] "
                >
                  Rank #51
                </Typography>
                <section className="flex justify-between pt-6">
                  <div className="flex items-center gap-2">
                    <Icon type="userBadge" />
                    <Typography
                      variant={TypographyVariant.SUBTITLE}
                      className="text-[#FFFFFF] "
                    >
                      Scout
                    </Typography>
                  </div>
                  <div className="h-10 border-l border-gray-300"></div>

                  <div className="w-fit h-fit bg-[#FFFFFF] p-1 rounded-3xl flex items-center gap-2">
                    <Icon type="startPoints" />

                    <Typography
                      variant={TypographyVariant.SUBTITLE}
                      className="text-orange "
                    >
                      5 star points
                    </Typography>
                  </div>
                  <div className="h-10 border-l border-gray-300"></div>

                  <div className="flex items-center gap-2">
                    <TbReport size={26} color="white" />

                    <Typography
                      variant={TypographyVariant.SUBTITLE}
                      className="text-[#FFFFFF] "
                    >
                      180 Reports completed
                    </Typography>
                  </div>
                </section>
              </div>
            </section>
            <div className="pt-4">
              <ProgressBar
                percentage={20}
                bgColor="#ED7D31"
                textColor="white"
                label="Level 1"
              />
            </div>
          </div>
        </Card>
      </div>
      {/* nav */}
      <div>
        <section className="mt-5">
          {/* Navigation Tabs */}
          <div className="border-b">
            <Nav
              tabs={Object.keys(tabContent).map((key) => ({ key, label: key }))}
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab as TabKey)}
              activeStyle={{
                color: "#007A61",
                padding: "6px 8px",
                borderBottom: "2px solid #007A61",
              }}
              inactiveStyle={{
                color: "#5E5959",
                padding: "6px 8px",
              }}
            />
          </div>
          {/* User Info  */}
          <Card titleLeft={undefined} titleRight={undefined} className="mt-6">
            <div className="p-4">
              <Typography
                variant={TypographyVariant.SUBTITLE}
                className="font-bold"
              >
                {tabContent[activeTab]?.title}
              </Typography>
              <section
                className={`grid ${tabContent[activeTab]?.gridCols} pt-4`}
              >
                {tabContent[activeTab]?.data.map((field, index) => (
                  <UserInfo
                    key={index}
                    label={field.label}
                    value={field.value}
                  />
                ))}
              </section>
              {tabContent[activeTab]?.extraContent}
            </div>
          </Card>
        </section>
        <CustomModal
          isOpen={openModal}
          onClose={() => setOpenModal(!openModal)}
          width="40%"
          height="fit"
        >
          <div className="flex gap-4 flex-col pb-16 px-24">
            <Typography
              variant={TypographyVariant.TITLE}
              className="text-center"
            >
              Profile status
            </Typography>

            <Typography
              variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
              className="text-[#5E5959] font-bold"
            >
              Status:
            </Typography>

            <div className="flex justify-between">
              <div>
                <Typography
                  variant={TypographyVariant.BODY_DEFAULT_MEDIUM}
                  className={`font-bold ${
                    status ? "text-primary_green" : "text-[#DB1B24] "
                  }`}
                >
                  {status === true ? "Active" : "Inactive"}
                </Typography>
                <Typography
                  variant={TypographyVariant.BODY_SMALL_MEDIUM}
                  className="text-[#5E5959] font-bold"
                >
                  Ekene Dulle account is {status ? "active" : "inactive"}
                </Typography>
              </div>
              <StatusToggle isActive={status} onToggle={setStatus} />
            </div>

            {!status && (
              <SelectOption
                label="Select reason"
                options={options}
                value={selectedValue}
                onChange={setSelectedValue}
                className="pb-3"
              />
            )}

            {!status && (
              <div className="flex gap-2 justify-center items-center px-11">
                <ButtonComponent
                  text="Cancel"
                  text_color="#344054"
                  bg_color="transparent"
                  active
                  border_color="#D0D5DD"
                  loading={false}
                  onClick={() => setOpenModal(false)}
                />
                <ButtonComponent
                  text="Approve"
                  text_color="#FFFFFF"
                  bg_color="#007A61"
                  active={true}
                  loading={loading}
                  onClick={approveStatus}
                />
              </div>
            )}
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default ViewUserProfile;
