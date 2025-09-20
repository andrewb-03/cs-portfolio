# Data Definitions
Core User & Identity Entities
User 
Represents any person registered in the system. Each user has an account profile and can be either a standard user or an administrator. Used for login, personalization, and access control. Email is the primary identifier, and all actions in the system are associated with a user.
Financial Management Entities
Account 
Represents a user's financial container (checking, savings, or credit). All financial activities, such as transactions, subscriptions, and budgets, are linked to specific accounts. Accounts maintain running balances and support multi-bank integration.
Transaction 
Represents a monetary event tied to an account (like income, expense, or fund transfer). Transactions are categorized for budgeting and reporting purposes and are timestamped to track financial behavior over time.
Receipt 
Stores digital copies of receipts (image files) linked to individual transactions. Used for personal finance tracking, tax documentation, and reimbursement validation.
ReimbursementRequest 
Represents a formal request to be reimbursed for a transaction, often reviewed by an administrator. Tracks status and supports workflows such as pending, approved, or rejected.
Budget 
Defines spending limits for an account over a specified period (weekly, monthly, etc.). Used to monitor and enforce financial discipline and to trigger alerts when limits are approached or exceeded.
Subscription 
Represents recurring payments (like Netflix, utilities) tied to an account. Helps users track recurring expenses, manage due dates, and receive reminders before payments occur.
Task & Reward System
Task 
Represents actionable to-dos or habits assigned to users (like weekly budget check-ins). Tasks can be recurring or one-time, and their completion status contributes to user engagement and reward incentives.
Reward 
Represents points or incentives earned by users for completing tasks, staying within budget, or interacting with system features. Can be redeemed or used to motivate positive financial behavior.
Communication & Logging Entities
Notification 
Delivers system-generated messages to users, including reminders (like budget deadline), alerts (like low balance), or informational updates (like task completion). Time-stamped and categorized for clarity.
LemonAidLogs 
Logs each interaction between a user and the LemonAid AI assistant. Each log includes the AI's response text and a timestamp. User ratings and comments are now handled in the separate Reviews entity to support better modularity and review flexibility.
Reviews
Captures user feedback in the form of ratings and messages. Reviews are linked either to LemonAid logs (chatbot type) or general user experience (user_experiance type). Supports analytics and system improvement initiatives.
Support & Admin Interaction
SupportTicket 
Represents a help or issue report submitted by a user. Includes the subject, detailed message, ticket status, and any admin responses. Used to facilitate two-way support communication.
Integration & Association
AccountBankLink 
Represents the relationship between internal accounts and external banks. Enables multi-bank integration and prepares the system for open banking API compatibility. Supports syncing and aggregation of transaction data.
User Privileges and Registration
Standard users can:


Register, log in, and manage their accounts, tasks, budgets, and AI interactions.


View only their own data.


Admins can:


View user accounts, support tickets, and analytics logs.


Respond to support tickets and manage platform-level settings.


Registration includes: name, email, and password, with email verification planned in a future milestone.
