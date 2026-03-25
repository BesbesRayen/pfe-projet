# Frontend Testing & Debugging Guide

## ✅ FIXES APPLIED

### 1. Text Visibility Fixed
- Added explicit colors to ALL textStyles (primary, dark, gray colors)
- Colors hardcoded to avoid circular imports
- Updated tab bar labels to show in dark color
- All Text components now have color inheritance

### 2. API Connection Fixed  
- Configured to use your LAN IP: **192.168.1.167:8081**
- Auto-detects Expo Go physical device
- Added debug logging for API URL

### 3. Navigation Fixed
- Removed manual navigation after login
- Uses authentication state to switch screens
- Fixed tab navigation structure

---

## 🧪 TESTING CHECKLIST

### Login Screen
- [ ] "Email" label visible
- [ ] "Password" label visible
- [ ] Buttons have text: "Sign In", "Continue with Google", "Register"
- [ ] Branding text visible: "Creadi" and "Payez en toute liberté"
- [ ] Error messages display properly
- [ ] Try login with test account

**Test Credentials:**
```
Email: test@example.com
Password: test123456
```

### Home Screen (after login)
- [ ] Welcome greeting visible: "Hello, [Name]! 👋"
- [ ] Email address displayed
- [ ] Quick Actions buttons show icons AND labels:
  - 📊 Simulator
  - 🏪 Merchants
  - 📅 Échéances
  - 🎁 Rewards
- [ ] "View Full Profile" button text visible
- [ ] Branding bar shows: "CTN" logo + "Creadi"

### Tab Navigation (Bottom)
- [ ] All 5 tab labels visible and readable:
  - 🏠 Accueil (Home)
  - 💳 Crédits (Credits)
  - 🧮 Simulateur (Simulator)
  - 🎁 Avantages (Rewards)
  - 👤 Profil (Profile)
- [ ] Labels change color when active/inactive
- [ ] Tapping tabs switches screens

### My Credits Screen (Credits Tab)
- [ ] Screen title visible: "Mes Crédits"
- [ ] Filter buttons show text: "Tous", "Actifs", "Retard", "Terminés"
- [ ] Credit cards display with text (if data loads)

### Profile Screen (Profile Tab)
- [ ] User name visible
- [ ] Email visible
- [ ] Menu items show text AND icons
- [ ] "Logout" button has text

### Simulator & Rewards Tabs
- [ ] All labels and buttons visible
- [ ] Forms show field labels
- [ ] Results display with numbers

---

## ⚠️ KNOWN ISSUES TO FIX

### 1. Data Not Loading from Backend
**Issue:** Screens use hardcoded mock data instead of API calls
**Affected Screens:**
- HomeScreen (profile data)
- MyCreditsScreen (credit list)
- ProfileScreen (user info)
- InstallmentsScreen (payment schedule)

**Fix Needed:** Replace setTimeout mock data with actual API calls

**Example (HomeScreen):**
```typescript
// TODO: Replace this:
const timer = setTimeout(() => {
  setProfile({ /* mock data */ });
}, 1500);

// With this:
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await userApi.getProfile();
      setProfile(response);
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, []);
```

### 2. Google Sign-In Not Working
**Issue:** Backend endpoint `/api/auth/google-login` doesn't exist
**Status:** Returns 404 error
**Fix Needed:** Implement Google Sign-In endpoint in Spring Boot backend

### 3. Additional Screens Not Tested
- KYC Upload Screen
- Installments (Modal)
- Merchants (Modal)
- Settings (Modal)

---

## 🔧 TROUBLESHOOTING

### If Text STILL Not Visible:
1. Check device is on SAME WiFi as computer
2. Try full page refresh in Expo (Pull down gesture on iOS)
3. Check console for JavaScript errors
4. Verify textStyles are imported correctly

### If Buttons Don't Work:
1. Check navigation routes are defined
2. Verify onPress handlers exist
3. Check if screen disabled due to loading state

### If API Calls Fail:
1. Verify backend is running: `netstat -ano | findstr 8081`
2. Check computer IP: `ipconfig | findstr IPv4`
3. Verify `/swagger-ui.html` loads on phone browser
4. Check console logs for API errors

---

## 📱 HOW TO TEST on Phone

1. **Make sure WiFi is on:**
   - Same WiFi as computer
   - Network name visible in settings

2. **Expo QR Code:**
   - Press `i` in terminal for iOS
   - Scan QR code with Expo Go app
   - Wait for app to load

3. **Check Console Output:**
   ```
   LOG API_BASE_URL: http://192.168.1.167:8081 isExpoGo: true
   ```
   This confirms API URL is correct

4 **Test Interactions:**
   - Tap buttons and check if they respond
   - Check navigation between tabs
   - Try submitting forms

---

## 📋 SUMMARY OF CHANGES

### Files Modified:
1. `src/theme/typography.ts` - Added explicit colors to all textStyles
2. `src/theme/colors.ts` - Consolidated color definitions
3. `src/theme/index.ts` - Cleaned up theme exports
4. `src/components/Button.tsx` - Explicit font sizes
5. `src/components/Input.tsx` - Explicit font sizes
6. `src/screens/LoginScreen.tsx` - Fixed navigation, explicit text colors
7. `src/screens/RegisterScreen.tsx` - Fixed navigation, explicit text colors
8. `src/screens/SplashScreen.tsx` - Fixed text colors
9. `src/navigation/AppNavigator.tsx` - Added tab label colors
10. `src/api/config.ts` - Configured for physical device (192.168.1.167)

### Key Fixes:
✅ Text color now explicit in all textStyles
✅ All components use explicit fontSize and fontWeight  
✅ API configured for LAN IP (192.168.1.167:8081)
✅ Navigation properly uses auth state changes
✅ Tab bar labels have explicit colors
