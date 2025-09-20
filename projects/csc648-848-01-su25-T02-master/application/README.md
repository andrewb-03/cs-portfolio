# Limoney - Student Budgeting Platform

**CSC 648-848-01-SU25-T02 Team Project**

Welcome to **Limoney**, a comprehensive budgeting platform designed specifically for students. This project is developed as part of the CSC 648-848 Software Engineering course at San Francisco State University.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Team Members](#team-members)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Security](#security)
- [API Documentation](#api-documentation)

## Overview

Limoney is a full-stack web application that helps students manage their finances effectively. The platform provides an intuitive interface for tracking expenses, setting budgets, managing accounts, and gaining insights into spending patterns through AI-powered features.

## Features

### Core Features
- **User Authentication**: Secure signup and signin system with password reset functionality
- **Dashboard**: Overview of financial status and recent activities
- **Account Management**: Track multiple accounts and balances with Plaid integration
- **Budget Planning**: Set and monitor budget goals with AI-powered insights
- **Transaction Tracking**: Record and categorize expenses with detailed analytics
- **Reimbursement Requests**: Submit and track reimbursement claims with status updates
- **Currency Conversion**: Real-time currency conversion tools
- **Balance Forecasting**: AI-powered financial predictions and trend analysis
- **LemonAid**: AI assistant for financial advice and guidance
- **Notifications**: Comprehensive reminder system for important financial events

### User Experience
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with React and Tailwind CSS
- **Settings Management**: Comprehensive user preferences and account settings
- **Personal Information**: Secure profile management and data handling

## Technology Stack

### Frontend
- **React 19.1.0**: Modern JavaScript library for building user interfaces
- **React Router DOM 7.6.2**: Client-side routing and navigation
- **Tailwind CSS 3.4.17**: Utility-first CSS framework for styling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful and consistent icon library
- **Recharts**: Data visualization library for charts and graphs
- **Create React App**: Development environment and build tools
- **Axios**: HTTP client for API communication

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js 5.1.0**: Web application framework
- **MySQL**: Relational database management system
- **bcrypt**: Password hashing and security
- **Express Session**: Session management
- **CORS**: Cross-origin resource sharing
- **Google Generative AI**: AI-powered features
- **Plaid API**: Banking integration for account linking
- **Helmet**: Security middleware
- **Mongoose**: MongoDB ODM (for future scalability)

### Infrastructure & Deployment
- **Docker**: Containerization for consistent deployment
- **Docker Compose**: Multi-container application orchestration
- **AWS EC2**: Cloud hosting (t2.micro instance)
- **Ubuntu 22.04 LTS**: Server operating system
- **SSH**: Secure server access
- **SSL/HTTPS**: Secure communication protocols

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git
- Docker and Docker Compose (for containerized deployment)
- MySQL database (for local development)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/sfsu-joseo/csc648-848-01-su25-T02.git
   cd csc648-848-01-su25-T02/application
   ```

2. **Start the application with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

### Manual Setup

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
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

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with your database and API configurations:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database
   SESSION_SECRET=your_session_secret
   GOOGLE_API_KEY=your_google_ai_key
   PLAID_CLIENT_ID=your_plaid_client_id
   PLAID_SECRET=your_plaid_secret
   ```

4. **Set up the database**
   ```bash
   node setup-database.js
   ```

5. **Start the server**
   ```bash
   npm start
   ```

### Available Scripts

#### Frontend
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

#### Backend
- `npm start` - Starts the Express server
- `npm test` - Runs test suite

## Usage

### Public Pages
1. **Home Page**: Landing page with application overview
2. **About Page**: Learn about the team and project mission
3. **Signup**: Create a new account
4. **Signin**: Access your existing account
5. **Forgot Password**: Reset password functionality

### User Dashboard (After Login)
1. **Dashboard**: Overview of financial status and recent activities
2. **Accounts**: Manage multiple accounts and view balances
3. **Budget**: Set and track budget goals
4. **Transactions**: Record and categorize expenses
5. **Reimbursement Requests**: Submit and track reimbursement claims
6. **Currency Convert**: Real-time currency conversion
7. **Balance Forecast**: AI-powered financial predictions
8. **LemonAid**: AI assistant for financial advice
9. **Settings**: Manage account preferences and personal information

## Project Structure

```
application/
├── frontend/                 # React application
│   ├── public/              # Static assets
│   │   ├── images/          # Project images and icons
│   │   ├── navbar-icons/    # Navigation icons
│   │   ├── settings-icons/  # Settings page icons
│   │   └── index.html       # Main HTML template
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   │   ├── AuthGate.js  # Authentication wrapper
│   │   │   ├── PlaidLinkButton.js  # Plaid integration
│   │   │   ├── ReminderWatcher.js  # Notification system
│   │   │   └── SearchUser.js       # User search functionality
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   │   ├── About/       # About page
│   │   │   ├── Home/        # Home page
│   │   │   ├── Signin/      # Authentication pages
│   │   │   ├── Signup/      # Registration pages
│   │   │   ├── ForgotPassword/  # Password reset
│   │   │   ├── ResetPassword/   # Password reset confirmation
│   │   │   └── UserLoginPages/  # Protected user pages
│   │   │       ├── Accounts/     # Account management
│   │   │       ├── Budget/       # Budget planning
│   │   │       ├── Dashboard/    # Main dashboard
│   │   │       ├── LemonAid/     # AI assistant
│   │   │       ├── BalanceForecast/  # Financial predictions
│   │   │       └── Settings/     # User settings
│   │   ├── lib/             # Utility functions
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Application entry point
│   ├── package.json         # Frontend dependencies
│   └── Dockerfile           # Docker configuration
├── backend/                 # Node.js/Express server
│   ├── models/              # Database models
│   │   └── User.js          # User model
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── accounts.js      # Account management
│   │   ├── accountBalance.js # Balance tracking
│   │   ├── budget.js        # Budget management
│   │   ├── budget-chat.js   # Budget AI interactions
│   │   ├── deleteAccount.js # Account deletion
│   │   ├── lemonaid.js      # AI assistant routes
│   │   ├── notifications.js # Notification system
│   │   ├── personalinfo_edit.js # Profile management
│   │   ├── plaid.js         # Plaid integration
│   │   ├── reimbursement.js # Reimbursement system
│   │   ├── reviews.js       # Review system
│   │   ├── signup.js        # User registration
│   │   ├── subscriptions.js # Subscription management
│   │   ├── transactions.js  # Transaction management
│   │   └── userAccounts.js  # User account management
│   ├── utils/               # Utility functions
│   │   └── plaidClient.js   # Plaid client configuration
│   ├── server.js            # Express server setup
│   ├── setup-database.js    # Database initialization
│   ├── setup-database.sql   # Database schema
│   ├── add-money.js         # Money management utilities
│   ├── add-money-test.js    # Money management tests
│   ├── check-balances.js    # Balance checking utilities
│   ├── package.json         # Backend dependencies
│   └── Dockerfile           # Docker configuration
├── credentials/             # Security and access documentation
│   └── README.md           # Detailed access guide
├── docker-compose.yml       # Multi-container orchestration
└── README.md               # This file
```

## Team Members

Our diverse team of student developers:

- **Emily Perez** - Team member who loves dogs
- **Ishaank Zalpuri** - Entertainment connoisseur (movies, games, etc.)
- **Dani** - Git Master & Frontend Lead - Logo and webapp designer, zombie movie and taco enthusiast
- **Gene Orias** - Team member who likes oranges :D
- **Jonathan Gonzalez** - Music creator
- **Andrew Brockenborough** - Computer enthusiast

## Contributing

This is a collaborative student project. For detailed contribution guidelines and development setup, please refer to the team's internal documentation.

### Development Workflow
1. Create a feature branch from `development`
2. Make your changes
3. Test thoroughly
4. Submit a pull request
5. Code review and merge

### Code Style
- Follow React best practices
- Use consistent naming conventions
- Include proper error handling
- Write meaningful commit messages

## Deployment

The application is deployed on AWS EC2 with the following specifications:
- **Instance Type**: t2.micro
- **Operating System**: Ubuntu 22.04 LTS
- **Public DNS**: ec2-3-145-95-194.us-east-2.compute.amazonaws.com
- **SSL/HTTPS**: Secure communication enabled

### Docker Deployment
The application can be deployed using Docker Compose:
```bash
docker-compose up --build -d
```

For detailed deployment and server access instructions, see the [credentials README](credentials/README.md).

## Security

This project follows security best practices:
- **Authentication**: Secure user authentication with bcrypt password hashing
- **Session Management**: Express sessions for user state management
- **CORS Protection**: Cross-origin resource sharing configuration
- **Helmet Security**: Security headers and middleware
- **SSH Access**: Key-based authentication for server access
- **Environment Variables**: Secure handling of sensitive data
- **Database Security**: Secure database connections and queries
- **SSL/HTTPS**: Encrypted communication protocols

For detailed security guidelines and access procedures, refer to the [credentials documentation](credentials/README.md).

## API Documentation

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/logout` - User logout
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset confirmation

### Account Management
- `GET /accounts` - Get user accounts
- `POST /accounts` - Create new account
- `PUT /accounts/:id` - Update account
- `DELETE /accounts/:id` - Delete account
- `GET /account-balance` - Get account balances

### Transaction Management
- `GET /transactions` - Get user transactions
- `POST /transactions` - Create new transaction
- `PUT /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

### Budget Management
- `GET /budget` - Get budget information
- `POST /budget` - Create budget
- `PUT /budget/:id` - Update budget
- `DELETE /budget/:id` - Delete budget
- `POST /budget-chat` - AI budget assistance

### Reimbursement System
- `GET /reimbursements` - Get reimbursement requests
- `POST /reimbursements` - Submit reimbursement request
- `PUT /reimbursements/:id` - Update reimbursement status
- `DELETE /reimbursements/:id` - Delete reimbursement

### AI Features
- `POST /lemonaid/chat` - AI assistant interactions
- `GET /balance-forecast` - Financial predictions

### User Management
- `GET /users/search` - Search users
- `PUT /personal-info` - Update personal information
- `DELETE /delete-account` - Delete user account

### Notifications
- `GET /notifications` - Get user notifications
- `POST /notifications` - Create notification
- `PUT /notifications/:id` - Update notification

### Plaid Integration
- `POST /plaid/link-token` - Create Plaid link token
- `POST /plaid/exchange-token` - Exchange public token
- `GET /plaid/accounts` - Get Plaid accounts
- `GET /plaid/transactions` - Get Plaid transactions

### Reviews System
- `GET /reviews` - Get reviews
- `POST /reviews` - Create review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

### Subscriptions
- `GET /subscriptions` - Get subscriptions
- `POST /subscriptions` - Create subscription
- `PUT /subscriptions/:id` - Update subscription
- `DELETE /subscriptions/:id` - Cancel subscription

---

**Note**: This project is developed as part of the CSC 648-848 Software Engineering course at San Francisco State University. The application is designed to provide real-world software development experience while creating a useful tool for student budgeting.





