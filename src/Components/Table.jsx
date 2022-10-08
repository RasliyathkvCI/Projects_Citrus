import * as React from "react";
import "./Timer.css"
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Popup from "./popup";



export default function BasicTable({ list, setList }) {

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = (item, index) => {
    if (item.timetaken !== 0) {
      const prevState = [...list];
      prevState[index].completed = true;
      prevState[index].updatedon = moment().format("DD-MM-YYYY, h:mm:ss a");
      setList(prevState);
    }
    else {
      alert("Please enter time...!")
    }
  };

  const deletetask = (index) => {
    const prevState = [...list];
    prevState[index].deletedstatus = true;
    setList(prevState);
    console.log(index);
    setOpen(false);
    // toggleModal();
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
  const isCompleted = (x) => (x.completed === filter && x.deletedstatus === false);

  const filterr = false;
  const Pending = (x) => (x.completed === filterr && x.deletedstatus === false);


  return (
    <div>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%",fontSize:"100%" ,color:"black"}}>ID</TableCell>
              <TableCell style={{ width: "20%",fontSize:"100%" ,color:"black"}}>Task Name</TableCell>
              <TableCell align="left" style={{ width: "22%",fontSize:"100%" ,color:"black"}}>Time Taken</TableCell>
              <TableCell align="right" sortDirection={"desc"}style={{ width: "25%",fontSize:"100%" ,color:"black"}}>Completed</TableCell>
              <TableCell align="right"style={{ width: "25%",fontSize:"100%" ,color:"black"}}> Actions</TableCell>
              <TableCell style={{ width: "20%",fontSize:"100%" ,color:"black"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.filter(Pending).map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="left">
                  {" "}
                  {row.updatedOn ? (
                    <div>{row.timetaken}</div>
                  ) : (
                    <TextField
                      id="outlined-basic"
                      label="Time Taken"
                      variant="outlined"
                      placeholder="00:00:00"
                      sx={{ boxSizing: "50%" }}
                      onChange={(event) => {
                        const prevState = [...list];
                        // prevState[row.id].timetaken = validateTimer(event.target.value)
                        prevState[row.id].timetaken = event.target.value;
                        setList(prevState);
                      }}
                      value={row.timetaken === 0 ? "00:00:00" : row.timetaken}
                      margin="none"
                    />
                  )}

                </TableCell>
                <TableCell align="right">
                  {row.completed ? "Completed" : "Pending"}
                </TableCell>
                <TableCell align="right">
                  {!row.completed && (
                    <IconButton
                      edge="end"
                      aria-label="complete"
                      style={{ margin: "5px 5px" }}
                      onClick={() => handleComplete(row, row.id)}
                    >
                      <TaskAltIcon />
                    </IconButton>
                  )}
                  
                </TableCell>
                <TableCell align="left">
                  <Popup list={list}
                    setList={(val) => setList(val)}
                    id={row.id}></Popup>
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
            {list.filter(isCompleted).map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <StyledTableCell component="th" scope="row">{row.name} </StyledTableCell>
                <StyledTableCell align="right">{row.timetaken}</StyledTableCell>
                <StyledTableCell align="right">{row.completed ? "Completed" : "Pending"}</StyledTableCell>
                <StyledTableCell align="right">{row.updatedon}</StyledTableCell>
                <StyledTableCell align="right">
                  <Popup list={list}
                    setList={(val) => setList(val)}
                    id={row.id}></Popup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
