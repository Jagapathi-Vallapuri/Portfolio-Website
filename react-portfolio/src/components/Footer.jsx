import React from 'react';
import styles from './Footer.module.css';

function Footer({ name }) {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
