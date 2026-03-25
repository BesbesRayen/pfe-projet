# 🔧 Mobile App Troubleshooting Guide - Only Seeing Login Page

## Problem
You can only see the login page on your phone - the app doesn't load the main home screen after login (or doesn't seem to respond).

---

## ✅ Solution: Network Configuration

### 1️⃣ Verify WiFi Connection (CRITICAL)

Your phone **MUST** be on the same WiFi network as your PC.

**On PC:**
```bash
# Check your PC's WiFi network name
ipconfig
# Look for: "Wireless LAN adapter WiFi" → "Default Gateway" or "DNS Servers"
```

**On Phone:**
- Settings → WiFi
- Connect to the **SAME** network as your PC
- Do NOT use mobile data

### 2️⃣ Verify IP Address Matches

**On PC - Run this:**
```bash
ipconfig | findstr "IPv4"
```

Expected output:
```
IPv4 Address. . . . . . . . . . . : 192.168.1.167
```

**If different from 192.168.1.167:**
- Update the IP in: `creadiTn-mobile/src/api/config.ts`
- Replace `LAN_HOST = '192.168.1.167'` with your actual IP

### 3️⃣ Verify Backend is Running

**Check if backend is running:**
```bash
netstat -ano | findstr ":8081"
```

Expected:
```
TCP    0.0.0.0:8081           0.0.0.0:0              LISTENING
```

**If NOT running, start it:**
```bash
cd creadiTn
# For Windows:
mvnw.cmd spring-boot:run

# Or use IDE (Maven Spring Boot Run)
```

### 4️⃣ Test Connection from Phone

1. Open your phone's browser
2. Visit: `http://192.168.1.167:8081/api/health`
3. You should see a response (JSON or text)

**If you get error:**
- ❌ "Cannot reach" → Different network
- ❌ "Connection refused" → Backend not running
- ✅ "200 OK" or any response → Network is good

---

## 🚀 Quick Fix Steps

### Option 1: Restart Everything

```bash
# Terminal 1: Stop and restart backend
cd c:\Users\rayen\IdeaProjects\creadiTn
mvnw.cmd spring-boot:run

# Terminal 2: Clear and restart Expo
cd c:\Users\rayen\IdeaProjects\creadiTn-mobile
npx expo start --clear --tunnel
```

### Option 2: Use LAN Mode (Best for Local Phone Testing)

```bash
cd c:\Users\rayen\IdeaProjects\creadiTn-mobile
npx expo start --lan
```

This finds your PC's IP automatically!

### Option 3: Use Android Emulator (Easiest)

```bash
cd c:\Users\rayen\IdeaProjects\creadiTn-mobile
npx expo start --android
```

---

## 🐛 Debug Logs

**Check Expo console for errors:**
1. Run: `npx expo start`
2. Press `j` to open browser view
3. Open DevTools (F12)
4. Look for red error messages in Console

**Or check phone logs (if using physical device):**
1. Install: Android Studio logcat
2. Run: `adb logcat` (if Android)

---

## 📋 Checklist

- [ ] Phone on same WiFi as PC
- [ ] Backend running (port 8081)
- [ ] IP address in `src/api/config.ts` is correct
- [ ] Can ping IP from phone browser
- [ ] Expo started with `--clear` flag
- [ ] No firewall blocking 8081

---

## ❌ Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot reach 192.168.1.167" | Different WiFi network - connect phone to PC's network |
| "Connection refused" | Backend not running - start Spring Boot |
| "Connection timeout" | IP is wrong - run `ipconfig` and update config.ts |
| "Only login page visible" | Backend not reachable - check network connectivity |
| "App crashes" | Clear cache: `npx expo start --clear` |
| "Works in browser, not phone" | Network isolation - check WiFi settings or firewall |

---

## 💡 Pro Tips

1. **Use LAN mode for auto IP detection:**
   ```bash
   npx expo start --lan
   ```

2. **Test backend directly:**
   ```bash
   curl http://192.168.1.167:8081/api/health
   ```

3. **Check firewall:**
   - Windows Defender Firewall might block port 8081
   - Add Spring Boot Java process to firewall whitelist

4. **Use Android Emulator for development:**
   - No WiFi issues
   - Easier debugging
   - Same experience as phone

---

## 📞 If Still Not Working

1. Take a screenshot of the Expo console output
2. Check if there's a specific error message
3. Run the diagnostic test (see below)

**Run Backend Diagnostics:**
```bash
# Inside creadiTn-mobile terminal
cd creadiTn-mobile
npx expo start

# In another terminal
curl -v http://192.168.1.167:8081/api/health
```

