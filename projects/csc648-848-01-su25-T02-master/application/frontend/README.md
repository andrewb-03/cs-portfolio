# Limoney Frontend - Student Budgeting Platform

This is the frontend application for **Limoney**, a free budgeting platform designed specifically for students. Built with React and modern web technologies.

## Project Overview

Limoney Frontend provides an intuitive, responsive user interface for students to manage their budgets, track expenses, and gain insights into their spending patterns. The application features a clean, modern design with easy navigation between different sections.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with React
- **Navigation**: Easy switching between Home and About pages
- **Team Showcase**: Dedicated about page featuring team members
- **Student-Focused**: Designed specifically for student budgeting needs

## Technology Stack

- **React 19.1.0**: Modern JavaScript library for building user interfaces
- **React Router DOM 7.6.2**: Client-side routing for navigation
- **CSS3**: Custom styling with responsive design
- **Create React App**: Development environment and build tools
- **Docker**: Containerization support (Dockerfile.txt included)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the frontend directory**
   ```bash
   cd application/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

The page will reload when you make changes, and you'll see any lint errors in the console.

## Available Scripts

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Project Structure

```
frontend/
├── public/                  # Static assets
│   ├── images/             # Project images and logos
│   ├── about.html          # About page content
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
├── src/                    # Source code
│   ├── App.js              # Main application component
│   ├── App.css             # Main application styles
│   ├── about.js            # About page component
│   ├── about.css           # About page styles
│   ├── index.js            # Application entry point
│   ├── index.css           # Global styles
│   ├── logo.svg            # React logo
│   ├── reportWebVitals.js  # Performance monitoring
│   └── setupTests.js       # Test configuration
├── package.json            # Dependencies and scripts
├── package-lock.json       # Dependency lock file
├── Dockerfile.txt          # Docker configuration
└── README.md               # This file
```

## Key Components

### App.js
The main application component that handles:
- Navigation between Home and About pages
- State management for page switching
- Header and navigation bar rendering

### About.js
The about page component that:
- Fetches and displays team information
- Renders team member profiles
- Loads content from external HTML file

## Development Guidelines

### Code Style
- Follow React best practices
- Use functional components with hooks
- Maintain consistent CSS naming conventions
- Keep components modular and reusable

### Adding New Features
1. Create new components in the `src/` directory
2. Update navigation in `App.js` if needed
3. Add corresponding CSS files for styling
4. Test thoroughly before committing

### Styling
- Use CSS modules or component-specific CSS files
- Maintain responsive design principles
- Follow the existing design patterns
- Test on multiple screen sizes

## Deployment

The frontend is designed to be deployed alongside the backend on AWS EC2. The application includes a Dockerfile for containerized deployment.

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build the Docker image
docker build -t limoney-frontend .

# Run the container
docker run -p 3000:3000 limoney-frontend
```

## Team Information

This frontend was developed by the CSC 648-848-01-SU25-T02 team:

- **Dani** - Git Master & Frontend Lead
- **Emily Perez** - Team member
- **Ishaank Zalpuri** - Team member  
- **Gene Orias** - Team member
- **Jonathan Gonzalez** - Team member
- **Andrew Brockenborough** - Team member

## Learn More

- [React documentation](https://reactjs.org/)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Router documentation](https://reactrouter.com/)

---

**Note**: This is part of the Limoney student budgeting platform developed for CSC 648-848 Software Engineering course at San Francisco State University.
