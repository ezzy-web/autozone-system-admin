import React, { Suspense, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";



// import axios from "axios";
import netlifyIdentity from "netlify-identity-widget";

import './styles/app.scss'


const LoginComponent = React.lazy(() => import("./page/LoginComponent.jsx"))

const INVENTORY_MANAGEMENT_PATH = "/management/inventory";
const REQUEST_MANAGEMENT_PATH = "/management/requests";
const USER_MANAGEMENT_PATH = "/management/users";
const PROFILE_PATH = "/profile";
const ADMIN_DASHBOARD_PATH = "/dashboard";
const VEHICLE_PAGE_PATH = "/management/inventory/vehicle";
const GENERATE_INVOICE_PATH = "/management/generate/invoice";
const INVOICES_TABLE_PATH = "/management/invoices";
const VIEW_INVOICE_PAGE = "/management/invoices/view";

function AdministrativePages() {
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
    )
}

export default function App() {
    const [admin, setAdmin] = useState(null);

    const verifyUser = () => {
        const user = netlifyIdentity.currentUser()
        console.log(user)
        setAdmin(user)
    }

    useEffect(() => {
        verifyUser()
    }, [])

    if (admin === null) {
        return (
            <Router>
                <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <Suspense fallback={<></>}>
                            <LoginComponent setAdmin={verifyUser} />
                        </Suspense>
                    }
                />
                </Routes>
            </Router>
        );
    }

    if (window.location.pathname === '/') {
        return (
            <Router>
                <Routes>
                <Route
                    render={(props) => {
                        return <AdministrativePages {...props} state={this} />;
                    }}
                />
                </Routes>
            </Router>
        )
    }
    return (
        <Router>
            <Routes>
            <Route
                render={(props) => {
                    return <AdministrativePages {...props} state={this} />;
                }}
            />
            </Routes>
        </Router>
    )
}
