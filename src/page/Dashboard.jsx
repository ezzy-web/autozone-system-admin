import React from "react";
import {
  Button,
  Toolbar,
  Typography,
  Card,
  Container,
} from "@material-ui/core";

export default function dashboard() {
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
      </Container>
    </div>
  );
}
