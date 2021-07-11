import styles from "./PageProfile.module.css";

function PageProfile(props) {
  const { point } = props;
  return (
    <div>
      <div className={styles.bg}></div>
      <div className={styles.profilePic}></div>
      <h4 className={styles.info}>Your name: </h4>
      <h4 className={styles.info}>Your email address: </h4>
      <h4 className={styles.info}>Your points: {point}</h4>
    </div>
  );
}

export default PageProfile;
