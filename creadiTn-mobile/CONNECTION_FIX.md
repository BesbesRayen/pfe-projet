# Network Connection Fix for Mobile Login

## Your Computer's IP: `192.168.1.167`
## Backend Port: `8081`
## Backend URL: `http://192.168.1.167:8081`

### ✅ REQUIRED: Phone Must Be on Same WiFi Network

The mobile app needs to be on the **EXACT SAME WiFi network** as your computer.

**Steps:**
1. Make sure your phone and computer are connected to the **SAME WiFi router**
2. Check phone's WiFi settings → Connected network should match computer's WiFi
3. Both devices must see the same WiFi name (SSID)

### 🔧 Verify Connection:

On your phone browser, go to:
```
http://192.168.1.167:8081/swagger-ui.html
```

You should see the Swagger API documentation. If this loads, your connection is good!

### 📱 Test Login:

If you can access Swagger, the app should be able to login. Try:
- Email: `test@example.com` (or any registered user)
- Password: (your password)

### 🚨 If Still Getting "Network request failed":

**Check these:**
1. ✅ Phone WiFi SSID matches computer's WiFi SSID
2. ✅ Device not on hotspot/mobile data (use WiFi only)
3. ✅ Firewall not blocking port 8081 (check Windows Defender)
4. ✅ Backend still running (`lsof -i :8081` should show process)

### Allow Port 8081 Through Firewall (Windows):

```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "Allow Spring Boot 8081" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 8081
```

### Check Backend Status:

```bash
cd c:\Users\rayen\IdeaProjects\creadiTn
./mvnw spring-boot:run
```

### Debug API Connection:

The app now logs the API URL on startup. Check the Expo console output for:
```
API_BASE_URL: http://192.168.1.167:8081 isExpoGo: true
```
