import * as React from "react";
// import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicTable from "./Table";
import Timer from "./Timer";
import moment from "moment";



export default function BasicCard() {

  const [task, setTask] = React.useState("");
  // const [timertime, setTimertime] = React.useState("");
  // const [isthrouhtimer, setIsthroughtimer] = React.useState();
  const [timeflag, setTimeflag] = React.useState(false);
  // let v1;
  // let v2;
  const [list, setList] = React.useState([
    {
      id: 1,
      name: "Task 1",
      completed: false,
      timetaken: 0,
      deletedstatus: false,
      updatedon: "",
      isthroughTimer: false,

    },

    {
      id: 2,
      name: "Task 2",
      completed: false,
      timetaken: 0,
      deletedstatus: false,
      updatedon: "",
      isthroughTimer: false,
    }
  ]);

  // useEffect(() => {
  //   setTimertime(timertime);
  //   setIsthroughtimer(isthrouhtimer);
  //   console.log(timertime,isthrouhtimer);
  // }, [timertime, isthrouhtimer])

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const AddTask = () => {
    if (task !== " ") {
      const newid = list.length + 1;
      const taskDetails = {
        id: newid,
        name: task,
        completed: false,
        timetaken: 0,
        deletedstatus: false,
        updatedon: "",
      }
      console.log(taskDetails);
      setList([...list, taskDetails]);
    }

  };

  // const getValue = (v1, v2) => {
  //   setTimertime(v1);
  //   setIsthroughtimer(v2);
  //   console.log(timertime, isthrouhtimer);
  // }


  const AddTaskfromTimer = (val1, val2) => {
    let timertime = val1;
    let isthroughTimer = val2;
    const newid = list.length + 1;
    let newupdatedon = moment().format("DD-MM-YYYY, h:mm:ss a");
    if (task !== " " && isthroughTimer === true) {
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
      setTimeflag(false);
      console.log(timeflag);
    }


  }



  return (
    <div>

      <input
        type="text"
        name="text"
        id="Task"
        onChange={(e) => handleChange(e)}
        placeholder="Add task here..."

      />
      {/* {timeflag ?
        (<Button variant="contained" onClick={timeflag ? AddTaskfromTimer(v1, v2) :
          { AddTask }} >Add</Button>) : (<Button variant="contained" onClick={AddTask}>Add</Button>)} */}

      <Button variant="contained" onClick={AddTask}>Add</Button>


      <Timer gettimeValue={(val1, val2) => {
        console.log(val1, val2);
        AddTaskfromTimer(val1, val2);
        // setTimeflag(true);
        // getValue(val1, val2);s

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
    </div>

  );
}