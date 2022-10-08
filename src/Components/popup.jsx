import * as React from 'react';
import "./Timer.css"
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog({ list, setList, id }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletetask = (index) => {
    setOpen(false);
    const prevState = [...list];
    
    prevState[index].deletedstatus=true;
    setList(prevState);
  console.log(prevState[index]);



};

return (
  <div>

    <IconButton
      edge="end"
      aria-label="delete"
      style={{ margin: "15px 10px" }}
      onClick={handleClickOpen}

    >
      <DeleteIcon />
    </IconButton>

    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
      </DialogTitle>
      <DialogContent >
        <DialogContentText>
          Do You want to delete this task........?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={()=>{deletetask(id)}}>
          Yes
        </Button>
        <Button onClick={handleClose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}