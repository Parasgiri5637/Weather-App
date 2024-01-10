import styles from "../SCSS/Highlights.module.scss";

import HighlightInfo from "./HighlightInfo";
import HighlightSunTime from "./HighlightSunTime";
import HighlightAirIndex from "./HighlightAirIndex";

export default function Highlights() {
  return (
    <div className={styles.highlights}>
      <p className={styles.highlightsTitle}>Todays's Highlights</p>
      <div className={styles.highLightsBox1}>
        <HighlightAirIndex />
        <HighlightSunTime />
      </div>
      <div className={styles.highLightsBox2}>
        <HighlightInfo />
      </div>
    </div>
  );
}
