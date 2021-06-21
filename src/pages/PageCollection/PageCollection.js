import styles from "./PageCollection.module.css";
import AppShell from "../../components/AppShell";

function PageCollection(props) {
  const { setMode } = props;
  return (
    <div className={styles.bigBox}>
      <AppShell setMode={setMode} />
      
      <div className={styles.display} id={styles.color1}></div>
      
    </div>
  );
}

export default PageCollection;
