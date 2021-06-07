import { useState } from "react";
import styles from "./PageGuessColor.module.css";
import AppShell from "./components/AppShell";

function PageGuessColor(props) {
  const [successful, setSuccessful] = useState(false);
  const {setGuess}=props;
  function showSuccessful() {
    setSuccessful(true);
  }

  return (
    <div className={styles.bigBox}>
      <AppShell setGuess={setGuess}/>
      <h3>Target Color</h3>
      <div className={styles.targetColor}></div>
      <form onSubmit={showSuccessful}>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <div className={styles.chooseColor} id={styles.color1}></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
          />
        </div>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <div className={styles.chooseColor} id={styles.color2}></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
          />
        </div>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
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
      {successful ? <h4>Successful!</h4> : <p></p>}
    </div>
  );
}

export default PageGuessColor;
