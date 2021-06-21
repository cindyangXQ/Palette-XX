import styles from "./CurrentState.module.css";

function CurrentState() {
  return (
    <div className={styles.container}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Raleway:ital,wght@1,200&display=swap');
      </style>
      <h6 clasName={styles.title}>CURRENT STATE</h6>
      <div className={styles.state} />
      <p className={styles.info}>RGB ( 0 , 0 , 0 )</p>
    </div>
  );
}

export default CurrentState;
