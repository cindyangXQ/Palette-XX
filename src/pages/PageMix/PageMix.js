import styles from "./PageMix.module.css";
import AppShell from "../../components/AppShell";

function PageMix(props) {
  const { setMode } = props;
  return (
    <div className={styles.bigBox}>
      <AppShell setMode={setMode} />
      
    </div> 
  );
}
  
export default PageMix;
