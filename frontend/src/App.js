import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/scss/theme.scss";
import NonAuthLayout from "./Layouts/NonLayout";
import VerticalLayout from "./Layouts/VerticalLayout";
import { authProtectedRoutes, publicRoutes } from "./Routes/allRoutes";

//constants
import AuthProtected from "Routes/AuthProtected";

function App() {
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
      </Routes>
    </React.Fragment>
  );
}

export default App;
