import React from 'react';
import styles from './Header.module.css';

function Header({ name, subtitle }) {
  return (
    <header className={styles.header}>
      <h1>{name}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

export default Header;
