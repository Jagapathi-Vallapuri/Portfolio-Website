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

  // Clean up description: remove leading '– ' and join parts if needed.
  const cleanedDescription = project.description
    .split('– ')
    .map(part => part.trim())
    .filter(part => part) // Remove empty strings that might result from splitting
    .join('. ') + (project.description.endsWith('.') || project.description.endsWith('– ') ? '' : '.');


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
      {cleanedDescription && <p className={styles.description}>{cleanedDescription}</p>}
      {project.github && <p><strong>GitHub:</strong> {project.github}</p>}
      {/* If project.github were a full URL, it would be:
        <p className={styles.githubLink}>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      */}
    </motion.article>
  );
}

export default ProjectCard;
