import React from "react";
import { Toolbar, Avatar } from "@material-ui/core";

export default function UserExpand(props) {
  const data = props.data;
  // const currentUser = props.current;
  return (
    <div>
      <div className="container">
        <Toolbar>
          <Avatar>{data?.firstName.charAt(0).toUpperCase()}</Avatar>
          <div className="container">
            <span>{data?.fullName}</span> <br />
            <span className="text-muted">
              {data?.access?.includes("admin") ? "Administrator" : "Normal"}
            </span>
          </div>
        </Toolbar>

        <div className="row my-4">
          <div className="col-md-5 col-sm-12">
            
          </div>
        </div>
      </div>
    </div>
  );
}
