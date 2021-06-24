import { useState } from "react";
import styles from "./PageGuessColor.module.css";
import AppShell from "./components/AppShell";
import TargetColor from "./components/TargetColor";
import Play from "./components/Play";

function PageGuessColor(props) {
  const [Color, setColor] = useState({"red":0, "green":0, "blue":0});
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
