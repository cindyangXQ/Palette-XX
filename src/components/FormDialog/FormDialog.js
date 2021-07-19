import { useState } from 'react';
import styles from "./FormDialog.module.css";
import { Button, ButtonBase, 
  Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, 
  TextField 
} from '@material-ui/core';
import butt from "../SoundEffect/barbutton.mp3";

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
  const { choices, setChoices, index } = props;

  const [open, setOpen] = useState(false);
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  const handleClickOpen = () => {
    ButtSound();
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    var newChoices = choices.concat([]);
    newChoices[index].color = cusColor(r, g, b);
    setChoices(newChoices);
    setOpen(false);
  };

  function ButtSound() {
    var sound = document.getElementById("butt");
    sound.volume="0.4";
    sound.play();
  } 

  return (
    <div>
      <audio src={butt} id="butt" autostart="0"/>
      <div className={styles.buttonBG}>
        <ButtonBase
          className={styles.base}
          onClick={handleClickOpen} 
        >
          <p className={styles.text}>Change This Color</p>
        </ButtonBase>
      </div>
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
