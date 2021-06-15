import { useState } from "react";
import PageLogin from "./pages/PageLogin";
import PageProfile from "./pages/PageProfile";
import PageDifficulty from "./pages/PageDifficulty/PageDifficulty";
import PageCollection from "./pages/PageCollection/PageCollection";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import PageLogin from "./pages/PageLogin";
import PageGuessColor from "./pages/PageGuessColor";
import PageMode from "./pages/PageMode";

function App() {
  const [Guess, setGuess] = useState("False");
  return (
    <div className="App">
      <FirebaseAuthConsumer>
        <IfFirebaseAuthed>
          {Guess === "False" ? (
            <PageMode setGuess={setGuess} />
          ) : (
            <PageGuessColor setGuess={setGuess} />
          )}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <PageLogin setGuess={setGuess} />
        </IfFirebaseUnAuthed>
      </FirebaseAuthConsumer>
    </div>
  );
}

export default App;
