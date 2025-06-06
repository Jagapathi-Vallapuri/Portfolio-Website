import React from 'react';
import { motion } from 'framer-motion';
import styles from './Extracurricular.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const articleVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

function Extracurricular({ activities }) {
  if (!activities || activities.length === 0) {
    return <section id="extracurricular" className={styles.extracurricularSection}><p>No extracurricular activities to display.</p></section>;
  }

  return (
    <motion.section
      id="extracurricular"
      className={styles.extracurricularSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2>Extracurricular Activities</h2>
      {activities.map((activity, index) => (
        <motion.article
          key={index}
          className={styles.activityArticle}
          variants={articleVariants}
        >
          <h3>{activity.organization}</h3>
          {activity.duration && <p><strong>Duration:</strong> {activity.duration}</p>}
          
          {activity.description && activity.description.length > 0 && (
            <div className={styles.description}>
              <ul>
                {activity.description.map((point, pointIndex) => (
                  <li key={pointIndex}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.article>
      ))}
    </motion.section>
  );
}

export default Extracurricular;
