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

  function delGs(index, position) {
    var newGsColl = gsColl.slice(0, index).concat(gsColl.slice(index+1).map(x => x-1));
    setGsColl(newGsColl);
    var newColl = collection.slice(0, position).concat(collection.slice(position+1));
    setCollection(newColl);
  }

  function delMix(index, position) {
    var newMixColl = mixColl.slice(0, index).concat(mixColl.slice(index+1).map(x => x-1));
    setMixColl(newMixColl);
    var newColl = collection.slice(0, position).concat(collection.slice(position+1));
    setCollection(newColl);
  }

  function delColl(index) {
    var temp = gsColl.indexOf(index);
    if(temp >= 0) {
      return delGs(temp, index);
    } else {
      return delMix(mixColl.indexOf(index), index);
    }
  }

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
              {gsColl.map((position, index) => (
                <div className={styles.display} style={collection[position].cssString}>
                  <button onClick={() => delGs(index, position)}>delete</button>
                </div>
              ))}
            </div>
            <p className={styles.achieve}>Mix Achievements</p>
            <div className={styles.box}>
              {mixColl.map((position, index) => (
                <div className={styles.display} style={collection[position].cssString}>
                  <button type = "input"
                    onClick={() => delMix(index, position)}
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.box}>
              {collection.map((collect, index) => (
                <div className={styles.display} style={collect.cssString}>
                  <button 
                    type = "input"
                    onClick={() => delColl(index)}
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PageCollection;
