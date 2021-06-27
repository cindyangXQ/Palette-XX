import { useState } from "react";
import styles from "./PageGuessColor.module.css";
import AppShell from "../../components/AppShell";
import TargetColor from "../../components/TargetColor";
import Play from "../../components/Play";

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
        <Play Color={Color} setShow={setShow} setGuess={setGuess}/>
      )}
    </div>
  );
}

export default PageGuessColor;
