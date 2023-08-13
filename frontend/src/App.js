import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/scss/theme.scss";
import NonAuthLayout from "./Layouts/NonLayout";
import VerticalLayout from "./Layouts/VerticalLayout";
import { adminOnlyRoutes, authProtectedRoutes, publicRoutes } from "./Routes/allRoutes";

//constants
import AuthProtected from "Routes/AuthProtected";
import { useSelector } from "react-redux";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useSelector((state) => ({
    user: state.Login.user,
  }));

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setIsAdmin(obj.user.role === "admin");
    }
  }, [user]);

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
          />
        ))}
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <React.Fragment>
                <AuthProtected>
                  <VerticalLayout>{route.component}</VerticalLayout>
                </AuthProtected>
              </React.Fragment>
            }
          />
        ))}
        {isAdmin &&
          adminOnlyRoutes.map((route, idx) => (
            <Route
              path={route.path}
              key={idx}
              element={
                <React.Fragment>
                  <AuthProtected>
                    <VerticalLayout>{route.component}</VerticalLayout>
                  </AuthProtected>
                </React.Fragment>
              }
            />
          ))}
      </Routes>
    </React.Fragment>
  );
};

export default App;
