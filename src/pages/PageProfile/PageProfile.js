import styles from "./PageProfile.module.css";
import { Avatar } from "@material-ui/core";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import { useEffect } from "react";
import "@firebase/firestore";

function PageProfile(props) {
  const { point, setPoint, toolsUsed, setToolsUsed,
          easyScore, setEasyScore ,mdmScore, setMdmScore, dfcScore, setDfcScore, 
        } = props;

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

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const easyRef = db.collection("/easyScore").doc(uid);
    const mdmRef = db.collection("/mdmScore").doc(uid);
    const dfcRef = db.collection("/dfcScore").doc(uid);

    easyRef.get().then((doc) => {
      if (doc.exists) {
        setEasyScore(doc.data().easyScore);
      } else {
        setEasyScore(-1);
      }
    });

    mdmRef.get().then((doc) => {
      if (doc.exists) {
        setMdmScore(doc.data().mdmScore);
      } else {
        setMdmScore(-1);
      }
    });

    dfcRef.get().then((doc) => {
      if (doc.exists) {
        setDfcScore(doc.data().dfcScore);
      } else {
        setDfcScore(-1);
      }
    });
  }, [setEasyScore,setMdmScore,setDfcScore]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("/toolsUsed").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setToolsUsed(doc.data().toolsUsed);
      } else {
        setToolsUsed(0);
      }
    });
  }, [setPoint, setToolsUsed]);

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
              <h4 className={styles.info}>Your name: {user.displayName}</h4>
              <h4 className={styles.info}>Your email address: {user.email}</h4>
              <h4 className={styles.info}>Your points: {point}</h4>
              <h4 className={styles.info}>Your tools: {parseInt(point/5) - toolsUsed}</h4>
              <h4 className={styles.info}>Easy level highest score: {easyScore >= 0 ? easyScore + "s" : "You haven't tried this level. "}</h4>
              <h4 className={styles.info}>Medium level highest score: {mdmScore >= 0 ? mdmScore + "s": "You haven't tried this level. "}</h4>
              <h4 className={styles.info}>Difficult level highest score: {dfcScore>= 0 ? dfcScore + "s": "You haven't tried this level. "}</h4>
              <br/><br/><br/>
            </div>
          )}
      </IfFirebaseAuthed> 
    </div>
  );
}

export default PageProfile;
