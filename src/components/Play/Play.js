import { useEffect, useState } from "react";
import styles from "./Play.module.css";

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

  useEffect(() => {
    document.getElementById("effectColor").style.backgroundColor = generateMix().rgb;
  });

  function handleSubmit() {
    if(checkAnswer()) {
      alert("Successful!");
      setPoint(prevstate => prevstate + 1);
    } else {
      alert("Try again!");
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
        alert("Percentage of the first color is " + answerPct0 + ".");
      else if(tip === 1)
        alert("Percentage of the second color is " + answerPct1 + ".");
      else //if(tip === 2)
        alert("Percentage of the third color is " + answerPct2 + ".");
      setTip(prevstate => prevstate + 1);
      setToolsUsed(prevstate => prevstate + 1);
    }
  }

  return (
    <div className={styles.bigBox}>
      
      <h1 className={styles.title1}>Palette</h1>

      { level === "Easy" || level === "Medium"
        ? <h3 className={styles.targetColor} style={targetColor.cssString}>Target Color</h3> 
        : <></>
      }
      
      <div className={styles.container2}>

        <div className={styles.container}>
          <div className={styles.chooseColor} style={choice0.cssString}></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
            onChange={(event) => setPct0(event.target.value)}
          />
        </div>

        <div className={styles.container}>
          <div className={styles.chooseColor} style={choice1.cssString}></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
            onChange={(event) => setPct1(event.target.value)}
          />
        </div>

        <div className={styles.container}>
          <div className={styles.chooseColor} style={choice2.cssString}></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
            onChange={(event) => setPct2(event.target.value)}
          />
        </div>

        <button
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </button>  

        <div className={styles.effectColor} id="effectColor"></div>

        <input type="button" value="Tool" onClick={tool} /> 

        <button onClick={() => setShow("showTarget")}>Play Again</button>

      </div>
    </div>
  );
}
  
export default Play;
