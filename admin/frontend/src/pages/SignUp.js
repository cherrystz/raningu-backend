import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import firebase, { authCheck } from "../services/FirebaseConfig";
import { Navigate, NavLink } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const [indicator, setIndicator] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [desc, setDesc] = useState("");

  const showAlert = (text) => {
    setIndicator(false);
    setAlert(true);
    setDesc(text);
  };
  const hideAlert = () => {
    setAlert(false);
    setIndicator(true);
  };

  const handleSubmit = async (event) => {
    hideAlert();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const information = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      repassword: data.get("repassword"),
    };
    if (
      information.username &&
      information.email &&
      information.password &&
      information.repassword
    ) {
      if (information.password === information.repassword) {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            information.email,
            information.password
          )
          .then(async (userCredential) => {
            var user = userCredential.user;
            await user.updateProfile({
              displayName: information.username,
            });
            await authCheck();
            <Navigate to="/" />;
          })
          .catch((error) => {
            var errorMessage = error.message;
            showAlert(errorMessage);
          });
      } else {
        showAlert("Re-password is not correct, try again.");
      }
    } else {
      showAlert("Please type your all information.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Display Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="Confirm Password"
                  type="password"
                  id="repassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
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
                {alert && <Alert severity="error">{desc}</Alert>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/signin" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
