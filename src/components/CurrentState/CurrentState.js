import styles from "./CurrentState.module.css";

function CurrentState(props) {
  const { current, targetColor } = props;

  return (
    <div className={styles.container}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Raleway:ital,wght@1,200&display=swap');
      </style>
      <h6 className={styles.title}>CURRENT STATE</h6>
      <p id="info" className={styles.info}>{current.rgb}</p>
      <div id="state" className={styles.state}>
        <div className={styles.st1} style={current.cssString}></div>
        <div className={styles.st2} style={targetColor.cssString}></div>
      </div>
      <h6 className={styles.title2}>Target Color</h6>
    </div>
  );
}

export default CurrentState;
