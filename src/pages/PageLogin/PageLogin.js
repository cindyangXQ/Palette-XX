import { FirebaseAuthConsumer } from "@react-firebase/auth";
import styles from "./PageLogin.module.css";
import { Button } from "@material-ui/core";

function PageLogin() {
  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Mr+Dafoe&display=swap');
      </style>
      <div className={styles.bigBox}>
        <div className={styles.Box}>
          <h1>
            Welcome to <span className={styles.pallet}>Pallete </span>
          </h1>
          <FirebaseAuthConsumer>
            {({ firebase }) => (
              <Button
                variant="contained"
                className={styles.buttonBox}
                onClick={() => handleGoogleSignIn(firebase)}
              >
                Sign in with Google
              </Button>
            )}
          </FirebaseAuthConsumer>
        </div>
      </div>
    </>
  );
}

export default PageLogin;