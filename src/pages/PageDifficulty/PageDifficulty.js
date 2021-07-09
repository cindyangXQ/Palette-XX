import styles from "./PageDifficulty.module.css";
import { ButtonBase } from "@material-ui/core";

function PageDifficulty(props) {
  const { setMode, setLevel } = props;
  return (
    <div>
      <div className={styles.container}></div>
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
              setLevel("Easy");
              setMode("Guess");
            }}
          >
            <strong className={styles.text}>Easy</strong>
          </ButtonBase>
        </div>

        <div className={styles.buttonBG}>
          <ButtonBase 
            className={styles.base}
            onClick={() => {
              setLevel("Medium");
              setMode("Guess");
            }}
          >
            <strong className={styles.text}>Medium</strong>
          </ButtonBase>
        </div>

        <div className={styles.buttonBG}>
          <ButtonBase 
            className={styles.base}
            onClick={() => {
              setLevel("Difficult");
              setMode("Guess");
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
