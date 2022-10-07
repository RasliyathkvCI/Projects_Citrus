import * as React from "react";
import "./Timer.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BasicTable from "./Table";
import Timer from "./Timer";
import moment from "moment";
import Popup from "./popup";




export default function BasicCard() {

  const [task, setTask] = React.useState("");
  const [timertime, setTimertime] = React.useState("");
  const [isthrouhtimer, setIsthroughtimer] = React.useState();
  const [list, setList] = React.useState([
    {
      id: 0,
      name: "Task 1",
      completed: false,
      timetaken: 0,
      deletedstatus: false,
      updatedon: "",


    },
    {
      id: 1,
      name: "Task 2",
      completed: false,
      timetaken: 0,
      deletedstatus: false,
      updatedon: "",

    }
  ]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };


  const AddTask = () => {
    const newid = list.length;
    if (task !== " " && isthrouhtimer !== true) {
      const taskDetails = {
        id: newid,
        name: task,
        completed: false,
        timetaken: 0,
        deletedstatus: false,
        updatedon: " ",
      }
      console.log(taskDetails);
      setList([...list, taskDetails]);
      console.log(list);
    }
    else if (task !== " " && isthrouhtimer === true) {

      let newupdatedon = moment().format("DD-MM-YYYY, h:mm:ss a");
      const taskDetails = {
        id: newid,
        name: task,
        completed: true,
        timetaken: timertime,
        deletedstatus: false,
        updatedon: newupdatedon,
      }

      console.log(taskDetails);
      setList([...list, taskDetails]);
      setIsthroughtimer(false);
      console.log(list);
    }

  };

  const getValue = (v1, v2) => {
    setTimertime(v1);
    setIsthroughtimer(v2);

  }

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Enter your Task"
        variant="outlined"
        type="text"
        name="text"
        value={task}
        onChange={(e) => handleChange(e)} />



      <Button variant="contained"
        id="add_button"
        color="secondary"
        endIcon={<SendIcon />}
        onClick={AddTask}>
        ADD
      </Button>



      <br />

      


      <Timer gettimeValue={(val1, val2) => {
        console.log(val1, val2);
        getValue(val1, val2);
      }}> </Timer>

      <Card sx={{ minWidth: 600 }}>
        <CardContent>
          <Typography sx={{ fontSize: 25 }} gutterBottom>
            Tasks of the Day
          </Typography>
          <BasicTable
            list={list}
            setList={(val) => setList(val)}
          />
        </CardContent>
        <CardActions>

        </CardActions>
      </Card>
      <Popup />

      


    </div>
  );
}