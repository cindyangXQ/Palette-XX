import { useState } from "react";
import styles from "./Play.module.css";
import Timer from "../Timer";
import CurrentState from "../CurrentState";
import ColorList from "../ColorList";
import { Button } from "@material-ui/core";

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

function Play(props) {
  const { level, setShow, targetColor, 
        point, setPoint, 
        toolsUsed, setToolsUsed, 
        answerPct0, answerPct1, answerPct2,
        choice0, choice1, choice2 } = props;
  const [tip, setTip] = useState(0);
  const [pct0, setPct0] = useState(0);
  const [pct1, setPct1] = useState(0);
  const [pct2, setPct2] = useState(0);
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");

  function generateMix() {
    var red = Math.floor(pct0 * choice0.r + pct1 * choice1.r + pct2 * choice2.r);
    var green = Math.floor(pct0 * choice0.g + pct1 * choice1.g + pct2 * choice2.g);
    var blue = Math.floor(pct0 * choice0.b + pct1 * choice1.b + pct2 * choice2.b);
    return cusColor(red, green, blue);
  }

  function checkAnswer() {
    if(Math.abs(pct0 - answerPct0) < 0.02 &&
        Math.abs(pct1 - answerPct1) < 0.02 &&
        Math.abs(pct2 - answerPct2) < 0.02) 
    return true;
    else return false;
  }

  function handleResult() {
    document.getElementById("mask").style.display="block";
    document.getElementById("buttons").style.display="block";
    if(checkAnswer()){
      setResult("success");
      document.getElementById("success").style.display="block";
      document.getElementById("score").style.display="block";
      setPoint(prevstate => prevstate + 1);
    } else{
      setResult("failed");
      document.getElementById("failed").style.display="block";
    }
  }

  function tool() {
    var toolsLeft = parseInt(point/5) - toolsUsed;
    if(toolsLeft === 0) {
      alert("You have no tools left.");
    } else if(tip === 3) {
      alert("I have told you all!");
    } else {
      if(tip === 0)
        alert("Percentage of the first color is " + Math.round(answerPct0*100) + ".");
      else if(tip === 1)
        alert("Percentage of the second color is " + Math.round(answerPct1*100) + ".");
      else //if(tip === 2)
        alert("Percentage of the third color is " + Math.round(answerPct2*100) + ".");
      setTip(prevstate => prevstate + 1);
      setToolsUsed(prevstate => prevstate + 1);
    }
  }

  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
      </style>
      <div className={styles.container}>
        <CurrentState 
          red={generateMix().r} 
          green={generateMix().g} 
          blue={generateMix().b} 
        />
        <Timer 
          level={level}
          targetColor={targetColor}
          setTime={setTime} 
          result={result} 
        />
        <ColorList 
          setPct0={setPct0} setPct1={setPct1} setPct2={setPct2} 
          choice0={choice0} choice1={choice1} choice2={choice2}
        />
        <div className={styles.containerRow}>
          <Button 
            variant="outlined" 
            className={styles.button}
            onClick={handleResult} 
          >
            Submit
          </Button>
          <Button 
            variant="outlined" 
            className={styles.button} 
            onClick={tool}
          >
            Tool
          </Button>
        </div>

        <div id="mask" className={styles.mask} style={{display:"none"}}/>
        <div id="success" className={styles.success} style={{display:"none"}}>⭐SUCCESS!⭐</div>
        <div id="failed" className={styles.failed} style={{display:"none"}}>YOU FAILED</div>
        <div id="score" className={styles.time} style={{display:"none"}}>Your Score: {time}</div>
        <div id="buttons" className={styles.buttons} style={{display:"none"}}>
          <Button 
            variant="outlined" 
            className={styles.button2} 
            onClick={() => setShow("showTarget")}
          >
            Play Again
          </Button>
        </div>
      </div>
    </>
  );
}
  
export default Play;
