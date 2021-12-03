import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Typography, Grid, Box } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Quiz = ({ session }) => {
  const classes = useStyles();
  const [lessons_list, setLessons] = useState([]);

  useEffect(async () => {
    const getLessons = async () => {
      try {
        const res = await axios.get("https://raningu-api.glitch.me/data/quiz");
        setLessons(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getLessons();
    console.log(lessons_list);
  }, []);

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        {lessons_list.length > 0
          ? lessons_list.map((data) => {
              return (
                <Box sx={{ mb: 2 }}>
                  <Paper className={classes.paper}>
                    <Typography
                      sx={{
                        pt: 1,
                        pb: 1,
                        fontSize: "100%",
                        fontWeight: "light",
                      }}
                    >
                      {data.quiz_name}
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">
                              Question Text
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Answer#1
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Answer#2
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Answer#3
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Answer#4
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.questions.map((row) => (
                            <StyledTableRow key={row.questionText}>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {row.questionText}
                              </StyledTableCell>
                              {row.answerOptions.map((option) => (
                                <StyledTableCell
                                  align="center"
                                  sx={
                                    option.isCorrect
                                      ? {
                                          color: "white",
                                          fontWeight: "bolder",
                                          background: "green",
                                          fontSize: 24,
                                        }
                                      : ""
                                  }
                                >
                                  {option.answerText}
                                </StyledTableCell>
                              ))}
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Container>{/* Container */}</Container>
                  </Paper>
                </Box>
              );
            })
          : null}
      </Container>
    </div>
  );
};

export default Quiz;
