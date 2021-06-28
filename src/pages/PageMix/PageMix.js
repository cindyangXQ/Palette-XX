import { useState } from "react";
import styles from "./PageMix.module.css";
import CurrentState from "../../components/CurrentState";
import MixColorList from "../../components/MixColorList";
import { Button } from "@material-ui/core";

function cusColor(red, green, blue) {
  var rgbstring = "rgb(" + red + ", " + green + ", " + blue + ")";
  return {
    rgb: rgbstring, 
    r: red, 
    g: green,
    b: blue, 
    cssString: { backgroundColor: rgbstring }
  };
}

function randomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return cusColor(red, green, blue);
}

function PageMix() {
  const [choice0, setChoice0] = useState(randomColor());
  const [choice1, setChoice1] = useState(randomColor());
  const [choice2, setChoice2] = useState(randomColor());
  const [pct0, setPct0] = useState(0);
  const [pct1, setPct1] = useState(0);
  const [pct2, setPct2] = useState(0);

  function generateMix() {
    var red = Math.floor(pct0 * choice0.r + pct1 * choice1.r + pct2 * choice2.r);
    var green = Math.floor(pct0 * choice0.g + pct1 * choice1.g + pct2 * choice2.g);
    var blue = Math.floor(pct0 * choice0.b + pct1 * choice1.b + pct2 * choice2.b);
    return cusColor(red, green, blue);
  }

  function handleSubmit() {
    alert("Added to Collection!");
  }

  return (
    <div className={styles.container}>
        <CurrentState 
          red={generateMix().r} 
          green={generateMix().g} 
          blue={generateMix().b} 
        />
        <h1 className={styles.title1}>Mix!</h1>
        <MixColorList 
          setPct0={setPct0} setPct1={setPct1} setPct2={setPct2} 
          choice0={choice0} choice1={choice1} choice2={choice2}
          setChoice0={setChoice0} setChoice1={setChoice1} setChoice2={setChoice2}
        />
        <div className={styles.containerRow}>
          <Button
            variant="outlined"
            className={styles.button} 
            onClick={handleSubmit}
          >
            Submit
          </Button>  
          <Button 
            variant="outlined"
            className={styles.button} 
            onClick={() => {
              setChoice0(randomColor());
              setChoice1(randomColor());
              setChoice2(randomColor());
            }}
          >
            Play Again
          </Button>
        </div>
    </div>
  );
}
  
export default PageMix;
