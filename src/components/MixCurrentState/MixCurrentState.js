import styles from "./MixCurrentState.module.css";

function MixCurrentState(props) {
  const { current } = props;

  return (
    <div className={styles.container}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Raleway:ital,wght@1,200&display=swap');
      </style>
      <h6 className={styles.title}>CURRENT STATE</h6>
      <div id="state" className={styles.state} style={current.cssString}/>
      <p id="info" className={styles.info}>{current.rgb}</p>
    </div>
  );
}

export default MixCurrentState;
