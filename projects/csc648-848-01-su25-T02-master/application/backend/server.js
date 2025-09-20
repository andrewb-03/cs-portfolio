/**
 * @file server.js
 * @summary Initializes the Express server with MySQL, session handling, routes, and HTTPS for development only.  
 * In production, HTTPS is handled by Nginx (Let’s Encrypt), so Express runs plain HTTP.
 */

const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : 
                process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, envFile) });
console.log(`🔧 Loaded environment: ${envFile}`);

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const fs = require('fs');
const https = require('https');


const lemonaidRoute = require('./routes/lemonaid');
const UserModel = require('./models/User');
const signupRoutes = require('./routes/signup');

const app = express();

app.set('trust proxy', 1);
// Load HTTPS certs
//const key = fs.readFileSync('./ssl/server.key');
//const cert = fs.readFileSync('./ssl/server.cert');
//const httpsOptions = { key, cert };

// Middleware (placed before routes)
app.use(cors({
  origin: 'https://limoney.org',
  credentials: true
}));
app.use(express.json());

// Main async server logic
(async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('✅ Connected to MySQL');

    const sessionStore = new MySQLStore({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    app.use(session({
      key: 'session_cookie_name',
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        domain: 'limoney.org',
        maxAge: 1000 * 60 * 60 * 2
      }
    }));

    // Routes (after session)




    const supportTicketsRoutes = require('./routes/support-tickets');
    app.use('/api/support-tickets', (req, res, next) => {
      req.db = db;
      next();
    }, supportTicketsRoutes);



    const supportRoutes = require('./routes/support-tickets');
    app.use('/api/support-tickets', supportRoutes);


    const budgetChat = require('./routes/budget-chat');
    app.use('/api', budgetChat);

    const personalInfoRoute = require('./routes/personalinfo_edit')(db);
    app.use('/api/personalinfo_edit', personalInfoRoute);
    const budgetRoutes = require('./routes/budget')(db);
    app.use('/api/budget', budgetRoutes);

    const notificationRoute = require('./routes/notifications');
    app.use('/api/notifications', notificationRoute(db));

    const deleteAccountRoute = require('./routes/deleteAccount')(db);
    app.use('/api/delete-account', deleteAccountRoute);

    const authRoutes = require('./routes/auth')(db);
    app.use('/api', authRoutes);

    const transactionRoutes = require('./routes/transactions')(db);
    app.use('/api/transactions', transactionRoutes);

    const reviewRoutes = require('./routes/reviews')(db);
    app.use('/api/reviews', reviewRoutes);

    const reimbursementsRoute = require('./routes/reimbursement');
    app.use('/api/reimbursements', reimbursementsRoute(db));

    app.use('/api', lemonaidRoute); // OK to leave here if no DB/session use

    const plaidRoutes = require('./routes/plaid');
    app.use('/api/plaid', (req, res, next) => {req.db = db; next();}, plaidRoutes);

    // Health check route
    const healthRoutes = require('./routes/health');
    app.use('/api', healthRoutes);

    const signup = signupRoutes(db);
    app.post('/api/signup', signup.signup);

    const accountsRoutes = require('./routes/accounts');
    app.use('/api/accounts', (req, res, next) => { req.db = db; next(); }, accountsRoutes);

    const accountBalanceRoutes = require('./routes/accountBalance');
    app.use('/api/accounts/balances', (req, res, next) => { req.db = db; next(); }, accountBalanceRoutes);

    const userAccountRoutes = require('./routes/userAccounts');
    app.use('/api/user-accounts', (req, res, next) => { req.db = db; next(); }, userAccountRoutes);


    const manualAccountsRoutes = require('./routes/manualAccounts');
    app.use('/api/manual-accounts', (req, res, next) => { req.db = db; next(); }, manualAccountsRoutes);
    
    const manualTransactionsRoutes = require('./routes/manualTransactions');
    app.use('/api/manual-transactions', (req, res, next) => { req.db = db; next(); }, manualTransactionsRoutes);

    const subscriptionRoutes = require('./routes/subscriptions');
    app.use('/api/subscriptions', (req, res, next) => {req.db = db;next();}, subscriptionRoutes(db));

    const languageRoute = require('./routes/language');
    app.use('/api/language', languageRoute(db));



      // Launch server based on environment
      if (process.env.NODE_ENV === 'production') {
        // In production, use HTTP (HTTPS handled by reverse proxy)
        app.listen(5000, () => {
          console.log(`Production server running on port 5000`);
        });
      } else {
        // In development, use HTTPS
          const key = fs.readFileSync('./ssl/server.key');
          const cert = fs.readFileSync('./ssl/server.cert');
          const httpsOptions = { key, cert };
          https.createServer(httpsOptions, app).listen(5000, () => {
          console.log(`HTTPS server running at ${process.env.URL_BACKEND_PORT}`);
        });
      }

  } catch (err) {
    console.error('MySQL connection error:', err);
  }
})();
