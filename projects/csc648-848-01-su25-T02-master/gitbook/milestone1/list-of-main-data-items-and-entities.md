---
description: >-
  This page is a list of Item/Object/Entity concepts that will be used to define
  interactions on the Limóney web-app as well as the direction of the budgeting
  process
---

# List of Main Data Items and Entities

---

### 1. **Main Entity:** <mark style="color:blue;">Users</mark>
Defines all types of users within the application.

#### 1.1 Role Type: <mark style="color:purple;">Customer</mark>
- **Definition:** Basic user type who utilizes the app’s core features.
- **Behavior:** Can view finances, complete tasks, interact with AI, and earn rewards.

#### 1.2 Role Type: <mark style="color:purple;">Premium</mark>
- **Definition:** Enhanced user role with access to exclusive financial features.
- **Behavior:** Includes all customer features, plus extras.

#### 1.3 Role Type: <mark style="color:purple;">Tester</mark>
- **Definition:** Temporary or experimental users who test new features or versions.
- **Behavior:** Provides feedback based on testing sessions.

#### 1.4 Role Type: <mark style="color:purple;">Administrator</mark>
- **Definition:** Pinnacle of users with control over platform settings and user management.
- **Behavior:** Can manage users, resolve tickets, and oversee operations.

---

### 2. **Main Entity:** <mark style="color:blue;">Tasks</mark>

- **Definition:** Actions users can perform to manage or improve finances.
- **Behavior:** Users can complete, receive, and view tasks, may be may be recommended by LemonAid.

---

### 3. **Main Entity:** <mark style="color:blue;">Account</mark>
Central system for tracking money flow, balances, and budgeting

#### 3.1 Role Type: <mark style="color:purple;">Income</mark>
- **Definition:** Tracks the sources and amounts of funds received.
- **Behavior:** Adds to account balance and informs budgeting and progress metrics.

#### 3.2 Role Type: <mark style="color:purple;">Expense</mark>
- **Definition:** Records money spent by the user.
- **Behavior:** Subtracts from account balance, contributes to budgeting, and is analyzed for trends.

#### 3.3 Role Type: <mark style="color:purple;">Saving</mark>
- **Definition:** Entity related to saving money.
- **Behavior:** Tracks actions taken, or that can be taken, by user in order to improve this in a stat based fashion.

---

### 4. **Main Entity:** <mark style="color:blue;">Bank</mark>
Banks connected to user accounts

#### 4.1 Role Type: <mark style="color:purple;">Credit</mark>
- **Definition:** Amount of money that the User is in debt.
- **Behavior:** Tracks user debt from using cards, taking loans, etc.

#### 4.2 Role Type: <mark style="color:purple;">Total</mark>
- **Definition:** Total of user bank assets.
- **Behavior:** Can determine User net-worth, and be used with other entities to determine savings and other things.

---

### 5. **Main Entity:** <mark style="color:blue;">Transaction</mark>

- **Definition:** Represents the movement of money within an account.
- **Behavior:** Provides data to other entities to help improve user savings.

---

### 6. **Main Entity:** <mark style="color:blue;">Budget</mark>

- **Definition:** Helps users control and plan spending.
- **Behavior:** Tracks and provides limitations on user spending.

---

### 7. **Main Entity:** <mark style="color:blue;">Subscription</mark>

- **Definition:** Payments for installments towards different services and plans.
- **Behavior:** Used to calculate user spending and improve spending by eliminating subscription over-population.

---

### 8. **Main Entity:** <mark style="color:blue;">Receipt</mark>

- **Definition:** Uploaded photo of receipt.
- **Behavior:** Helps with reimbursement and tracking finances.

---

### 9. **Main Entity:** <mark style="color:blue;">Reimbursement Request</mark>

- **Definition:** Request for financial compensation.
- **Behavior:** Is created by user and reviewed by Admin that will take action to aid user.

---

### 10. **Main Entity:** <mark style="color:blue;">Rewards</mark>
Unique aspect of Limoney that increases user engagement by turning saving money into a game.

#### 10.1 Role Type: <mark style="color:purple;">Level</mark>
- **Definition:** Value tracking user progress.
- **Behavior:** Unlocks privileges and visualizes achievements.

#### 10.2 Role Type: <mark style="color:purple;">Rating</mark>
- **Definition:** Ranks users competitively against each other.
- **Behavior:** Encourages engagement by adding a competitive layer for those intrested.

#### 10.3 Role Type: <mark style="color:purple;">Redeem</mark>
- **Definition:** Converts points into tangible or virtual rewards.
- **Behavior:** Provides incentives and gratification for app usage.

---

### 11. **Main Entity:** <mark style="color:blue;">Notifications</mark>

- **Definition:** In-app messages that alert users to important events or tasks.
- **Behavior:** Informs users about tasks, budget limits, etc.

---

### 12. **Main Entity:** <mark style="color:blue;">Support Ticket</mark>

- **Definition:** A message submitted to administrators for technical or financial assistance.
- **Behavior:** Sent to Admins for resolutions.

---

### 13. **Main Entity:** <mark style="color:blue;">LemonAid (AI Assistant)</mark>

- **Definition:** AI Assistant integrated into the app.
- **Behavior:** Interacts with users, logs actions, and improves user guidance using AI.