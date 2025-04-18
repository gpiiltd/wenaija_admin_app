import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdditionalComment from '../Components/institutions/AdditionalComment'
import AllInstitutions from '../Components/institutions/AllInstitutions'
import GenericReport from '../Components/institutions/GenericReport'
import Institutions from '../Components/institutions/institutions'
import ViewInstitute from '../Components/institutions/ViewInstitute'
import ViewResponse from '../Components/institutions/ViewResponse'
import Leaderboard from '../Components/Leaderboard/Leaderboard'
import AddTask from '../Components/Reports/AddTask'
import CategoriesView from '../Components/Reports/CategoriesView'
import EditTaskView from '../Components/Reports/EditTaskPoser'
import PendingResponse from '../Components/Reports/PendingResponse'
import ReportCategoryView from '../Components/Reports/ReportCategoriesView'
import ReportMain from '../Components/Reports/ReportMain'
import ReviewedResponse from '../Components/Reports/ReviewedResponse'
import AddQuestion from '../Components/Reports/SurveyIndicator/AddQuestion'
import ReportSurveyIndicatorView from '../Components/Reports/SurveyIndicator/SurveyIndicator'
import SurveyIndicatorsMainView from '../Components/Reports/SurveyIndicator/SurveyIndicatorMain'
import SurveyQuestionMainView from '../Components/Reports/SurveyIndicator/SurveyQuestionMain'
import SurveyQuestionSingleView from '../Components/Reports/SurveyIndicator/SurveyQuestionSingle'
import SurveyCategoriesView from '../Components/Reports/SurveyIndicator/SurveyViewCategories'
import SurveyViewIndividualCategory from '../Components/Reports/SurveyIndicator/ViewSurveyIndividualCategory'
import SurveyIndividualIndicator from '../Components/Reports/SurveyIndicatorSingle'
import IndicatorsView from '../Components/Reports/ViewAllIndicators'
import ViewAllPendingTasks from '../Components/Reports/ViewAllPendingTask'
import TaskPoserView from '../Components/Reports/ViewAllTaskPoser'
import IndividualCategory from '../Components/Reports/ViewIndividualCategory'
import IndividualIndicator from '../Components/Reports/ViewIndividualIndicator'
import IndividualTaskPoser from '../Components/Reports/ViewIndividualTaskPoster'
import RolesAndPermissions from '../Components/Settings/RolesAndPermissions'
import SettingView from '../Components/Settings/SettingView'
import ViewAdmin from '../Components/Settings/ViewAdmin'
import Auth from '../Pages/AuthPin'
import AuthPinNewUser from '../Pages/AuthPinNewUser'
import AuthPinSetUp from '../Pages/AuthPinSetUp'
import CreateNewPassword from '../Pages/CreateNewPassword'
import Dashboard from '../Pages/DashboardPages/Dashboard'
import ForgotPassword from '../Pages/ForgotPassword'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Users from '../Pages/Users/Users'
import ValidateKyc from '../Pages/Users/ValidateKyc'
import ViewUserProfile from '../Pages/Users/ViewUserProfile'
import routeNames from './RouteNames'

const DashboardLayout = lazy(
  async () => await import('../Components/Dashboard/DashboardLayout')
)

const Router = () => {
  const routes = [
    { path: routeNames.signin, element: <Login /> },
    { path: routeNames.signup, element: <Signup /> },
    { path: routeNames.authPin, element: <Auth /> },
    { path: routeNames.authPinNewuser, element: <AuthPinNewUser /> },
    { path: routeNames.authPinSetUp, element: <AuthPinSetUp /> },

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
          path: routeNames.surveyIndicator,
          element: <ReportSurveyIndicatorView />,
        },
        {
          path: routeNames.surveyAddQuestion,
          element: <AddQuestion />,
        },
        {
          path: routeNames.surveyViewCategories,
          element: <SurveyCategoriesView />,
        },
        {
          path: routeNames.surveyViewIndividualCategories,
          element: <SurveyViewIndividualCategory />,
        },
        {
          path: routeNames.surveyViewIndicatorMain,
          element: <SurveyIndicatorsMainView />,
        },
        {
          path: routeNames.surveyViewIndicatorSingle,
          element: <SurveyIndividualIndicator />,
        },
        {
          path: routeNames.surveyViewQuestion,
          element: <SurveyQuestionMainView />,
        },
        {
          path: routeNames.surveyViewQuestionSingle,
          element: <SurveyQuestionSingleView />,
        },
        {
          path: routeNames.viewReviewedResponse,
          element: <ReviewedResponse />,
        },
        { path: routeNames.allInstitutions, element: <AllInstitutions /> },
        { path: routeNames.reports, element: <ReportMain /> },
        { path: routeNames.additionalComment, element: <AdditionalComment /> },
        { path: routeNames.allInstitutions, element: <AllInstitutions /> },
        { path: routeNames.reports, element: <ReportMain /> },
        { path: routeNames.users, element: <Users /> },
        { path: routeNames.validateKyc, element: <ValidateKyc /> },
        { path: routeNames.userProfile, element: <ViewUserProfile /> },
        { path: routeNames.leaderboard, element: <Leaderboard /> },
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
      element: 'Page not found',
    },
  ]
  const router = createBrowserRouter(routes)
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Router
