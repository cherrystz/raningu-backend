import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

const Admin = ({ session }) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(async () => {
    getRows();
  }, []);

  const [providerCreate, setProviderCreate] = React.useState("");
  const [uidCreate, setUidCreate] = React.useState("");

  const handleProviderCreateChange = (event) => {
    setProviderCreate(event.target.value);
  };
  const handleUidCreateChange = (event) => {
    setUidCreate(event.target.value);
  };

  const getRows = async () => {
    await fetch("https://raningu-api.glitch.me/data/auth/admin_all", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setRows(result.result);
      });
  };

  const deleteAdmin = async (uidDelete) => {
    console.log(uidDelete);
    await fetch("https://raningu-api.glitch.me/data/auth/delete_admin", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        uid: uidDelete,
      }),
    });
    await getRows();
  };

  const createAdmin = async () => {
    if (providerCreate === "") return;
    await fetch("https://raningu-api.glitch.me/data/auth/add_admin", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        uid: uidCreate,
        providerId: providerCreate,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
    setProviderCreate("");
    setUidCreate("");
    await getRows();
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Box>
          <Paper className={classes.paper}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>UID</StyledTableCell>
                    <StyledTableCell align="center">
                      Provider&nbsp;ID
                    </StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.date}>
                      <StyledTableCell component="th" scope="row">
                        {row.uid}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.providerId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.uid !== session.user.uid && (
                          <IconButton
                            onClick={async () => {
                              await deleteAdmin(row.uid);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        {/* Lessons View */}
        <Box sx={{ mt: 2 }}>
          <Paper className={classes.paper}>
            Create a new admin
            <Container sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <TextField
                      id="providerid-raningu"
                      label="UID"
                      variant="outlined"
                      value={uidCreate}
                      onChange={handleUidCreateChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <InputLabel id="providerid-raningu" label="your providerID">
                      Provider Id
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={providerCreate}
                      label="password"
                      onChange={handleProviderCreateChange}
                    >
                      <MenuItem value={"10"}>password</MenuItem>
                      <MenuItem value={"google.com"}>google.com</MenuItem>
                      <MenuItem value={"github.com"}>github.com</MenuItem>
                      <MenuItem value={"facebook.com"}>facebook.com</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    onClick={async () => await createAdmin()}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Admin;
