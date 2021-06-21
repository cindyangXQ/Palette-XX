import { useState } from "react";
import styles from "./TargetColor.module.css";
import { ButtonBase, Button } from "@material-ui/core";

function TargetColor(props) {
  const [check, setCheck] = useState(true);
  const { setShow, setColor } = props;

  function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    setColor("rgb(" + red + ", " + green + ", " + blue + ")");
    return "rgb(" + red + ", " + green + ", " + blue + ")";
  }

  return (
    <>
      <ButtonBase
        className={styles.target}
        onClick={() => {
          setCheck(false);
          document.getElementById("target").innerHTML =
            "Click To Change Target Color";
          document.getElementById("target").style.backgroundColor = randomColor();
        }}
      >
        <h2 className={styles.inbox} id="target">
          Click To Start
        </h2>
      </ButtonBase>
      <Button
        variant="outlined"
        disabled={check}
        id="confirmButton"
        className={styles.confirm}
        onClick={() => {
          setShow("showPlay");
        }}
      >
        CONFIRM
      </Button>
    </>
  );
}

export default TargetColor;
