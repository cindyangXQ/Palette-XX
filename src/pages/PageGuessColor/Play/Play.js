import Timer from "./Timer";
import CurrentState from "./CurrentState";
import ColorList from "./ColorList";
import {useState} from "react";
import styles from "./Play.module.css";
import { Button } from "@material-ui/core";

function Play(props) {
  const { Color, setShow, setGuess } = props;
  const  [red, setRed] = useState(0);
  const  [green, setGreen] = useState(0);
  const  [blue, setBlue] = useState(0);
  const  [time, setTime] = useState("");
  const  [result, setResult] = useState("");

  function handleResult(){
   document.getElementById("mask").style.display="block";
   document.getElementById("buttons").style.display="block";
   if(Math.abs(red-Color.red)<20&& Math.abs(blue-Color.blue)<20
    && Math.abs(green-Color.green)<20){
      setResult("success");
      document.getElementById("success").style.display="block";
   } else{
     setResult("failed");
     document.getElementById("failed").style.display="block";
   }
  }
  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
      </style>
      <CurrentState red={red} green={green} blue={blue}/>
      <Timer Color={Color} setTime={setTime} result={result}/>
      <ColorList setRed={setRed} setGreen={setGreen} setBlue={setBlue}/>
      <button className={styles.butt} onClick={()=>{handleResult()}}>SUBMIT</button>
      <div className={result==="success" ? styles.time: styles.empty}>
        {result==="success"? "Your Score: " + time : ""}
      </div>
      <div id="mask" className={styles.mask} style={{display:"none"}}></div>
      <div id="success" className={styles.success} style={{display:"none"}}>⭐SUCCESS!⭐</div>
      <div id="failed" className={styles.failed} style={{display:"none"}}>YOU FAILED</div>
      <div id="buttons" className={styles.buttons} style={{display:"none"}}>
        <Button variant="outlined" className={styles.button} 
          onClick={()=>{setShow("showTarget");}}>
            Play Again
        </Button>
        <Button variant="outlined" className={styles.button}
          onClick={()=>{setGuess("False");}}>
            Back To Home
        </Button>
      </div>
   </>
  );
}

export default Play;
