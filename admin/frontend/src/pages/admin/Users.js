import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Container,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Snackbar,
  Modal,
  TextField,
  CircularProgress,
  Grid,
  Alert,
  Chip,
} from "@mui/material";
import {
  FileCopy,
  MoreVert,
  Close,
  Facebook,
  GitHub,
  Google,
  Refresh,
  AlternateEmail,
} from "@mui/icons-material";
import $ from "jquery";

function deleteStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    margin: "auto",
    transform: `translate(-${top}%, -${left}%)`,
    position: "absolute",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const IconProvider = (uid) => {
  switch (uid) {
    case "google.com":
      return <Google style={{ fill: "rgb(46, 46, 46)" }}></Google>;
    case "facebook.com":
      return <Facebook style={{ fill: "rgb(46, 46, 46)" }}></Facebook>;
    case "github.com":
      return <GitHub style={{ fill: "rgb(46, 46, 46)" }}></GitHub>;
    case "password":
      return (
        <AlternateEmail style={{ fill: "rgb(46, 46, 46)" }}></AlternateEmail>
      );
    default:
      return uid;
  }
};

export default function UserList({ session }) {
  const initialSession = {
    email: "",
    uid: "",
    disabled: "",
  };
  // menulist
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCopy, setOpenCopy] = React.useState(false);
  const [indicator, setShowIndicator] = React.useState(true);
  const [tableVisible, setTableVisible] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [sessionSelect, setSessionSelect] = React.useState(initialSession);
  const [optionSelect, setOptionSelect] = React.useState("");
  const [snackbar, setSnackbar] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const open = Boolean(anchorEl);

  const errSnackbar = (text) => {
    setSnackbar(text);
    setSnackbarSeverity("error");
    setOpenCopy(true);
  };

  const copyUID = (uid) => {
    navigator.clipboard.writeText(uid);
    setSnackbarSeverity("success");
    setSnackbar("Copy UID Successfully!");
    setOpenCopy(true);
  };

  const openOptions = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setSessionSelect({
      ...sessionSelect,
      email: "",
      uid: "",
    });
    setAnchorEl(null);
  };
  const closeCopy = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCopy(false);
  };

  const showIndicator = () => {
    setShowIndicator(true);
    setTableVisible(false);
  };
  const hiddenIndicator = () => {
    setShowIndicator(false);
    setTableVisible(true);
  };
  const modalOpen = (text) => {
    setOptionSelect(text);
    setOpenModal(true);
  };
  const modalClose = () => setOpenModal(false);

  $(document).ready(function () {
    $("#searchId").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#tableUser tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  const actionCopy = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeCopy}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // user
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [adminList, setAdminList] = useState([]);
  useEffect(() => {
    UsersGet();
  }, []);

  const UsersGet = async () => {
    showIndicator();

    await fetch("https://raningu-api.glitch.me/data/users/get_admin", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        uid: session.user.uid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setAdminList(result.msg);
      });

    await fetch("https://raningu-api.glitch.me/data/users/get_user", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      })
      .then(() => {
        handleClose();
        hiddenIndicator();
      });
  };

  const UsersDelete = async () => {
    modalClose();
    showIndicator();
    await fetch("https://raningu-api.glitch.me/data/users/delete_user", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        adminUid: session.user.uid,
        uid: sessionSelect.uid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setSessionSelect(initialSession);
        if (result.result === "success") {
          msgSnackbar(result.msg);
        } else {
          msgSnackbar(result.msg);
        }
      })
      .then(() => {
        UsersGet();
      });
  };

  const UsersDisable = async () => {
    modalClose();
    showIndicator();
    await fetch("https://raningu-api.glitch.me/data/users/disable_user", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        adminUid: session.user.uid,
        uid: sessionSelect.uid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setSessionSelect(initialSession);
        if (result.result === "success") {
          msgSnackbar(result.msg);
        } else {
          msgSnackbar(result.msg);
        }
      })
      .then(() => {
        UsersGet();
      });
  };

  const UsersEnable = async () => {
    modalClose();

    showIndicator();
    await fetch("https://raningu-api.glitch.me/data/users/enable_user", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        adminUid: session.user.uid,
        uid: sessionSelect.uid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setSessionSelect(initialSession);
        if (result.result === "success") {
          msgSnackbar(result.msg);
        } else {
          msgSnackbar(result.msg);
        }
      })
      .then(() => {
        UsersGet();
      });
  };

  const msgSnackbar = (text) => {
    setSnackbarSeverity("success");
    setSnackbar(text);
    setOpenCopy(true);
  };
  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Users in application (Raningu)
              </Typography>
            </Box>
            <Box>
              <a
                target="_blank"
                href="https://console.firebase.google.com/u/2/project/raningu-95d67/authentication/users"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="primary">
                  FIREBASE CONSOLE
                </Button>
              </a>
            </Box>
          </Box>

          <Box sx={{ display: "flex", margin: 2 }}>
            <TextField
              sx={{ width: "50%" }}
              id="searchId"
              label="Search"
              variant="standard"
            />
            <Tooltip title="Refresh" onClick={UsersGet}>
              <IconButton>
                <Refresh style={{ fill: "rgb(46, 46, 46)" }} />
              </IconButton>
            </Tooltip>
          </Box>
          {tableVisible && (
            <TableContainer component={Paper}>
              <Table
                id="tableUser"
                className={classes.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Avatar</TableCell>
                    <TableCell align="left">Display Name</TableCell>
                    <TableCell align="left">E-mail</TableCell>
                    <TableCell align="center">Provider ID</TableCell>
                    <TableCell align="center">UID</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.uid}>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center">
                          <Avatar src={user.photoURL} />
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box sx={{ pb: 0 }}>{user.displayName}</Box>
                        {user.disabled && <Chip label="Disabled" />}
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="center">
                        {IconProvider(user.providerData[0].providerId)}
                      </TableCell>
                      <TableCell align="center">{user.uid}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Copy UID">
                          <IconButton>
                            <FileCopy
                              style={{ fill: "rgb(46, 46, 46)" }}
                              onClick={() => copyUID(user.uid)}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="View more options"
                          onClick={(event) => {
                            if (adminList.includes(user.uid)) {
                              return errSnackbar("Administrator cant action.");
                            }
                            setSessionSelect({
                              email: user.email,
                              uid: user.uid,
                              disabled: user.disabled,
                            });
                            openOptions(event);
                          }}
                        >
                          <IconButton>
                            <MoreVert style={{ fill: "rgb(46, 46, 46)" }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {sessionSelect.disabled ? (
                      <MenuItem onClick={() => modalOpen("enable")}>
                        Enable Account
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => modalOpen("disable")}>
                        Disable Account
                      </MenuItem>
                    )}
                    <MenuItem onClick={() => modalOpen("delete")}>
                      Delete Account
                    </MenuItem>
                  </Menu>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {indicator && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Paper>
      </Container>
      <Modal
        open={openModal}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm" sx={deleteStyle}>
          <Grid container>
            <Grid
              item
              xs={8}
              direction="column"
              display="flex"
              justifyContent="center"
              sx={{ pb: 1 }}
            >
              <Typography variant="h6" sx={{ p: 0 }}>
                {optionSelect !== "delete"
                  ? optionSelect !== "disable"
                    ? "Enable account"
                    : "Disable Account"
                  : "Delete Account"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                pb: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={() => {
                  modalClose();
                  setSessionSelect(initialSession);
                }}
              >
                <Close></Close>
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              {optionSelect === "enable" ? (
                <Alert severity="info">
                  Users with enabled accounts will be able to sign in again.
                </Alert>
              ) : (
                <Alert severity="error">
                  {optionSelect !== "delete"
                    ? "Users with disabled accounts aren't able to sign in."
                    : "After you delete an account, it's permanently deleted. Accounts can't be undeleted."}
                </Alert>
              )}
            </Grid>
          </Grid>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: "85%",
              fontWeight: "regular",
              color: "gray",
            }}
          >
            User account
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              ml: 1,
              fontSize: "80%",
              fontWeight: "regular",
            }}
          >
            {sessionSelect.email}
          </Typography>
          <Grid
            item
            xs={12}
            sx={{
              pb: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ pt: 2 }}>
              <Button
                variant="text"
                sx={{ mr: 1 }}
                onClick={() => {
                  modalClose();
                  setSessionSelect(initialSession);
                }}
              >
                Cancel
              </Button>
              {optionSelect === "enable" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={UsersEnable}
                >
                  {optionSelect}
                </Button>
              ) : optionSelect === "disable" ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={UsersDisable}
                >
                  {optionSelect}
                </Button>
              ) : (
                <Button variant="contained" color="error" onClick={UsersDelete}>
                  {optionSelect}
                </Button>
              )}
            </Box>
          </Grid>
        </Container>
      </Modal>
      <Snackbar
        open={openCopy}
        autoHideDuration={3000}
        onClose={closeCopy}
        action={actionCopy}
      >
        <Alert
          onClose={handleClose}
          severity={`${snackbarSeverity}`}
          sx={{ width: "100%" }}
        >
          {snackbar}
        </Alert>
      </Snackbar>
    </div>
  );
}
