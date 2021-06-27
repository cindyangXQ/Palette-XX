import styles from "./ColorList.module.css";
import CustomizeSlider from "./CustomizeSlider";
import AddIcon from "@material-ui/icons/Add";
import { ButtonBase } from "@material-ui/core";

function ColorList(props) {
  const {setRed, setGreen, setBlue} = props;
  return (
    <>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div className={styles.red} style={{backgroundColor:"rgb(255,0,0)"}}/>
        <p style={{marginRight:-41, marginLeft:35, marginTop:65}}>0</p>
        <CustomizeSlider setState={setRed} />
        <p className={styles.style2}>100%</p>
      </div>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div className={styles.red} style={{backgroundColor:"rgb(0,255,0)"}}/>
        <p style={{marginRight:-41, marginLeft:35, marginTop:65}}>0</p>
        <CustomizeSlider setState={setGreen} />
        <p className={styles.style2}>100%</p>
      </div>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <div className={styles.red} style={{backgroundColor:"rgb(0,0,255)"}}/>
        <p style={{marginRight:-41, marginLeft:35, marginTop:65}}>0</p>
        <CustomizeSlider setState={setBlue}/>
        <p className={styles.style2}>100%</p>
      </div>
      <ButtonBase style={{marginLeft:"calc(40% + 220px)", marginTop:15}}>
        <AddIcon type="button"  style={{fontSize: 50, color:"#41261960"}}/>
      </ButtonBase>
    </>
  );
}
    
export default ColorList;
