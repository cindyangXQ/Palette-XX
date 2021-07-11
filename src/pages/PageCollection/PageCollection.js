import { useState } from "react";
import { Button } from "@material-ui/core";
import styles from "./PageCollection.module.css";

function PageCollection(props) {
  const { collection, setCollection, 
          mixColl, setMixColl, 
          gsColl, setGsColl } = props;
  const [ split, setSplit ] = useState(false);

  return (
    <div>
      <div className={styles.bg}></div>
      <div className={styles.container}>
        <Button 
          className={styles.button} 
          onClick={() => setSplit(!split)}
        >
          switch
        </Button>
        { split ? (
          <div>
            <p>Guess Achievements</p>
            <div className={styles.box}>
              {gsColl.map(collect => (
                <div className={styles.display} style={collect.cssString}></div>
              ))}
            </div>
            <p>Mix Achievements</p>
            <div className={styles.box}>
              {mixColl.map(collect => (
                <div className={styles.display} style={collect.cssString}></div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.box}>
              {collection.map(collect => (
                <div className={styles.display} style={collect.cssString}></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PageCollection;
