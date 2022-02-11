import React from "react";
import { List, ListItem } from "@material-ui/core";
import httpClient from "../httpClient";

const INVENTORY_MANAGEMENT_PATH = "/admin/management/inventory";
const REQUEST_MANAGEMENT_PATH = "/admin/management/requests";
const USER_MANAGEMENT_PATH = "/admin/management/users";
const PROFILE_PATH = "/admin/profile";
const ADMIN_DASHBOARD_PATH = "/admin/dashboard";


export default function SidebarComponent(props) {
    const handleLogout= () => {
        httpClient().post("/logout")
        .then( res => {
            window.location.replace("/")
        })
    }
  return (
    <div id="sidebar-container">
      <List>
        <ListItem className="side-item" component={"a"} href={ADMIN_DASHBOARD_PATH} >Dashboard</ListItem>
        <ListItem className="side-item" component={"a"} href={INVENTORY_MANAGEMENT_PATH}>Manage Inventory</ListItem>
        <ListItem className="side-item" component={"a"} href={REQUEST_MANAGEMENT_PATH}>Manage Request</ListItem>
        { props.state?.access?.includes("admin") ? (
            <ListItem className="side-item" component={"a"} href={USER_MANAGEMENT_PATH}>Manage Users</ListItem>
        ) : (
            <></>
        )}
        
        <ListItem className="side-item" component={"a"} href={PROFILE_PATH}>Account</ListItem>
        <ListItem className="side-item" component={"div"} onClick={handleLogout}>Logout</ListItem>
      </List>
    </div>
  );
}
