import React, { useState, useEffect } from "react";
import styles from "./Timer.module.css";

const Timer = (props) => {
  const { setTime, result } = props;
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (result === "") {
    } else {
      setTime(seconds);
      setIsActive(false);
    }
  }, [result, setTime, seconds]);

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
    <div>
      <div>
        <span className={styles.text}>
          Timer:{" "}
          <span id="time">
            &nbsp; {Math.floor(seconds / 60)}min {seconds % 60}s
          </span>
        </span>
      </div>

      <div className="row">
        <div>&nbsp;</div>
      </div>
    </div>
  );
};

export default Timer;
