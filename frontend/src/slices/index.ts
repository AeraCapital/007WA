import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import AgentsReducer from "./agents/reducer";
import ChangePasswordReducer from "./auth/changepwd/reducer";
import ForgotPasswordReducer from "./auth/forgetpwd/reducer";
import LoginReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";
import RegisterReducer from "./auth/register/reducer";
import ResetPasswordReducer from "./auth/resetpwd/reducer";
import KeywordsReducer from "./keywords/reducer";
import LayoutReducer from "./layouts/reducer";
import MessagesReducer from "./messages/reducer";
import WhatsappReducer from "./whatsapp/reducer";

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

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Login"], // Add other reducers you want to persist
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);
