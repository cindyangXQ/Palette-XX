import styles from "./PageDifficulty.module.css";
import AppShell from "../../components/AppShell";
import { ButtonBase } from "@material-ui/core";

function PageDifficulty(props) {
  const { setMode, setLevel} = props;
  return (
    <div className={styles.bigBox}>
      <AppShell setMode={setMode} />
      <h1 className={styles.title1}>Guess!</h1>
      <h3 className={styles.title2}>Select level of difficulty:</h3>

      <div className={styles.container}>
      <ButtonBase
        variant="contained"
        onClick={() => {
          //setLevel("Easy");
          setMode("Guess");
        }}
      >
        <strong className={styles.menu}>Easy</strong>
      </ButtonBase>

      <ButtonBase
        variant="contained"
        onClick={() => {
          setLevel("Medium");
          setMode("Guess");
        }}
      >
        <strong className={styles.menu}>Medium</strong>
      </ButtonBase>

      <ButtonBase
        variant="contained"
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
