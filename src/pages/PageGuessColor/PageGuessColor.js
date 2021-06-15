import { useState } from "react";
/*import styles from "./PageGuessColor.module.css";*/
import AppShell from "./components/AppShell";
import TargetColor from "./components/TargetColor";
import Play from "./components/Play";

function PageGuessColor(props) {
  const [Color, setColor] = useState("");
  const [show, setShow] = useState("showTarget");
  const { setGuess } = props;
  return (
    <div className={styles.bigBox}>
      <AppShell setGuess={setGuess} />
      {show === "showTarget" ? (
        <TargetColor setShow={setShow} setColor={setColor} />
      ) : (
        <Play Color={Color} />
      )}
    </div>
  );
}

export default PageGuessColor;


/*function PageGuessColor() {
  const [successful, setSuccessful] = useState(false);

  function showSuccessful() {
    setSuccessful(true);
  }

  return (
    <div className={styles.bigBox}>
      <h1 className={styles.title1}>Palette</h1>
      <h3 className={styles.title2}>Target Color</h3>
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

export default PageGuessColor;*/
