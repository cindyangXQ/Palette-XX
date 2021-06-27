import { useEffect } from "react";
import styles from "./CurrentState.module.css";

function CurrentState(props) {
  const {red, green, blue} = props;
  console.log(red);
  useEffect(()=>{
    document.getElementById("state").style.backgroundColor="rgb(" + red + ", " + green + ", " + blue + ")";
  },[red, green, blue])
  return (
    <div className={styles.container}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Raleway:ital,wght@1,200&display=swap');
      </style>
      <h6 className={styles.title}>CURRENT STATE</h6>
      <div id="state" className={styles.state} style={{backgroundColor:"#000000"}}/>
      
    </div>
  );
}

export default CurrentState;
