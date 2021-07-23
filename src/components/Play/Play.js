import { useState, useEffect } from "react";
import styles from "./Play.module.css";
import Timer from "../Timer";
import CurrentState from "../CurrentState";
import ColorList from "../ColorList";
import { ButtonBase } from "@material-ui/core";
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import failAud from "../SoundEffect/fail.mp3";
import confirmAud from "../SoundEffect/confirm.mp3";
import successAud from "../SoundEffect/success.mp3";
import butt from "../SoundEffect/barbutton.mp3";

function cusColor(red, green, blue) {
  var rr = Math.min(255, red), gg = Math.min(255, green), bb = Math.min(255, blue);
  var rgbstring = "rgb(" + rr + ", " + gg + ", " + bb + ")";
  return {
    rgb: rgbstring, 
    r: rr, 
    g: gg,
    b: bb, 
    cssString: { backgroundColor: rgbstring }
  };
}

function Play(props) {
  const { level, setShow, targetColor, answerPcts, 
        point, setPoint, 
        toolsUsed, setToolsUsed, 
        choices, setChoices,  
        collection, setCollection, 
        gsColl, setGsColl, 
        highScore, setHighScore, sEffect } = props;
  const [tip, setTip] = useState(0);
  const [time, setTime] = useState(-1);
  const [result, setResult] = useState("");

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/toolsUsed").doc(uid).set({ toolsUsed:toolsUsed });
  }, [toolsUsed]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/collection").doc(uid).set({ collection:collection });
    db.collection("/gsColl").doc(uid).set({ gsColl:gsColl});
  }, [gsColl, collection]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/point").doc(uid).set({ point: point });
  }, [point]);

  useEffect(()=>{
    if(result==="success"&&(time<highScore || highScore<0)){
      setHighScore(time);
    }
  }, [time, result, highScore, setHighScore]);

  function generateMix() {
    var i, red = 0, green = 0, blue = 0;
    for(i = 0; i < choices.length; i++) {
      red += choices[i].color.r * choices[i].pct;
      green += choices[i].color.g * choices[i].pct;
      blue += choices[i].color.b * choices[i].pct;
    }
    red = Math.floor(red);
    green = Math.floor(green);
    blue = Math.floor(blue);
    return cusColor(red, green, blue);
  }

  function checkAnswer() {
    var res = true;
    for(var i = 0; i < choices.length; i++) {
      if(Math.abs(choices[i].pct - answerPcts[i]) >= 0.08) {
        res = false;
      }
    }
    return res;
  }

  function handleResult() {
    document.getElementById("mask").style.display="block";
    document.getElementById("buttons").style.display="block";
    if(checkAnswer()){
      SuccessSound();
      setResult("success");
      document.getElementById("success").style.display="block";
      document.getElementById("score").style.display="block";
      var p = level === "Easy" ? 1 : level === "Medium" ? 2 : 3;
      setPoint(prevstate => prevstate + p);
      setGsColl([...gsColl, collection.length]);
      setCollection([...collection, targetColor]);
    } else{
      FailSound();
      setResult("failed");
      document.getElementById("failed").style.display="block";
    }
  }

  function tool() {
    var toolsLeft = parseInt(point/5) - toolsUsed;
    ButtSound();
    if(toolsLeft === 0) {
      alert("You have no tools left.");
    } else if(tip === 3) {
      alert("I have told you all!");
    } else {
      if(tip === 0)
        alert("Percentage of the first color is " + Math.round(answerPcts[0]*100) + ".");
      else if(tip === 1)
        alert("Percentage of the second color is " + Math.round(answerPcts[1]*100) + ".");
      else //if(tip === 2)
        alert("Percentage of the third color is " + Math.round(answerPcts[2]*100) + ".");
      setTip(prevstate => prevstate + 1);
      setToolsUsed(prevstate => prevstate + 1);
    }
  }

  function ConfirmSound() {
    var sound = document.getElementById("confirmAud");
    sound.volume="0.8";
    sEffect && sound.play();
  } 

  function FailSound() {
    var sound = document.getElementById("failAud");
    sound.volume="0.5";
    sEffect && sound.play();
  } 

  function SuccessSound() {
    var sound = document.getElementById("successAud");
    sound.volume="0.5";
    sEffect && sound.play();
  } 

  function ButtSound() {
    var sound = document.getElementById("butt");
    sound.volume="1.0";
    sEffect && sound.play();
  } 

  return (
    <div className={styles.container}>
      <audio src={failAud} id="failAud" />
      <audio src={successAud} id="successAud" />
      <audio src={confirmAud} id="confirmAud" />
      <audio src={butt} id="butt" />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
      </style>
      <div className={styles.box}>
        <CurrentState current={generateMix()} />
        <div className={styles.box2}>
          <Timer 
            level={level}
            targetColor={targetColor}
            setTime={setTime} 
            result={result} 
          />
          <ColorList choices={choices} setChoices={setChoices} sEffect={sEffect}/>
          <div className={styles.containerRow}>
            <div className={styles.buttonBG1}>
              <ButtonBase
                className={styles.base}
                onClick={()=>{
                  ConfirmSound();
                  setTimeout(()=>{
                  handleResult()},1200);}} 
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
          onClick={() => {
            ButtSound();
            setTimeout(()=>{
            setShow("showTarget")},450)}}
        >
          <strong className={styles.text2}>Play Again</strong>
        </ButtonBase>
      </div>
    </div>
  );
}
  
export default Play;
