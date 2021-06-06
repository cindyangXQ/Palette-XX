import styles from "./PageProfile.module.css";

function PageProfile() {
  return (
    <div className={styles.bigBox}>
      <div className={styles.profilePic}></div>
      <h4 className={styles.info}>Your name: </h4>
      <h4 className={styles.info}>Your email address: </h4>
      <h4 className={styles.info}>Your points: </h4>
    </div>
  );
}

export default PageProfile;
