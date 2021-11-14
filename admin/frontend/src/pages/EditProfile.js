import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import firebase from "firebase";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function EditProfile({ session }) {
  const userFirebase = firebase.auth().currentUser;
  const updateProfileUser = async () => {
    await userFirebase
      .updateProfile({
        displayName: "Pharuthapol Junpet",
      })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const user = session.user;

  React.useEffect(() => {}, []);

  console.log(user);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={2}>
              <Item alignItems="center" justifyContent="center">
                <Avatar
                  src={session.user.photoURL}
                  sx={{ width: 100, height: 100 }}
                />
              </Item>
            </Grid>
            <Grid item xs={6} md={2}>
              <Item></Item>
            </Grid>
            <Grid item xs={6} md={8}>
              <Item>xs=6 md=8</Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>xs=6 md=4</Item>
            </Grid>
            <Grid item xs={6} md={8}>
              <Item>xs=6 md=8</Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
