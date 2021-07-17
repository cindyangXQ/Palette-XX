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
  const [ name, setName ] = useState("<Click to set>");

  
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
  }, []);
  
  return (
    <div className="App">
      <FirebaseAuthConsumer>
        <IfFirebaseAuthed>
          <AppShell setMode={setMode} />
          { mode === "Mode" 
            ? <PageMode setMode={setMode} />
            : mode === "Difficulty" 
            ? <PageDifficulty setMode={setMode} setLevel={setLevel} />  
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
              />
            : mode === "Mix" 
            ? <PageMix 
                collection={collection} setCollection={setCollection} 
                mixColl={mixColl} setMixColl={setMixColl}
              />
            : mode === "Profile" 
            ? <PageProfile 
                point={point} setPoint={setPoint} 
                toolsUsed={toolsUsed} setToolsUsed={setToolsUsed}
                easyScore={easyScore} 
                mdmScore={mdmScore} 
                dfcScore={dfcScore} 
                name={name} setName={setName} 
              />
            : mode === "Collection" 
            ? <PageCollection 
                collection={collection} setCollection={setCollection} 
                mixColl={mixColl} setMixColl={setMixColl} 
                gsColl={gsColl} setGsColl={setGsColl} 
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
