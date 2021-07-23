import { useState, useEffect } from "react";
import AppShell from "./components/AppShell";
import PageLogin from "./pages/PageLogin";
import PageMode from "./pages/PageMode";
import PageDifficulty from "./pages/PageDifficulty";
import PageGuessColor from "./pages/PageGuessColor";
import PageMix from "./pages/PageMix";
import PageProfile from "./pages/PageProfile";
import PageCollection from "./pages/PageCollection";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import lechang from "./components/SoundEffect/Lechang.mp3";
import React from "react";
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { ButtonBase } from "@material-ui/core";
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Divider from '@material-ui/core/Divider';
import butt from "./components/SoundEffect/barbutton.mp3";

function App() {
  const [ mode, setMode ] = useState("Mode");
  const [ level, setLevel ] = useState("False");
  const [ point, setPoint ] = useState(500);
  const [ toolsUsed, setToolsUsed ] = useState(0);
  const [ collection, setCollection ] = useState([]);
  const [ mixColl, setMixColl ] = useState([]);
  const [ gsColl, setGsColl ] = useState([]);
  const [ easyScore, setEasyScore ] = useState(-1);
  const [ mdmScore, setMdmScore ] = useState(-1);
  const [ dfcScore, setDfcScore ] = useState(-1);
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [ value, setValue ] = React.useState(100);
  const [ sEffect, setSEffect ] = useState(true);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const audio=document.getElementById("lechang");
    audio.volume=value/100;
  }

  const audio=document.getElementById("lechang");

  useEffect(()=>{} , [audio==null || audio.paused===true])

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/collection").doc(uid).set({ collection: collection });
    db.collection("/mixColl").doc(uid).set({ mixColl: mixColl });
  }, [mixColl, collection]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/collection").doc(uid).set({ collection:collection });
    db.collection("/gsColl").doc(uid).set({ gsColl:gsColl});
  }, [gsColl, collection]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/easyScore").doc(uid).set({ easyScore: easyScore });
    db.collection("/mdmScore").doc(uid).set({ mdmScore: mdmScore });
    db.collection("/dfcScore").doc(uid).set({ dfcScore: dfcScore });
  }, [easyScore, mdmScore, dfcScore]);

function BgmSound() {
  const sound = document.getElementById("lechang");
  sound.play();
} 
  
function ButtSound() {
  const sound = document.getElementById("butt");
  sEffect && sound.play();
}
const handleClose = () => {
  setAnchorEl(null);
};

  return (
    <div className="App">
      <audio src={butt} id="butt" autostart="0" />
      <div>
        <audio loop autoPlay src={lechang} id="lechang" onload={BgmSound}
         controls={false} autostart="1"/>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{width:"350px", height:"210px"}}>
          <h4 style={{fontSize:"16px", padding:"4%", color:"#313540"
                    , fontFamily: "'Quicksand', sans-serif"}}>
            Background Music Volume
          </h4>
          <Grid container spacing={2} style={{padding:"4%", marginTop:"-30px"}}>
          <Grid item>
            <ButtonBase>
              {audio==null || audio.paused===true 
               ? <VolumeOffIcon 
                  onClick={()=>{
                    document.getElementById("lechang").play();
                    setAnchorEl(null);
                  }}/>
               : <VolumeUp style={{color:"#313540"}} 
                  onClick={()=>{
                    ButtSound();
                    document.getElementById("lechang").pause(); 
                    setAnchorEl(null);
                  } 
                  }/>}
            </ButtonBase>
          </Grid>
          <Grid item xs>
            <Slider 
             style={{color:"#313540"}} disabled={false} id="slider"
             value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
          </Grid>
        </ Grid>
        <Divider style={{marginBottom:"30px"}}/>
            <h4 style={{fontSize:"16px", padding:"4%", color:"#313540"
                      , fontFamily: "'Quicksand', sans-serif", display:"inline"}}>
              Sound Effect
            </h4>
          <ButtonBase style={{marginLeft:"30px", display:"inline"}}>
              {sEffect === false
              ? <VolumeOffIcon 
                  onClick={()=>{
                    ButtSound();
                    setSEffect(true);
                  }}/>
               : <VolumeUp style={{color:"#313540"}} 
                  onClick={()=>{
                    setSEffect(false);
                  } 
               }/>}
            </ButtonBase>
        </div>
      </Popover>
      <FirebaseAuthConsumer>
        <IfFirebaseAuthed>
          <AppShell 
            mode={mode} setMode={setMode} 
            anchorEl={anchorEl} setAnchorEl={setAnchorEl}
            sEffect={sEffect}
          />
          { mode === "Mode" 
            ? <PageMode setMode={setMode} sEffect={sEffect}/>
            : mode === "Difficulty" 
            ? <PageDifficulty setMode={setMode} setLevel={setLevel} sEffect={sEffect}/>  
            : mode === "Guess" 
            ? <PageGuessColor 
                level={level} 
                point={point} setPoint={setPoint}
                toolsUsed={toolsUsed} setToolsUsed={setToolsUsed}
                collection={collection} setCollection={setCollection} 
                gsColl={gsColl} setGsColl={setGsColl} 
                easyScore={easyScore} setEasyScore={setEasyScore} 
                mdmScore={mdmScore} setMdmScore={setMdmScore} 
                dfcScore={dfcScore} setDfcScore={setDfcScore} 
                sEffect={sEffect}
              />
            : mode === "Mix" 
            ? <PageMix 
                collection={collection} setCollection={setCollection} 
                mixColl={mixColl} setMixColl={setMixColl}
                sEffect={sEffect}
              />
            : mode === "Profile" 
            ? <PageProfile 
                point={point} setPoint={setPoint} 
                toolsUsed={toolsUsed} setToolsUsed={setToolsUsed}
                easyScore={easyScore} setEasyScore={setEasyScore} 
                mdmScore={mdmScore} setMdmScore={setMdmScore}
                dfcScore={dfcScore} setDfcScore={setDfcScore}
              />
            : mode === "Collection" 
            ? <PageCollection 
                collection={collection} setCollection={setCollection} 
                mixColl={mixColl} setMixColl={setMixColl} 
                gsColl={gsColl} setGsColl={setGsColl} 
                sEffect={sEffect}
              /> 
            : <></>
          }
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <PageLogin />
        </IfFirebaseUnAuthed>
      </FirebaseAuthConsumer>
    </div>
  );
}

export default App;
