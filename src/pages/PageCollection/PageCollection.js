import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import styles from "./PageCollection.module.css";
import { firebase } from "@firebase/app";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import { Menu, MenuItem } from '@material-ui/core';
import "@firebase/firestore";


function PageCollection(props) {
  const { collection, setCollection, 
          mixColl, setMixColl, 
          gsColl, setGsColl } = props;
  const [ split, setSplit ] = useState(false);
  const [anchor1, setAnchor1] = useState(null);
  const [anchor2, setAnchor2] = useState(null);
  const [anchor3, setAnchor3] = useState(null);

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
        <HorizontalSplitIcon
          style={{fontSize: 50}}
          className={styles.switch} 
          onClick={() => setSplit(!split)}
        />
        { split ? (
          <div>
            <p className={styles.achieve}>Guess Achievements</p>
            <div className={styles.box}>
              {gsColl.map((position, index) => (
                <div>
                <div 
                  className={styles.display} 
                  style={collection[position].cssString}
                  onClick={(event) => setAnchor1(event.currentTarget)}
                >
                  <HighlightOffIcon 
                    type= "input" 
                    className={styles.delete} 
                    onClick={() => delGs(index, position)} 
                  >
                    delete
                  </HighlightOffIcon>
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
                  anchorEl={anchor1} 
                  keepMounted
                  open={Boolean(anchor1)}
                  onClose={() => setAnchor1(null)}
                >
                  <MenuItem onClick={() => setAnchor1(null)}>
                    {collection[position].rgb}
                  </MenuItem>
                </Menu>
                </div>
              ))}
            </div>
            <p className={styles.achieve}>Mix Achievements</p>
            <div className={styles.box}>
              {mixColl.map((position, index) => (
                <div>
                <div 
                  className={styles.display} 
                  style={collection[position].cssString}
                  onClick={(event) => setAnchor2(event.currentTarget)}
                >
                  <HighlightOffIcon 
                    type = "input" 
                    className={styles.delete} 
                    onClick={() => delMix(index, position)} 
                  >
                    delete
                  </HighlightOffIcon>
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
                  anchorEl={anchor2} 
                  keepMounted
                  open={Boolean(anchor2)}
                  onClose={() => setAnchor2(null)}
                >
                  <MenuItem onClick={() => setAnchor2(null)}>
                    {collection[position].rgb}
                  </MenuItem>
                </Menu>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.box}>
              {collection.map((collect, index) => (
                <div>
                <div 
                  className={styles.display}  
                  style={collect.cssString} 
                  onClick={(event) => setAnchor3(event.currentTarget)}
                >
                  <HighlightOffIcon 
                    type = "input" 
                    className={styles.delete} 
                    onClick={() => delColl(index)}
                  >
                    delete
                  </HighlightOffIcon>
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
                  anchorEl={anchor3} 
                  keepMounted
                  open={Boolean(anchor3)}
                  onClose={() => setAnchor3(null)}
                >
                  <MenuItem onClick={() => setAnchor3(null)}>
                    {collect.rgb}
                  </MenuItem>
                </Menu>
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
