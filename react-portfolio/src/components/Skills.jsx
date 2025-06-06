import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function Skills({ skills }) {
  if (!skills) {
    return null;
  }

  const renderSkillTags = (skillString) => {
    if (!skillString) return null;
    return skillString.split(',').map(skill => skill.trim()).map((skill, index) => (
      <motion.span
        key={index}
        className={styles.skillTag}
        whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary-dark)" }} // Example hover for skill tags
        transition={{ type: "spring", stiffness: 300 }}
      >
        {skill}
      </motion.span>
    ));
  };

  return (
    <motion.section
      id="technical-skills"
      className={styles.skillsSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>Technical Skills</h2>

      {skills.languages && (
        <div className={styles.skillCategory}>
          <strong>Languages</strong>
          <div className={styles.skillsContainer}>
            {renderSkillTags(skills.languages)}
          </div>
        </div>
      )}

      {skills.technologies_frameworks && (
        <div className={styles.skillCategory}>
          <strong>Technologies/Frameworks</strong>
          <div className={styles.skillsContainer}>
            {renderSkillTags(skills.technologies_frameworks)}
          </div>
        </div>
      )}

      {skills.tools && (
        <div className={styles.skillCategory}>
          <strong>Tools</strong>
          <div className={styles.skillsContainer}>
            {renderSkillTags(skills.tools)}
          </div>
        </div>
      )}
    </motion.section>
  );
}

export default Skills;
