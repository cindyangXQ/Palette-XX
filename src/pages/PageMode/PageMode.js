import styles from "./PageMode.module.css";
import { ButtonBase } from "@material-ui/core";
import guessMusic from "./guess.mp4";
import mixMusic from "./mix.mp4";
import profilePic from "./profile.png";
import buttonSound from "../../components/SoundEffect/button.mp3";

function PageMode(props) {
  const { setMode, sEffect} = props;
  function PlaySound() {
    var sound = document.getElementById("audio");
    sound.volume="0.3";
    sEffect && sound.play();
  } 
  return (
    <div>
      <audio src={buttonSound} autostart="0" id="audio" />
      <div className={styles.bg}></div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&family=Raleway:ital,wght@1,200&display=swap');
      </style>
      <div className={styles.box}>
        <ButtonBase 
          className={styles.button1Pos}
          onClick={() => {
            PlaySound();
            setTimeout(()=>{setMode("Difficulty")},500);
          }}
        >
          <div className={styles.buttonBG}>
            <video autoPlay="autoplay" loop="loop" muted="muted" className={styles.guessVideo}>
              <source src={guessMusic} type="video/mp4" />
            </video>
            <strong className={styles.text1}>GUESS</strong>
          </div>
        </ButtonBase>

        <ButtonBase
          className={styles.button2Pos}
          onClick={() => {
            PlaySound();
            setTimeout(()=>{setMode("Mix")},500);
          }}
        >
          <div className={styles.buttonBG}>
            <video autoPlay="autoplay" loop="loop" muted="muted" className={styles.mixVideo}>
              <source src={mixMusic} type="video/mp4" />
            </video>
            <strong className={styles.text2}>MIX</strong>
          </div> 
        </ButtonBase>

        <ButtonBase 
          className={styles.button3Pos}
          onClick={() => {
            PlaySound();
            setTimeout(()=>{setMode("Profile")},500);
          }}
        >
          <div className={styles.buttonBG}>
            <img src={profilePic} alt="" />
            <strong className={styles.text3}>PROFILE</strong>
          </div>
        </ButtonBase>

        <ButtonBase 
          className={styles.button4Pos}
          onClick={() => {
            PlaySound();
            setTimeout(()=>{setMode("Collection")},500);
          }}
        >
          <div className={styles.buttonBG}>
            <strong className={styles.text4}>COLLECTION</strong>
          </div>
        </ButtonBase>
      </div>
    </div>
  );
}

export default PageMode;
