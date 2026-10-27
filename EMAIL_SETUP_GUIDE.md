# Email Setup Troubleshooting Guide

## 🔧 **Issues Fixed:**

### ✅ **1. EmailJS Script Not Loaded**
- **Problem**: The EmailJS library wasn't included in your HTML
- **Solution**: Added EmailJS CDN script and initialization

### ✅ **2. Better Error Handling**
- **Problem**: Generic error messages made debugging difficult
- **Solution**: Added detailed error logging and specific error messages

## 📧 **EmailJS Configuration Check:**

Your current configuration:
- **Service ID**: `service_88g26s5`
- **Template ID**: `template_2bti6tg`
- **User ID**: `rOj8i-yE5DRNiOj4U`
- **Recipient Email**: `divyratan2703@gmail.com`

## 🔍 **Troubleshooting Steps:**

### **Step 1: Verify EmailJS Account**
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Check if your account is active
3. Verify your service and template IDs are correct

### **Step 2: Check Email Service Setup**
1. In EmailJS dashboard, go to **Email Services**
2. Make sure your email service (Gmail/Outlook) is connected
3. Test the connection

### **Step 3: Verify Email Template**
1. Go to **Email Templates** in EmailJS dashboard
2. Check template `template_2bti6tg` exists
3. Verify template variables match:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{to_email}}`

### **Step 4: Check Email Quotas**
1. EmailJS has free tier limits (200 emails/month)
2. Check if you've exceeded the quota
3. Upgrade plan if needed

### **Step 5: Test the Form**
1. Open browser developer tools (F12)
2. Go to Console tab
3. Fill out and submit the contact form
4. Check for any error messages in console

## 🚨 **Common Issues & Solutions:**

### **Issue 1: "EmailJS not loaded" Error**
- **Cause**: Script not loading properly
- **Solution**: Check internet connection, try refreshing page

### **Issue 2: "Invalid template" Error**
- **Cause**: Template ID doesn't exist or is incorrect
- **Solution**: Verify template ID in EmailJS dashboard

### **Issue 3: "Service not found" Error**
- **Cause**: Service ID is incorrect
- **Solution**: Check service ID in EmailJS dashboard

### **Issue 4: Emails not received**
- **Possible Causes**:
  - Check spam/junk folder
  - Email service not properly connected
  - Template variables not matching
  - EmailJS quota exceeded

## 🧪 **Testing Steps:**

1. **Open the website** and go to contact form
2. **Open browser console** (F12 → Console tab)
3. **Fill out the form** with test data
4. **Submit the form** and watch console for messages
5. **Check for success/error notifications** on the page

## 📱 **Fallback System:**

If EmailJS fails, the form will:
1. Show an error message
2. Wait 3 seconds
3. Automatically open your default email client
4. Pre-fill the email with form data

## 🔧 **Manual Testing:**

To test EmailJS directly:
```javascript
// Open browser console and run:
emailjs.send('service_88g26s5', 'template_2bti6tg', {
    from_name: 'Test User',
    from_email: 'test@example.com',
    subject: 'Test Subject',
    message: 'Test Message',
    to_email: 'divyratan2703@gmail.com'
}, 'rOj8i-yE5DRNiOj4U')
.then(response => console.log('Success:', response))
.catch(error => console.log('Error:', error));
```

## 📞 **Next Steps:**

1. **Test the form** with the fixes applied
2. **Check console** for any error messages
3. **Verify EmailJS setup** in dashboard
4. **Check spam folder** for test emails
5. **Contact EmailJS support** if issues persist

## 🆘 **If Still Not Working:**

1. **Double-check all IDs** in EmailJS dashboard
2. **Create a new template** with correct variables
3. **Test with a different email service** (Gmail → Outlook)
4. **Check EmailJS status page** for service issues
5. **Try the fallback email client** option

---

**Note**: The form now has better error handling and will show specific error messages to help identify the exact issue.
