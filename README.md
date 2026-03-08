# Andrew Brockenborough - Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/Computer%20Science-Graduate-blue?style=for-the-badge&logo=graduation-cap" alt="Computer Science Graduate">
  <img src="https://img.shields.io/badge/Full%20Stack-Developer-green?style=for-the-badge&logo=code" alt="Full Stack Developer">
  <img src="https://img.shields.io/badge/Systems-Programming-orange?style=for-the-badge&logo=terminal" alt="Systems Programming">
</div>

## 🚀 Live Demo

**[View Portfolio →](https://andrewb-03.github.io/cs-portfolio/)**

## 📋 About

Recent Computer Science graduate from San Francisco State University with hands-on experience in full-stack web development, systems programming, and algorithm design. Skilled in building scalable applications, optimizing performance, and solving complex technical challenges.

## ✨ Features

- **📱 Responsive Design**: Works cleanly on desktop and mobile
- **📄 Multi-page Layout**: Dedicated pages for projects, skills, education, about, resume, and contact
- **⚡ Fast Loading**: Lightweight static site
- **🎨 Modern UI**: Clean, professional design with smooth animations
- **🔗 Project Showcase**: Detailed project descriptions with live links
- **💬 Q&A**: Optional chat-style interface for exploring the portfolio

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and responsive design
- **JavaScript** - Interactive features and client-side routing
- **JetBrains Mono** - Professional developer font

### Backend (optional)
- **Python / FastAPI** - API for the Q&A feature

### Projects Featured
- **Limóney** - Full-stack financial application (Frontend development)
- **DriveBot Labs** - Algorithmic routing engine for self-driving cars
- **Custom Linux Device Driver** - C-based kernel module with encryption

## 🎯 Key Skills

<div align="center">

| Frontend | Backend | Systems | Tools |
|----------|---------|---------|-------|
| React | Node.js | Linux Kernel | Git |
| HTML/CSS | Express.js | Device Drivers | Docker |
| JavaScript | REST APIs | C Programming | AWS |
| Tailwind CSS | MongoDB | File Systems | Ubuntu |

</div>

## 📁 Project Structure

```
cs-portfolio/
├── index.html          # Homepage with Q&A interface
├── about.html          # About page
├── projects.html       # Project showcase
├── skills.html         # Skills overview
├── education.html      # Education details
├── resume.html         # Resume / download
├── contact.html        # Contact info
├── styles.css          # Shared styles
├── js/
│   ├── api-config.js   # API URL configuration
│   └── content-routes.js
├── script.js           # Main JavaScript
├── data/               # Content for Q&A (bio, projects, skills, etc.)
├── main.py             # FastAPI backend (optional)
├── requirements.txt
└── projects/           # Source code for featured projects
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/andrewb-03/cs-portfolio.git
   cd cs-portfolio
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Local server (recommended)
   python3 -m http.server 5500
   # Then visit: http://localhost:5500
   ```

The live site uses a deployed backend. For local development with the Q&A feature:

### Backend (optional)

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The frontend defaults to `http://localhost:8000` when served from localhost. For mobile testing on the same network, run `uvicorn main:app --reload --host 0.0.0.0` and open the site via your computer's local IP.

### Production

The site is configured to use the deployed API. To point to a different API, set the meta tag in `index.html`:

```html
<meta name="portfolio-api-url" content="https://your-api.example.com">
```

## 🌟 Highlights

- **🎓 Education**: Bachelor of Science in Computer Science, San Francisco State University
- **💼 Experience**: Full-stack development, systems programming, algorithm design
- **🔧 Specialties**: React, Node.js, Linux systems, C programming
- **📍 Location**: San Francisco Bay Area

## 📞 Contact

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrew-brockenborough-493405225/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/andrewb-03)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:andrewbrockenborough@gmail.com)

</div>

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built by Andrew Brockenborough</p>
  <p>© 2025 Andrew Brockenborough. All rights reserved.</p>
</div>
