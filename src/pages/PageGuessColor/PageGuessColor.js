import { useState } from "react";
import styles from "./PageGuessColor.module.css";
import AppShell from "../../components/AppShell";
import TargetColor from "../../components/TargetColor";
import Play from "../../components/Play";

function PageGuessColor(props) {
  const [targetColor, setTargetColor] = useState("");
  const [show, setShow] = useState("showTarget");
  const { mode, setMode, level } = props;
  return (
    <div className={styles.bigBox}>
      <AppShell setMode={setMode} />
      {show === "showTarget"
        ? <TargetColor setShow={setShow} setColor={setTargetColor} />
        : <Play mode={mode} level={level} targetColor={targetColor} />
      }
    </div>
  );
}

export default PageGuessColor;
