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
} from "@mui/material";
import {
  FileCopy,
  MoreVert,
  Close,
  Facebook,
  GitHub,
  Google,
} from "@mui/icons-material";
import $ from "jquery";

const deleteStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};

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
    default:
      return uid;
  }
};

export default function UserList() {
  // menulist
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCopy, setOpenCopy] = React.useState(false);
  const [indicator, setShowIndicator] = React.useState(true);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const open = Boolean(anchorEl);

  const copyUID = (uid) => navigator.clipboard.writeText(uid);
  const openOptions = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const openCopyBar = () => setOpenCopy(true);
  const closeCopy = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCopy(false);
  };
  const showIndicator = () => setShowIndicator(true);
  const hiddenIndicator = () => setShowIndicator(false);
  const modalDeleteOpen = () => setOpenModalDelete(true);
  const modalDeleteClose = () => setOpenModalDelete(false);

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
  useEffect(() => {
    UsersGet();
  }, []);

  const UsersGet = () => {
    fetch("http://localhost:3001/data/auth/get_user", {
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
        hiddenIndicator();
      });
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
                href="https://console.firebase.google.com/u/2/project/websitename-csc361/authentication/users"
                rel="noreferrer"
              >
                <Button variant="contained" color="primary">
                  FIREBASE CONSOLE
                </Button>
              </a>
            </Box>
          </Box>
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
          <Box sx={{ display: "flex", margin: 2 }}>
            <TextField
              style={{ width: "50%" }}
              id="searchId"
              label="Search"
              variant="standard"
            />
          </Box>
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
                  <TableCell align="center">&nbsp;</TableCell>
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
                    <TableCell align="left">{user.displayName}</TableCell>
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
                            onClick={(() => copyUID(user.uid), openCopyBar)}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View more options" onClick={openOptions}>
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
                  <MenuItem onClick={handleClose}>Reset Password</MenuItem>
                  <MenuItem onClick={handleClose}>Disable Account</MenuItem>
                  <MenuItem onClick={modalDeleteOpen}>Delete Account</MenuItem>
                </Menu>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <Modal
        open={openModalDelete}
        onClose={modalDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={deleteStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete account
          </Typography>
          <IconButton>
            <Close></Close>
          </IconButton>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Snackbar
        open={openCopy}
        autoHideDuration={3000}
        onClose={closeCopy}
        message="Copy UID Successfully!"
        action={actionCopy}
      />
    </div>
  );
}
