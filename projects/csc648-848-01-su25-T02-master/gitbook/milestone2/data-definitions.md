# Data Definitions

#### **Core User & Identity Entities**

1. **User**\
   Represents any person registered in the system. Each user has an account profile and can be either a standard user or an administrator. Used for login, personalization, and access control. Email is the primary identifier, and all actions in the system are associated with a user.
2. **Administrator**\
   A specialized type of user with elevated privileges. Administrators can manage support tickets, review reimbursement requests, oversee user activity, and perform system-wide maintenance. They inherit the base user identity but have additional controls.

#### **Financial Management Entities**

3. **Account**\
   Represents a user’s financial container (checking, savings, or credit). All financial activities, such as transactions, subscriptions, and budgets, are linked to specific accounts. Accounts maintain running balances and support multi-bank integration.
4. **Transaction**\
   Represents a monetary event tied to an account (like income, expense, or fund transfer). Transactions are categorized for budgeting and reporting purposes and are timestamped to track financial behavior over time.
5. **Receipt**\
   Stores digital copies of receipts (image files) linked to individual transactions. Used for personal finance tracking, tax documentation, and reimbursement validation.
6. **ReimbursementRequest**\
   Represents a formal request to be reimbursed for a transaction, often reviewed by an administrator. Tracks status and supports workflows such as pending, approved, or rejected.
7. **Budget**\
   Defines spending limits for an account over a specified period (weekly, monthly, etc.). Used to monitor and enforce financial discipline and to trigger alerts when limits are approached or exceeded.
8. **Subscription**\
   Represents recurring payments (like Netflix, utilities) tied to an account. Helps users track recurring expenses, manage due dates, and receive reminders before payments occur.

#### **Task & Reward System**

9. **Task**\
   Represents actionable to-dos or habits assigned to users (like weekly budget check-ins). Tasks can be recurring or one-time, and their completion status contributes to user engagement and reward incentives.
10. **Reward**\
    Represents points or incentives earned by users for completing tasks, staying within budget, or interacting with system features. Can be redeemed or used to motivate positive financial behavior.

#### **Communication & Logging Entities**

11. **Notification**\
    Delivers system-generated messages to users, including reminders (like budget deadline), alerts (like low balance), or informational updates (like task completion). Time-stamped and categorized for clarity.
12. **LemonAidLogs**\
    Captures AI assistant (LemonAid) interactions with users. Each log includes the AI’s response, timestamp, and user rating. Used for analytics, quality improvement, and understanding user needs.

#### **Support & Admin Interaction**

13. **SupportTicket**\
    Represents a help or issue report submitted by a user. Includes the subject, detailed message, ticket status, and any admin responses. Used to facilitate two-way support communication.

#### **Integration & Association**

14. **AccountBankLink**\
    Associates internal accounts with external bank sources. Enables aggregation of financial data, syncing transactions, and multi-bank management. Supports future financial APIs and open banking.

***

#### **User Privileges and Registration Info**

* **Standard users** can:
  * Register, login, and manage their accounts, tasks, budgets, and AI interactions.
  * View only their own data.
* **Admins** can:
  * View user accounts, support tickets, and analytics logs.
  * Respond to support tickets and manage platform-level settings.
* Registration includes name, email, and password, with email verification planned in a future milestone.
