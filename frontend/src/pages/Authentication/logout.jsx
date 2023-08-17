import withRouter from "Components/Common/withRouter";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../slices/thunk";

//redux
import { useDispatch, useSelector } from "react-redux";
import { resetAgentsState } from "slices/agents/reducer";
import { resetKeywordsState } from "slices/keywords/reducer";
import { CONNECTION_STATE, udpateWhatsAppState } from "slices/whatsapp/reducer";

const Logout = () => {
  const dispatch = useDispatch();

  const { isUserLogout } = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  useEffect(() => {
    dispatch(resetAgentsState());
    dispatch(resetKeywordsState());
    dispatch(udpateWhatsAppState(CONNECTION_STATE.DISCONNECTED));
    dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/login" />;
  }

  return <></>;
};

export default withRouter(Logout);
