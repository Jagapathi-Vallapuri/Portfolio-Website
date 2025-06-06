import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

const cardItemVariants = {
  hidden: { opacity: 0, y: 30 }, // Start slightly lower and faded
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  return (
    <motion.article
      className={styles.projectCard}
      variants={cardItemVariants}
      // initial & animate/whileInView are controlled by the parent (ProjectsList) for staggering
      whileHover={{ scale: 1.03, boxShadow: "var(--shadow-lg)" }} // Using CSS variable for shadow
      transition={{ type: "spring", stiffness: 400, damping: 17 }} // Spring transition for hover
    >
      <h3>{project.title}</h3>
      {project.technologies && <p><strong>Technologies:</strong> {project.technologies}</p>}
      {project.duration && <p><strong>Duration:</strong> {project.duration}</p>}
      
      {project.description && project.description.length > 0 && (
        <div className={styles.description}>
          <ul>
            {project.description.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      
      {project.github && <p><strong>GitHub:</strong> {project.github}</p>}
    </motion.article>
  );
}

export default ProjectCard;
