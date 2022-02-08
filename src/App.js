import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import LoginComponent from "./page/LoginComponent.jsx";
import axios from "axios";
import netlifyIdentity from "netlify-identity-widget";

const IN_DEVELOPMENT_PATH = "/development";
const INVENTORY_MANAGEMENT_PATH = "/management/inventory";
const REQUEST_MANAGEMENT_PATH = "/management/requests";
const USER_MANAGEMENT_PATH = "/management/users";
const REGISTER_USER_PATH = "/register";
const PROFILE_PATH = "/profile";
const LOGIN_PATH = "/";
const ADMIN_DASHBOARD_PATH = "/dashboard";
const VEHICLE_PAGE_PATH = "/management/inventory/vehicle";
const GENERATE_INVOICE_PATH = "/management/generate/invoice";
const INVOICES_TABLE_PATH = "/management/invoices";
const VIEW_INVOICE_PAGE = "/management/invoices/view";

export default function App() {
  const [admin, setAdmin] = useState(null);

  const verifyUser = (user) => {
      console.log(user)
  }

  useEffect( () => {
      verifyUser(netlifyIdentity.currentUser())
  })

  if (admin) {
    return (
      <>
        <Router>
          <Routes>
            <Route exact path={VEHICLE_PAGE_PATH} element={<>Vehicle Page</>} />
            <Route
              exact
              path={INVENTORY_MANAGEMENT_PATH}
              element={<>Inventory Page</>}
            />
            <Route
              exact
              path={REQUEST_MANAGEMENT_PATH}
              element={<>Request Page</>}
            />
            <Route exact path={USER_MANAGEMENT_PATH} element={<>User Page</>} />
            <Route exact path={PROFILE_PATH} element={<>Profile Page</>} />
            <Route
              exact
              path={ADMIN_DASHBOARD_PATH}
              element={<>Dashboard Page</>}
            />
            <Route exact path={GENERATE_INVOICE_PATH} element={<>Gen Page</>} />
            <Route
              exact
              path={INVOICES_TABLE_PATH}
              element={<>Invoice Page</>}
            />
            <Route
              exact
              path={VIEW_INVOICE_PAGE}
              element={<>Invoice Edit Page</>}
            />
          </Routes>
        </Router>
      </>
    );
  }
  return <LoginComponent setAdmin={verifyUser} />;
}
