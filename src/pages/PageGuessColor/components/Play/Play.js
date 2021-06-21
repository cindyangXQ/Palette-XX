import Timer from "./Timer";
import CurrentState from "./CurrentState";

function Play(props) {
  const {Color} = props;
  return (<>
    <CurrentState />
    <Timer Color={Color}/>
  </>);
}

export default Play;
