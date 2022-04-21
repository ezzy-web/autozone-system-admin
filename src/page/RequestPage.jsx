
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
import {httpClient} from "../httpClient";
import TableComponent from "../components/DatatableComponent/DataTable";

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
          setFilters(
            body.content.map((data, index) => ({
              index: index,
              match: [
                data?.id
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
                <TableComponent columns={columns} data={serachResults} />
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
