import React, { useState } from "react";

import {
  Toolbar,
  Drawer,
  Divider,
  Box,
  AppBar,
  Button,
  Tooltip,
  Avatar
} from "@material-ui/core";

const drawerWidth = 40;
const SidebarComponent = React.lazy(() =>
  import("../components/SidebarComponent.jsx")
);
const LogoComponent = () => (
  <>
    <div className="mx-5">System Control</div>
  </>
);


function Layout(props) {
  const user = props.state
  const [anchor, ToggleDrawer] = useState(false);
  const handleDrawerToggle = () => {
    ToggleDrawer(!anchor);
    console.log(anchor);
  };
  const handleDrawerClose = () => {
    ToggleDrawer(false);
    console.log(anchor);
  };

  return (
    <Box className="admin-portal">
      <AppBar
        color="inherit"
        position="static"
      >
        <Toolbar className={"admin-main-bar"}>
          <Button
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <span>
              <i className="lni lni-menu"></i>
            </span>
            <LogoComponent />
          </Button>
          
          
          
          <Tooltip title="Account Profile">
            <Button
              size="medium"
              href={"/admin/profile"}
              variant="text"
            >
              <Avatar sx={{ width: 32, height: 32 }}>{user.firstName.charAt(0).toUpperCase()}</Avatar>
              <small  className=" text-muted mx-3"><b>{user.fullName}</b></small>
            </Button>
          </Tooltip>
        </Toolbar>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          anchor="left"
          open={anchor}
          onClose={handleDrawerClose}
        >
          <Toolbar>
            <LogoComponent />
            <Button
              onClick={handleDrawerClose}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <span>
                <i className="lni lni-close"></i>
              </span>
            </Button>
          </Toolbar>
          <Divider />
          <SidebarComponent state={user} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <main>{props.render()}</main>
      </Box>
    </Box>
  );
}

export default Layout;
