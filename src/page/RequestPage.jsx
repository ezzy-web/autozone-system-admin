import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Container,
  Card,
  Button,
  Box
} from "@material-ui/core";
import { TextField } from "@mui/material";
import { httpClient } from "../httpClient";
import TableComponent from "../components/DatatableComponent/DataTable";

function RequestExpansion({ data }) {
  return (
    <>
      <div className="w-100 p-5">
        <div>
          <>
          <div className="d-flex justify-space-start my-3">
              <Typography variant="button">
                <small>Reason</small>
              </Typography>
              <Typography>
                <small className="px-4">
                  {data.reason}
                </small>
              </Typography>
            </div>
            <div className="d-flex justify-space-start">
              <Typography variant="button">
                <small>Additional Details</small>
              </Typography>
              <Typography>
                <small className="px-4">
                  {data.comment && data.comment !== ""
                    ? data.comment
                    : "No Additional Detail"}
                </small>
              </Typography>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default function RequestPage(props) {
  const [requests, setRequests] = useState([]);
  const [loaded, setLoad] = useState(false);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState(null);
  const [serachResults, setResults] = useState(requests);

  const handleSearch = (e) => {
    setLoad(false);
    const search = e.target.value;
    setSearch(search);
    const mapping = filters.filter((data) => {
      var equ = false;
      data.match.forEach((param) => {
        if (!equ) {
          equ = param.includes(search.toUpperCase());
        }
      });

      return equ;
    });

    if (search === "") {
      setResults(requests);
    } else {
      setResults(mapping.map((data) => requests[data.index]));
    }

    setTimeout(() => setLoad(true), 1000);
  };

  const columns = [
    {
      name: (
        <>
          <Typography variant="button">Vehicle</Typography>
        </>
      ),
      selector: (row) => (
        <div className="d-flex flex-column">
          <Typography
            component={"a"}
            href={`/admin/management/inventory/vehicle?stck=${row?.vehicle.id}`}
            variant="button"
          >
            <small>{row?.vehicle.title}</small>
          </Typography>
        </div>
      ),
    },
    {
      name: (
        <>
          <Typography variant="button">Client</Typography>
        </>
      ),
      selector: (row) => (
        <div className="d-flex flex-column">
          <Typography variant="button">
            <small>{`${row?.firstName} ${row?.lastName}`}</small>
          </Typography>
        </div>
      ),
    },

    {
      name: (
        <>
          <Typography variant="button">Client Email</Typography>
        </>
      ),
      selector: (row) => (
        <a href={`mailto:${row?.email}`} className="d-flex flex-column">
          <small>{`${row?.email}`}</small>
        </a>
      ),
    },

    {
      name: (
        <>
          <Typography variant="button">Client Mobile</Typography>
        </>
      ),
      selector: (row) => (
        <div className="d-flex flex-column">
          <Typography
            component={"a"}
            href={
              row?.mobile && row?.mobile !== "" ? `tel:${row?.mobile}` : "#"
            }
            variant="button"
          >
            <small>{`${
              row?.mobile && row?.mobile !== "" ? row?.mobile : "NA"
            }`}</small>
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
          setFilters(
            body.content.map((data, index) => ({
              index: index,
              match: [
                data?.vehicle.id,
                data?.vehicle.title,
                data?.firstName,
                data?.lastName,
              ],
            }))
          );

          setResults(body.content);
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
        <Box className="my-2">
          <Typography variant="h5" component={"h1"}>
            Request Management{" "}
          </Typography>
          <TextField
          variant="standard"
            className="mt-5 w-75"
            value={search}
            onChange={handleSearch}
            size="small"
            placeholder="Search Requests"
          />
        </Box>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <Card>
              {loaded ? (
                <TableComponent
                  columns={columns}
                  data={serachResults}
                  expandableRows={true}
                  expandableRowsComponent={RequestExpansion}
                />
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
