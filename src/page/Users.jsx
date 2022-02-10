import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
  CircularProgress,
  Toolbar,
  Typography,
  Container,
  Card,
  Avatar,
  Button,
  Badge
} from "@material-ui/core";
import httpClient from "../httpClient";
import TableComponent from "../components/DatatableComponent/DataTable";

const NewUserForm = React.lazy(() =>
  import("../components/user-components/NewUserForm.jsx")
);

const Expanded = React.lazy(() =>
  import("../components/user-components/UserExpand")
);

export default function UserPage(props) {
  const currentUser = props.state;
  const [users, setUsers] = useState([]);
  const [loaded, setLoad] = useState(false);
  const [modal, toggleModal] = useState(false);

  const handleToggleModal = () => {
    toggleModal(!modal);
  };

  const closeModal = () => {
    toggleModal(false);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => {
        if (row.uid === currentUser.uid) {
          return (
            <>
              <Badge color="secondary" variant="dot">
                <b className="text-muted">{row.fullName}</b>
              </Badge>
            </>
          );
        }
        return <b className="text-muted"> {row.fullName} </b>;
      },
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Position",
      selector: (row) => row?.position,
    },
    {
      name: "Role",
      selector: (row) => {
        return (
          <>
            {row.access?.includes("admin") ? <>Administrator</> : <>Normal</>}
          </>
        );
      },
    },
  ];

  const getUsers = () => {
    setLoad(false);
    httpClient()
      .get("/getAllUsers")
      .then((res) => {
        const body = res.data;
        if (body.status) {
          setUsers(body.content);
        }
        setLoad(true);
      })
      .catch((err) => {
        setLoad(true);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Container>
        <Toolbar>
          <Typography variant="h5" component={"h1"}>
            User Management{" "}
            <Button variant="text" className="ml-4" onClick={getUsers}>
              <small>Refresh Users</small>
              <span className="mx-1">
                <i className="lni lni-reload"></i>
              </span>
            </Button>
          </Typography>
        </Toolbar>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <Card>
              {loaded ? (
                <TableComponent
                  columns={columns}
                  data={users}
                  expandableRows={true}
                  expandableRowsComponent={(props) => (
                    <Expanded {...props} current={currentUser} />
                  )}
                />
              ) : (
                <div className="table-loading">
                  <CircularProgress />
                </div>
              )}
            </Card>
          </div>

          <div className="col-md-4 col-sm-12">
            <Card id="new-user-card">
              <div className="content">
                <Typography variant="h5" component={"h4"}>
                  Add New Members
                </Typography>
                <p>Add new members to your team.</p>

                <Button onClick={handleToggleModal}>
                  <Avatar sx={{ width: "16px", height: "16px" }} />{" "}
                  <span className="mx-3">Add New Member</span>{" "}
                </Button>
                <Modal
                  className="modal-containe"
                  show={modal}
                  onHide={closeModal}
                >
                  <>
                    <NewUserForm toggleModal={toggleModal} />
                  </>
                </Modal>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
