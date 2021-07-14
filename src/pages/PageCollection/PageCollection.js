import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import styles from "./PageCollection.module.css";
import { firebase } from "@firebase/app";
import "@firebase/firestore";


function PageCollection(props) {
  const { collection, setCollection, 
          mixColl, setMixColl, 
          gsColl, setGsColl } = props;
  const [ split, setSplit ] = useState(false);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const collectionRef = db.collection("/collection").doc(uid);
    const gsCollRef = db.collection("/gsColl").doc(uid);
    const mixCollRef = db.collection("/mixColl").doc(uid);

    collectionRef.get().then((doc) => {
      if (doc.exists) {
        setCollection(doc.data().collection);
      } else {
        setCollection([]);
      }
    });

    gsCollRef.get().then((doc) => {
      if (doc.exists) {
        setGsColl(doc.data().gsColl);
      } else {
        setGsColl([]);
      }
    });

    mixCollRef.get().then((doc) => {
      if (doc.exists) {
        setMixColl(doc.data().mixColl);
      } else {
        setMixColl([]);
      }
    });
  }, [setCollection, setGsColl, setMixColl]);

  return (
    <div>
      <div className={styles.bg}></div>
      <div className={styles.container}>
        <Button 
          className={styles.button} 
          onClick={() => setSplit(!split)}
        >
          switch
        </Button>
        { split ? (
          <div>
            <p  className={styles.achieve}>Guess Achievements</p>
            <div className={styles.box}>
              {gsColl.map(collect => (
                <div className={styles.display} style={collect.cssString}></div>
              ))}
            </div>
            <p className={styles.achieve}>Mix Achievements</p>
            <div className={styles.box}>
              {mixColl.map(collect => (
                <div className={styles.display} style={collect.cssString}></div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.box}>
              {collection.map(collect => (
                <div className={styles.display} style={collect.cssString}></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PageCollection;
