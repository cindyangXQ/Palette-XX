import { useState } from "react";
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
  return (
    <div className="App">
      <FirebaseAuthConsumer>
        <IfFirebaseAuthed>
          {mode === "Mode" ? (
            <PageMode setMode={setMode} />
          ) : mode === "Difficulty" ? (
            <PageDifficulty setMode={setMode} setLevel={setLevel} />  
          ) : mode === "Guess" ? (
            <PageGuessColor mode={mode} setMode={setMode} level={level} />
          ) : mode === "Mix" ? (
            <PageMix setMode={setMode} />
          ) : mode === "Profile" ? (
            <PageProfile setMode={setMode} />
          ) : (   // mode === "Collection" ?
            <PageCollection setMode={setMode} />
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
