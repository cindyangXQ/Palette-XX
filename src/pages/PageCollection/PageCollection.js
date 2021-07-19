import { useState, useEffect } from "react";
import styles from "./PageCollection.module.css";
import { firebase } from "@firebase/app";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import { ButtonBase, Menu, MenuItem } from '@material-ui/core';
import "@firebase/firestore";
import butt from "../../components/SoundEffect/barbutton.mp3";

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
  const [anchor, setAnchor] = useState(null);
  const [i, setI] = useState(-1);

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

  function ButtSound() {
    var sound = document.getElementById("butt");
    sound.volume="0.4";
    sound.play();
  } 

  return (
    <div>
      <audio src={butt} id="butt" autostart="0"/>
      <div className={styles.bg}></div>
      <div className={styles.container}>
        <div className={styles.buttonBG}>
          <ButtonBase className={styles.base}>
            <HorizontalSplitIcon
              style={{fontSize: 50}}
              onClick={() =>{ 
                ButtSound();
                setSplit(!split)}}
            />
          </ButtonBase>
        </div>
        <Menu
          elevation={0} 
          getContentAnchorEl={null} 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          anchorEl={anchor} 
          keepMounted
          open={Boolean(anchor)}
          onClose={() => {
            setAnchor(null);
            setI(-1);
          }}
        >
          <MenuItem onClick={() => {
            setAnchor(null);
            setI(-1);
          }}>
            {i >= 0 ? collection[i].rgb : ""}
          </MenuItem>
          <MenuItem onClick={() => {
            setAnchor(null);
            setI(-1);
          }}>
            {i >= 0 ? rgbToHsl(collection[i]): ""}
          </MenuItem>
        </Menu>
        { split ? (
          <div>
            <p className={styles.achieve}>Guess Achievements</p>
            <div className={styles.box}>
              {gsColl.map((position, index) => (
                <div 
                  className={styles.display} 
                  style={collection[position].cssString}
                  onClick={(event) => {
                    setAnchor(event.currentTarget);
                    setI(position);
                  }}
                >
                  <HighlightOffIcon 
                    type= "input" 
                    className={styles.delete} 
                    onClick={() => {
                      ButtSound();
                      delGs(index, position);}} 
                  >
                    delete
                  </HighlightOffIcon>
                </div>
              ))}
            </div>
            <p className={styles.achieve}>Mix Achievements</p>
            <div className={styles.box}>
              {mixColl.map((position, index) => (
                <div 
                  className={styles.display} 
                  style={collection[position].cssString}
                  onClick={(event) => {
                    setAnchor(event.currentTarget);
                    setI(position);
                  }}
                >
                  <HighlightOffIcon 
                    type = "input" 
                    className={styles.delete} 
                    onClick={() => {
                      ButtSound();
                      delMix(index, position);}} 
                  >
                    delete
                  </HighlightOffIcon>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.box}>
              {collection.map((collect, index) => (
                <div 
                  className={styles.display}  
                  style={collect.cssString} 
                  onClick={(event) => {
                    setAnchor(event.currentTarget);
                    setI(index);
                  }}
                >
                  <HighlightOffIcon 
                    type = "input" 
                    className={styles.delete} 
                    onClick={() => delColl(index)}
                  >
                    delete
                  </HighlightOffIcon>
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
