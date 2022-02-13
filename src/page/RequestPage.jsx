
import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Toolbar,
  Typography,
  Container,
  Card,
  Button,
  TextField,
} from "@material-ui/core";
import httpClient from "../httpClient";
import TableComponent from "../components/DatatableComponent/DataTable";

export default function RequestPage(props) {
  const [requests, setRequests] = useState([]);
  const [loaded, setLoad] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    //   EXECUTE CODE TO FILTER Requests
  };

  const columns = [
    {
      name: (
        <>
          <Typography variant="button">Stock No.</Typography>
        </>
      ),
      selector: (row) => (
        <div className="d-flex flex-column">
          <Typography variant="button">
            <small>{row?.id}</small>
          </Typography>
        </div>
      ),
    },
  ];

  const getRequests = () => {
    setLoad(false);
    httpClient()
      .get("/getRequests")
      .then((res) => {
        const body = res.data;
        if (body.status) {
          setRequests(body.content);
        }
        setLoad(true);
      })
      .catch((err) => {
        setLoad(true);
      });
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      <Container>
        <Toolbar className="my-2">
          <Typography variant="h5" component={"h1"}>
            Request Management{" "}
          </Typography>
          <TextField
            className="mx-4 w-75"
            value={search}
            onChange={handleSearch}
            size="small"
            placeholder="Search Requests"
          />
        </Toolbar>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <Card>
              {loaded ? (
                <TableComponent columns={columns} data={requests} />
              ) : (
                <div className="table-loading">
                  <CircularProgress />
                </div>
              )}
            </Card>
          </div>

          <div className="col-md-4 col-sm-12">
            <Button
              size="small"
              variant="text"
              className="ml-4"
              onClick={getRequests}
            >
              <small>Refresh</small>
              <span className="mx-1">
                <i className="lni lni-reload"></i>
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
