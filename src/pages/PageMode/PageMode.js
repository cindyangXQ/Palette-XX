import styles from "./PageMode.module.css";
import { ButtonBase, Button } from "@material-ui/core";
import guessMusic from "./guess.mp4";
import mixMusic from "./mix.mp4";
import profilePic from "./profile.png";

function PageMode(props) {
  const { setMode } = props;
  return (
    <div className={styles.container}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Raleway:ital,wght@1,200&display=swap');
      </style>
      <div
        className={styles.guess}
        onClick={() => {
          setMode("Difficulty");
        }}
      >
        <video autoPlay="autoplay" loop="loop" muted className={styles.Video}>
          <source src={guessMusic} type="video/mp4" />
        </video>
        <strong className={styles.guessTitle}>GUESS</strong>
      </div>

      <div
        className={styles.mix}
        onClick={() => {
          setMode("Mix");
        }}
      >
        <video autoPlay="autoplay" loop="loop" muted className={styles.Video}>
          <source src={mixMusic} type="video/mp4" />
        </video>
        <strong className={styles.mixTitle}>MIX</strong>
      </div>

      <div
        className={styles.profile}
        onClick={() => {
          setMode("Profile");
        }}
      >
        <img className={styles.Img} src={profilePic} alt="" />
        <strong className={styles.profileTitle}>PROFILE</strong>
      </div>

      <div
        className={styles.collection}
        onClick={() => {
          setMode("Collection");
        }}
      >
        <strong className={styles.collectionTitle}>COLLECTION</strong>
      </div>
    </div>
  );
}

export default PageMode;
