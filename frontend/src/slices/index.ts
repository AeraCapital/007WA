import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";
import ForgotPasswordReducer from "./auth/forgetpwd/reducer";
import ResetPasswordReducer from "./auth/resetpwd/reducer";
import ChangePasswordReducer from "./auth/changepwd/reducer";
import AccountReducer from "./auth/register/reducer";
import KeywordsReducer from "./keywords/reducer";

const rootReducer = combineReducers({
  Keywords: KeywordsReducer,
  Layout: LayoutReducer,
  Login: LoginReducer,
  Profile: ProfileReducer,
  ForgetPassword: ForgotPasswordReducer,
  ResetPassword: ResetPasswordReducer,
  ChangePassword: ChangePasswordReducer,
  Account: AccountReducer,
});

export default rootReducer;
