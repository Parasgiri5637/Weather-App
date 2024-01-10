import styles from "../SCSS/Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>
        Copyright 2023 codewith Parasgiri.All Rights Reserved
      </p>
      <div className={styles.footerImg}>
        <p className={styles.footerImgText}>Powered By</p>
        <img
          src="public/openweather.png"
          alt="openweather"
          className={styles.footerLogo}
        />
      </div>
    </div>
  );
}
