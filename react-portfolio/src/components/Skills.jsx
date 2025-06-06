import React from 'react';
import styles from './Skills.module.css';

function Skills({ skills }) {
  if (!skills) {
    return null;
  }
  const renderSkillTags = (skillString) => {
    if (!skillString) return null;
    return skillString.split(',').map(skill => skill.trim()).map((skill, index) => (
      <span
        key={index}
        className={styles.skillTag}
      >
        {skill}
      </span>
    ));
  };  return (
    <section
      id="technical-skills"
      className={styles.skillsSection}
    >
      <h2>Technical Skills</h2>

      <div className={styles.skillsGrid}>
        {skills.languages && (
          <div className={styles.skillCategory}>
            <span className={styles.categoryIcon}></span>
            <strong className={styles.categoryTitle}>Languages</strong>
            <div className={styles.skillsContainer}>
              {renderSkillTags(skills.languages)}
            </div>
          </div>
        )}

        {skills.technologies_frameworks && (
          <div className={styles.skillCategory}>
            <span className={styles.categoryIcon}></span>
            <strong className={styles.categoryTitle}>Technologies /
                Frameworks
            </strong>
            <div className={styles.skillsContainer}>
              {renderSkillTags(skills.technologies_frameworks)}
            </div>
          </div>
        )}

        {skills.tools && (
          <div className={styles.skillCategory}>
            <span className={styles.categoryIcon}></span>
            <strong className={styles.categoryTitle}>Tools</strong>
            <div className={styles.skillsContainer}>
              {renderSkillTags(skills.tools)}
            </div>
          </div>
        )}      </div>
    </section>
  );
}

export default Skills;
