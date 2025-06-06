import React from 'react';
import { motion } from 'framer-motion';
import styles from './Extracurricular.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Optional: Variants for individual activity articles if staggering is desired later
const articleVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

function Extracurricular({ activities }) {
  if (!activities || activities.length === 0) {
    return <section id="extracurricular" className={styles.extracurricularSection}><p>No extracurricular activities to display.</p></section>;
  }

  const cleanDescription = (desc) => {
    if (!desc) return "";
    return desc
      .split('– ')
      .map(part => part.trim())
      .filter(part => part)
      .join('. ') + (desc.endsWith('.') || desc.endsWith('– ') ? '' : '.');
  };


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
        // Applying motion to each article for potential individual animation or staggering
        <motion.article
          key={index}
          className={styles.activityArticle}
          variants={articleVariants} // Use articleVariants if section has staggerChildren, or for individual whileInView
          // If not staggering from parent, use initial/whileInView here per article:
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true, amount: 0.2 }}
          // For now, let's assume the section's whileInView is enough, and these are static unless staggered.
          // To make them animate with the section, they don't need their own whileInView if section animates as a whole.
          // If we want them to fade in slightly after the section title, we'd need to coordinate.
          // For simplicity, let section variant apply to the whole block for now.
          // If we want individual article animations, we'd add whileInView to each motion.article.
        >
          <h3>{activity.organization}</h3>
          {/* If JSON is corrected later, this could be:
            <h3>{activity.role}</h3>
            <p><strong>Organization:</strong> {activity.organization}</p>
          */}
          {activity.duration && <p><strong>Duration:</strong> {activity.duration}</p>}
          {activity.description && <p className={styles.description}>{cleanDescription(activity.description)}</p>}
        </article>
      ))}
    </section>
  );
}

export default Extracurricular;
