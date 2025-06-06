import React from 'react';
import { motion } from 'framer-motion';
import styles from './Education.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function Education({ education }) {
  if (!education) {
    return null;
  }

  return (
    <motion.section
      id="education"
      className={styles.educationSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>Education</h2>
      <article className={styles.educationArticle}>
        <h3>{education.university}</h3>
        <p><strong>Degree:</strong> {education.degree}</p>
        {education.cgpa && <p><strong>CGPA:</strong> {education.cgpa}</p>}
        {education.coursework && education.coursework.length > 0 && (
          <>
            <p><em>Relevant Coursework:</em></p>
            <ul>
              {education.coursework.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </>
        )}
      </article>
    </section>
  );
}

export default Education;
