import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicTable from "./Table";

export default function BasicCard() {

  const [task, setTask] = React.useState("");
  const [list, setList] = React.useState([
    {
      name: "Task 1",
      completed: false,
      timetaken: 0,
      deletedstatus: false,
      updatedon: ""

    }
    ,
    {
      name: "Task 2",
      completed: false,
      timetaken: 0,
      deletedstatus: false,
      updatedon: ""

    }
  ]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const AddTask = () => {
    if (task !== "") {
      const taskDetails = {
        name: task,
        completed: false,
        timetaken: 0,
        deletedstatus: false,
        updatedon: ""

      };

      setList([...list, taskDetails]);
    }
  };

  return (
    <div>

      <input
        type="text"
        name="text"
        id="Task"
        onChange={(e) => handleChange(e)}
        placeholder="Add task here..."
      />
      <Button variant="contained"onClick={AddTask}>Add</Button>


      <Card sx={{ minWidth: 600 }}>
        <CardContent>
          <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
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