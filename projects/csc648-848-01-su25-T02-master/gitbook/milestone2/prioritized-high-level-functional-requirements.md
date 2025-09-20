# Prioritized High-Level Functional Requirements

<mark style="color:red;">**Priority 1**</mark>

**1. User**\
1.1. A user shall be able to create an account. \
1.2. A user shall be able to securely log in to their account. \
1.3. A user shall be able to recover or reset their password. \
1.7. A user shall be associated with one or more accounts. \
1.10. A user shall be able to view and edit their financial data history.&#x20;

**2. Account**\
2.1. An account shall store income entries for a user. \
2.2. An account shall store expense entries for a user. \
2.3. An account shall belong to one and only one user. \
2.4. An account shall track a balance value. \
2.5. An account may be connected to one or more banks.\
2.7. An account shall have a transaction history log.&#x20;

**3. Bank**\
3.1. A bank shall be linked to one or more user accounts.\
3.2. A bank shall provide transaction data to the system.

**4. Transaction**\
4.1. A transaction shall be classified as income or expense.\
4.2. A transaction shall belong to exactly one account. \
4.3. A transaction may be manually entered or synced from a bank.\
4.4. A transaction shall be categorizable by the user or AI.&#x20;

**5. Subscription** \
5.1. A subscription shall be tied to a recurring transaction.

**6. Budget** \
6.1. A budget shall be created for one or more spending categories.\
6.2. A budget shall belong to one and only one account. \
6.3. A budget shall allow setting and tracking of goals.&#x20;

**7. Task**\
7.1. A task shall be assigned to a user account.\
7.2. A task shall be marked completed upon user action.

**8. Reward System**\
8.1. A user shall be able to earn rewards for completing tasks. \
8.2. A user shall be able to redeem rewards through the system.&#x20;

**9. Reward System**\
9.6. The system shall store AI responses and user feedback in LemonAidLogs.&#x20;

**10. Notification System**\
10.1. The system shall send reminders for logging receipts.\
10.2. The system shall deliver daily, weekly, or monthly financial summaries.&#x20;

**11. Administrator**\
11.1. An administrator shall be able to suspend or maintain site operations. \
11.2. An administrator shall be able to view flagged transactions. \
\
**12. Receipt**\
12.1. A receipt may be linked to a transaction. \
12.3. A receipt shall include the upload date. \
\
**13. ReimbursementRequest**\
13.1. A reimbursement request may be associated with one transaction.\
13.2. A reimbursement request shall have a status: pending, approved, or rejected.\
\
**14. SupportTicket**\
14.1. A support ticket shall be created by a user. \
14.2. A support ticket shall include a subject, message, and status. \
\
**15. AccountBankLink**\
15.1. An account may be linked to one or more banks. \
15.2. A bank may be linked to one or more accounts via AccountBankLink. \
\
**16. Bank**\
16.1. A bank shall store balance and credit data for users. \
16.2. A bank shall provide transaction data to the system. \
16.3. A bank shall be viewable in the user's linked accounts dashboard.

***

<mark style="color:orange;">**Priority 2**</mark>

**1. User**\
1.4. A user shall be able to select between manual or bank-linked financial tracking. \
1.8. A user shall be classified as a customer, premium, tester, or administrator.&#x20;

**2. Account**\
2.6. An account shall be able to categorize transactions. \
2.8. An account shall support spending limits and alerts.\
2.9. An account shall track subscriptions and bill payments. \
2.10. An account shall be able to forecast end-of-month balances.&#x20;

**3. Bank** \
3.3. A bank shall store balance and credit data for users.&#x20;

**4. Transaction** \
4.5. A transaction shall be editable and deletable by the user. \
4.6. A transaction shall be linked to one or more receipts.\
4.7. A transaction may be associated with a reimbursement request.&#x20;

**5. Subscription** \
5.2. A subscription shall be viewable in a centralized dashboard. \
5.3. A subscription shall trigger periodic spending alerts.&#x20;

**6. Budget** \
6.4. A budget shall support notifications based on spending limits. \
6.5. A budget shall be able to generate monthly recaps.&#x20;

**7. Task**\
7.3. A task shall be of one type: savings, investing, setup, admin, testing.&#x20;

**8. Reward System**\
8.3. A user shall be assigned a level based on completed actions.&#x20;

**10. Notification System**\
10.3. The system shall notify users of upcoming bills or subscriptions.\
10.4. The system shall notify users of overspending events. \
10.5. The system shall alert users when savings goals are off track.&#x20;

**11. Administrator**\
11.3. An administrator shall be able to respond to support tickets. \
11.4. An administrator shall be able to access user account data. \
\
**12. Receipt**\
12.2. A receipt may be stored as a binary image (JPG/PNG, max 5MB).P2\
12.4. An administrator shall be able to access user account data. \
\
**13. ReimbursementRequest**\
13.3. A reimbursement request shall be visible to administrators for review.\
\
**14. SupportTicket**\
14.3. An administrator shall be able to respond to the ticket. \
14.4. A support ticket shall track the admin response and resolution state.&#x20;

***

<mark style="color:yellow;">**Priority 3**</mark>

**1. User**\
1.5. A user shall be able to customize their interface (e.g., dark mode). \
1.6. A user shall be able to receive AI-generated financial guidance. \
1.9. A user shall be able to interact with the AI chatbot for financial assistance.

**7. Task**\
7.4. A recommended task shall be generated based on user activity or AI analysis.&#x20;

**8. Reward System**\
8.4. A user shall be able to view rankings if competitive mode is enabled.&#x20;

**9. AI Assistant (LemonAid)**\
9.1. The AI assistant shall analyze user transactions and spending habits.\
9.2. The AI assistant shall simulate different financial scenarios for planning. \
9.3. The AI assistant shall forecast recurring charges and balances. \
9.4. The AI assistant shall recommend saving opportunities and budget changes. \
9.5. The AI assistant shall provide suggestions for uncategorized transactions.&#x20;

**11. Administrator**\
11.5. An administrator shall be able to manage and moderate platform use.\
&#x20;\
**12. Receipt**\
12.4. The system shall send reminders for users to upload receipts.

**15. AccountBankLink**\
15.3. The system shall sync data from bank APIs using these links.

\
