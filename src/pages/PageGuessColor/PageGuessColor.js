import { useState } from "react";
import styles from "./PageGuessColor.module.css";

function PageGuessColor() {
  const [successful, setSuccessful] = useState(false);

  function showSuccessful() {
    setSuccessful(true);
  }

  return (
    <div className={styles.bigBox}>
      <h1 className={styles.title1}>Palette</h1>
      <h3 className={styles.title2}>Target Color</h3>
      <div className={styles.targetColor}></div>
      <div className={styles.flex}>
        <form onSubmit={showSuccessful}>
          <div className={styles.flex}>
            <div className={styles.chooseColor} id={styles.color1}></div>
            <input
              className={styles.enterPercentage}
              type="text"
              placeholder="Enter percentages here"
            />
          </div>
          <div className={styles.flex}>
            <div className={styles.chooseColor} id={styles.color2}></div>
            <input
              className={styles.enterPercentage}
              type="text"
              placeholder="Enter percentages here"
            />
          </div>
          <div className={styles.flex}>
            <div className={styles.chooseColor} id={styles.color3}></div>
            <input
              className={styles.enterPercentage}
              type="text"
              placeholder="Enter percentages here"
            />
            </div>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </form>
        <div className={styles.effectColor}></div>
      </div>
      {successful ? <h4>Successful!</h4> : <p></p>}
    </div>
  );
}

export default PageGuessColor;
