import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import moment from "moment";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable({ list, setList }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("completed");

  const handleRequestSort = (property) => {
    console.log('1');
    setOrder("asc");
    setOrderBy(property);
  };

  const handleComplete = (index) => {
    const prevState = [...list];
    prevState[index].completed = true;
    prevState[index].updatedOn = moment().format("DD-MM-YYYY, h:mm:ss a");
    setList(prevState);
    handleRequestSort("completed");
  };

  const deletetask = (index) => {
    const newLists = [...list];
    newLists.splice(index, 1);
    setList(newLists);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell align="left">Time Taken</TableCell>
            <TableCell
              align="right"
              sortDirection={"desc"}
              onClick={() => handleRequestSort("completed")}
            >
              Completed
            </TableCell>
            <TableCell align="right">Updated On</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row, indx) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">
                {" "}
                {row.updatedOn ? (
                  <div>{row.timeTaken}</div>
                ) : (
                  <TextField
                    id="outlined-basic"
                    label="Time Taken"
                    variant="outlined"
                    placeholder="00:00"
                    onChange={(event) => {
                      const prevState = [...list];
                      prevState[indx].timeTaken = event.target.value;
                      setList(prevState);
                    }}
                    value={row.timeTaken === 0 ? "00:00" : row.timeTaken}
                    margin="none"
                  />
                )}
              </TableCell>
              <TableCell align="right">
                {row.completed ? "True" : "False"}
              </TableCell>
              <TableCell align="right">{row.updatedOn}</TableCell>
              <TableCell align="right">
                {!row.completed && (
                  <IconButton
                    edge="end"
                    aria-label="complete"
                    style={{ margin: "15px 10px" }}
                    onClick={() => handleComplete(indx)}
                  >
                    <TaskAltIcon />
                  </IconButton>
                )}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  style={{ margin: "15px 10px" }}
                  onClick={() => deletetask(row.indx)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
