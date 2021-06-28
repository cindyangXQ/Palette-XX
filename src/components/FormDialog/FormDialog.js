import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function cusColor(red, green, blue) {
  var rgbstring = "rgb(" + red + ", " + green + ", " + blue + ")";
  return {
    rgb: rgbstring, 
    r: red, 
    g: green,
    b: blue, 
    cssString: { backgroundColor: rgbstring }
  };
}

function FormDialog(props) {
  const {setChoice} = props;

  const [open, setOpen] = useState(false);
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setChoice(cusColor(r, g, b));
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="black" onClick={handleClickOpen}>
        Change This Color
      </Button>
      <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Set this color to: </DialogTitle>
        <DialogContent>
          <DialogContentText>
            eg. rgb(12, 34, 56)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="r"
            onChange={(event) => setR(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="g"
            onChange={(event) => setG(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="b"
            onChange={(event) => setB(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
