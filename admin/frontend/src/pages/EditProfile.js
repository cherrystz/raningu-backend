import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import firebase from "../services/FirebaseConfig";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function EditProfile({ session }) {
  const user = firebase.auth().currentUser;
  const [editUsername, setEditUsername] = React.useState(
    user ? user.displayName : ""
  );
  const [editEmail, setEditEmail] = React.useState(user ? user.email : "");
  const [editPassword, setEditPassword] = React.useState("********");

  React.useEffect(() => {
    // update state when user logged in
    if (user) {
      setEditUsername(user.displayName);
      setEditEmail(user.email);
      setEditPassword("********");
    } else {
      return null;
    }
  }, [user]);

  const changeUsername = (e) => {
    setEditUsername(e.target.value);
  };

  const changeEmail = (e) => {
    setEditEmail(e.target.value);
  };

  const changePassword = (e) => {
    setEditPassword(e.target.value);
  };

  const updateMethod = () => {
    if (editUsername !== user.displayName) {
      user
        .updateProfile({
          displayName: editUsername,
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => {
          // Update successful
          setEditUsername(user.displayName);
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    }

    if (editEmail !== user.email) {
      user
        .updateEmail(editEmail)
        .then(() => {
          // Update successful
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    }

    if (editPassword !== "********") {
      user
        .updatePassword(editPassword)
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
    }

    window.location.reload(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={2}>
              <Item alignItems="center" justifyContent="center">
                <Avatar src={user.photoURL} sx={{ width: 100, height: 100 }} />
              </Item>
              <Item alignItems="center" justifyContent="center"></Item>
            </Grid>
            <Grid item xs={6} md={9}>
              <Item sx={{ md: 1 }}>
                <div className="w-full flex items-center mt-2 border-b-2 border-gray-200 my-2 self-center">
                  Name:&nbsp;
                  <input
                    type="text"
                    id="username"
                    value={editUsername}
                    onChange={changeUsername}
                    className="bg-transparent text-center w-full"
                    style={{ width: "100%" }}
                  />
                </div>
              </Item>
              <Item>
                <div className="w-full flex self-center my-2">
                  Email:&nbsp;
                  <input
                    type="email"
                    id="email"
                    value={editEmail}
                    onChange={changeEmail}
                    disabled={
                      user.providerData[0].providerId !== "password"
                        ? "disabled"
                        : ""
                    }
                    className="bg-transparent text-center w-full"
                    style={{ width: "100%" }}
                  />
                </div>
              </Item>
              {user.providerData[0].providerId === "password" && (
                <Item>
                  <div className="w-full flex self-center my-2">
                    Password:&nbsp;
                    <input
                      type="password"
                      id="password"
                      value={editPassword}
                      onChange={changePassword}
                      className="bg-transparent text-center w-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </Item>
              )}
              <Item>
                <div className="w-full flex self-center my-2">
                  Provider:{" "}
                  <span className="w-full text-center">
                    {user.providerData[0].providerId}
                  </span>
                </div>
              </Item>
            </Grid>
            <Grid item xs={6} md={1}>
              <Button
                variant="contained"
                color="success"
                onClick={updateMethod}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
