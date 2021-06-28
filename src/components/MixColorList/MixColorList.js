import styles from "./MixColorList.module.css";
import CustomizeSlider from "../CustomizeSlider";
import FormDialog from "../FormDialog";

function MixColorList(props) {
  const { setPct0, setPct1, setPct2,  
          choice0, choice1, choice2, 
          setChoice0, setChoice1, setChoice2 } = props;
  return (
    <div className={styles.box}>
      <div className={styles.containerRow}>
        <div className={styles.color} style={choice0.cssString}/>
        <p className={styles.style1}>0</p>
        <CustomizeSlider setPct={setPct0} />
        <p className={styles.style2}>100%</p>
        <FormDialog setChoice={setChoice0} />
      </div>

      <div className={styles.containerRow}>
        <div className={styles.color} style={choice1.cssString}/>
        <p className={styles.style1}>0</p>
        <CustomizeSlider setPct={setPct1} />
        <p className={styles.style2}>100%</p>
        <FormDialog setChoice={setChoice1} />
      </div>

      <div className={styles.containerRow}>
        <div className={styles.color} style={choice2.cssString}/>
        <p className={styles.style1}>0</p>
        <CustomizeSlider setPct={setPct2} />
        <p className={styles.style2}>100%</p>
        <FormDialog setChoice={setChoice2} />
      </div>
    </div>
  );
}
    
export default MixColorList;
