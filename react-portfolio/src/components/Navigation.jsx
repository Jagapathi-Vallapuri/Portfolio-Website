import React from 'react';
import styles from './Navigation.module.css';

function Navigation() {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navigation}>
      <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
      <a href="#education" onClick={(e) => handleNavClick(e, 'education')}>Education</a>
      <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
      <a href="#technical-skills" onClick={(e) => handleNavClick(e, 'technical-skills')}>Skills</a>
      <a href="#extracurricular" onClick={(e) => handleNavClick(e, 'extracurricular')}>Extracurricular</a>
    </nav>
  );
}

export default Navigation;
