import { AppBar, Toolbar, Button } from "@material-ui/core";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import styles from "./AppShell.module.css";
import logo from "./logo.png";

function AppShell(props) {
  const { setGuess } = props;
  const handleLogout = (firebase) => {
    setGuess("False");
    firebase.auth().signOut();
  };

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap');
      </style>
      <AppBar position="static">
        <Toolbar className={styles.Toolbar}>
          <img src={logo} alt="" />
          <p
            className={styles.Title}
            style={{ flexGrow: 1, textAlign: "left" }}
          >
            Pallete
          </p>
          <Button
            color="inherit"
            onClick={() => {
              setGuess("False");
            }}
          >
            Home
          </Button>
          <IfFirebaseAuthed>
            {({ user, firebase }) => (
              <Button color="inherit" onClick={() => handleLogout(firebase)}>
                Logout
              </Button>
            )}
          </IfFirebaseAuthed>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AppShell;
