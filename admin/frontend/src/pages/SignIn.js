import * as React from "react";
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
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { GitHub, Facebook, Google } from "@mui/icons-material";
import {
  signInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  singInWithGithub,
} from "../services/FirebaseConfig";
import { NavLink } from "react-router-dom";

const theme = createTheme();

export default function SignIn({ session }) {
  const [alert, setAlert] = React.useState(false);
  const [indicator, setIndicator] = React.useState(false);
  const [desc, setDesc] = React.useState("");
  const toggleShowAlert = (text) => {
    setIndicator(false);
    setAlert(true);
    setDesc(text);
  };
  const toggleRequiredAlert = () => {
    setAlert(true);
    setIndicator(false);
    setDesc("Email/Password required!");
  };

  const toggleHideAlert = () => {
    setAlert(false);
    setIndicator(true);
  };

  const handleSubmit = async (event) => {
    toggleHideAlert();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const information = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(information);

    if (!information.email || !information.password) {
      return toggleRequiredAlert();
    }
    // eslint-disable-next-line no-console
    const result = await signInWithEmailAndPassword(
      information.email,
      information.password
    );
    if (result.res === "error") {
      toggleShowAlert(result.errMsg);
    }
  };

  const handleLoginMethod = async (event) => {
    toggleHideAlert();
    const result =
      event !== "Google"
        ? event !== "Facebook"
          ? await singInWithGithub()
          : await signInWithFacebook()
        : await signInWithGoogle();
    if (result.res === "error") {
      toggleShowAlert(result.errMsg);
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
            Sign in to Rāningu Developer
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="/signup" variant="body2" className="NavLinkStyle">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/signup" variant="body2" className="NavLinkStyle">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>

            <Divider style={{ margin: "20px" }}>Sign-In Method</Divider>
            {/* Login Method */}
            <Grid container justifyContent="center" spacing={5}>
              <Grid item>
                <IconButton
                  size="large"
                  onClick={() => handleLoginMethod("Google")}
                >
                  <Google />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  size="large"
                  onClick={() => handleLoginMethod("Facebook")}
                >
                  <Facebook />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  size="large"
                  onClick={() => handleLoginMethod("GitHub")}
                >
                  <GitHub />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
