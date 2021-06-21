import styles from "./PageProfile.module.css";
import AppShell from "../../components/AppShell";

function PageProfile(props) {
  const { setMode } = props;
  //
  return (
    <div className={styles.bigBox}>
      <AppShell setMode={setMode} />
      <div className={styles.profilePic}></div>
      <h4 className={styles.info}>Your name: </h4>
      <h4 className={styles.info}>Your email address: </h4>
      <h4 className={styles.info}>Your points: </h4>
    </div>
  );
}

export default PageProfile;
