import { useState } from "react";
import styles from "./PageGuessColor.module.css";
import TargetColor from "../../components/TargetColor";
import Play from "../../components/Play";

function PageGuessColor(props) {
  const { level, point, setPoint, 
          toolsUsed, setToolsUsed, 
          collection, setCollection, 
          gsColl, setGsColl, 
          easyScore, setEasyScore, 
          mdmScore, setMdmScore, 
          dfcScore, setDfcScore, sEffect } = props;

  const [targetColor, setTargetColor] = useState({});
  const [show, setShow] = useState("showTarget");
  const [choices, setChoices] = useState([]);
  const [pcts, setPcts] = useState([0, 0, 0]);
  
  return (
    <div>
      <div className={styles.bg}></div>
      {show === "showTarget" ? (
        <TargetColor 
          level={level} setShow={setShow} setTargetColor={setTargetColor}
          setChoices={setChoices} setPcts={setPcts}  sEffect={sEffect}
        />
      ) : (
        <Play 
          level={level} setShow={setShow} targetColor={targetColor} answerPcts={pcts} 
          point={point} setPoint={setPoint} 
          toolsUsed={toolsUsed} setToolsUsed={setToolsUsed} 
          choices={choices} setChoices={setChoices} 
          collection={collection} setCollection={setCollection} 
          gsColl={gsColl} setGsColl={setGsColl} 
          highScore={level === "Easy" ? easyScore : level === "Medium" ? mdmScore : dfcScore} 
          setHighScore={level === "Easy" ? setEasyScore : level === "Medium" ? setMdmScore : setDfcScore}
          sEffect={sEffect} 
        />
      )}
    </div>
  );
}

export default PageGuessColor;
