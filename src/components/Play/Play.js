import { useState, useEffect } from "react";
import styles from "./Play.module.css";
import Timer from "../Timer";
import CurrentState from "../CurrentState";
import ColorList from "../ColorList";
import { ButtonBase } from "@material-ui/core";
import { firebase } from "@firebase/app";
import "@firebase/firestore";

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
        choice0, choice1, choice2, 
        collection, setCollection, 
        gsColl, setGsColl, 
        highScore, setHighScore } = props;
  const [tip, setTip] = useState(0);
  const [pct0, setPct0] = useState(0);
  const [pct1, setPct1] = useState(0);
  const [pct2, setPct2] = useState(0);
  const [time, setTime] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/point").doc(uid).set({ point: point });
  }, [point]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/collection").doc(uid).set({ collection:collection });
    db.collection("/gsColl").doc(uid).set({ gsColl:gsColl});
  }, [gsColl, collection]);

  useEffect(()=>{
    if(result==="success"&&(time<highScore || highScore<0)){
      setHighScore(time);
    }
  }, [time]);

  function generateMix() {
    var red = Math.floor(pct0 * choice0.r + pct1 * choice1.r + pct2 * choice2.r);
    var green = Math.floor(pct0 * choice0.g + pct1 * choice1.g + pct2 * choice2.g);
    var blue = Math.floor(pct0 * choice0.b + pct1 * choice1.b + pct2 * choice2.b);
    return cusColor(red, green, blue);
  }

  function checkAnswer() {
    if(Math.abs(pct0 - answerPct0) < 0.08 &&
        Math.abs(pct1 - answerPct1) < 0.08 &&
        Math.abs(pct2 - answerPct2) < 0.08) 
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
      setCollection([...collection, targetColor]);
      setGsColl([...gsColl, targetColor]);
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
    <div className={styles.container}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
      </style>
      <div className={styles.box}>
        <CurrentState 
          red={generateMix().r} 
          green={generateMix().g} 
          blue={generateMix().b} 
        />
        <div className={styles.box2}>
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
            <div className={styles.buttonBG1}>
              <ButtonBase
                className={styles.base}
                onClick={handleResult} 
              >
                <p className={styles.text}>Submit</p>
              </ButtonBase>
            </div>
            <div className={styles.buttonBG2}>
              <ButtonBase
                className={styles.base}
                onClick={tool} 
              >
                <p className={styles.text}>Tool</p>
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>

      <div id="mask" className={styles.mask} style={{display:"none"}} />
      <div id="success" className={styles.success} style={{display:"none"}}>⭐SUCCESS!⭐</div>
      <div id="failed" className={styles.failed} style={{display:"none"}}>YOU FAILED</div>
      <div id="score" className={styles.score} style={{display:"none"}}>Your Score: {Math.floor(time / 60)}min {time % 60}s </div>
      <div id="buttons"
        className={styles.buttons} 
        style={{display:"none"}}
      >
        <ButtonBase
          className={styles.base}
          onClick={() => {setShow("showTarget")}}
        >
          <strong className={styles.text2}>Play Again</strong>
        </ButtonBase>
      </div>
    </div>
  );
}
  
export default Play;
