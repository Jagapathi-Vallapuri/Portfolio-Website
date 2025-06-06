# Portfolio Website for Vallapuri Jagapathi

This repository contains a personal portfolio website for Vallapuri Jagapathi, generated from the data in `resume_one_page.pdf`.

## Features
- Sections for Contact Information, Education, Projects, Technical Skills, and Extracurricular Activities.
- Responsive design for various screen sizes (desktop, tablet, mobile).
- Interactive elements:
    - Sticky navigation bar.
    - "Scroll to Top" button.
    - Fade-in animations on scroll.
- Styled with CSS, including CSS variables and modern layout techniques (CSS Grid).

## Original Data Source
The content for this website was initially extracted and parsed from `resume_one_page.pdf` located in this repository. Intermediate files include:
- `extracted_text.txt`: Raw text extracted from the PDF.
- `resume_data.json`: Structured JSON data parsed from the raw text.
- `extract_pdf_text.py`: Python script used for PDF text extraction.
- `parse_resume.py`: Python script used for parsing extracted text to JSON.

## Viewing Locally
To view the website locally:
1. Clone this repository (if you haven't already).
2. Navigate to the repository's directory.
3. Open the `index.html` file in your web browser.

## Deployment
This is a static HTML, CSS, and JavaScript website. It can be deployed to any static web hosting service, such as:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Google Cloud Storage

Simply upload the `index.html`, `style.css`, and `script.js` files (and any other assets like images if they were added) to your chosen hosting provider.

## Technologies Used
- HTML5
- CSS3 (with CSS Grid, Flexbox, CSS Variables, Media Queries)
- JavaScript (for interactivity like IntersectionObserver, scroll events)
- `pdfminer.six` (Python library for PDF text extraction during the initial data gathering phase)
