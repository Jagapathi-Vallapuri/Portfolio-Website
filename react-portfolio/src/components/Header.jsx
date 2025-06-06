import React from 'react';
import styles from './Header.module.css';

function Header({ name, subtitle }) {
  return (
    <header className={styles.header}>
      <div className={styles.decorativeElements}></div>
      <div className={styles.headerContent}>
        <h1>{name}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}

export default Header;
