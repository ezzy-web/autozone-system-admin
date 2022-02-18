import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense } from 'react';
import { httpClient } from "./httpClient.jsx";

import { Snackbar } from "@material-ui/core"

// StyleSheet
import './components/index-comp/style.scss';
import './components/inventory-comp/style.scss';
import './components/vehicle-comp/style.scss';
import './components/vehicle-comp/script.js';


import './assets/vendor/scripts'



// Paths
const INVENTORY_PATH = "/inventory"
const VEHICLE_PATH = "/inventory/vehicle"
const SAVED_PATH = "/inventory/saved"
const CONTACT_PATH = "/contact"
const ABOUT_PATH = "/about"

const IndexPage = React.lazy(() => import("./pages/IndexPage.jsx"));
// const InventoryPage = React.lazy(() => import("./pages/InventoryPage.jsx"));
// const AboutPage = React.lazy(() => import("./pages/AboutPage.jsx"));
// const ContactPage = React.lazy(() => import("./pages/ContactPage.jsx"));
// const VehiclePage = React.lazy(() => import("./pages/VehiclePage.jsx"));
// const SavedPage = React.lazy(() => import("./pages/SavedPage.jsx"));
// const PageNotFound = React.lazy(() => import("./pages/PageNotFound.jsx"));

const InventoryPage = (<></>)
const AboutPage = (<></>)
const ContactPage = (<></>)
const VehiclePage = (<></>)
const SavedPage = (<></>)
const PageNotFound = (<></>)



export default function App() {

  const [state, setState] = React.useState(null)
  const [toastMessage, setMessage] = React.useState("")
  const [openToast, setOpenToast] = React.useState("")


  const clientSession = () => {
    httpClient().get('/server/@client_session')
      .then(res => {
        setState({
          saved: res.data.data.saved,
          recents: res.data.data.recents
        })
      })
  }

  const UIComponents = {
    openToast: (message) => {
      setMessage(message)
      setOpenToast(true)
    },

    closeToast: () => {
      setOpenToast(false)
    }
  }

  React.useEffect( () => {
    clientSession()
  }, [])


  document.title = "Javvys Autozone"
  if (false) {
    return (<></>)
  }
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => {
            return (
              <Suspense fallback={<></>}>
                <IndexPage {...props} client={state} />
              </Suspense>
            )
          }} />
          <Route exact path={INVENTORY_PATH} render={(props) => {
            return (
              <Suspense fallback={<></>}>
                <InventoryPage {...props} client={state} UIComponents={UIComponents} />
              </Suspense>
            )
          }} />
          <Route exact path={VEHICLE_PATH} render={(props) => {
            return (
              <Suspense fallback={<></>}>
                <VehiclePage {...props} client={state} UIComponents={UIComponents} />
              </Suspense>
            )

          }} />
          <Route exact path={SAVED_PATH} render={(props) => {
            return (
              <Suspense fallback={<></>}>
                <SavedPage {...props} client={state} UIComponents={UIComponents} />
              </Suspense>
            )

          }} />
          <Route exact path={CONTACT_PATH} render={(props) => {
            return (
              <Suspense fallback={<></>}>
                <ContactPage {...props} client={state} UIComponents={UIComponents} />
              </Suspense>
            )

          }} />
          <Route exact path={ABOUT_PATH} render={(props) => {
            return (
              <Suspense fallback={<></>}>
                <AboutPage {...props} client={state} UIComponents={UIComponents} />
              </Suspense>
            )

          }} />

          <Route render={(props) => {
            <Suspense fallback={<></>}>
              <PageNotFound {...props} client={state} UIComponents={UIComponents} />
            </Suspense>
          }} />
        </Switch>
      </Router>
      <Snackbar open={openToast} message={toastMessage} />
    </>
  );
}

