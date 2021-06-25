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
  const [ toolsUsed, setToolsUsed] = useState(0);
  return (
    <div className="App">
      <FirebaseAuthConsumer>
        <IfFirebaseAuthed>
          <AppShell setMode={setMode} />
          {mode === "Mode" ? (
            <PageMode setMode={setMode} />
          ) : mode === "Difficulty" ? (
            <PageDifficulty setMode={setMode} setLevel={setLevel} />  
          ) : mode === "Guess" ? (
            <PageGuessColor 
              level={level} 
              point={point} 
              setPoint={setPoint}
              toolsUsed={toolsUsed} 
              setToolsUsed={setToolsUsed}
            />
          ) : mode === "Mix" ? (
            <PageMix />
          ) : mode === "Profile" ? (
            <PageProfile point={point}/>
          ) : (   // mode === "Collection" ?
            <PageCollection />
          )}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <PageLogin />
        </IfFirebaseUnAuthed>
      </FirebaseAuthConsumer>
    </div>
  );
}

export default App;
