import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routeNames from "./RouteNames";
import React from "react";
import Dashboard from "../Pages/DashboardPages/Dashboard";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import AuthenticationPin from "../Pages/AuthPin";
import Institutions from "../Components/institutions/institutions";
import ViewInstitute from "../Components/institutions/ViewInstitute";
import ViewResponse from "../Components/institutions/ViewResponse";
import ForgotPassword from "../Pages/ForgotPassword";
import CreateNewPassword from "../Pages/CreateNewPassword";
import SettingView from "../Components/Settings/SettingView";
import AllInstitutions from "../Components/institutions/AllInstitutions";
import ReportMain from "../Components/Reports/ReportMain";
import ReportCategoryView from "../Components/Reports/ReportCategoriesView";
import AddTask from "../Components/Reports/AddTask";
import CategoriesView from "../Components/Reports/CategoriesView";
import IndividualCategory from "../Components/Reports/ViewIndividualCategory";
import IndicatorsView from "../Components/Reports/ViewAllIndicators";
import IndividualIndicator from "../Components/Reports/ViewIndividualIndicator";
import TaskPoserView from "../Components/Reports/ViewAllTaskPoser";
import IndividualTaskPoser from "../Components/Reports/ViewIndividualTaskPoster";
import EditTaskView from "../Components/Reports/EditTaskPoser";
import ViewAllPendingTasks from "../Components/Reports/ViewAllPendingTask";
import PendingResponse from "../Components/Reports/PendingResponse";
import ReviewedResponse from "../Components/Reports/ReviewedResponse";
const DashboardLayout = lazy(
  async () => await import("../Components/Dashboard/DashboardLayout")
);
import GenericReport from "../Components/institutions/GenericReport";
import AdditionalComment from "../Components/institutions/AdditionalComment";
import ViewAdmin from "../Components/Settings/ViewAdmin";
import RolesAndPermissions from "../Components/Settings/RolesAndPermissions";
import Users from "../Pages/Users/Users";
import ValidateKyc from "../Pages/Users/ValidateKyc";
import ViewUserProfile from "../Pages/Users/ViewUserProfile";

const Router = () => {
  const routes = [
    { path: routeNames.signin, element: <Login /> },
    { path: routeNames.signup, element: <Signup /> },
    { path: routeNames.authPin, element: <AuthenticationPin /> },
    { path: routeNames.forgotPassword, element: <ForgotPassword /> },
    { path: routeNames.createpassword, element: <CreateNewPassword /> },
    {
      path: routeNames.home,
      element: <DashboardLayout />,
      children: [
        { path: routeNames.dashboard, element: <Dashboard /> },
        { path: routeNames.instutitions, element: <Institutions /> },
        { path: routeNames.viewInstitution, element: <ViewInstitute /> },
        { path: routeNames.genericReport, element: <GenericReport /> },
        { path: routeNames.viewInstituteResponse, element: <ViewResponse /> },
        {
          path: routeNames.viewReportCategories,
          element: <ReportCategoryView />,
        },
        { path: routeNames.addReportTasks, element: <AddTask /> },
        { path: routeNames.reportCategories, element: <CategoriesView /> },
        {
          path: routeNames.viewIndivualCategory,
          element: <IndividualCategory />,
        },
        {
          path: routeNames.reportIndicator,
          element: <IndicatorsView />,
        },
        {
          path: routeNames.viewIndivualIndicator,
          element: <IndividualIndicator />,
        },
        {
          path: routeNames.reportTaskPoser,
          element: <TaskPoserView />,
        },
        {
          path: routeNames.viewIndividualReportTaskPoser,
          element: <IndividualTaskPoser />,
        },
        {
          path: routeNames.viewEditIndividualReportTaskPoser,
          element: <EditTaskView />,
        },
        {
          path: routeNames.viewAllPendingTasks,
          element: <ViewAllPendingTasks />,
        },
        {
          path: routeNames.viewPendingResponse,
          element: <PendingResponse />,
        },
        {
          path: routeNames.viewReviewedResponse,
          element: <ReviewedResponse />,
        },
        { path: routeNames.allInstitutions, element: <AllInstitutions /> },
        { path: routeNames.reports, element: <ReportMain /> },
        { path: routeNames.users, element: "Users" },
        { path: routeNames.additionalComment, element: <AdditionalComment /> },
        { path: routeNames.allInstitutions, element: <AllInstitutions /> },
        { path: routeNames.reports, element: <ReportMain /> },
        { path: routeNames.users, element: <Users /> },
        { path: routeNames.validateKyc, element: <ValidateKyc /> },
        { path: routeNames.userProfile, element: <ViewUserProfile /> },
        { path: routeNames.leaderboard, element: "Leaderboard" },
        { path: routeNames.settings, element: <SettingView /> },
        { path: routeNames.viewAdmin, element: <ViewAdmin /> },
        {
          path: routeNames.rolesAndPermissions,
          element: <RolesAndPermissions />,
        },
      ],
    },
    {
      path: routeNames.noWhere,
      element: "Page not found",
    },
  ];
  const router = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
