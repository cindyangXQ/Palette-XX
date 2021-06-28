import styles from "./PageDifficulty.module.css";
import { ButtonBase } from "@material-ui/core";

function PageDifficulty(props) {
  const { setMode, setLevel } = props;
  return (
    <div className={styles.container}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Raleway:ital,wght@1,200&display=swap');
      </style>

      <h1 className={styles.title1}>Guess!</h1>
      <h3 className={styles.title2}>Select level of difficulty:</h3>
      <div className={styles.container2}>
        <ButtonBase
          variant="contained"
          className={styles.base}
          onClick={() => {
            setLevel("Easy");
            setMode("Guess");
          }}
        >
          <strong className={styles.menu}>Easy</strong>
        </ButtonBase>

        <ButtonBase
          variant="contained"
          className={styles.base}
          onClick={() => {
            setLevel("Medium");
            setMode("Guess");
          }}
        >
          <strong className={styles.menu}>Medium</strong>
        </ButtonBase>

        <ButtonBase
          variant="contained"
          className={styles.base}
          onClick={() => {
            setLevel("Difficult");
            setMode("Guess");
          }}
        >
          <strong className={styles.menu}>Difficult</strong>
        </ButtonBase>
      </div>
    </div>
  );
}

export default PageDifficulty;
