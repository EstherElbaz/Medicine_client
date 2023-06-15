import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddMedicine from './AddMedicine';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
       
      <Button variant="outlined" onClick={handleClickOpen}>
הוסף תרופה חדשה      </Button>
      <Dialog open={open} onClose={handleClose}>
      
        <DialogTitle>הוספת תרופה</DialogTitle>
       
        <DialogContent>
          <DialogContentText>
      הוסף את פרטי התרופה שלך
          </DialogContentText>
          <AddMedicine/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button onClick={handleClose}>שמירה</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}