import React, { useState, useEffect } from "react";
import styles from "./Timer.module.css";

const Timer = (props) => {
  const { Color } = props;
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className={styles.wraper}>
        <span className={styles.text} style={{ float: "left" }}>
          Target Color:{" "}
        </span>
        <div className={styles.color} style={{ backgroundColor: "rgb(" + Color.red + ", " + Color.green + ", " + Color.blue + ")" }} />
        <span className={styles.text}>
          Timer: &nbsp; {Math.floor(seconds / 60)}min {seconds % 60}s
        </span>
      </div>

      <div className="row">
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
