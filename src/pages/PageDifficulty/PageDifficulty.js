import styles from "./PageDifficulty.module.css";
import { ButtonBase } from "@material-ui/core";
import buttonSound from "../../components/SoundEffect/button.mp3";

function PageDifficulty(props) {
  const { setMode, setLevel, sEffect } = props;

  function PlaySound() {
    var sound = document.getElementById("audio");
    sound.volume="0.3";
    sEffect && sound.play(); 
  } 

  return (
    <div>
      <audio src={buttonSound} autostart="0" id="audio"/>
      <div className={styles.bg}></div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Raleway:ital,wght@1,200&display=swap');
      </style>

      <h1 className={styles.title1}>Guess!</h1>
      <h3 className={styles.title2}>Select level of difficulty:</h3>
      <div className={styles.box}>

        <div className={styles.buttonBG}>
          <ButtonBase 
            className={styles.base}
            onClick={() => {
              PlaySound();
              setTimeout(() => {
                setLevel("Easy");
                setMode("Guess");
              }, 500);
            }}
          >
            <strong className={styles.text}>Easy</strong>
          </ButtonBase>
        </div>

        <div className={styles.buttonBG}>
          <ButtonBase 
            className={styles.base}
            onClick={() => {
              PlaySound();
              setTimeout(() => {
                setLevel("Medium");
                setMode("Guess");
              }, 500);
            }}
          >
            <strong className={styles.text}>Medium</strong>
          </ButtonBase>
        </div>

        <div className={styles.buttonBG}>
          <ButtonBase 
            className={styles.base}
            onClick={() => {
              PlaySound();
              setTimeout(() => {
                setLevel("Difficult");
                setMode("Guess");
              }, 500);
            }}
          >
            <strong className={styles.text}>Difficult</strong>
          </ButtonBase>
        </div>

      </div>
    </div>
  );
}

export default PageDifficulty;
