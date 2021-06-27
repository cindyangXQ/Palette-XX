import { useEffect, useState } from "react";
import styles from "./PageMix.module.css";
import FormDialog from "../../components/FormDialog/FormDialog";

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

  useEffect(() => {
    document.getElementById("effectColor").style.backgroundColor = generateMix().rgb;
  });

  function handleSubmit() {
    alert("Added to Collection!");
  }

  return (
    <div className={styles.bigBox}>
      <h1 className={styles.title1}>Palette</h1>

      <div className={styles.container2}>

        <div className={styles.container}>
          <div 
            className={styles.chooseColor} 
            style={choice0.cssString}
          ></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
            onChange={(event) => setPct0(event.target.value)}
          />
          <FormDialog setChoice={setChoice0} />
        </div>

        <div className={styles.container}>
          <div 
            className={styles.chooseColor} 
            style={choice1.cssString}
          ></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
            onChange={(event) => setPct1(event.target.value)}
          />
          <FormDialog setChoice={setChoice1} />
        </div>

        <div className={styles.container}>
          <div 
            className={styles.chooseColor} 
            style={choice2.cssString}
          ></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
            onChange={(event) => setPct2(event.target.value)}
          />
          <FormDialog setChoice={setChoice2} />
        </div>

        <button
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </button>  

        <div className={styles.effectColor} id="effectColor"></div>

        <button 
          onClick={() => {
            setChoice0(randomColor());
            setChoice1(randomColor());
            setChoice2(randomColor());
          }}
        >
          Play again with another group of randomly generated colors
        </button>

      </div>
    </div>
  );
}
  
export default PageMix;
