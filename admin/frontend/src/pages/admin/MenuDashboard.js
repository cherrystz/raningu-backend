import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";

export default function MenuDashboard() {
  const menu = [
    {
      name: "Users",
      path: "users",
      enabled: true,
    },
    {
      name: "Lessons",
      path: "lessons",
      enabled: true,
    },
    {
      name: "Quiz",
      path: "quiz",
      enabled: true,
    },
    {
      name: "Admin",
      path: "admin",
      enabled: true,
    },
    {
      name: "Logs",
      path: "logs",
      enabled: true,
    },
  ];
  return (
    <Container sx={{ my: 2 }}>
      <Paper>
        <div sx={{ display: "inline" }}>
          <Container sx={{ p: 1 }}>
            <Typography sx={{ pb: 1, fontSize: "100%", fontWeight: "light" }}>
              Admin Panel
            </Typography>
            {menu.map((object) => {
              return object.enabled ? (
                <NavLink
                  to={`/dashboard/${object.path}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button sx={{ mr: 1, mb: 1 }} variant="contained">
                    {object.name}
                  </Button>
                </NavLink>
              ) : (
                <Button sx={{ mr: 1, mb: 1 }} disabled variant="contained">
                  {object.name}
                </Button>
              );
            })}
            <a
              href="https://console.firebase.google.com/"
              target="__blank"
              style={{ textDecoration: "none" }}
            >
              <Button sx={{ mr: 1, mb: 1 }} variant="contained">
                Firebase
              </Button>
            </a>
          </Container>
        </div>
      </Paper>
    </Container>
  );
}
