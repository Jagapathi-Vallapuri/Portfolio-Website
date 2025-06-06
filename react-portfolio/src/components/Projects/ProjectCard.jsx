import React from 'react';
import styles from './ProjectCard.module.css';

function ProjectCard({ project }) {
  if (!project) {
    return null;
  }
  return (
    <article className={styles.projectCard}>
      <div className={styles.projectHeader}>
        <h3>{project.title}</h3>
      </div>
      
      <div className={styles.projectMeta}>
        {project.technologies && (
          <div className={styles.metaItem}>
            <strong>Technologies:</strong>
            <div className={styles.techStack}>
              {project.technologies.split(',').map((tech, index) => (
                <span key={index} className={styles.techTag}>{tech.trim()}</span>
              ))}
            </div>
          </div>
        )}
        {project.duration && (
          <p className={styles.metaItem}>
            <strong>Duration:</strong> {project.duration}
          </p>
        )}
      </div>
      
      {project.description && project.description.length > 0 && (
        <div className={styles.description}>
          <ul>
            {project.description.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      
      {project.github && (
        <div className={styles.githubSection}>
          <a 
            href={project.github.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            {project.github.name || 'View on GitHub'}
          </a>
        </div>
      )}
    </article>
  );
}

export default ProjectCard;
