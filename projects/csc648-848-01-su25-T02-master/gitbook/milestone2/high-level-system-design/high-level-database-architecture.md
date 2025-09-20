# High Level Database Architecture

**Initial Database Requirements:**

1. User

```
1.1.A User shall be associated with 0 to many Accounts.

1.2.A User shall be able to create and manage 0 to many Tasks.

1.3.A User shall be rewarded with 0 to many Rewards.

1.4.A User shall receive 0 to many Notifications.

1.5.A User shall be able to submit 0 to many SupportTickets.

1.6.A User shall be assigned 0 to many Levels.

1.7.A User shall have 0 to many LemonAidLogs.

1.8.A User can be a subtype Administrator.

1.9.A User may receive responses from an Administrator via associated SupportTickets.
```

2. Account

<pre><code><strong>2.1.An Account shall belong to exactly 1 User.
</strong>
2.2.An Account shall be associated with 0 to many Transactions.

2.3.An Account shall be linked to 0 to many Budgets.

2.4.An Account shall be linked to 0 to many Subscriptions.

2.5.An Account shall be associated with 0 to many Banks through an AccountBankLink associative entity.
</code></pre>

3. Bank

```
3.1.A Bank shall be linked to 0 to many Accounts via AccountBankLink.

3.2.A Bank may serve multiple users through its linked Accounts.
```

4. Transaction

<pre><code>4.1.A Transaction shall belong to exactly 1 Account.

4.2.A Transaction shall have 0 or 1 associated Receipt.

<strong>4.3.A Transaction shall be associated with 0 or 1 ReimbursementRequest.
</strong></code></pre>

5. Receipt

```
5.1 A Receipt shall be associated with exactly 1 Transaction.
```

6. ReimbursementRequest

```
6.1.A ReimbursementRequest shall be linked to exactly 1 Transaction.
```

7. Subscription

```
7.1.A Subscription shall belong to exactly 1 Account.
```

8. Budget

```
8.1.A Budget shall belong to exactly 1 Account.
```

9. Task

```
9.1.A Task shall be assigned to exactly 1 User.
```

10. Reward

```
10.1.A Reward shall be associated with exactly 1 User.
```

11. Notification

```
11.1.A Notification shall be sent to exactly 1 User.
```

12. LemonAidLogs

```
12.1.A LemonAidLog shall be created by exactly 1 User.
```

13. SupportTicket

```
13.1.A SupportTicket shall be created by exactly 1 User.

13.2.A SupportTicket may be responded to by 0 or 1 Administrator.
```

14. Administrator (ISA of User)

<pre><code>14.1.An Administrator shall inherit its identity from a User (PK = FK).

<strong>14.2.An Administrator may manage 0 to many SupportTickets.
</strong>
14.3.An Administrator may be assigned to 0 to many Users for admin-level actions.
</code></pre>

***

\
**DBMS Selection:** We will use **MySQL** because it is a popular and reliable database system that works well with web apps. It can handle our financial data and user information easily, and it's a good fit for the tools we’re using like Node.js and Express. Also, it is accepted by the CTO.

***

