import React from 'react';
import styles from './Education.module.css';

function Education({ education }) {
  if (!education) {
    return null;
  }  return (
    <section
      id="education"
      className={styles.educationSection}
    >
      <h2>Education</h2>
      <article className={styles.educationArticle}>
        <h3>{education.university}</h3>
        <div className={styles.degreeInfo}>
          <div className={styles.degreeDetails}>
            <p><strong>Degree:</strong> {education.degree}</p>
          </div>
          {education.cgpa && (
            <div className={styles.cgpaBox}>
              <div className={styles.cgpaLabel}>CGPA</div>
              <p className={styles.cgpaValue}>{education.cgpa}</p>
            </div>
          )}
        </div>
        {education.coursework && education.coursework.length > 0 && (
          <div className={styles.courseworkSection}>
            <p className={styles.courseworkTitle}>Relevant Coursework</p>
            <ul className={styles.courseworkGrid}>
              {education.coursework.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        )}
      </article>    </section>
  );
}

export default Education;
