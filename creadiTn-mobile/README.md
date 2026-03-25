# CreadiTN Mobile (Expo)

## API base URL (`src/api/config.ts`)

- **Android emulator**: `http://10.0.2.2:8081`
- **iOS simulator**: `http://127.0.0.1:8081`
- **Physical device (Expo Go)**: set `USE_LAN_FOR_DEVICE = true` and set `LAN_HOST` to your PC’s IPv4 (same Wi‑Fi).

## Run the app

```bash
cd creadiTn-mobile
npm install
npm start
```

Expo uses **port 8082** (see `package.json`) so it does not clash with the Spring Boot API on **8081**.

## Backend (CreadiTN)

Start Spring Boot on port **8081** with MySQL running. If `mvn` fails with **JAVA_HOME**, install a JDK and set:

```powershell
# Example (adjust path):
setx JAVA_HOME "C:\Program Files\Java\jdk-17"
```

Then run from `creadiTn`:

```powershell
.\mvnw.cmd spring-boot:run
```

## Checks

```bash
npx tsc --noEmit
```
"# -credit-TN-mobile" 
