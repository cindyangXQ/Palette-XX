import styles from "./PageProfile.module.css";
import { Avatar } from "@material-ui/core";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";

function PageProfile(props) {
  const { point } = props;
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
