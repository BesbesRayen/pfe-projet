# 🚀 Quick Start - Full Stack Testing

## 📊 System Status

### ✅ Services Running
```
Backend (Spring Boot)    → http://localhost:8081
Mobile App (Expo)        → npm start terminal
Database (MySQL)         → localhost:3306/nextjs_db
```

### 🔗 Important Links

**API Documentation**
- Swagger UI: http://localhost:8081/swagger-ui.html
- OpenAPI Docs: http://localhost:8081/api-docs

**File Uploads**
- Location: `./uploads/` directory
- Max file size: 10 MB
- Access via: http://localhost:8081/api/files/**

---

## 🧪 Quick Testing Steps

### Step 1: Verify Backend is Running
```bash
# Check if port 8081 is listening
netstat -ano | findstr 8081

# Expected output: Shows PID listening on 8081
```

### Step 2: Start Mobile App
```bash
cd c:\Users\rayen\IdeaProjects\creadiTn-mobile
npm start

# Then press:
# 'a' for Android Emulator
# 'i' for iOS Simulator
# 'w' for web browser
```

### Step 3: Test Authentication
1. Register: `test@example.com` / `Password123!`
2. Verify success message
3. Login with same credentials
4. Should redirect to Home screen

### Step 4: Test KYC Flow
1. On Home screen, click KYC Status Card
2. Upload CIN images (front & back)
3. Capture selfie
4. Submit all documents
5. Check status on KYC Status screen

### Step 5: Test Merchant Carousel
1. Scroll down on Home screen
2. See "Discover our partners" section
3. Swipe through merchant cards
4. Tap one merchant to verify link opens

### Step 6: Test Navigation
- Switch between 4 tabs: Home, Payments, Wallet, Menu
- Verify data persists
- Check all menu items work

---

## 🔍 Using Swagger to Test API Directly

### Access Swagger UI
1. Open browser: http://localhost:8081/swagger-ui.html
2. Browse available endpoints
3. Click on endpoint to expand
4. Click "Try it out"
5. Add parameters/body
6. Click "Execute"

### Example API Tests

**Register User**
```json
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Login**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Get User Profile**
```
GET /api/users/{userId}
(Include Authorization header with token)
```

**Upload KYC**
```
POST /api/kyc/upload-multipart
- Select files for: cinFront, cinBack, selfie
- Add userId parameter
```

---

## 🐛 Troubleshooting

### Mobile App Can't Connect to Backend

**Problem**: API requests fail, 500 errors
**Solution**:
1. Verify backend is running: `netstat -ano | findstr 8081`
2. Check mobile app config: `src/api/config.ts`
3. If using physical device, verify LAN_HOST is correct
4. Clear app cache: `npm run build` and restart

### Images Not Uploading

**Problem**: KYC image upload fails
**Solution**:
1. Check file size < 10MB (limit in application.properties)
2. Ensure permissions granted (camera, gallery)
3. Check uploads directory exists and is writable
4. Verify file format is JPEG/PNG

### Database Connection Error

**Problem**: MySQL connection fails
**Solution**:
1. Start MySQL service: `net start MySQL57` (or your version)
2. Verify credentials in application.properties
3. Create database: `CREATE DATABASE nextjs_db;`
4. Run migrations if needed

### Port Already in Use

**Problem**: Port 8081 already in use
**Solution**:
```bash
# Kill process using port 8081
netstat -ano | findstr 8081
taskkill /PID {PID} /F

# Or change port in application.properties:
# server.port=8081 → server.port=8080
```

---

## 📋 Testing Checklist

Run through this checklist to verify everything works:

**Backend**
- [ ] Backend running on port 8081
- [ ] Swagger UI accessible at /swagger-ui.html
- [ ] Database connected and accessible
- [ ] No errors in console logs

**Mobile App**
- [ ] Expo dev server started
- [ ] App loads without crashes
- [ ] Can see splash screen
- [ ] Can navigate to login/register

**Authentication**
- [ ] Can register new user
- [ ] New user saved to database
- [ ] Can login with new credentials
- [ ] Token generated and stored
- [ ] Can logout and login again

**KYC Flow**
- [ ] Can upload CIN images
- [ ] Image files saved to uploads directory
- [ ] Can capture selfie
- [ ] All 3 files uploaded together
- [ ] Status updates after submission

**Merchant Carousel**
- [ ] 8 merchants display
- [ ] Can swipe through carousel
- [ ] Cards have emoji, name, tag
- [ ] Tapping card doesn't crash

**Navigation**
- [ ] All 4 tabs accessible
- [ ] Data persists between tabs
- [ ] All menu items clickable
- [ ] Settings/dark mode work

**API Endpoints**
- [ ] GET /api/users/{id} returns user data
- [ ] GET /api/merchants returns merchant list
- [ ] POST /api/kyc/upload-multipart accepts files
- [ ] POST /api/auth/login returns token

---

## 📈 Performance Baseline

Set these as your baseline for comparison:

```
App Startup Time:        < 5 seconds
API Response Time:       < 2 seconds
KYC Upload Time:         < 5 seconds (with files)
Memory Usage:            100-200 MB normal, < 300 MB peak
Carousel Scroll FPS:     60 FPS (smooth)
Memory Leaks:            None (checked after 10 min usage)
```

---

## 📞 Support Resources

**Spring Boot Docs**: https://spring.io/projects/spring-boot
**React Native Docs**: https://reactnative.dev
**Expo Docs**: https://docs.expo.dev
**MySQL Docs**: https://dev.mysql.com/doc

---

## ✅ Final Testing Sign-Off

When all items in the checklist are verified, testing is **COMPLETE**.

**Ready to test? Start with:**
```bash
# Terminal 1: Backend is running
netstat -ano | findstr 8081

# Terminal 2: Start mobile app
cd c:\Users\rayen\IdeaProjects\creadiTn-mobile
npm start
```

Then follow the "Quick Testing Steps" above.

Good luck! 🎉
