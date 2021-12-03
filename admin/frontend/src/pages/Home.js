import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://websitename-csc361.web.app/">
        Rāningu
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 0,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ラーニング
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Rāningu Developer for documentation - Developer.
            </Typography>
            <Card sx={{ maxWidth: 700 }} justifyContent="center">
              <CardMedia
                component="img"
                height="285"
                image="img/image-thumb.png"
                alt="raningu thumbnail"
              />
            </Card>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <a
                href="https://raningu-edu.web.app/"
                target="__blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained">Go to Rāningu</Button>
              </a>

              <a
                href="https://drive.google.com/drive/folders/1zxzrcsLj9seeLfyvv1-TR47IdErAFm7L?usp=sharing"
                target="__blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined">Documentation</Button>
              </a>
            </Stack>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          แอปพลิเคชันจัดการในส่วนการพัฒนาของเว็บสำหรับเรียนรู้ภาษาญี่ปุ่น
          Rāningu
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
