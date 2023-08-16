import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NonAuthLayout from "./Layouts/NonLayout";
import VerticalLayout from "./Layouts/VerticalLayout";
import { adminOnlyRoutes, authProtectedRoutes, publicRoutes } from "./Routes/allRoutes";
import "./assets/scss/theme.scss";

//constants
import AuthProtected from "Routes/AuthProtected";
import { useSelector } from "react-redux";

const App = () => {
  const { role } = useSelector((state) => state.Login.user) || {};
  const isAdmin = role === "admin";

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
