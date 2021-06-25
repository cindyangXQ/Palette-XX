import { useState } from "react";
import styles from "./PageGuessColor.module.css";
import TargetColor from "../../components/TargetColor";
import Play from "../../components/Play";

function PageGuessColor(props) {
  const [targetColor, setTargetColor] = useState("");
  const [show, setShow] = useState("showTarget");
  const [choice0, setChoice0] = useState({});
  const [choice1, setChoice1] = useState({});
  const [choice2, setChoice2] = useState({});
  const [pct0, setPct0] = useState(0);
  const [pct1, setPct1] = useState(0);
  const [pct2, setPct2] = useState(0);
  const { level, point, setPoint, toolsUsed, setToolsUsed } = props;

  return (
    <div className={styles.bigBox}>
      {show === "showTarget"
        ? <TargetColor 
            setShow={setShow} setTargetColor={setTargetColor}
            setChoice0={setChoice0} setChoice1={setChoice1} setChoice2={setChoice2}
            setPct0={setPct0} setPct1={setPct1} setPct2={setPct2}
          />
        : <Play 
            level={level} 
            targetColor={targetColor} 
            point={point} 
            setPoint={setPoint}
            toolsUsed={toolsUsed}
            setToolsUsed={setToolsUsed}
            pct0={pct0} pct1={pct1} pct2={pct2}
            choice0={choice0} choice1={choice1} choice2={choice2}
          />
      }
    </div>
  );
}

export default PageGuessColor;
