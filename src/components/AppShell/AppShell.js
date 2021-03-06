import { ButtonBase, Fade, Tooltip } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import styles from "./AppShell.module.css";
import logo from "./logo.png";
import button from "../SoundEffect/barbutton.mp3";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import { Fragment } from "react";

function AppShell(props) {
  const { mode, setMode, setAnchorEl, sEffect } = props;

  const handleLogout = (firebase) => {
    setMode("Mode");
    firebase.auth().signOut();
  };

  function PlaySound() {
    var sound = document.getElementById("button");
    sound.volume="1.0";
    sEffect && sound.play();
  } 

  return (
    <div>
      <audio src={button} id="button" />
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap');
      </style>
      <div className={styles.toolbar}>
        <img src={logo} alt="" className={styles.image}/>
        <p
          className={styles.title}
          style={{ flexGrow: 1, textAlign: "left" }}
        >
          Palette
        </p>

        <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <div className={styles.rightmost}>
              <ButtonBase
                className={styles.base} 
                onClick={() => {
                  PlaySound();
                  setTimeout(()=>{
                    handleLogout(firebase)
                  },450);
                }}
              >
                <Tooltip 
                  arrow 
                  TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
                  title="Log Out"
                >
                  <ExitToAppIcon style={{fontSize: 25}} />
                </Tooltip>
              </ButtonBase>
            </div>
          )}
        </IfFirebaseAuthed>

        <div className={styles.buttonBG}>
          <ButtonBase
            className={styles.base}
            onClick={() => {
              PlaySound();
              setTimeout(()=>{
                setMode("Mode");
              },450);
            }}
          >
            <Tooltip 
              arrow 
              TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
              title="Home"
            >
              <HomeIcon style={{fontSize: 25}} />
            </Tooltip>
          </ButtonBase>
        </div>

        <div className={styles.buttonBG}>
          <ButtonBase
            className={styles.base}
            id="mute"
            onClick={(event) => {
              PlaySound();
              setAnchorEl(event.currentTarget);
            }}
          >
            <Tooltip 
              arrow 
              TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
              title="Sounds"
            >
              <VolumeUpIcon style={{fontSize: 25}} />
            </Tooltip>
          </ButtonBase>
        </div>

        <div className={styles.info}>
          <Tooltip 
            arrow 
            TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
            classes={{ tooltip: {maxWidth: 200}}}
            title={
              <Fragment>
                <p style={{fontSize: 17, textAlign: "center"}}>
                  <b>Instructions</b>
                </p>

                {mode === "Mode" ? <>
                  <p style={{fontSize: 15}}>
                    <u>Guess</u>
                  </p>
                  <p style={{fontSize: 13}}>
                    <p>1. You are given the freedom of choosing a random colour. </p>
                    <p>2. In Easy level, required accuracy is within 20%, and choices are simple.</p>
                    <p>3. In Medium level, choices are randomly generated.</p>
                    <p>4. In Difficult level, required accuracy is within 10%.</p>
                    <p>5. You earn 1/2/3 point each time you win a Easy/Medium/Difficult level. </p>
                    <p>6. Tool gives you the answers in sequence and only once. </p>
                  </p>
                </> : <></>}

                {mode === "Difficulty" ? <>
                  <p style={{fontSize: 15}}>
                    <u>Difficulty</u>
                  </p>
                  <p style={{fontSize: 13}}>
                    <p>1. In Easy level, required accuracy is within 20%, and your choices are red, green, and blue.</p>
                    <p>2. In Medium level, required accuracy is within 20%, and your choices are randomly generated.</p>
                    <p>3. In Difficult level, required accuracy is within 10%, and your choices are randomly generated.</p>
                  </p>
                </> : <></>}

                {mode === "Guess" ? <>
                  <p style={{fontSize: 15}}>
                    <u>Guess</u>
                  </p>
                  <p style={{fontSize: 13}}>
                    <p>1. You are given the freedom of choosing a random colour. </p>
                    <p>2. You earn 1/2/3 point each time you win a Easy/Medium/Difficult level. </p>
                    <p>3. Tool gives you the answers in sequence and only once. <em>Be careful! </em></p>
                  </p>
                </> : <></>}

                {mode === "Mode" || mode === "Mix" ? <>
                  <p style={{fontSize: 15}}>
                    <u>Mix</u>
                  </p>
                  <p style={{fontSize: 13}}>
                    <p>1. You can add, delete, and edit (by rgb values) a choice. </p>
                    <p>2. Upon submission, the produced colour is added to Collection. </p>
                    <p>3. Component values of the rgb representation of a colour is bounded to 255. 
                          In case any one of them exceeds this limit, the number is reduced to 255. </p>
                  </p>
                </> : <></>}

                {mode === "Mode" || mode === "Profile" ? <>
                  <p style={{fontSize: 15}}>
                    <u>Profile</u>
                  </p>
                  <p style={{fontSize: 13}}>
                    <p>1. You are started with 500 points. </p>
                    <p>2. You are awarded 1 tool every 5 points. </p>
                  </p>
                </> : <></>}

                {mode === "Mode" || mode === "Collection" ? <>
                  <p style={{fontSize: 15}}>
                    <u>Collection</u>
                  </p>
                  <p style={{fontSize: 13}}>
                    <p>1. Click on the top-right corner to toggle the view. </p>
                    <p>2. Hover on the colour blocks to see their RGB and HSL values. </p>
                    <p>3. Click the cross button to kick it out of sight :) </p>
                  </p>
                </> : <></>}
              </Fragment>
            }
          >
            <InfoOutlinedIcon style={{fontSize: 25}} />
          </Tooltip>
        </div>

        <div className={styles.buttonBG}>
          <ButtonBase
            className={styles.base}
            onClick={() => {
              PlaySound();
            }}
          >
            <Tooltip 
              arrow 
              TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
              classes={{ tooltip: {maxWidth: 120}}} 
              title={
              <Fragment>
                <p style={{fontSize: 13}}>
                  RGB (Red, Green, Blue) and HSL(Hue, Saturation, Lightness) are two of the most used colour models. 
                  They both use three coordinates to specify a colour.  
                </p>
                <p style={{fontSize: 11}}>
                  For more information on colour models, click the above icon. 
                </p>
              </Fragment>
            }
            >
              <a href="https://en.wikipedia.org/wiki/Color_model#Background">
                <MenuBookIcon style={{fontSize: 25}} />
              </a>
            </Tooltip>
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default AppShell;
