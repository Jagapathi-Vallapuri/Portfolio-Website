import React from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function Contact({ contactInfo }) { // Accept contactInfo as a prop
  if (!contactInfo) {
    return null; // Or some fallback UI
  }

  return (
    <motion.section
      id="contact"
      className={styles.contactSection}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>Contact Information</h2>
      {contactInfo.address && <p><strong>Address:</strong> {contactInfo.address}</p>}
      {contactInfo.phone && <p><strong>Phone:</strong> {contactInfo.phone}</p>}
      {contactInfo.email && (
        <p>
          <strong>Email:</strong> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </p>
      )}
      {contactInfo.linkedin && (
        <p>
          <strong>LinkedIn:</strong>{' '}
          <a href={`https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
            {contactInfo.linkedin}
          </a>
        </p>
      )}
      {contactInfo.github && (
        <p>
          <strong>GitHub:</strong>{' '}
          <a href={`https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer">
            {contactInfo.github}
          </a>
        </p>
      )}
    </section>
  );
}

export default Contact;
