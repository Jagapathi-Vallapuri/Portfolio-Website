import React from 'react';
import styles from './Contact.module.css';

function Contact({ contactInfo }) { // Accept contactInfo as a prop
  if (!contactInfo) {
    return null; // Or some fallback UI
  }
  
  return (
    <section
      id="contact"
      className={styles.contactSection}
    >
      <h2>Contact Information</h2>
      <div className={styles.contactInfo}>
        {contactInfo.address && (
          <div className={styles.contactItem}>
            <p><strong>Address</strong>{contactInfo.address}</p>
          </div>
        )}
        {contactInfo.phone && (
          <div className={styles.contactItem}>
            <p><strong>Phone</strong>{contactInfo.phone}</p>
          </div>
        )}
        {contactInfo.email && (
          <div className={styles.contactItem}>
            <p><strong>Email</strong><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
          </div>
        )}
        {contactInfo.linkedin && (
          <div className={styles.contactItem}>
            <p><strong>LinkedIn</strong><a href={`https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer">{contactInfo.linkedin}</a></p>
          </div>
        )}        {contactInfo.github && (
          <div className={styles.contactItem}>
            <p><strong>GitHub</strong><a href={`https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer">{contactInfo.github}</a></p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;
