# High Level APIs and Main Algorithms

We will develop several high-level APIs that handle the core functionality of the financial management system:

* **Account & Transaction Management API**: Allows users to securely manage accounts, log income/expenses, categorize transactions, and attach receipts.
* **Budget & Subscription API**: Helps users create, update, and track budgets and recurring payments with due-date reminders.
* **Task & Reward System API**: Supports gamification by letting users complete tasks and earn reward points based on activity.
* **Notification API**: Delivers alerts, reminders, and system messages tied to user activity and financial goals.
* **Support & Admin API**: Enables users to submit support tickets and allows admins to manage and respond to them.
* **LemonAid AI Interaction API**: Logs interactions between users and the LemonAid assistant and allows users to rate each AI response.

***

#### **Main Algorithms and Processes**

* **AI Rating System**: After each interaction with the LemonAid assistant, users can rate the response on a scale of 1–5. These ratings will be used to analyze the quality of AI output over time. We may later implement a feedback loop to highlight poor responses for admin review or AI fine-tuning.
* **Spending Categorization**: Transactions will be auto-labeled into categories. We plan to use simple keyword matching initially, with the option to evolve into a smarter, pattern-based system.
* **Budget Alerts**: Users will be notified when spending approaches a budget limit. This will be based on periodic checks of current spending vs. set limits.
* **Reward Calculation**: Users earn points by completing financial tasks or goals. The system will calculate points based on task type, frequency, and completion streaks.

***

#### **Software Tools and Frameworks**

We are currently using:

* **Node.js + Express** (backend API framework)
* **MySQL** (relational database)
* **React or HTML/CSS/JavaScript** (frontend)
* **Docker** (for deployment)
* **AWS EC2 with Ubuntu 22.04** (cloud hosting)
* **Let’s Encrypt + Certbot** (SSL)

We may later integrate:

* **Firebase Authentication** (optional, for user auth and password resets)
* **OpenAI API** (for LemonAid assistant)
* **Tesseract OCR or Google Vision API** (if we add automatic receipt scanning)

Any new tools will be approved by the instructor before implementation.
