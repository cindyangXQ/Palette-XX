import styles from "./PageDifficulty.module.css";

function PageDifficulty() {
  return (
    <div className={styles.bigBox}>
      <h1 className={styles.title1}>Guess!</h1>
      <h3 className={styles.title2}>Select level of difficulty:</h3>
      <h4 className={styles.menu}>Easy</h4>
      <h4 className={styles.menu}>Medium</h4>
      <h4 className={styles.menu}>Difficult</h4>
    </div>
  );
}

export default PageDifficulty;
