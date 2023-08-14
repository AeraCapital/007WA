import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";
import ForgotPasswordReducer from "./auth/forgetpwd/reducer";
import ResetPasswordReducer from "./auth/resetpwd/reducer";
import ChangePasswordReducer from "./auth/changepwd/reducer";
import RegisterReducer from "./auth/register/reducer";
import KeywordsReducer from "./keywords/reducer";
import AgentsReducer from "./agents/reducer";
import WhatsappReducer from "./whatsapp/reducer";
import MessagesReducer from "./messages/reducer";

const rootReducer = combineReducers({
  Messages: MessagesReducer,
  Whatsapp: WhatsappReducer,
  Keywords: KeywordsReducer,
  Agents: AgentsReducer,
  Layout: LayoutReducer,
  Login: LoginReducer,
  Profile: ProfileReducer,
  ForgetPassword: ForgotPasswordReducer,
  ResetPassword: ResetPasswordReducer,
  ChangePassword: ChangePasswordReducer,
  Register: RegisterReducer,
});

export default rootReducer;
