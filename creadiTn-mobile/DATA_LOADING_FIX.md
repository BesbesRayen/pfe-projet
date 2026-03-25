# Data Loading Fix - Backend Integration

## Current Issue
All screens use hardcoded **mock data** loaded via `setTimeout`. They don't call the actual backend APIs.

## Solution
Replace mock data with real API calls for each screen.

---

## 🔧 Example Fix: HomeScreen

### BEFORE (Current - Mock Data):
```typescript
useEffect(() => {
  // Simulate loading user profile
  const timer = setTimeout(() => {
    setProfile({
      firstName: 'Rayen',
      lastName: 'Ben Ahmed',
      creditScore: 725,
      kycStatus: 'PENDING',
      cashback: 4250,
    });
    setLoading(false);
  }, 1500);

  return () => clearTimeout(timer);
}, []);
```

### AFTER (Fixed - Real API Call):
```typescript
useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Call the actual backend API
      const response = await userApi.getProfile();
      setProfile({
        firstName: response.firstName,
        lastName: response.lastName,
        creditScore: response.creditScore || 0,
        kycStatus: response.kycStatus || 'NOT_SUBMITTED',
        cashback: response.cashback || 0,
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
      // Fallback to empty state
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);
```

---

## 📋 Screens That Need Backend Integration

### 1. HomeScreen
**API Call:** `userApi.getProfile()`
**Data Needed:**
- firstName
- lastName
- creditScore
- kycStatus
- cashback

**Backend Endpoint:** `GET /api/users/profile`

---

### 2. MyCreditsScreen
**API Call:** `creditApi.getCredits()`
**Data Needed:**
- Credits list with:
  - id, name, merchant
  - totalAmount, monthlyInstallment
  - paidInstallments, totalInstallments
  - status (ACTIF, RETARD, TERMINÉ)
  - nextPaymentDate, penalty

**Backend Endpoint:** `GET /api/credits`

---

### 3. ProfileScreen
**API Call:** `userApi.getProfile()`
**Data Needed:**
- firstName, lastName
- email, phone
- creditScore
- kycStatus
- joinDate

**Backend Endpoint:** `GET /api/users/profile`

---

### 4. InstallmentsScreen
**API Call:** `creditApi.getInstallments(creditId)`
**Data Needed:**
- installments list with:
  - dueDate
  - amount
  - status (PAID, DUE, OVERDUE)
  - penalty (if any)

**Backend Endpoint:** `GET /api/credits/{creditId}/installments`

---

## ✅ API Services Available

Check `src/api/` folder:
- `users.ts` - User profile, KYC, etc.
- `credits.ts` - Credit list, details
- `payments.ts` - Payment processing
- `score.ts` - Credit score
- `merchants.ts` - Merchant information
- `notifications.ts` - Notifications

Example usage:
```typescript
import { userApi } from '../api';

const profile = await userApi.getProfile();
```

---

## 🔄 Loading State Pattern

Use this pattern in all screens for consistency:

```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<DataType | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getData();
      setData(response);
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

// In render:
if (loading) return <SafeAreaView><Loader /></SafeAreaView>;
if (error) return <Text style={{color: colors.danger}}>{error}</Text>;
if (!data) return <Text>No data</Text>;

// Render data...
```

---

## 🚨 Common Issues & Fixes

### 1. "Cannot read property 'firstName' of undefined"
**Cause:** `profile` is null before API returns
**Fix:** 
```typescript
<Text>{profile?.firstName || 'Loading...'}</Text>
```

### 2. "401 Unauthorized"
**Cause:** Token expired or not sent
**Fix:** Check `tokenApi` setup in auth context

### 3. "CORS error"
**Cause:** Backend not allowing cross-origin requests
**Fix:** Check Spring Boot `@CrossOrigin` annotations

### 4. "Network request failed"
**Cause:** Phone can't reach computer IP
**Fix:** 
- Verify WiFi same network
- Check `http://192.168.1.167:8081/swagger-ui.html` loads

---

## 📝 Quick Checklist

After implementing API calls:
- [ ] HomeScreen shows real user data
- [ ] MyCreditsScreen shows real credits list
- [ ] ProfileScreen shows real profile
- [ ] InstallmentsScreen loads payment schedule
- [ ] Error messages show if API fails
- [ ] Loading spinners appear while fetching
- [ ] No console errors
- [ ] Data updates when navigating back to screen

---

## Testing Commands

Check if endpoints exist:
```bash
# In your dev environment, test endpoints:
curl http://192.168.1.167:8081/swagger-ui.html
curl http://192.168.1.167:8081/api/users/profile
curl http://192.168.1.167:8081/api/credits
```

Check backend logs:
```bash
# Terminal where Spring Boot runs
# Look for INFO/DEBUG logs confirming requests
```
