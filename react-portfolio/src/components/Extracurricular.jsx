import React from 'react';
import styles from './Extracurricular.module.css';

function Extracurricular({ activities }) {
  if (!activities || activities.length === 0) {
    return <section id="extracurricular" className={styles.extracurricularSection}><p>No extracurricular activities to display.</p></section>;
  }
  return (
    <section
      id="extracurricular"
      className={styles.extracurricularSection}
    >
      <h2>Extracurricular Activities</h2>
      {activities.map((activity, index) => (
        <article
          key={index}
          className={styles.activityArticle}
        >
          <div className={styles.activityHeader}>
            <span className={styles.activityIcon}></span>
            <div className={styles.activityInfo}>
              <h3>{activity.organization}</h3>
              {activity.duration && <p className={styles.duration}><strong>Duration:</strong> {activity.duration}</p>}
            </div>
          </div>
          
          {activity.description && activity.description.length > 0 && (
            <div className={styles.description}>
              <ul>
                {activity.description.map((point, pointIndex) => (
                  <li key={pointIndex}>{point}</li>
                ))}
              </ul>
            </div>
          )}        </article>
      ))}
    </section>
  );
}

export default Extracurricular;
