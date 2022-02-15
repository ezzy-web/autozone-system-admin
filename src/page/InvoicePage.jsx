
import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Toolbar,
  Typography,
  Container,
  Card,
  Button,
  TextField
} from "@material-ui/core";
import httpClient from "../httpClient";
import TableComponent from "../components/DatatableComponent/DataTable";

export default function InvoicePage(props) {
  const [invoices, setInvoices] = useState([]);
  const [loaded, setLoad] = useState(false);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState(null)
  const [serachResults, setResults] = useState(invoices)
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
      setResults(invoices);
    } else {
      setResults(mapping.map((data) => invoices[data.index]));
    }

    setTimeout(() => setLoad(true), 1000);
  };

  const columns = [
    {
      name: (
        <>
          <Typography variant="button">Invoice No.</Typography>
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
    {
      name: (
        <>
          <Typography variant="button">Client Name</Typography>
        </>
      ),
      selector: (row) => (
        <div className="d-flex flex-column">
          <Typography variant="button">
            <small>{row?.client.firstName + " " + row?.client.lastName}</small>
          </Typography>
        </div>
      ),
    },
    {
      name: (
        <>
          <Typography variant="button">Vehicle</Typography>
        </>
      ),
      selector: (row) => (
        <div className="d-flex flex-column">
          <Typography variant="button">
            <small>{row?.vehicle.title}</small>
          </Typography>
        </div>
      ),
    },
    {
      name: (
        <>
          <Typography variant="button">Actions</Typography>
        </>
      ),
      selector: (row) => (
        <div className="d-flex">
          <Button>
            <small>Edit</small>
          </Button>

          <Button>
            <small>Get PDF</small>
          </Button>
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
          setFilters(body.content.map( (data, index) => ({
            index: index,
            match: [
              data?.id.toString().toUpperCase(),
              data?.client.firstName.toUpperCase(),
              data?.client.lastName.toUpperCase(),
              data?.vehicle.make.toUpperCase(),
              data?.vehicle.model.toUpperCase(),
              data?.vehicle.year.toUpperCase(),
              data?.vehicle.title.toUpperCase(),
              data?.client.firstName.toUpperCase() + " " + data?.client.lastName.toUpperCase()
            ]
          })))
          setResults(body.content)
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

                <Button href="/admin/management/generate/invoice" >
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
