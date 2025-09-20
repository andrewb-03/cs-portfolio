# High Level Database Architecture

## Initial Database Requirements

### User
- A User shall be associated with 0 to many Accounts.
- A User shall be able to create and manage 0 to many Tasks.
- A User shall be rewarded with 0 to many Rewards.
- A User shall receive 0 to many Notifications.
- A User shall be able to submit 0 to many SupportTickets.
- A User shall have 0 to many LemonAidLogs.
- A User can be a subtype Administrator.
- A User may receive responses from users that are admin via associated SupportTickets.
- A User shall be able to submit 0 to many Reviews.

### Account
- An Account shall belong to exactly 1 User.
- An Account shall be associated with 0 to many Transactions.
- An Account shall be linked to 0 to many Budgets.
- An Account shall be linked to 0 to many Subscriptions.
- An Account shall be associated with 0 to many Banks through AccountBankLink.

### Bank
- A Bank shall be linked to 0 to many Accounts via AccountBankLink.
- A Bank may serve multiple Users through its linked Accounts.

### Transaction
- A Transaction shall belong to exactly 1 Account.
- A Transaction shall have 0 or 1 associated Receipt.
- A Transaction shall be associated with 0 or 1 ReimbursementRequest.

### Receipt
- A Receipt shall be associated with exactly 1 Transaction.

### ReimbursementRequest
- A ReimbursementRequest shall be linked to exactly 1 Transaction.

### Subscription
- A Subscription shall belong to exactly 1 Account.

### Budget
- A Budget shall belong to exactly 1 Account.

### Task
- A Task shall be assigned to exactly 1 User.

### Reward
- A Reward shall be associated with exactly 1 User.

### Notification
- A Notification shall be sent to exactly 1 User.

### LemonAidLogs
- A LemonAidLog shall be created by exactly 1 User.

### SupportTicket
- A SupportTicket shall be created by exactly 1 User.
- A SupportTicket may be responded to by 0 or 1 Users that are admin.

### Reviews
- A Review shall be submitted by 0 or 1 Users.
- A Review may be associated with 0 or 1 LemonAidLogs.
- A Review shall include a required rating and message.
- A Review shall be classified by type (e.g., chatbot or user experience).
- A Review shall automatically store the timestamp of submission.

## DBMS Selection

We will use MySQL because it is a popular, reliable relational database that integrates seamlessly with Node.js/Express, handles financial and user data easily, and is approved by our CTO.

## Database Organization

### User 
**Attributes:**
- userId: unique identifier for each user INT UNSIGNED
- name: full name of the user VARCHAR(45)
- email: login credential and unique contact identifier VARCHAR(45)
- password: hashed user password VARCHAR(255)
- userType: determines user role (standard or admin) ENUM('standard', 'admin')

**Relationships:**
- 1 to 0…* with Account
- 1 to 0…* with Task
- 1 to 0…* with Reward
- 1 to 0…* with Notification
- 1 to 0…* with SupportTicket
- 1 to 0…* with LemonAidLogs
- 1 to 0…* with Reviews

### Account
**Attributes:**
- accountId: unique identifier for each account INT UNSIGNED
- userId: reference to owning user INT UNSIGNED
- balance: current account balance INT UNSIGNED
- accountType: financial category of the account ENUM('checking', 'saving', 'credit')

**Relationships:**
- 1 to 1 with User
- 1 to 0…* with Transaction
- 1 to 0…* with Budget
- 1 to 0…* with Subscription
- 1 to 0…* with AccountBankLink

### Bank
**Attributes:**
- bankId: unique identifier for each bank INT UNSIGNED
- name: name of the financial institution VARCHAR(45)

**Relationships:**
- 1 to 0…* with Account via AccountBankLink

### Transaction
**Attributes:**
- transactionId: unique identifier for each transaction INT UNSIGNED
- accountId: reference to the linked account INT UNSIGNED
- amount: transaction amount (positive or negative) INT
- category: user-defined or system-defined transaction tag VARCHAR(40)
- type: defines purpose as income, expense, or transfer ENUM('income', 'expense', 'transfer')
- date: date of the transaction event DATE
- subscriptionId: optional link to related subscription INT UNSIGNED

**Relationships:**
- 1 to 1 with Account
- 1 to 0…1 with Receipt
- 1 to 0…1 with ReimbursementRequest
- 1 to 0…1 with Subscription

