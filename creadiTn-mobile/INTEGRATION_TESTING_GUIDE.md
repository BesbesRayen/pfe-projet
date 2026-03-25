# 🧪 Complete Project Testing Guide - Backend + Mobile App

## ✅ Current Status

### Services Running
- ✅ **Backend (Spring Boot)**: Port 8081 - RUNNING
  - Java application on http://localhost:8081
  - Handles all API endpoints
  
- ✅ **Mobile App (React Native/Expo)**: Port 8082 - RUNNING
  - Development server ready for testing
  - Connected to backend on port 8081

- ℹ️ **Dashboard (Next.js)**: Port 3000 - Available
  - Not currently running, can be started separately

---

## 🔌 API Connection Configuration

### Mobile App Backend Settings
**File**: `src/api/config.ts`

```typescript
// Current Configuration:
USE_LAN_FOR_DEVICE = true
LAN_HOST = '192.168.1.167'
API_BASE_URL = 'http://10.0.2.2:8081' (Android Emulator)
               'http://127.0.0.1:8081' (iOS Simulator)
               'http://192.168.1.167:8081' (Physical Device)
```

### Backend Port
- **Development**: http://localhost:8081
- **Production**: Configure as needed

---

## 📋 Testing Scenarios

### 1. **Authentication Flow** 🔐

#### Test Case 1.1: User Registration
```
1. Open mobile app
2. Navigate to Register screen
3. Enter:
   - Email: test@example.com
   - Password: Password123!
   - Confirm Password: Password123!
4. Tap Register button
5. Verify: User created and redirected to Login
```

#### Test Case 1.2: User Login
```
1. On Login screen
2. Enter credentials:
   - Email: test@example.com
   - Password: Password123!
3. Tap Login button
4. Verify: Login succeeds and app navigates to Home screen
5. Check: User data persists in AsyncStorage
```

#### Test Case 1.3: Forgot Password
```
1. On Login screen, tap "Forgot Password?"
2. Enter email: test@example.com
3. Tap "Send Reset Link"
4. Verify: Success message shown
5. Check backend logs for email trigger (if configured)
```

---

### 2. **KYC (Identity Verification) Flow** 🆔

#### Test Case 2.1: Upload CIN (Front)
```
1. On Home screen, click "KYC Status Card"
2. Click "Start KYC Verification"
3. On KYC screen, upload CIN Front:
   - Tap "CIN Recto"
   - Select image from gallery
4. Verify: Image shows as uploaded (checkmark visible)
5. Check API request to /api/kyc/upload
```

#### Test Case 2.2: Upload CIN (Back)
```
1. Click "CIN Verso"
2. Select image from gallery
3. Verify: Image uploaded successfully
4. Check: Both recto and verso marked as complete
```

#### Test Case 2.3: Selfie Capture
```
1. Click "Next →" button
2. On selfie step, click "📱 Ouvrir la caméra"
3. Grant camera permissions
4. Take selfie photo
5. Verify: Photo captured and displayed
6. Click "✅ Soumettre le KYC" to submit all documents
```

#### Test Case 2.4: KYC Status Verification
```
1. After submission, navigate to KYC Status screen
2. Verify status displayed (PENDING/APPROVED/REJECTED)
3. Check: Status persists after app restart
4. Verify: HomeScreen KYC card updates with new status
```

---

### 3. **Merchant Discovery** 🛍️

#### Test Case 3.1: Merchant Carousel Browsing
```
1. On Home screen, scroll to "Discover our partners" section
2. Swipe left/right through merchant carousel
3. Verify: Smooth scrolling performance
4. Verify: All merchants display correctly with:
   - Icon/emoji
   - Merchant name
   - Tag (Popular/New/Featured)
```

#### Test Case 3.2: Merchant Card Interactions
```
1. Tap on a merchant card
2. Verify: Scale animation occurs (visual feedback)
3. Verify: Merchant link opens (should navigate to website)
4. Test multiple merchants quickly (stress test)
```

---

### 4. **Navigation & UI** 🧭

#### Test Case 4.1: Bottom Tab Navigation
```
1. Test each tab:
   - Home 🏠 → Displays home screen
   - Payments 💳 → Shows payment/credits screen
   - Wallet 👛 → Shows rewards/wallet
   - Menu ☰ → Shows menu/profile screen
   
2. Verify: Data persists when switching tabs
3. Verify: Smooth transitions between tabs
```

#### Test Case 4.2: Menu Screen
```
1. Navigate to Menu tab
2. Verify displays:
   - User avatar + name + email
   - Profile option
   - Identity Verification option
   - Settings option
   - Help & Support option
3. Tap each menu item and verify navigation
4. Tap Logout and verify confirmation dialog
```

#### Test Case 4.3: Settings Screen
```
1. From Menu, tap Settings
2. Verify all sections:
   - 🎨 Appearance (Dark Mode toggle)
   - 💳 Payment (Autopay toggle)
   - 🔔 Notifications (toggle + SMS option)
   - 👤 Account (Profile, Language, Notifications)
3. Test dark mode toggle and verify theme changes
4. Test language selection modal
```

---

### 5. **API Endpoints Testing** 🔗

#### Core Endpoints to Verify

**Authentication**
- ✅ POST `/api/auth/register` - Create new user
- ✅ POST `/api/auth/login` - User login
- ✅ POST `/api/auth/forgot-password` - Password reset request

