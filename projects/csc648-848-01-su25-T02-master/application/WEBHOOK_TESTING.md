# 🔗 Local Webhook Testing Guide

## **Why Test Locally?**

Testing webhooks locally before deployment is **crucial** because:
- ✅ **Catch bugs early** - Fix issues before production
- ✅ **Verify webhook logic** - Ensure transactions are processed correctly
- ✅ **Test error handling** - See how your app handles webhook failures
- ✅ **Save time** - Avoid debugging production issues

## **🚀 Quick Start**

### **1. Start ngrok Tunnel**
```bash
./test-webhook.js
```

This will:
- Start ngrok tunnel to your local backend
- Create a public HTTPS URL
- Generate `.env.test` file
- Show you the webhook URL to use

### **2. Start Backend with Test Environment**
```bash
cd backend
NODE_ENV=test npm start
```

### **3. Update Plaid Dashboard**
1. Go to your Plaid Dashboard
2. Navigate to Webhooks section
3. Add the ngrok URL: `https://your-tunnel.ngrok.io/api/plaid/webhook`
4. Save the webhook configuration

### **4. Test Webhook**
1. Create a test transaction in Plaid Sandbox
2. Check your backend logs for webhook events
3. Verify transactions appear in your database

## **🔍 What to Look For**

### **Successful Webhook Logs:**
```
Plaid Webhook received: {
  webhook_type: 'TRANSACTIONS_DEFAULT_UPDATE',
  item_id: 'test-item-id',
  new_transactions: 1
}
Webhook: Imported 1 new transactions for user 123
```

### **Database Verification:**
```sql
SELECT * FROM UserTransaction 
WHERE source = 'plaid' 
ORDER BY date DESC 
LIMIT 5;
```

## **🐛 Common Issues**

### **1. Webhook Not Received**
- Check ngrok tunnel is running
- Verify webhook URL in Plaid Dashboard
- Ensure backend is running on port 5000

### **2. Database Connection Issues**
- Check MySQL is running
- Verify database credentials in `.env.test`
- Test database connection manually

### **3. Transaction Not Imported**
- Check webhook logs for errors
- Verify `plaidTransactionId` uniqueness
- Check database permissions

## **📊 Testing Scenarios**

### **Test 1: New Transaction**
1. Create transaction in Plaid Sandbox
2. Verify webhook received
3. Check transaction in database
4. Verify frontend notification

### **Test 2: Duplicate Transaction**
1. Send same webhook twice
2. Verify only one transaction imported
3. Check for duplicate prevention

### **Test 3: Invalid Webhook**
1. Send malformed webhook data
2. Verify error handling
3. Check application stability

## **🔧 Manual Webhook Testing**

You can also test webhooks manually:

```bash
# Test webhook endpoint
curl -X POST https://your-tunnel.ngrok.io/api/plaid/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_type": "TRANSACTIONS_DEFAULT_UPDATE",
    "item_id": "test-item",
    "new_transactions": 1
  }'
```

## **✅ Success Criteria**

Your webhook testing is successful when:
- ✅ Webhook events are logged
- ✅ Transactions are imported to database
- ✅ No duplicate transactions
- ✅ Error handling works
- ✅ Frontend shows notifications

## **🚀 Ready for Production**

Once local testing is successful:
1. Deploy to production
2. Update webhook URL to production domain
3. Test with real Plaid sandbox transactions
4. Monitor production logs

---

**💡 Tip**: Always test webhooks locally before deploying to production! 