### Receipt
**Attributes:**
- receiptId: unique identifier for each receipt INT UNSIGNED
- transactionId: reference to associated transaction INT UNSIGNED
- dataUploaded: date the receipt was uploaded DATE
- image: stored binary data of the receipt BLOB

**Relationships:**
- 1 to 1 with Transaction

### ReimbursementRequest
**Attributes:**
- requestId: unique identifier for the request INT UNSIGNED
- transactionId: transaction that the reimbursement applies to INT UNSIGNED
- status: workflow status of the request ENUM('pending', 'approved', 'rejected')

**Relationships:**
- 1 to 1 with Transaction

### Subscription
**Attributes:**
- subscriptionId: unique identifier for each subscription INT UNSIGNED
- accountId: reference to the linked account INT UNSIGNED
- name: title or label for the subscription VARCHAR(45)
- amount: amount of the recurring payment INT UNSIGNED
- interval: frequency of recurrence ENUM('daily', 'weekly', 'monthly', 'yearly')
- nextDueDate: next expected billing date DATE

**Relationships:**
- 0…* to 1 with Account
- 0…1 to 0…* with Transaction

### Budget
**Attributes:**
- budgetId: unique identifier for the budget INT UNSIGNED
- accountId: reference to the associated account INT UNSIGNED
- limitAmount: allowed budget limit INT UNSIGNED
- startDate: budget period start date DATE
- endDate: budget period end date DATE

**Relationships:**
- 0…* to 1 with Account

### Task
**Attributes:**
- taskId: unique identifier for the task INT UNSIGNED
- userId: owner of the task INT UNSIGNED
- type: classification of task recurrence ENUM('daily', 'weekly', 'one-timer', 'custom')
- status: current progress or completion state ENUM('pending', 'completed', 'overdue')

**Relationships:**
- 0…* to 1 with User

### Reward
**Attributes:**
- rewardId: unique identifier for the reward INT UNSIGNED
- userId: associated user who earned the reward INT UNSIGNED
- points: number of reward points earned INT

**Relationships:**
- 0…* to 1 with User

### Notification
**Attributes:**
- notificationId: unique identifier INT UNSIGNED
- userId: recipient of the notification INT UNSIGNED
- type: nature of the message ENUM('info', 'alert', 'reminder')
- content: message content TEXT
- date: delivery timestamp DATETIME

**Relationships:**
- 0…* to 1 with User

### LemonAidLogs
**Attributes:**
- logId: unique identifier for the AI interaction log INT UNSIGNED
- userId: user who interacted with LemonAid INT UNSIGNED
- output: AI response content TEXT
- timestamp: time when interaction occurred TIMESTAMP

**Relationships:**
- 0…* to 1 with User
- 1 to 0…* with Reviews

### Reviews
**Attributes:**
- reviewId: unique identifier for the review INT UNSIGNED
- userId: reviewer (nullable) INT UNSIGNED
- logId: linked LemonAidLog (nullable) INT UNSIGNED
- message: textual feedback left by the user TEXT
- rating: numeric rating level ENUM('1', '2', '3', '4', '5')
- createdAt: when the review was submitted TIMESTAMP
- type: identifies whether the review targets chatbot or UX ENUM('chatbot', 'user_experiance')

**Relationships:**
- 0…1 to 1 with User
- 0…1 to 1 with LemonAidLogs

### SupportTicket
**Attributes:**
- ticketId: unique identifier INT UNSIGNED
- userId: creator of the ticket INT UNSIGNED
- subject: brief title of the issue VARCHAR(45)
- message: full description of the issue TEXT
- status: progress status of the ticket ENUM('open', 'in progress', 'closed')
- adminResponse: optional admin reply TEXT
- adminId: (optional) userId of admin responder INT UNSIGNED

**Relationships:**
- 1 to 1 with User
- 0…1 with User as responder (adminType only via userType)

### AccountBankLink
**Attributes:**
- accountId: part of the composite key; links to an account INT UNSIGNED
- bankId: part of the composite key; links to a bank INT UNSIGNED

**Relationships:**
- M:N between Account and Bank

## Entity Relationship Diagram

[ERD diagram showing all entities and their relationships]

## Extended Entity Relationship Diagram

[Extended ERD with additional attributes and constraints]
