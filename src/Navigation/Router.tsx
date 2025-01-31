import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routeNames from "./RouteNames";
import React from "react";
import Dashboard from "../Pages/DashboardPages/Dashboard";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import AuthenticationPin from "../Pages/AuthPin";
const DashboardLayout = lazy(async () => await import('../Components/Dashboard/DashboardLayout'));

const Router = () => {
  const routes = [
    { path: routeNames.signin, element: <Login /> },
    { path: routeNames.signup, element: <Signup /> },
    { path: routeNames.authPin, element: <AuthenticationPin /> },
    {
      path: routeNames.home,
      element: <DashboardLayout />,
      children: [
        { path: routeNames.dashboard, element: <Dashboard />},
        { path: routeNames.instutitions, element: "Institutions" },
        { path: routeNames.reports, element: "Reports" },
        { path: routeNames.users, element: "Users" },
        { path: routeNames.leaderboard, element: "Leaderboard" },
        { path: routeNames.settings, element: "Settings" },
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
