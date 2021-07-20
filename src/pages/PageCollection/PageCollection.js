import { useState, useEffect, Fragment } from "react";
import styles from "./PageCollection.module.css";
import { firebase } from "@firebase/app";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import { ButtonBase, Fade, Tooltip } from '@material-ui/core';
import "@firebase/firestore";

function rgbToHsl(color){
  var r = color.r/255, g = color.g/255, b = color.b/255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max === min){
      h = s = 0; 
  } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if(max === r) {
        h = 60 * (g - b) / d;
        h += h < 0 ? 360 : 0;
      } else if(max === g) {
        h = 60 * (b - r) / d + 120;
      } else {
        h = 60 * (r - g) / d + 240;
      }
      h = Math.floor(h) % 360;
  }
  return "hsl(" + h + ", " + Math.round(s*100) + "%, " + Math.round(l*100) + "%)";
}

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
        <div className={styles.buttonBG}>
          <ButtonBase className={styles.base}>
            <HorizontalSplitIcon
              style={{fontSize: 50}}
              onClick={() => setSplit(!split)}
            />
          </ButtonBase>
        </div>
        { split ? (
          <div>
            <p className={styles.achieve}>Guess Achievements</p>
            <div className={styles.box}>
              {gsColl.map((position, index) => (
                <Tooltip 
                arrow 
                TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
                title={
                  <Fragment>
                    <p style={{fontSize: 17, textAlign: "center"}}>
                      {collection[position].rgb}
                    </p>
                    <p style={{fontSize: 17, textAlign: "center"}}>
                      {rgbToHsl(collection[position])}
                    </p>
                  </Fragment>
                }
              >
                <div className={styles.display} style={collection[position].cssString} >
                  <HighlightOffIcon 
                    type = "input" 
                    className={styles.delete} 
                    onClick={() => delGs(index, position)}
                  >
                    delete
                  </HighlightOffIcon>
                </div>
              </Tooltip>
              ))}
            </div>
            <p className={styles.achieve}>Mix Achievements</p>
            <div className={styles.box}>
              {mixColl.map((position, index) => (
                <Tooltip 
                arrow 
                TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
                title={
                  <Fragment>
                    <p style={{fontSize: 17, textAlign: "center"}}>
                      {collection[position].rgb}
                    </p>
                    <p style={{fontSize: 17, textAlign: "center"}}>
                      {rgbToHsl(collection[position])}
                    </p>
                  </Fragment>
                }
              >
                <div className={styles.display} style={collection[position].cssString} >
                  <HighlightOffIcon 
                    type = "input" 
                    className={styles.delete} 
                    onClick={() => delMix(index, position)}
                  >
                    delete
                  </HighlightOffIcon>
                </div>
              </Tooltip>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.box}>
            {collection.map((collect, index) => (
              <Tooltip 
                arrow 
                TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
                title={
                  <Fragment>
                    <p style={{fontSize: 17, textAlign: "center"}}>
                      {collect.rgb}
                    </p>
                    <p style={{fontSize: 17, textAlign: "center"}}>
                      {rgbToHsl(collect)}
                    </p>
                  </Fragment>
                }
              >
                <div className={styles.display} style={collect.cssString} >
                  <HighlightOffIcon 
                    type = "input" 
                    className={styles.delete} 
                    onClick={() => delColl(index)}
                  >
                    delete
                  </HighlightOffIcon>
                </div>
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageCollection;
