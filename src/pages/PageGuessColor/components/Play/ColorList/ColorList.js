import styles from "./ColorList.module.css";
import CustomizeSlider from "./CustomizeSlider";
import AddIcon from "@material-ui/icons/Add";
import { ButtonBase } from "@material-ui/core";

function ColorList(props) {
  const {setRed, setGreen, setBlue} = props;
  return (
    <>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div className={styles.red} style={{backgroundColor:"red"}}/>
        <p style={{marginRight:-41, marginLeft:35, marginTop:65}}>0</p>
        <CustomizeSlider setState={setRed} />
        <p style={{marginTop:65, marginLeft:20, color:"#313540"}}>100%</p>
      </div>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div className={styles.red} style={{backgroundColor:"green"}}/>
        <p style={{marginRight:-41, marginLeft:35, marginTop:65}}>0</p>
        <CustomizeSlider setState={setGreen} />
        <p style={{marginTop:65, marginLeft:20, color:"#313540"}}>100%</p>
      </div>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div className={styles.red} style={{backgroundColor:"blue"}}/>
        <p style={{marginRight:-41, marginLeft:35, marginTop:65}}>0</p>
        <CustomizeSlider setState={setBlue}/>
        <p style={{marginTop:65, marginLeft:20, color:"#313540"}}>100%</p>
      </div>
      <ButtonBase style={{marginLeft:"calc(40% + 220px)", marginTop:15}}>
      <AddIcon type="button"  style={{fontSize: 50, color:"#41261960"}}/>
      </ButtonBase>
    </>
  );
}
    

export default ColorList;