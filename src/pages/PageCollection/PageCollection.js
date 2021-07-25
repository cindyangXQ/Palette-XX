import { useState, useEffect, Fragment } from "react";
import styles from "./PageCollection.module.css";
import { firebase } from "@firebase/app";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import { ButtonBase, Fade, Tooltip } from '@material-ui/core';
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
  s = Math.round(s*100);
  l = Math.round(l*100);
  return {
    hsl: "HSL(" + h + ", " + s + "%, " + l + "%)", 
    h: h, s: s, l:l
  };
}

function sortby(how, colorArr) {
  var f = 
      how === "Hue"
      ? x => rgbToHsl(x).h
      : how === "Saturation"
      ? x => rgbToHsl(x).s
      : how === "Lightness"
      ? x => rgbToHsl(x).l
      : how === "Red"
      ? x => x.r
      : how === "Green"
      ? x => x.g
      : x => x.b;
  var copy = colorArr.concat([]);
  copy.sort(function(x, y) {
    return f(x) - f(y);
  })
  return copy;
}

function groupbytone(colorArr) {
  var result = [];
  var i; 
  for(i = 0; i < 12; i++) {
    result[i] = [];
  }
  for(i = 0; i < colorArr.length; i++) {
    var a = Math.floor((rgbToHsl(colorArr[i]).h + 15) % 360 / 30);
    result[a].push(colorArr[i]);
  }
  return result;
}

function PageCollection(props) {
  const { collection, setCollection, 
          mixColl, setMixColl, 
          gsColl, setGsColl, sEffect } = props;
  const [ split, setSplit ] = useState("all");
  const tones = ["Red", "Orange", "Yellow", "Chartreuse", "Green", "Spring Green", 
                  "Cyan", "Azure", "Blue", "Violet", "Magenta", "Rose"];

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


  function splitdiv(which) {
    var coll = 
        which === "Guess"
        ? gsColl
        : mixColl;
    var delfunc = 
        which === "Guess"
        ? delGs
        : delMix;
    return (
      <div>
        <p className={styles.achieve}>{which} Achievements</p>
        <div className={styles.box}>
          {coll.map((position, index) => (
            <Tooltip 
              arrow 
              TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
              title={
                <Fragment>
                  <p style={{fontSize: 17, textAlign: "center"}}>
                    {collection[position].rgb}
                  </p>
                  <p style={{fontSize: 17, textAlign: "center"}}>
                    {rgbToHsl(collection[position]).hsl}
                  </p>
                </Fragment>
              }
            >
              <div className={styles.display} style={collection[position].cssString} >
                <HighlightOffIcon 
                  type = "input" 
                  className={styles.delete} 
                  onClick={() => {
                    ButtSound();
                    delfunc(index, position);
                  }} 
                >
                  delete
                </HighlightOffIcon>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    );
  }

  function adiv(arr) {
    return (
      <div className={styles.box}>
        {arr.map((collect) => (
          <Tooltip 
            arrow 
            TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} 
            title={
              <Fragment>
                <p style={{fontSize: 17, textAlign: "center"}}>
                  {collect.rgb}
                </p>
                <p style={{fontSize: 17, textAlign: "center"}}>
                  {rgbToHsl(collect).hsl}
                </p>
              </Fragment>
            }
          >
            <div className={styles.display} style={collect.cssString}></div>
          </Tooltip>
        ))}
      </div>
    );
  }

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
    sound.volume="1.0";
    sEffect && sound.play();
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
                setSplit( split === "all" ? "split" 
                        : split === "split" ? "tone" 
                        : split === "tone" ? "sort" 
                        : "all");
              }}
            />
          </ButtonBase>
        </div>
        { split === "split" ? (
          <div>
            { ["Guess", "Mix"].map(splitdiv) }
          </div>
        ) : split === "all" ? (
          <div>
            <p className={styles.achieve}>All Collections</p>
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
                        {rgbToHsl(collect).hsl}
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
          </div>
        ) : split === "tone" ? (
          <div>
          { groupbytone(collection).map((x, index) => (
              <div>
                <p className={styles.achieve}>{tones[index]} Tone</p>
                {adiv(x)}
              </div>
            )) }
          </div>
        ) : ( //split === "sort"
          <div>
            { ["Hue", "Saturation", "Lightness", "Red", "Green", "Blue"].map(x => (
              <div>
                <p className={styles.achieve}>Sorted by {x}</p>
                {adiv(sortby(x, collection))}
              </div>
            )) }
          </div>
        )}
      </div>
    </div>
  );
}

export default PageCollection;