**KYC**
- ✅ POST `/api/kyc/upload-multipart` - Upload CIN + Selfie
- ✅ GET `/api/kyc/status?userId={id}` - Get KYC status
- ✅ GET `/api/kyc/{docId}` - Get specific KYC document

**Users**
- ✅ GET `/api/users/{userId}` - Get user profile
- ✅ PUT `/api/users/{userId}` - Update user info
- ✅ GET `/api/users/{userId}/credit-score` - Get credit score

**Merchants**
- ✅ GET `/api/merchants` - List all merchants
- ✅ GET `/api/merchants/{id}` - Get merchant details
- ✅ GET `/api/merchants/search?q=keyword` - Search merchants

**Payments & Transactions**
- ✅ GET `/api/payments` - Get user transactions
- ✅ POST `/api/payments/simulate` - Simulate payment
- ✅ GET `/api/credits` - Get credit offers

---

## 🧬 Database Testing

### Check Database State
```sql
-- Verify user was created
SELECT * FROM users WHERE email = 'test@example.com';

-- Verify KYC document
SELECT * FROM kyc_documents WHERE user_id = {user_id};

-- Verify transactions
SELECT * FROM transactions WHERE user_id = {user_id};
```

---

## 📊 Performance Testing

### Metrics to Monitor
1. **API Response Time**
   - Expected: < 2 seconds for most endpoints
   - Login: < 1.5 seconds
   - KYC upload: < 5 seconds (files)

2. **App Startup Time**
   - Cold start: < 5 seconds
   - Hot reload: < 2 seconds

3. **Memory Usage**
   - Typical: 100-200 MB
   - Peak (carousel scroll): < 300 MB

4. **Network Bandwidth**
   - KYC upload: ~5-10 MB per submission
   - Typical API call: 1-50 KB

---

## 🐛 Debugging & Logging

### Check Mobile App Logs
```bash
# In React Native console
Open dev menu (Ctrl+M on Android, Cmd+D on iOS)
- Enable Remote Debugging
- View console logs
```

### Check Backend Logs
```bash
# View Spring Boot logs
tail -f logs/application.log

# Or if using console output
# Logs appear in terminal where backend started
```

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Cannot connect to backend | API_BASE_URL wrong | Update config.ts LAN_HOST |
| 500 errors on login | Database not initialized | Run SQL migrations |
| Image upload fails | File size too large | Compress images before upload |
| Slow API responses | Backend overloaded | Check backend memory/CPU |
| Certificate errors | HTTPS config issue | Use HTTP for development |

---

## ✨ Test Execution Checklist

Before declaring testing complete, verify:

- [ ] **Authentication**
  - [ ] Register new user
  - [ ] Login with credentials
  - [ ] Logout and re-login
  - [ ] Forgot password flow

- [ ] **KYC Flow**
  - [ ] Upload CIN front/back
  - [ ] Capture selfie
  - [ ] Submit all documents
  - [ ] Check status updates

- [ ] **UI/UX**
  - [ ] All buttons work
  - [ ] Animations smooth
  - [ ] No lag or crashes
  - [ ] Text readable

- [ ] **Navigation**
  - [ ] Tab switching works
  - [ ] Menu items navigate correctly
  - [ ] Back button functions properly
  - [ ] Data persists

- [ ] **API Integration**
  - [ ] Backend responds to requests
  - [ ] Data saved correctly
  - [ ] No 500 errors
  - [ ] Proper error handling

- [ ] **Performance**
  - [ ] App launches in < 5 seconds
  - [ ] No memory leaks
  - [ ] Smooth scrolling
  - [ ] No freezing

---

## 🚀 How to Start Testing

### Quick Start Command
```bash
# Terminal 1: Backend is already running on :8081
# Terminal 2: Start mobile app
cd c:\Users\rayen\IdeaProjects\creadiTn-mobile
npm start

# Then:
# - Press 'i' for iOS Simulator
# - Press 'a' for Android Emulator
# - Or scan QR code with Expo Go on physical device
```

### Test on Different Devices

**Android Emulator**
```
npm start
Press 'a' to open Android Emulator
```

**iOS Simulator**
```
npm start
Press 'i' to open iOS Simulator
```

**Physical Device**
```
npm start
Scan QR code with Expo Go app
Ensure device on same Wi-Fi as PC (192.168.1.x)
```

---

## 📈 Integration Test Report Template

```
Date: [?]
Tester: [?]
Device: [?]
Backend Version: [?]
App Version: [?]

PASS/FAIL: [?]

Tests Passed: [?]/[?]
Tests Failed: [?]
Tests Skipped: [?]

Issues Found:
1. [Issue description]
2. [Issue description]

Performance Notes:
- App startup: [?] seconds
- API response times: [?] ms average
- Memory usage: [?] MB

Recommendations:
[?]
```

---

## 🎯 Success Criteria

The testing is **COMPLETE & SUCCESSFUL** when:

✅ All authentication flows work end-to-end
✅ KYC upload succeeds with all document types
✅ Merchant carousel displays and interacts smoothly
✅ All 4 bottom tabs navigate correctly
✅ Menu/Settings accessible and functional
✅ Backend responds to all API calls properly
✅ No crashes or unhandled errors
✅ App performs smoothly on emulator/device
✅ Data persists across sessions
✅ Logout and login cycles work repeatedly

---

**Status**: ✅ **Ready for Full Integration Testing**

Backend running on port 8081, mobile app ready on Expo. Begin testing scenarios above!
