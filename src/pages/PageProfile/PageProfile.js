import styles from "./PageProfile.module.css";
import { Avatar } from "@material-ui/core";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import { useEffect } from "react";
import "@firebase/firestore";

function PageProfile(props) {
  const { point, setPoint, toolsUsed, 
          easyScore, mdmScore, dfcScore, 
          name, setName } = props;

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("/point").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setPoint(doc.data().point);
      } else {
        setPoint(500);
      }
    });
  }, [setPoint]);

  function changeName() {
    setName(prompt("What's your name?"));
  }

  return (
    <div>
      <div className={styles.bg}></div>
      <IfFirebaseAuthed>
          {({ user, firebase }) => (
            <div>
              <Avatar
                variant="square"
                style={{height:"140px", width:"130px", margin:"155px auto 50px auto"}}
                alt="Remy Sharp"
                src={user.photoURL}
              />
              <h4 className={styles.info} onClick={changeName}>Your name: {name}</h4>
              <h4 className={styles.info}>Your email address: </h4>
              <h4 className={styles.info}>Your points: {point}</h4>
              <h4 className={styles.info}>Your tools: {parseInt(point/5) - toolsUsed}</h4>
              <h4 className={styles.info}>Easy level highest score: {easyScore >= 0 ? easyScore : "You haven't tried this level. "}</h4>
              <h4 className={styles.info}>Medium level highest score: {mdmScore >= 0 ? mdmScore : "You haven't tried this level. "}</h4>
              <h4 className={styles.info}>Difficult level highest score: {dfcScore>= 0 ? dfcScore : "You haven't tried this level. "}</h4>
            </div>
          )}
      </IfFirebaseAuthed> 
    </div>
  );
}

export default PageProfile;
