import styles from "./ColorList.module.css";
import CustomizeSlider from "../CustomizeSlider";

function ColorList(props) {
  const { setPct0, setPct1, setPct2,  
          choice0, choice1, choice2 } = props;

  return (
    <div>
      <div className={styles.style3}>
        <div className={styles.color} style={choice0.cssString}/>
        <p className={styles.style1}>0</p>
        <CustomizeSlider setPct={setPct0} />
        <p className={styles.style2}>100%</p>
      </div>

      <div className={styles.style3}>
        <div className={styles.color} style={choice1.cssString}/>
        <p className={styles.style1}>0</p>
        <CustomizeSlider setPct={setPct1} />
        <p className={styles.style2}>100%</p>
      </div>

      <div className={styles.style3}>
        <div className={styles.color} style={choice2.cssString}/>
        <p className={styles.style1}>0</p>
        <CustomizeSlider setPct={setPct2} />
        <p className={styles.style2}>100%</p>
      </div>
    </div>
  );
}
    
export default ColorList;
