
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

export default function InvoicePage(props) {
  const [invoices, setInvoices] = useState([]);
  const [loaded, setLoad] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    //   EXECUTE CODE TO FILTER Invoices
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

  const getInvoices = () => {
    setLoad(false);
    httpClient()
      .get("/getInvoices")
      .then((res) => {
        const body = res.data;
        if (body.status) {
          setInvoices(body.content);
        }
        setLoad(true);
      })
      .catch((err) => {
        setLoad(true);
      });
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <>
      <Container>
        <Toolbar className="my-2">
          <Typography variant="h5" component={"h1"}>
            Invoice Management{" "}
          </Typography>
          <TextField
            className="mx-4 w-75"
            value={search}
            onChange={handleSearch}
            size="small"
            placeholder="Search Invoices"
          />
        </Toolbar>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <Card>
              {loaded ? (
                <TableComponent columns={columns} data={invoices} />
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
              onClick={getInvoices}
            >
              <small>Refresh</small>
              <span className="mx-1">
                <i className="lni lni-reload"></i>
              </span>
            </Button>
            <Card id="new-object-card">
              <div className="content">
                <Typography variant="h5" component={"h4"}>
                  Add New Invoice
                </Typography>

                <Button >
                  <span className="mx-3">Create Invoice</span>{" "}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
