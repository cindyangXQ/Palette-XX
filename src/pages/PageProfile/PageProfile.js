import styles from "./PageProfile.module.css";
import { Avatar } from "@material-ui/core";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import { useEffect } from "react";
import "@firebase/firestore";

function PageProfile(props) {
  const { point, setPoint } = props;
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
  }, []);

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
            </div>
          )}
      </IfFirebaseAuthed> 
    </div>
  );
}

export default PageProfile;
