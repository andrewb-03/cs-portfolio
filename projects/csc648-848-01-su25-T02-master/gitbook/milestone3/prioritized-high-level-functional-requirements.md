# Prioritized High-Level Functional Requirements
Priority 1
1. User
1.1. A user shall be able to create an account. 
1.2. A user shall be able to securely log in to their account. 
1.3. A user shall be able to recover or reset their password. 
1.7. A user shall be associated with one or more accounts. 
1.10. A user shall be able to view and edit their financial data history. 
2. Account
2.1. An account shall store income entries for a user. 
2.2. An account shall store expense entries for a user. 
2.3. An account shall belong to one and only one user. 
2.4. An account shall track a balance value. 
2.5. An account may be connected to one or more banks.
2.7. An account shall have a transaction history log. 
3. Bank
3.1. A bank shall be linked to one or more user accounts.
3.2. A bank shall provide transaction data to the system.
4. Transaction
4.1. A transaction shall be classified as income or expense.
4.2. A transaction shall belong to exactly one account. 
4.3. A transaction may be manually entered or synced from a bank.
4.4. A transaction shall be categorizable by the user or AI. 
5. Subscription 
5.1. A subscription shall be tied to a recurring transaction.
6. Budget 
6.1. A budget shall be created for one or more spending categories.
6.3. A budget shall allow setting and tracking of goals. 
9. AI Assistant (LemonAid)
9.6. The system shall store AI responses and user feedback in LemonAidLogs. 
10. Notification System
10.2. The system shall deliver daily, weekly, or monthly financial summaries. 
13. ReimbursementRequest
13.1. A reimbursement request may be associated with one transaction.
13.2. A reimbursement request shall have a status: pending, approved, or rejected.
15. AccountBankLink
15.1. An account may be linked to one or more banks. 
15.2. A bank may be linked to one or more accounts via AccountBankLink. 
16. Bank
16.1. A bank shall store balance and credit data for users. 
16.2. A bank shall provide transaction data to the system. 
16.3. A bank shall be viewable in the user's linked accounts dashboard.

17. Reviews
17.1. A review shall be optionally submitted by a registered user.
17.2. A review shall include a rating value (1 to 5) and an optional message.
17.3. A review shall be timestamped at the time of creation.
17.4. A review may be linked to one and only one LemonAidLog.
17.5. A review may exist independently as general user feedback not tied to any LemonAidLog.
17.6. A LemonAidLog shall be associated with at most one review.
17.7. A review shall be categorized by type (chatbot or user_experiance).

Priority 2
1. User
1.4. A user shall be able to select between manual or bank-linked financial tracking. 
1.8. A user shall be classified as a customer, premium, tester, or administrator. 

1.15. A user that is an administrator shall be able to respond to support tickets. 
1.16. A user that is administrator shall be able to access user account data. 
2. Account
2.6. An account shall be able to categorize transactions. 
2.8. An account shall support spending limits and alerts.
2.9. An account shall track subscriptions and bill payments. 
2.10. An account shall be able to forecast end-of-month balances. 
3. Bank 
3.3. A bank shall store balance and credit data for users. 
4. Transaction 
4.7. A transaction may be associated with a reimbursement request. 
5. Subscription 
5.2. A subscription shall be viewable in a centralized dashboard. 
5.3. A subscription shall trigger periodic spending alerts. 
6. Budget 

6.2. A budget shall belong to one and only one account. 
6.4. A budget shall support notifications based on spending limits. 
6.5. A budget shall be able to generate monthly recaps. 
10. Notification System
10.3. The system shall notify users of upcoming bills or subscriptions.
10.4. The system shall notify users of overspending events. 
10.5. The system shall alert users when savings goals are off track. 


Priority 3
1. User
1.5. A user shall be able to customize their interface (like dark mode). 
1.6. A user shall be able to receive AI-generated financial guidance. 
1.9. A user shall be able to interact with the AI chatbot for financial assistance.
1.11. A user that is an administrator shall be able to suspend or maintain site operations. 
11.12. A user that is an administrator shall be able to view flagged transactions. 

1.13. A user that is an administrator shall be able to suspend or maintain site operations. 
1.14. A user that is an administrator shall be able to view flagged transactions. 

4. Transaction 
4.5. A transaction shall be editable and deletable by the user. 
4.6. A transaction shall be linked to one or more receipts.

7. Task
7.1. A task shall be assigned to a user account.
7.2. A task shall be marked completed upon user action.

7.3. A task shall be of one type: savings, investing, setup, admin, testing. 
7.4. A recommended task shall be generated based on user activity or AI analysis. 

8. Reward System
8.1. A user shall be able to earn rewards for completing tasks. 
8.2. A user shall be able to redeem rewards through the system. 

8.3. A user shall be assigned a level based on completed actions. 
8.4. A user shall be able to view rankings if competitive mode is enabled. 
9. AI Assistant (LemonAid)
9.1. The AI assistant shall analyze user transactions and spending habits.
9.2. The AI assistant shall simulate different financial scenarios for planning. 
9.3. The AI assistant shall forecast recurring charges and balances. 
9.4. The AI assistant shall recommend saving opportunities and budget changes. 
9.5. The AI assistant shall provide suggestions for uncategorized transactions. 

10. Notification System
10.1. The system shall send reminders for logging receipts.
11. Administrator
11.5. An administrator shall be able to manage and moderate platform use.
12. Receipt
12.1. A receipt may be linked to a transaction. 

12.2. A receipt may be stored as a binary image (JPG/PNG, max 5MB).P2
12.3. A receipt shall include the upload date. 
12.4. The system shall send reminders for users to upload receipts.

12.5. An administrator shall be able to access user account data. 


13. ReimbursementRequest
13.3. A reimbursement request shall be visible to administrators for review.

14. SupportTicket
14.1. A support ticket shall be created by a user. 
14.2. A support ticket shall include a subject, message, and status. 
14.3. A support ticket shall be responded to by an administrator.
14.4. A support ticket shall track the admin response and resolution state. 
15. AccountBankLink
15.3. The system shall sync data from bank APIs using these links.

17. Reviews
17.8. A review shall be viewable by system administrators for quality assurance and analysis.
17.9. A review shall be stored securely and associated with the submitting user, if applicable.
17.10. A review shall support analytics use cases for measuring system effectiveness and user satisfaction.

