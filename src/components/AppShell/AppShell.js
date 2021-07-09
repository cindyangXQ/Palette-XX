import { Button } from "@material-ui/core";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import styles from "./AppShell.module.css";
import logo from "./logo.png";

function AppShell(props) {
  const { setMode } = props;
  const handleLogout = (firebase) => {
    setMode("Mode");
    firebase.auth().signOut();
  };

  return (
    <div>
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
              onClick={() => handleLogout(firebase)}
              className={styles.button}
            >
              Logout
            </Button>
          )}
        </IfFirebaseAuthed>
        <Button
          color="inherit"
          onClick={() => {
            setMode("Mode");
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