\
**User (strong)**\
\
**Attributes:**\
**Represents individual system participants. Stores identity info, authentication credentials, and role classification.**\
\
**Relationships:**\
\
&#x20;   **1 to 0…\* with Account**\
\
&#x20;   **1 to 0…\* with Task**\
\
&#x20;   **1 to 0…\* with Reward**\
\
&#x20;   **1 to 0…\* with Notification**\
\
&#x20;   **1 to 0…\* with SupportTicket**\
\
&#x20;   **1 to 0…\* with LemonAidLogs**\
\
&#x20;   **1 to 0…1 with Administrator (subtype)**\
\
**Domains:**\
\
&#x20;   **Text (names, emails) with format validation.**\
\
&#x20;   **Encrypted strings for passwords.**\
\
&#x20;   **Predefined roles (e.g., standard, admin).**\
\
&#x20;   **IDs as integers, unique per user.**\
\
**Account (strong)**\
\
**Attributes:**\
**Stores a user’s financial container, such as checking, savings, or credit. Tracks balance and account type.**\
\
**Relationships:**\
\
&#x20;   **to 1 with User**\
\
&#x20;   **1 to 0…\* with Transaction**\
\
&#x20;   **1 to 0…\* with Budget**\
\
&#x20;   **1 to 0…\* with Subscription**\
\
&#x20;   **0…\* to 0…\* with Bank (via AccountBankLink)**\
\
**Domains:**\
\
&#x20;   **Account types (e.g., checking, savings, credit) via ENUM.**\
\
&#x20;   **Balances in integer cents to avoid float errors.**\
\
&#x20;   **IDs as integers.**\
\
**Bank (strong)**\
\
**Attributes:**\
**Represents financial institutions users can link to their accounts.**\
\
**Relationships:**\
\
&#x20;   **0…\* to 0…\* with Account (via AccountBankLink)**\
\
**Domains:**\
\
&#x20;   **Short text for bank names.**\
\
&#x20;   **Unique integer IDs.**\
\
**Transaction (strong)**\
\
**Attributes:**\
**Tracks money movements on accounts, including income, expenses, and transfers. Also includes category, date, and amount.**\
\
**Relationships:**\
\
&#x20;   **to 1 with Account**\
\
&#x20;   **0…1 to 1 with Receipt**\
\
&#x20;   **0…1 to 1 with ReimbursementRequest**\
\
**Domains:**\
\
&#x20;   **Transaction types (income, expense, transfer) via ENUM.**\
\
&#x20;   **Categories as short text (user/system defined).**\
\
&#x20;   **Amounts in integer cents.**\
\
&#x20;   **Dates in standard DATE format.**\
\
&#x20;   **IDs as integers.**\
\
**Receipt (weak)**\
\
**Attributes:**\
**Stores uploaded receipt images tied to transactions.**\
\
**Relationships:**\
\
&#x20;   **to 1 with Transaction**\
\
**Domains:**\
\
&#x20;   **Binary files (JPG/PNG only, max \~5MB).**\
\
&#x20;   **Upload date as DATE.**\
\
&#x20;   **Foreign key reference to transaction.**\
\
**ReimbursementRequest (weak)**\
\
**Attributes:**\
**Represents refund requests linked to transactions, including workflow state.**\
\
**Relationships:**\
\
&#x20;   **0…1 to 1 with Transaction**\
\
**Domains:**\
\
&#x20;   **ENUM for status (pending, approved, rejected).**\
\
&#x20;   **Reference to associated transaction.**\
\
**Subscription (strong)**\
\
**Attributes:**\
**Recurring charges linked to accounts. Includes name, interval, and next billing date.**\
\
**Relationships:**\
\
&#x20;   **0…\* to 1 with Account**\
\
**Domains:**\
\
&#x20;   **Service names as short text (e.g., "Netflix").**\
\
&#x20;   **Amounts in cents.**\
\
&#x20;   **ENUM interval (daily, weekly, monthly, yearly).**\
\
&#x20;   **Dates as DATE.**\
\
**Budget (strong)**\
\
**Attributes:**\
**Defines spending limits over a given time window for an account.**\
\
**Relationships:**\
\
&#x20;   **0…\* to 1 with Account**\
\
**Domains:**\
\
&#x20;   **Limit amounts in cents.**\
\
&#x20;   **Start/end dates as DATE.**\
\
&#x20;   **Integer IDs.**\
\
**Task (strong)**\
\
**Attributes:**\
**User-assigned or system-generated to-dos, with status and type (e.g., recurring, custom).**\
\
**Relationships:**\
\
&#x20;   **0…\* to 1 with User**\
\
**Domains:**\
\
&#x20;   **ENUM types (daily, weekly, one-timer, custom).**\
\
&#x20;   **ENUM status (pending, completed, overdue).**\
\
&#x20;   **Integer IDs.**\
\
**Reward (strong)**\
\
**Attributes:**\
**Points awarded to users for engagement or successful financial behavior.**\
\
**Relationships:**\
\
&#x20;   **0…\* to 1 with User**\
\
**Domains:**\
\
&#x20;   **Point totals as integers.**\
\
&#x20;   **IDs as integers.**\
\
**Notification (strong)**\
\
**Attributes:**\
**System messages for users, such as alerts, updates, and reminders.**\
\
**Relationships:**\
\
&#x20;   **0…\* to 1 with User**\
\
**Domains:**\
\
&#x20;   **ENUM types (info, alert, reminder).**\
\
&#x20;   **Message content as text.**\
\
&#x20;   **Timestamp as DATETIME.**\
\
**LemonAidLogs (strong)**\
\
**Attributes:**\
**Interaction logs between the user and AI assistant, including feedback.**\
\
**Relationships:**\
\
&#x20;   **0…\* to 1 with User**\
\
**Domains:**\
\
&#x20;   **AI output as text.**\
\
&#x20;   **Rating as ENUM (1–5).**\
\
&#x20;   **Timestamp as TIMESTAMP.**\
\
**SupportTicket (strong)**\
\
**Attributes:**\
**User-submitted help requests. Includes issue description, status, and optional admin reply.**\
\
**Relationships:**\
\
&#x20;   **0…\* to 1 with User**\
\
&#x20;   **0…1 to 1 with Administrator**\
\
**Domains:**\
\
&#x20;   **Subject/message as text.**\
\
&#x20;   **Status ENUM (open, in progress, closed).**\
\
&#x20;   **Optional response as text.**\
\
&#x20;   **Integer IDs.**\
\
**Administrator (strong subtype of User)**\
\
**Attributes:**\
**Privileged users with system-level capabilities and assignment authority.**\
\
**Relationships:**\
\
&#x20;   **1 to 0…\* with SupportTicket**\
\
&#x20;   **1 to 0…\* with User**\
\
**Domains:**\
\
&#x20;   **Permissions stored as long text or serialized permissions list.**\
\
**AccountBankLink (associative)**\
\
**Attributes:**\
**Connects user accounts to external banks for multi-bank linking.**\
\
**Purpose:**\
**Resolves many-to-many between Account and Bank**\
\
**Domains:**\
\
&#x20;   **Purely foreign key based.**\
\
&#x20;   **No extra data beyond IDs referencing accounts and banks.**\
\


<figure><img src="../.gitbook/assets/Copy of m2_entitiesERD.drawio.png" alt=""><figcaption></figcaption></figure>

***

**Media Storage**

For now, we plan to store images as BLOBs for things like receipts, since they are small and directly tied to transactions. We do not currently need to store video, audio, or GPS data, but if needed in the future, we may switch to a file system to handle larger files more efficiently.
