import { useState } from "react";
import PageLogin from "./pages/PageLogin";
import PageProfile from "./pages/PageProfile";
import PageMode from "./pages/PageMode";
import PageDifficulty from "./pages/PageDifficulty/PageDifficulty";
import PageGuessColor from "./pages/PageGuessColor";
import PageCollection from "./pages/PageCollection/PageCollection";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";

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
