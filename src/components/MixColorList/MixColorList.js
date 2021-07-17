import styles from "./MixColorList.module.css";
import CustomizeSlider from "../CustomizeSlider";
import FormDialog from "../FormDialog";
import { ButtonBase } from "@material-ui/core";

function MixColorList(props) {
  const { choices, setChoices } = props;

  function del(index) {
    var newChoice = choices.slice(0, index).concat(choices.slice(index+1));
    setChoices(newChoice);
  }

  return (
    <div>
      {choices.map((choice, index) => (
        <div className={styles.containerRow}>
          <div className={styles.color} style={choice.color.cssString}/>
          <p className={styles.style1}>0</p>
          <CustomizeSlider choices={choices} setChoices={setChoices} index={index} />
          <p className={styles.style2}>100%</p>
          <FormDialog choices={choices} setChoices={setChoices} index={index} />
          <div className={styles.buttonBG}>
            <ButtonBase
              className={styles.base}
              onClick={() => del(index)} 
            >
              <p className={styles.text}>Delete This Color</p>
            </ButtonBase>
          </div>
        </div>
      ))}
    </div>
  );
}
    
export default MixColorList;
