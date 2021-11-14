import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import LessonsList from "./lessons/LessonsList";
import DefaultImage from "../../img/default-upload.png";

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

const Lessons = ({ session }) => {
  const [crud, setCrud] = React.useState("Create");

  const handleChange = (event, newCrud) => {
    setCrud(newCrud);
  };
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Box>
          <Paper className={classes.paper}>
            <ToggleButtonGroup
              color="primary"
              value={crud}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="Create">Create</ToggleButton>
              <ToggleButton value="Edit">Edit</ToggleButton>
              <ToggleButton value="Delete">Delete</ToggleButton>
            </ToggleButtonGroup>
            <Typography
              sx={{ pt: 1, pb: 1, fontSize: "100%", fontWeight: "light" }}
            >
              {`Lessons ${crud}`}
            </Typography>
            <Container>{/* Container */}</Container>
          </Paper>
        </Box>
        {/* Lessons View */}
        <Box sx={{ mt: 2 }}>
          <Paper className={classes.paper}>
            <Typography sx={{ pb: 1, fontSize: "100%", fontWeight: "light" }}>
              Lessons List
            </Typography>
            <Container>
              <LessonsList />
            </Container>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Lessons;
