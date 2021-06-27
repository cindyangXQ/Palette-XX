import { useState } from "react";
import styles from "./PageGuessColor.module.css";
import AppShell from "../../components/AppShell";
import TargetColor from "../../components/TargetColor";
import Play from "../../components/Play";

function PageGuessColor(props) {
  const { level, point, setPoint, toolsUsed, setToolsUsed } = props;

  const [targetColor, setTargetColor] = useState({});
  const [show, setShow] = useState("showTarget");
  const [choice0, setChoice0] = useState({});
  const [choice1, setChoice1] = useState({});
  const [choice2, setChoice2] = useState({});
  const [pct0, setPct0] = useState(0);
  const [pct1, setPct1] = useState(0);
  const [pct2, setPct2] = useState(0);
  
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
