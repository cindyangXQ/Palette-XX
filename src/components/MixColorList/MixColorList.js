import styles from "./MixColorList.module.css";
import CustomizeSlider from "../CustomizeSlider";
import FormDialog from "../FormDialog";

function MixColorList(props) {
  const { choices, setChoices } = props;
  return (
    <div>
      {choices.map((choice, index) => (
        <div className={styles.containerRow}>
          <div className={styles.color} style={choice.color.cssString}/>
          <p className={styles.style1}>0</p>
          <CustomizeSlider choices={choices} setChoices={setChoices} index={index} />
          <p className={styles.style2}>100%</p>
          <FormDialog choices={choices} setChoices={setChoices} index={index} />
        </div>
      ))}
    </div>
  );
}
    
export default MixColorList;
