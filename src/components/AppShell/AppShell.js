import { Button, ButtonBase, Fade, Tooltip } from "@material-ui/core";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { IfFirebaseAuthed } from "@react-firebase/auth";
import styles from "./AppShell.module.css";
import logo from "./logo.png";
import button from "../SoundEffect/barbutton.mp3";
import { Fragment } from "react";

function AppShell(props) {
  const { mode, setMode } = props;

  const handleLogout = (firebase) => {
    setMode("Mode");
    firebase.auth().signOut();
  };

  function PlaySound() {
    var sound = document.getElementById("button");
    sound.volume="1.0";
    sound.play();
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
            <Button 
              color="inherit" 
              onClick={() => {
                PlaySound();
                setTimeout(()=>{
                handleLogout(firebase)},450);
              }}
              className={styles.button}
            >
              Logout
            </Button>
          )}
        </IfFirebaseAuthed>
        <Button
          color="inherit"
          onClick={() => {
            PlaySound();
            setTimeout(()=>{
            setMode("Mode");
            },450);
          }}
          className={styles.button}
        >
          Home
        </Button>
        <div className={styles.buttonBG}>
          <ButtonBase
            className={styles.base}
          >
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
                      <p>1. You are given the freedom of choosing a random color. </p>
                      <p>2. In Easy level, the target color is shown and choices are simple.</p>
                      <p>3. In Medium level, choices are randomly generated.</p>
                      <p>4. In Difficult level, the target color is hidden.</p>
                      <p>5. You earn 1/2/3 point each time you win a Easy/Medium/Difficult level. </p>
                      <p>6. Tool gives you the answers in sequence and only once. </p>
                    </p>
                  </> : <></>}

                  {mode === "Difficulty" ? <>
                    <p style={{fontSize: 15}}>
                      <u>Difficulty</u>
                    </p>
                    <p style={{fontSize: 13}}>
                      <p>1. In Easy level, the target color is shown and your choices are red, green, and blue.</p>
                      <p>2. In Medium level, the target color is shown and your choices are randomly generated.</p>
                      <p>3. In Difficult level, the target color is hidden and your choices are randomly generated.</p>
                    </p>
                  </> : <></>}

                  {mode === "Guess" ? <>
                    <p style={{fontSize: 15}}>
                      <u>Guess</u>
                    </p>
                    <p style={{fontSize: 13}}>
                      <p>1. You are given the freedom of choosing a random color. </p>
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
                      <p>2. Upon submission, the produced color is added to Collection. </p>
                      <p>3. Component values of the rgb representation of a color is bounded to 255. 
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
                      <p>2. Hover on the color blocks to see their rgb and hsl values. </p>
                      <p>3. Click the cross button to kick it out of sight :) </p>
                    </p>
                  </> : <></>}
                </Fragment>
              }
            >
              <InfoOutlinedIcon style={{fontSize: 25}} />
            </Tooltip>
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default AppShell;
