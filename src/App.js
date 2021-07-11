import { useState } from "react";
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

function App() {
  const [ mode, setMode ] = useState("Mode");
  const [ level, setLevel ] = useState("False");
  const [ point, setPoint ] = useState(500);
  const [ toolsUsed, setToolsUsed ] = useState(0);
  const [ collection, setCollection ] = useState([]);
  const [ mixColl, setMixColl ] = useState([]);
  const [ gsColl, setGsColl ] = useState([]);
  
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
                point={point} 
                setPoint={setPoint}
                toolsUsed={toolsUsed} 
                setToolsUsed={setToolsUsed}
                collection={collection} 
                setCollection={setCollection} 
                gsColl={gsColl} 
                setGsColl={setGsColl} 
              />
            : mode === "Mix" 
            ? <PageMix 
                collection={collection}
                setCollection={setCollection} 
                mixColl={mixColl} 
                setMixColl={setMixColl}
              />
            : mode === "Profile" 
            ? <PageProfile point={point} />
            : mode === "Collection" 
            ? <PageCollection 
                collection={collection} 
                setCollection={setCollection} 
                mixColl={mixColl} 
                setMixColl={setMixColl} 
                gsColl={gsColl} 
                setGsColl={setGsColl} 
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
