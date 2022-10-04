import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { styled } from '@mui/material/styles';
import moment from "moment";





export default function BasicTable({ list, setList }) {



  // const [order, setOrder] = React.useState("asc");
  // const [orderBy, setOrderBy] = React.useState("completed");

  // const handleRequestSort = (property) => {
  //   console.log('1');
  //   setOrder("asc");
  //   setOrderBy(property);
  // };

  // const handleChange = (e, index) => {
  //   const prevState = [...list];
  //   prevState[index].timetaken = e.target.value;
  //   setList(prevState);
  // };

  const handleComplete = (index) => {
    const prevState = [...list];
    prevState[index].completed = true;
    prevState[index].updatedon = moment().format("DD-MM-YYYY, h:mm:ss a");
    setList(prevState);
  };

  const deletetask = (index) => {
    const newLists = [...list];
    newLists.splice(index, 1);
    setList(newLists);
  };

  const deletecompletedtask = (index) => {
    const newLists = [...list];
    newLists.splice(index, 1);
    setList(newLists);
  };

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const filter = true;
  const isCompleted = (x) => x.completed === filter;

  const filterr = false;
  const Pending = (x) => x.completed === filterr;


  return (
    <div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell align="left">Time Taken</TableCell>
              <TableCell
                align="right"
                sortDirection={"desc"}
              >
                Completed
              </TableCell>

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.filter(Pending).map((row,index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  {" "}
                  {row.updatedOn ? (
                    <div>{row.timetaken}</div>
                  ) : (
                    <TextField
                      id="outlined-basic"
                      label="Time Taken"
                      variant="outlined"
                      placeholder="00:00"
                      // onChange={(e) => handleChange(e,row.id)}
                      onChange={(event) => {
                        const prevState = [...list];
                        prevState[index].timetaken = event.target.value;
                        setList(prevState);
                      }}
                      value={row.timetaken === 0 ? "00:00" : row.timetaken}
                      margin="none"
                    />
                  )}

                </TableCell>
                <TableCell align="right">
                  {row.completed ? "True" : "False"}
                </TableCell>
                {/* <TableCell align="right">{row.updatedOn}</TableCell> */}
                <TableCell align="right">
                  {!row.completed && (
                    <IconButton
                      edge="end"
                      aria-label="complete"
                      style={{ margin: "15px 10px" }}
                      onClick={() => handleComplete(index)}
                    >
                      <TaskAltIcon />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    style={{ margin: "15px 10px" }}
                    onClick={() => deletecompletedtask(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h1>Completed Tasks</h1>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell>Task Name</StyledTableCell>
              <StyledTableCell align="right">Time Taken</StyledTableCell>
              <StyledTableCell align="right">Completed</StyledTableCell>
              <StyledTableCell align="right">Updated On</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.filter(isCompleted).map((row,index) => (
              <StyledTableRow key={index}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <StyledTableCell component="th" scope="row">{row.name} </StyledTableCell>
                <StyledTableCell align="right">{row.timetaken}</StyledTableCell>
                <StyledTableCell align="right">{row.completed ? "True" : "False"}</StyledTableCell>
                <StyledTableCell align="right">{row.updatedon}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    style={{ margin: "15px 10px" }}
                    onClick={() => deletetask(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}


          </TableBody>
        </Table>

      </TableContainer>


    </div>

  );
}
