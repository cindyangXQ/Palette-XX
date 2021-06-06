import { useState } from "react";
import PageLogin from "./pages/PageLogin";
import PageProfile from "./pages/PageProfile";
import PageGuessColor from "./pages/PageGuessColor";
import PageDifficulty from "./pages/PageDifficulty/PageDifficulty";
import PageCollection from "./pages/PageCollection/PageCollection";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState(0);

  /*return (
    <>
      {loggedIn ? (
        <PageGuessColor />
      ) : (
        <PageLogin loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}
    </>
  );*/

  return <PageCollection />;
}
