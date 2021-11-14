import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Tooltip, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import DescriptionIcon from "@mui/icons-material/Description";
import { NavLink } from "react-router-dom";
import { signOut } from "../services/FirebaseConfig";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ session }) => {
  // Docs Drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuListStarted = [
    { name: "Introduction", path: "/signin" },
    { name: "Started", path: "" },
  ];
  const menuListApp = [
    { name: "Home", path: "" },
    { name: "Lesson", path: "" },
    { name: "Quiz", path: "" },
    { name: "Canvas", path: "" },
    { name: "Statistic", path: "" },
  ];
  const menuListAPI = [
    { name: "Authentication", path: "" },
    { name: "Lesson", path: "" },
    { name: "Quiz", path: "" },
    { name: "Statistic Log", path: "" },
  ];
  const menuStyle = {
    textDecoration: "none",
    color: "black",
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Started */}
      <List>
        {menuListStarted.map((text, index) => (
          <NavLink to={text.path} style={menuStyle}>
            <ListItem button key={text.name} sx={{ py: 0.2 }}>
              <ListItemText primary={text.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider sx={{ fontSize: "80%", color: "gray" }}>Application</Divider>
      {/* Frontend */}
      <List>
        {menuListApp.map((text, index) => (
          <NavLink to={text.path} style={menuStyle}>
            <ListItem button key={text.name} sx={{ py: 0.2 }}>
              <ListItemText primary={text.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider sx={{ fontSize: "80%", color: "gray" }}>API</Divider>
      {/* Backend */}
      <List>
        {menuListAPI.map((text, index) => (
          <NavLink to={text.path} style={menuStyle}>
            <ListItem button key={text.name} sx={{ py: 0.2 }}>
              <ListItemText primary={text.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </Box>
  );

  // User Control
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <AppBar position="static">
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
      <Toolbar>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {session.user && (
            <Box sx={{ px: 2, py: 1 }}>
              <Typography>{session.user.displayName}</Typography>
              <Typography style={{ color: "gray" }}>
                {session.level === "admin" ? "Administrator" : "User"}
              </Typography>
            </Box>
          )}
          {session.level === "admin" && (
            <NavLink
              to="/edit_profile"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                Edit Profile
              </MenuItem>
            </NavLink>
          )}
          <MenuItem
            onClick={() => {
              handleClose();
              signOut();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        <Typography variant="h6" className={classes.title}>
          <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
            Rāningu Developer
          </NavLink>
        </Typography>
        <Box>
          {session.user ? (
            <Box>
              {session.level === "admin" ? (
                <Tooltip
                  title="Documentation"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <IconButton onClick={toggleDrawer("right", true)}>
                    <DescriptionIcon style={{ fill: "white" }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  onClick={toggleDrawer("right", true)}
                  variant="outlined"
                  style={{
                    textDecoration: "none",
                    borderColor: "white",
                    color: "white",
                  }}
                  startIcon={<DescriptionIcon />}
                >
                  Docs
                </Button>
              )}

              {session.level === "normal" && (
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ display: "inline" }}
                  sx={{ px: 1 }}
                />
              )}

              {session.level === "admin" ? (
                <Tooltip
                  title="Admin Console"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <NavLink to="/dashboard">
                    <IconButton>
                      <SettingsIcon style={{ fill: "white" }} />
                    </IconButton>
                  </NavLink>
                </Tooltip>
              ) : (
                <NavLink to="/edit_profile" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    style={{
                      color: "#3f51b5",
                      backgroundColor: "white",
                    }}
                    startIcon={<EditIcon />}
                  >
                    Edit Profile
                  </Button>
                </NavLink>
              )}

              <Tooltip title="User Control">
                <IconButton onClick={handleClick}>
                  <Avatar src={session.user.photoURL} />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box position="flex">
              <Button
                variant="text"
                color="inherit"
                onClick={toggleDrawer("right", true)}
              >
                Documentation
              </Button>
              |
              <Tooltip title="Sign In">
                <NavLink to="/signin">
                  <IconButton>
                    <AdminPanelSettingsIcon style={{ fill: "white" }} />
                  </IconButton>
                </NavLink>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
