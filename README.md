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

- **🎯 Terminal Animation**: Interactive terminal-style hero section with typing effects
- **📱 Responsive Design**: Optimized for all devices and screen sizes
- **⚡ Fast Loading**: Lightweight and performance-optimized
- **🎨 Modern UI**: Clean, professional design with smooth animations
- **🔗 Project Showcase**: Detailed project descriptions with live links

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and responsive design
- **JavaScript** - Interactive features and terminal animation
- **JetBrains Mono** - Professional developer font

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
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
├── assets/             # Project images and resources
│   └── projects/       # Project screenshots
├── README.md           # Project documentation
└── projects/           # Source code for featured projects
    ├── limoney/        # Full-stack web application
    └── device-driver/  # Linux kernel module
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
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   ```

### AI Chat Backend (optional)

The AI chat requires the FastAPI backend. To run it:

```bash
# Install dependencies
pip install -r requirements.txt

# Start the backend (desktop)
uvicorn main:app --reload

# For mobile testing on the same network, bind to all interfaces:
uvicorn main:app --reload --host 0.0.0.0
```

Then open the site on your phone using your computer's local IP (e.g. `http://192.168.1.5:5500`). The frontend auto-detects private IPs and calls `http://192.168.1.5:8000` for the API.

### Production API URL

When deploying the static site (e.g. GitHub Pages) with a separate API, set the API URL via the meta tag in `index.html`:

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
