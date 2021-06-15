import AppShell from "../PageGuessColor/components/AppShell";
import styles from "./PageMode.module.css";
import { ButtonBase } from "@material-ui/core";
import guess from "./guess.mp4";
import mix from "./mix.mp4";
import profile from "./profile.png";

function PageMode(props) {
  const { setGuess } = props;
  return (
    <div className={styles.container}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Raleway:ital,wght@1,200&display=swap');
      </style>
      <AppShell />
      <ButtonBase
        variant="contained"
        className={styles.Guess}
        onClick={() => {
          setGuess("True");
        }}
      >
        <video autoPlay="autoplay" loop="loop" muted className={styles.Video}>
          <source src={guess} type="video/mp4" />
        </video>
        <strong className={styles.guessTitle}>GUESS</strong>
      </ButtonBase>

      <ButtonBase variant="contained" className={styles.Mix}>
        <video autoPlay="autoplay" loop="loop" muted className={styles.Video}>
          <source src={mix} type="video/mp4" />
        </video>
        <strong className={styles.mixTitle}>MIX</strong>
      </ButtonBase>

      <ButtonBase variant="contained" className={styles.Profile}>
        <img className={styles.Img} src={profile} alt="" />
        <strong className={styles.profileTitle}>PROFILE</strong>
      </ButtonBase>

      <ButtonBase variant="contained" className={styles.Collection}>
        <strong className={styles.collectionTitle}>COLLECTION</strong>
      </ButtonBase>
    </div>
  );
}

export default PageMode;
