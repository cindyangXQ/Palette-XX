import { useState } from "react";
import styles from "./TargetColor.module.css";
import { ButtonBase, Button } from "@material-ui/core";

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

function randomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return cusColor(red, green, blue);
}

function generateMix(c0, c1, c2, p0, p1, p2) {
  var red = Math.floor(p0 * c0.r + p1 * c1.r + p2 * c2.r);
  var green = Math.floor(p0 * c0.g + p1 * c1.g + p2 * c2.g);
  var blue = Math.floor(p0 * c0.b + p1 * c1.b + p2 * c2.b);
  return cusColor(red, green, blue);
}

function TargetColor(props) {
  const [check, setCheck] = useState(true);
  const { level, setShow, setTargetColor, 
          setChoices, setPcts } = props;

  function setupAllColors() {
    var flag = true;
    var c0, c1, c2;
    var p0, p1, p2;
    var temp;
    while(flag) {
      if(level === "Easy") {
        c0 = cusColor(255, 0, 0);
        c1 = cusColor(0, 255, 0);
        c2 = cusColor(0, 0, 255);
      } else {
        c0 = randomColor();
        c1 = randomColor();
        c2 = randomColor();
      }
      p0 = Math.random();
      p1 = Math.random();
      p2 = Math.random();
      temp = (generateMix(c0, c1, c2, p0, p1, p2));
      if(temp.r < 256 && temp.g < 256 && temp.b < 256)
        flag = false;
    }
    setChoices([{color: c0, pct: 0}, {color: c1, pct: 0}, {color: c2, pct: 0}])
    setPcts([p0, p1, p2]);
    setTargetColor(temp);
    return temp;
  }

  function handleClick() {
    setCheck(false);
    document.getElementById("text").innerHTML = "Click To Change Target Color";
    document.getElementById("bgc").style.backgroundColor = setupAllColors().rgb;
  }

  return (
    <div>
      <div className={styles.tcbuttonBG} id="bgc">
        <ButtonBase 
          className={styles.base}
          onClick={handleClick} 
        >
          <strong className={styles.text} id="text">Click To Start</strong>
        </ButtonBase>
      </div>
      <div className={styles.cfmbuttonBG}>
        <Button
          variant="outlined"
          disabled={check}
          className={styles.base}
          onClick={() => {
            setShow("showPlay");
          }}
        >
          CONFIRM
        </Button>
      </div>
    </div>
  );
}

export default TargetColor;
