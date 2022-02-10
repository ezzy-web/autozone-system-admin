import React, { Suspense, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import './styles/app.scss'
import httpClient from './httpClient.js'


const LoginComponent = React.lazy(() => import("./page/LoginComponent.jsx"))
const Layout = React.lazy(() => import("./layout/Layout.jsx"))

const UserPage = React.lazy(() => import("./page/Users"))

const INVENTORY_MANAGEMENT_PATH = "/admin/management/inventory";
const REQUEST_MANAGEMENT_PATH = "/admin/management/requests";
const USER_MANAGEMENT_PATH = "/admin/management/users";
const PROFILE_PATH = "/admin/profile";
const ADMIN_DASHBOARD_PATH = "/admin/dashboard";
const VEHICLE_PAGE_PATH = "/admin/management/inventory/vehicle";
const GENERATE_INVOICE_PATH = "/admin/management/generate/invoice";
const INVOICES_TABLE_PATH = "/admin/management/invoices";
const VIEW_INVOICE_PAGE = "/admin/management/invoices/view";



function AdministrativePages(props) {
    return (
        <>
            <Suspense fallback={<></>} >
                <Layout state={props.state} render={() => {
                    return (
                    <Routes>
                        <Route path={VEHICLE_PAGE_PATH} element={<>Vehicle Page</>} />
                        <Route
                        path={INVENTORY_MANAGEMENT_PATH}
                            element={<>Inventory Page</>}
                        />
                        <Route
                            path={REQUEST_MANAGEMENT_PATH}
                            element={<>Request Page</>}
                        />
                        { props.state.access.includes('admin') ? (
                            <Route path={USER_MANAGEMENT_PATH} element={<UserPage state={props.state} />} />
                        ) : (
                            <Route path={USER_MANAGEMENT_PATH} element={<>Not Allowed Administrator Only</>} />
                        ) }
                        
                        <Route path={PROFILE_PATH} element={<>Profile Page</>} />
                        <Route
                            path={ADMIN_DASHBOARD_PATH}
                            element={<>Dashboard Page</>}
                        />
                        <Route
                            path="/"
                            element={<>Dashboard Page</>}
                        />
                        <Route exact path={GENERATE_INVOICE_PATH} element={<>Gen Page</>} />
                        <Route
                            path={INVOICES_TABLE_PATH}
                            element={<>Invoice Page</>}
                        />
                        <Route
                            path={VIEW_INVOICE_PAGE}
                            element={<>Invoice Edit Page</>}
                        />
                    </Routes>)}
                } />
            </Suspense>
        </>
    )
}

export default function App() {
    const [admin, setAdmin] = useState(null);
    const [loaded, setLoad] = useState(false);


    const authState = () => {
        httpClient().get("/api/authState")
            .then(res => {
                const body = res.data
                if (body.status) {
                    const user = body.content
                    console.log(user)
                    if (user !== "NO_USER") {
                        setAdmin(user)
                    }
                }

                setLoad(true)
            })
            .catch(err => { setLoad(true) })
    }

    useEffect(() => {
        authState()
    }, [])

    if (loaded) {
        return (
            <Router>
                <Routes>
                    {admin === null ? (
                        <Route path="/"
                            element={
                                <Suspense fallback={<></>}>
                                    <LoginComponent setAdmin={setAdmin} />
                                </Suspense>
                            }
                        />
                    ) : (
                        <Route path="/*" element={<AdministrativePages state={admin} />} />
                    )}
                </Routes>
            </Router>
        )
    }

    return <></>

}
