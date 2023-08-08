// import EcommerenceProducts from "src/pages/Ecommerence/EcommerenceProducts";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

//Authentication pages
// import Login1 from "../pages/AuthenticationInner/Login";
// import Recoverpw from "../pages/AuthenticationInner/Recoverpw";
// import Register from "../pages/AuthenticationInner/Register";
// import EmailVerification from "../pages/AuthenticationInner/auth-email-verification";
// import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";
// import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification";
// import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail";

//Pages
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesStarter from "../pages/Utility/pages-starter";

// Auth
import ForgotPassword from "pages/Authentication/forgot-password";
import ResetPassword from "pages/Authentication/reset-password";
import ResetPasswordSuccess from "pages/Authentication/reset-password-success";
import Logout from "pages/Authentication/logout";
import SignUp from "pages/Authentication/register";
import Login from "pages/Authentication/login";
import UserProfile from "pages/Authentication/user-profile";
import ChangePassword from "pages/Authentication/change-password";
import Keywords from "pages/Keywords";
import Agents from "pages/Agents";
import Playground from "pages/AuthenticationInner/page-confirm-mail";
import Whatsapp from "pages/Whatsapp";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/pages-starter", component: <PagesStarter /> },
  { path: "/my-profile", component: <UserProfile /> },
  { path: "/change-password", component: <ChangePassword /> },
  { path: "/keywords", component: <Keywords /> },
  { path: "/agents", component: <Agents /> },
  { path: "/whatsapp", component: <Whatsapp /> },
  // { path: "/playground", component: <EcommerceOrder /> },
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/playground", component: <Playground /> },
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  { path: "/register", component: <SignUp /> },
  { path: "/reset-password/:id", component: <ResetPassword /> },
  { path: "/reset-password-success", component: <ResetPasswordSuccess /> },

  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
];
export { authProtectedRoutes, publicRoutes };