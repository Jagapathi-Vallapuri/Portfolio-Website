# Portfolio Website (Vite + React Version)

This repository contains a personal portfolio website for Vallapuri Jagapathi, built using Vite and React. The actual project code is located in the `/react-portfolio` subdirectory.

## Features
- Modern single-page application structure.
- Sections for Contact Information, Education, Projects, Technical Skills, and Extracurricular Activities.
- Responsive design for various screen sizes.
- Interactive elements and animations using Framer Motion.
- Styled with CSS Modules for component-scoped styling.

## Original Data Source
The content for this website is primarily sourced from `react-portfolio/src/data/resume_data.json`, which was initially derived from a PDF resume.

## Prerequisites
- Node.js (v18.x or later recommended)
- npm (or yarn)

## Getting Started

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd react-portfolio
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```
    (Or `yarn install` if you prefer yarn)

## Running the Development Server

Once dependencies are installed, you can start the Vite development server:

```bash
npm run dev
```
(Or `yarn dev`)

This will typically start the application on `http://localhost:5173` (the port may vary). Open this URL in your web browser to see the application.

## Building for Production

To create a production build of the application:

```bash
npm run build
```
(Or `yarn build`)

The production-ready static files will be placed in the `react-portfolio/dist` directory. These files can then be deployed to any static web hosting service.

## Key Technologies Used
- **Vite:** Fast build tool and development server.
- **React:** JavaScript library for building user interfaces.
- **Framer Motion:** Library for animations.
- **CSS Modules:** For styling components.
- **JavaScript (ES6+):** Core language.
- **HTML5 & CSS3:** Markup and styling fundamentals.
