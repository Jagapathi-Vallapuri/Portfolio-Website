import React from 'react';
import ProjectCard from './ProjectCard';
import styles from './ProjectsList.module.css';

function ProjectsList({ projects }) {
  if (!projects || projects.length === 0) {
    return <section id="projects" className={styles.projectsSection}><p>No projects to display.</p></section>;
  }

  return (
    <section
      id="projects"
      className={styles.projectsSection}
    >
      <h2>Projects</h2>
      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.title || index} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsList;
