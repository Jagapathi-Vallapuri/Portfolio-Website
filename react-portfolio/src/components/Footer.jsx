import React from 'react';
import styles from './Footer.module.css';

function Footer({ name }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerDivider}></div>
        <p>&copy; <span className={styles.footerYear}>{new Date().getFullYear()}</span> {name}. All rights reserved.</p>
        <div className={styles.decorativePattern}></div>
      </div>
    </footer>
  );
}

export default Footer;
