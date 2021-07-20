import { Button } from "@material-ui/core";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import styles from "./AppShell.module.css";
import logo from "./logo.png";
import button from "../SoundEffect/barbutton.mp3";

function AppShell(props) {
  const { setMode } = props;
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
      </div>
    </div>
  );
}

export default AppShell;
