import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import moment from "moment";

const mockApi = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          _id: "5e988a7f0847020017b49153",
          name: "swastik",
          email: "swastik0000@gmail.com",
          phoneNumber: "9891641551",
          DOB: "1994-08-12T00:00:00.000Z",
          __v: 0,
        },
        {
          _id: "5e988ab40847020017b49154",
          name: "swastik",
          email: "swastik000000@gmail.com",
          phoneNumber: "9891641551",
          DOB: "1994-08-12T00:00:00.000Z",
          __v: 0,
        },
      ]);
    }, 1000);
  });

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UserTable() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        "https://alcofocus-task.herokuapp.com/users/allusers"
      ).then((re) => re.json());
      setData(data);
    } catch (error) {
      alert("Could not fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Date Of Birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phoneNumber}</TableCell>
                <TableCell align="left">
                  {moment(row.DOB).format("LL")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
