import React, { useState, useEffect } from "react";
import {
  Button,
  Toolbar,
  Typography,
  Card,
  Container,
} from "@material-ui/core";
import { post } from "../httpClient";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    const res = await post("get_all_activities").catch((err) => {});
    if (!res) return;
    if (!res.data.status) return;
    setActivities(res.data.content.activities);
  };

  useEffect(() => getActivities(), []);
  return (
    <div>
      <Container>
        <Toolbar className="my-2">
          <Typography variant="h5" component={"h1"}>
            Dashboard{" "}
          </Typography>
        </Toolbar>

        <Typography variant="subtitle1" component={"h3"}>
          Quick Links{" "}
        </Typography>
        <div className="separator my-2"></div>
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <Card className="dashboard" id="new-object-card">
              <div className="content">
                <Typography variant="h5" component={"h4"}>
                  Invoice Management
                </Typography>

                <Button href="/admin/management/invoices">
                  <span className="mx-3">Manage invoices</span>{" "}
                </Button>
              </div>
            </Card>
          </div>

          <div className="col-md-4 col-sm-12">
            <Card className="dashboard" id="new-object-card">
              <div className="content">
                <Typography variant="h5" component={"h4"}>
                  Inventory Management
                </Typography>

                <Button href="/admin/management/inventory">
                  <span className="mx-3">Manage Inventory</span>{" "}
                </Button>
              </div>
            </Card>
          </div>

          <div className="col-md-4 col-sm-12">
            <Card className="dashboard" id="new-object-card">
              <div className="content">
                <Typography variant="h5" component={"h4"}>
                  Request Management
                </Typography>

                <Button href="/admin/management/requests">
                  <span className="mx-3">Manage Requests</span>{" "}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <Typography variant="subtitle1" component={"h3"}>
          Recent Activities{" "}
        </Typography>
        <div className="separator my-2"></div>
        <Card>
          <div className="container mt-2">
            {activities.map((activity) => {
              const seconds = parseInt(activity.timeStamp.seconds);
              const nanoseconds = parseInt(activity.timeStamp.nanoseconds);
              var date = new Date(seconds * 1000 + nanoseconds / 1000000);
              return (
                <div key={date.toLocaleString()}>
                  <div className="fw-bolder">
                    <small>
                      {" "}
                      {activity.title}{" "}
                      <span className="text-muted">
                        {" "}
                        {date.toLocaleString()}{" "}
                      </span>{" "}
                    </small>
                  </div>
                  <div className="text-muted">
                    {" "}
                    <small>{activity.details} </small>{" "}
                  </div>
                  <div className="separator my-2"></div>
                </div>
              );
            })}
          </div>
        </Card>
      </Container>
    </div>
  );
}
