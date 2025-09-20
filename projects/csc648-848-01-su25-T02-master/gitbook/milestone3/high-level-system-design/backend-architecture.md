# Backend Architecture

## ALL SCALE DESIGN
The Limoney Budgeting App for 0-100 (not concurrent) users uses a single monolithic architecture. The frontend (React) communicates via HTTPS (JWT Auth) to a backend API, which validates JWT and routes requests to services such as TransactionService, TaskService, BankService, RewardService, and UserService. All services interact with a single MySQL database (hosted on AWS EC2) and an optional Redis cache for session/AI caching.

## MEDIUM SCALE DESIGN
For 10-1000 concurrent users, the system introduces microservice replication, load balancing, and read replicas for the database. The backend is horizontally scalable with Dockerized microservices, an auto-scaling NGINX load balancer, and health checks. The MySQL database uses master-read replica architecture for scalability, and Redis is used for caching AI and frequent queries. Improvements include fault tolerance, health checks, and reduced DB pressure.

## LARGE SCALE DESIGN
For 1k-10k concurrent users, the system leverages Kubernetes-managed microservices, global CDN, and database sharding by user region. The backend is orchestrated with Kubernetes for auto-scaling and CI/CD. The database layer uses sharding and a mix of read/write replicas, with multi-layer Redis caching. Security is enhanced with rate-limiting, API key enforcement, and mutual TLS between services. The architecture supports global latency reduction and compliance with data privacy regulations.

## ARCHITECTURE SUMMARY

### Microservices Architecture
- Domain-driven microservices: each major business capability is its own independently deployable service
- Services: UserService, BankService, BudgetService, SubscriptionService, TaskService, AIRecommendationService, RewardService
- Service communication:
  - Synchronous calls via REST APIs
  - Asynchronous messaging for AI triggers and reward events

## Backend System Design

### Load Balancing
- NGINX reverse proxy or AWS ALB to evenly route traffic
- Health checks to verify service availability
- Supports horizontal scaling for better availability and responsiveness

### Caching Strategies
- Cache-aside pattern for database query results (e.g., user budget history)
- LRU eviction policy to optimize memory usage

### Reliability & Fault Tolerance
- Each service runs in its own Docker container managed by Kubernetes
- Circuit breakers (Resilience4j) to prevent cascading failures
- Retry and timeout policies to stabilize inter-service connections

### Containers & Orchestration
- Docker containers ensure portable environments (local → staging → production)
- Kubernetes handles deployment, health checks, auto-scaling, and rolling updates

### Data Replication & Consistency
- Master-Slave replication for MySQL to boost read throughput
- Synchronous writes for critical services (e.g., TransactionService, SavingsService)
- Eventual consistency acceptable for non-critical operations to improve performance

### Security Considerations
- JWT authentication for all incoming requests
- Role-Based Access Control (RBAC) distinguishing Admins vs. Customers
- Mutual TLS for service-to-service communication
- Rate limiting and request logging at the API gateway
- Data encryption: AES-256 at rest and TLS in transit

## UML Design
The following UML diagram illustrates the key domain classes and service interfaces for the Limóney backend system.

## High Level Application Network Protocols and Deployment Design

### Network & Development Diagram

### Application Networks Diagram

### Protocols
Network uses HTTPS for securing client access with NGINX, routing to React frontend and Node.Js backed. The backend accesses MYSQL database internally over TCP/IP. Services run on Docker bridge network, with security enforced through SSL/TLS, CORS. and a UFW firewall that restricts access only to essential ports to the application to work. NGINX is the main gateway and proxy which isolates the internal services from the public.

### Deployment Diagram
This diagram illustrates the system's structure on a dedicated Ubuntu server. Docker manages the React frontend and Node.js backend processes. NGINX handles incoming traffic and routes it to the appropriate service. A UFW firewall restricts network access, allowing only essential ports. The backend securely connects to an internal or cloud-hosted MySQL database.

### Integration with External Components
**External Components:**
- Gemini API for our LemonAid Chatbot component

**Internal Libraries:**
- Bycrypt: for hashing passwords
- Dotenv: for ".env" variable handling
- Cors: for securing cross-origin request
- Mysql12: for database connection

## High Level APIs and Main Algorithms

### High-Level APIs

#### Account & Transaction Management API
Allows users to securely manage accounts, log income/expenses, categorize transactions, and attach receipts.

#### Budget & Subscription API
Helps users create, update, and track budgets and recurring payments with due-date reminders.

#### Task & Reward System API
Supports gamification by letting users complete tasks and earn reward points based on activity.

#### Notification API
Delivers alerts, reminders, and system messages tied to user activity and financial goals.

#### Support & Admin API
Enables users to submit support tickets and allows admins to manage and respond to them.

#### LemonAid AI Interaction API
Logs interactions between users and the LemonAid assistant and allows users to rate each AI response.

### Main Algorithms and Processes

#### AI Rating System
After each LemonAid interaction, users rate the response on a scale of 1–5. These ratings will track AI quality over time and may later feed into an admin review process or an AI fine-tuning feedback loop.

#### Spending Categorization
Transactions are initially auto-labeled via simple keyword matching, with a roadmap to evolve into a smarter, pattern-based classification engine.

#### Budget Alerts
The system runs periodic checks of current spending against set budget limits and sends notifications when users approach or exceed those thresholds.

#### Reward Calculation
Points are awarded for completing financial tasks or goals; the calculation factors in task type, frequency, and any completion streaks to drive user engagement.

## Software Tools and Frameworks

### Current Technology Stack
- Node.js + Express (backend API framework)
- MySQL (relational database)
- React (or plain HTML/CSS/JavaScript) for the frontend
- Docker (for containerized deployment)
- AWS EC2 running Ubuntu 22.04 (cloud hosting)
- Let's Encrypt + Certbot (SSL certificates)

### Planned Integrations
- Firebase Authentication (optional, for user auth & password resets)
- GenAI API (for the LemonAid assistant)
- Tesseract OCR or Google Vision API (automatic receipt scanning)

Any new tools will be approved by the instructor before implementation.
