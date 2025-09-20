# List of Non-Functional Requirements

#### 1. Performance

1.1. The system shall respond to user actions within 2 seconds under normal load.\
1.2. Backend APIs shall respond to simple requests in under 200 milliseconds.\
1.3. The dashboard shall load within 3 seconds over a stable 10 Mbps connection.\
1.4. AI recommendations shall be delivered within 5 seconds of user input.\
1.5. The system shall support real-time syncing of transactions without freezing the UI.

***

#### 2. Security

2.1. All communications shall be encrypted using HTTPS and TLS protocols.\
2.2. All sensitive data, including user credentials, shall be encrypted at rest using AES-256.\
2.3. Passwords shall be hashed using bcrypt or equivalent secure hashing algorithms.\
2.4. Role-based access control shall be implemented to separate admin and user privileges.\
2.5. The system shall prevent common web vulnerabilities such as SQL injection, XSS, and CSRF.\
2.6. Only authenticated and authorized users shall be able to change, delete, or insert sensitive data.

***

#### 3. Scalability

3.1. The system shall support up to 500 concurrent users without performance degradation.\
3.2. The database shall support horizontal scaling across distributed servers via Docker and AWS.\
3.3. The system shall efficiently scale with a 10x increase in user data and transaction volume.\
3.4. Database schema shall support sharding for large financial datasets.

***

#### 4. Usability

4.1. The UI shall be intuitive and require no documentation for key tasks such as setting up budgets or tracking expenses.\
4.2. The system shall support both dark mode and light mode themes.\
4.3. The AI assistant shall use natural, conversational language to support non-technical users.\
4.4. Navigation, task completion, and interaction shall follow established UX best practices.

***

#### 5. Reliability

5.1. The system shall maintain at least 99.5% uptime over a 30-day period.\
5.2. Transaction data shall be backed up every 12 hours automatically.\
5.3. Background processes such as syncing and reminders shall automatically retry on failure.\
5.4. Error handling shall provide feedback to users without crashing the system.

***

#### 6. Maintainability

6.1. The codebase shall follow JavaScript linting rules using ESLint and Prettier.\
6.2. Docker containers shall be used to ensure parity between local and production environments.\
6.3. The codebase shall follow a modular architecture to isolate and decouple components.\
6.4. Critical modules shall maintain a minimum of 70% unit test coverage.\
6.5. Version control shall be managed through Git and GitHub with frequent commits and reviews.

***

#### 7. Portability

7.1. Docker containers shall allow the app to run across local development, staging, and AWS cloud environments.\
7.2. The app shall run identically across Windows, macOS, and Linux-based systems.

***

#### 8. Compatibility

8.1. The system shall integrate with major U.S. banks using secure open banking APIs.\
8.2. The AI engine (for ex: ChatGPT API or Gemini API) shall be modular and replaceable without impacting core functionality.\
8.3. The system shall support the following browsers:\
  • Google Chrome v80+\
  • Mozilla Firefox v75+\
  • Microsoft Edge v80+\
  • Safari v11.1.1+

***

#### 9. Privacy

9.1. The app shall allow users to manually enter financial data without linking any bank accounts.\
9.2. User data shall not be shared or sold to third-party services.\
9.3. All stored data shall remain local unless explicit user consent is given.\
9.4. Privacy mode shall restrict AI access to only local anonymized data.

***

#### 10. Compliance

10.1. The system shall comply with GDPR regulations for data privacy and user consent.\
10.2. Users shall be able to export or permanently delete their data on request.\
10.3. Consent prompts shall be clearly visible during signup and financial data linking.

***

#### 11. Supportability

11.1. System logs shall track user behavior, feature usage, and AI errors for debugging.\
11.2. An admin dashboard shall allow staff to review flagged transactions and feedback.\
11.3. The system shall support browser versions listed under Compatibility.\
11.4. Support documentation shall be maintained for installation, setup, and deployment.

***

#### 12. Efficiency

12.1. The system shall operate at no more than 60% CPU usage under normal load conditions.\
12.2. Memory usage shall not exceed 75% of allocated memory on the EC2 instance.\
12.3. Efficient logging shall be implemented to prevent log flooding and performance drag.

***

#### 13. Look and Feel

13.1. The system shall maintain a clean, minimal aesthetic with responsive design.\
13.2. UI elements shall follow a cohesive design language across all pages and devices.\
13.3. Accessibility standards (WCAG 2.1 AA) shall be considered for inclusive design.

***

#### 14. Coding Standards

14.1. All backend code shall conform to Node.js and Express.js best practices.\
14.2. Frontend code shall follow React component structure and state management conventions.\
14.3. Continuous Integration tools shall run linting and testing on every merge request.

***

#### **15. Environmental Sustainability**

15.1. The system shall optimize backend server usage to reduce idle time and energy waste.\
15.2. Docker containers shall be configured to auto-scale down during periods of low usage.\
15.3. The app shall minimize data transfer size (e.g., compress JSON responses, lazy-load images) to reduce bandwidth and energy consumption.\
15.4. The frontend shall use efficient rendering practices in React (e.g., avoiding unnecessary re-renders, using memoization).\
15.5. System architecture shall consider the use of renewable-energy-based data centers (e.g., AWS sustainability zones).\
15.6. Logs and backups shall be archived using energy-efficient cold storage where applicable.\
15.7. Documentation shall be provided digitally only (no paper printing by default).\
15.8. The system shall avoid unnecessary background polling or constant sync unless essential for real-time use.\
