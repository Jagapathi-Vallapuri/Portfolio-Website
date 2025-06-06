import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Contact from './components/Contact';
import Education from './components/Education';
import ProjectsList from './components/Projects/ProjectsList';
import Skills from './components/Skills';
import Extracurricular from './components/Extracurricular';
import Footer from './components/Footer';
// import ScrollToTopButton from './components/ScrollToTopButton'; // If making it
import resumeData from './data/resume_data.json';
import './App.module.css'; // Keep CSS module import for any app-specific styles, even if minimal

function App() {
  return (
    <> {/* Using Fragment shorthand */}
      <Header name={resumeData.contact_information.name} subtitle="Software Developer Portfolio" />
      <Navigation />
      <main className="app-container"> {/* Use app-container as a global class from index.css */}
        <Contact contactInfo={resumeData.contact_information} />
        <Education education={resumeData.education} />
        <ProjectsList projects={resumeData.projects} />
        <Skills skills={resumeData.technical_skills} />
        <Extracurricular activities={resumeData.extracurricular} />
      </main>
      <Footer name={resumeData.contact_information.name} />
      {/* <ScrollToTopButton /> */}
    </>
  );
}
export default App;
