import styles from "./ColorList.module.css";
import CustomizeSlider from "./CustomizeSlider";
import AddIcon from "@material-ui/icons/Add";
import { ButtonBase } from "@material-ui/core";

function ColorList(props) {
  const {setRed, setGreen, setBlue} = props;
  return (
    <>
      <div className={styles.style3}>
        <div className={styles.color} id={styles.red}/>
        <p className={styles.style1}>0</p>
        <CustomizeSlider setState={setRed} />
        <p className={styles.style2}>100%</p>
      </div>
      <div className={styles.style3}>
        <div className={styles.color} id={styles.green}/>
        <p className={styles.style1}>0</p>
        <CustomizeSlider setState={setGreen} />
        <p className={styles.style2}>100%</p>
      </div>
      <div className={styles.style3}>
        <div className={styles.color} id={styles.blue}/>
        <p className={styles.style1}>0</p>
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
