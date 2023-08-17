// import EcommerenceProducts from "src/pages/Ecommerence/EcommerenceProducts";
import { Navigate } from "react-router-dom";

import Agents from "pages/Agents";
import ChangePassword from "pages/Authentication/change-password";
import ForgotPassword from "pages/Authentication/forgot-password";
import Login from "pages/Authentication/login";
import Logout from "pages/Authentication/logout";
import ResetPassword from "pages/Authentication/reset-password";
import ResetPasswordSuccess from "pages/Authentication/reset-password-success";
import UserProfile from "pages/Authentication/user-profile";
import Chat from "pages/Chat";
import Keywords from "pages/Keywords";
import Messages from "pages/Messages";
import Pages404 from "../pages/Utility/pages-404";

const authProtectedRoutes = [
  { path: "/my-profile", component: <UserProfile /> },
  { path: "/change-password", component: <ChangePassword /> },
  { path: "/chat", component: <Chat /> },
  { path: "/", exact: true, component: <Navigate to="/chat" /> },
  { path: "/logout", component: <Logout /> },
];

const adminOnlyRoutes = [
  { path: "/keywords", component: <Keywords /> },
  { path: "/agents", component: <Agents /> },
  { path: "/messages", component: <Messages /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  // { path: "/register", component: <SignUp /> },
  { path: "/reset-password/:id", component: <ResetPassword /> },
  { path: "/reset-password-success", component: <ResetPasswordSuccess /> },

  { path: "/pages-404", component: <Pages404 /> },
  { path: "*", component: <Pages404 /> },
];
export { adminOnlyRoutes, authProtectedRoutes, publicRoutes };
