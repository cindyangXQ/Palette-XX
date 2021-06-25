import { useEffect, useState } from "react";
import styles from "./PageMix.module.css";

function PageMix() {
  const [choice0, setChoice0] = useState(randomColor());
  const [choice1, setChoice1] = useState(randomColor());
  const [choice2, setChoice2] = useState(randomColor());
  const [pct0, setPct0] = useState(0);
  const [pct1, setPct1] = useState(0);
  const [pct2, setPct2] = useState(0);

  function cusColor(red, green, blue) {
    var rgbstring = "rgb(" + red + ", " + green + ", " + blue + ")";
    return {
      rgb: rgbstring, 
      r: red, 
      g: green,
      b: blue
    };
  }

  function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return cusColor(red, green, blue);
  }

  function generateMix() {
    var red = Math.floor(pct0 * choice0.r + pct1 * choice1.r + pct2 * choice2.r);
    var green = Math.floor(pct0 * choice0.g + pct1 * choice1.g + pct2 * choice2.g);
    var blue = Math.floor(pct0 * choice0.b + pct1 * choice1.b + pct2 * choice2.b);
    return cusColor(red, green, blue);
  }

  function ready() {
    document.getElementById("color0").style.backgroundColor = choice0.rgb;
    document.getElementById("color1").style.backgroundColor = choice1.rgb;
    document.getElementById("color2").style.backgroundColor = choice2.rgb;
  }

  useEffect(() => {
    document.getElementById("effectColor").style.backgroundColor = generateMix().rgb;
  });

  function handleSubmit() {
    alert("Added to Collection!");
  }

  function changeChoice(number) {
    var idToChange = "color"+number;
    /*
    var x = window.confirm("Change color choices by color code?");
    if(x) {
      var oxcode = prompt("Please enter your code: ", "#123456");
      document.getElementById(idToChange).backgroundColor = oxcode;
    } else {
      var y = window.confirm("Change color choices by rgb code?");
      if(y) {
        var rgbcode = prompt("Please enter your code: ", "rgb(12, 34, 56)");
        document.getElementById(idToChange).backgroundColor = rgbcode;
      } else {}
    }*/
    var code = prompt("Please enter your code: ", "#123456 or rgb(12, 34, 56)");
    var f = () => {
      if(number === 0) {
        setChoice0(code);
      } else if(number === 1) {
        setChoice1(code);
      } else {  //if(number == 2)
        setChoice2(code);
      }
      return code;
    }
    document.getElementById(idToChange).backgroundColor = f();
  }

  return (
    <div className={styles.bigBox} onClick={ready}>
      <h1 className={styles.title1}>Palette</h1>

      <div className={styles.container2}>

        <div className={styles.container}>
          <div className={styles.chooseColor} id="color0" onClick={() => changeChoice(0)}></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
            onChange={(event) => setPct0(event.target.value)}
          />
        </div>

        <div className={styles.container}>
          <div className={styles.chooseColor} id="color1" onClick={() => changeChoice(1)}></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
            onChange={(event) => setPct1(event.target.value)}
          />
        </div>

        <div className={styles.container}>
          <div className={styles.chooseColor} id="color2" onClick={() => changeChoice(2)}></div>
          <input
            className={styles.enterPercentage}
            type="text"
            placeholder="Enter percentages here"
            onChange={(event) => setPct2(event.target.value)}
          />
        </div>

        <button
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </button>  

        <div className={styles.effectColor} id="effectColor"></div>
      </div>
    </div>
  );
}
  
export default PageMix;
