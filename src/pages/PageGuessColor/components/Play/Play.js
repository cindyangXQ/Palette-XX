import Timer from "./Timer";
import CurrentState from "./CurrentState";
import ColorList from "./ColorList";
import {useState} from "react";

function Play(props) {
  const { Color } = props;
  const  [red, setRed] = useState(0);
  const  [green, setGreen] = useState(0);
  const  [blue, setBlue] = useState(0);
  return (
    <>
      <CurrentState red={red} green={green} blue={blue}/>
      <Timer Color={Color}/>
      <ColorList setRed={setRed} setGreen={setGreen} setBlue={setBlue}/>
    </>
  );
}

export default Play;
