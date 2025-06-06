import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import styles from './ProjectsList.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } // Stagger children, slight delay for parent
};

function ProjectsList({ projects }) {
  if (!projects || projects.length === 0) {
    return <section id="projects" className={styles.projectsSection}><p>No projects to display.</p></section>;
  }

  return (
    <motion.section
      id="projects"
      className={styles.projectsSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Lower amount for list container
    >
      <h2>Projects</h2>
      <motion.div
        className={styles.projectsGrid}
        variants={gridVariants}
        // No initial/whileInView here for the grid itself if section handles viewport detection
        // Or, if sectionVariants is not used, then apply initial/whileInView here.
        // For simplicity, let's assume section's whileInView triggers this an
        // then the grid's 'visible' state for staggering.
        // To make it work with whileInView on the section, we need to ensure 'visible' state propagates.
        // A common pattern: parent (section) uses whileInView, child (grid) inherits and uses animate="visible".
        // However, framer-motion typically handles this if variants are passed down.
        // Let's try making the grid animate when the section is visible.
        // The section's "visible" state will make the grid's "visible" state active.
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title || index} project={project} />
        ))}
      </motion.div>
    </motion.section>
  );
}

export default ProjectsList;
