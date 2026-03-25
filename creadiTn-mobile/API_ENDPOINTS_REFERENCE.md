# 📡 API Endpoints Reference

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response 200:
{
  "userId": 1,
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "message": "User registered successfully"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response 200:
{
  "userId": 1,
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}

Response 200:
{
  "message": "Reset link sent to email"
}
```

---

## 👤 User Endpoints

### Get User Profile
```http
GET /api/users/{userId}
Authorization: Bearer {token}

Response 200:
{
  "userId": 1,
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "creditScore": 750,
  "kycStatus": "APPROVED",
  "createdDate": "2024-01-15"
}
```

### Update User Profile
```http
PUT /api/users/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+216 20 123 456"
}

Response 200:
{
  "message": "User updated successfully"
}
```

### Get Credit Score
```http
GET /api/users/{userId}/credit-score
Authorization: Bearer {token}

Response 200:
{
  "userId": 1,
  "creditScore": 750,
  "grade": "Excellent",
  "lastUpdated": "2024-03-23"
}
```

### Get User Credits
```http
GET /api/users/{userId}/credits
Authorization: Bearer {token}

Response 200:
{
  "userId": 1,
  "totalCredits": 5000.00,
  "availableCredits": 3500.00,
  "usedCredits": 1500.00,
  "currency": "TND"
}
```

---

## 🆔 KYC (Identity Verification) Endpoints

### Upload KYC Documents (Multipart)
```http
POST /api/kyc/upload-multipart?userId={userId}
Authorization: Bearer {token}
Content-Type: multipart/form-data

Parameters:
  userId: 1
  cinFront: <image file>
  cinBack: <image file>
  selfie: <image file>

Response 200:
{
  "documentId": 123,
  "userId": 1,
  "status": "PENDING",
  "uploadDate": "2024-03-23T10:30:00Z",
  "cinFrontUrl": "/api/files/kyc/123_front.jpg",
  "cinBackUrl": "/api/files/kyc/123_back.jpg",
  "selfieUrl": "/api/files/kyc/123_selfie.jpg"
}
```

### Get KYC Status
```http
GET /api/kyc/status?userId={userId}
Authorization: Bearer {token}

Response 200:
{
  "documentId": 123,
  "userId": 1,
  "status": "PENDING",
  "uploadDate": "2024-03-23T10:30:00Z",
  "reviewDate": null,
  "rejectionReason": null
}

Response 404: (No KYC document)
{
  "message": "No KYC document found for this user"
}
```

### Get Specific KYC Document
```http
GET /api/kyc/{documentId}
Authorization: Bearer {token}

Response 200:
{
  "documentId": 123,
  "userId": 1,
  "status": "APPROVED",
  "uploadDate": "2024-03-23T10:30:00Z",
  "reviewDate": "2024-03-24T15:00:00Z",
  "cinFrontUrl": "/api/files/kyc/123_front.jpg",
  "cinBackUrl": "/api/files/kyc/123_back.jpg",
  "selfieUrl": "/api/files/kyc/123_selfie.jpg",
  "approverName": "Admin User"
}
```

---

## 🛍️ Merchant Endpoints

### List All Merchants
```http
GET /api/merchants
Authorization: Bearer {token}

Response 200:
[
  {
    "merchantId": 1,
    "name": "Fashion Hub",
    "logo": "/api/files/merchants/fashion.png",
    "description": "Fashion and clothing store",
    "website": "https://fashionhub.tn",
    "category": "Fashion",
    "rating": 4.5,
    "reviews": 128
  },
  {
    "merchantId": 2,
    "name": "Tech Store",
    "logo": "/api/files/merchants/tech.png",
    "description": "Electronics and gadgets",
    "website": "https://techstore.tn",
    "category": "Electronics",
    "rating": 4.7,
    "reviews": 245
  }
]
```

### Get Merchant Details
```http
GET /api/merchants/{merchantId}
Authorization: Bearer {token}

Response 200:
{
  "merchantId": 1,
  "name": "Fashion Hub",
  "logo": "/api/files/merchants/fashion.png",
  "description": "Premium fashion and clothing",
  "website": "https://fashionhub.tn",
  "category": "Fashion",
  "rating": 4.5,
  "reviews": 128,
  "cashbackRate": 5.0,
  "maxPurchase": 10000.00,
  "terms": "Valid for 30 days from purchase"
}
```

### Search Merchants
```http
GET /api/merchants/search?q=fashion
Authorization: Bearer {token}

Response 200:
[
  {
    "merchantId": 1,
    "name": "Fashion Hub",
    "category": "Fashion",
    "rating": 4.5
  }
]
```

### Get Merchant Offers
```http
GET /api/merchants/{merchantId}/offers
Authorization: Bearer {token}

Response 200:
[
  {
    "offerId": 101,
    "title": "20% Off New Collection",
    "description": "Get 20% cashback on new season items",
    "discountPercent": 20,
    "validFrom": "2024-03-01",
    "validUntil": "2024-04-30"
  }
]
```

---

## 💳 Payment & Transaction Endpoints

### Get User Transactions
```http
GET /api/payments?userId={userId}&limit=10
Authorization: Bearer {token}

Response 200:
[
  {
    "transactionId": 1,
    "userId": 1,
    "merchantId": 1,
    "amount": 150.00,
    "cashback": 7.50,
    "status": "COMPLETED",
    "date": "2024-03-23T10:30:00Z"
  },
  {
    "transactionId": 2,
    "userId": 1,
    "merchantId": 2,
    "amount": 500.00,
    "cashback": 35.00,
    "status": "COMPLETED",
    "date": "2024-03-22T14:15:00Z"
  }
]
```

### Simulate Payment
```http
POST /api/payments/simulate
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": 1,
  "merchantId": 1,
  "amount": 200.00,
  "description": "Shirt purchase"
}

Response 200:
{
  "transactionId": 3,
  "userId": 1,
  "merchantId": 1,
  "amount": 200.00,
  "cashback": 10.00,
  "status": "COMPLETED",
  "date": "2024-03-23T11:00:00Z",
  "message": "Payment simulated successfully"
}
```

### Get User Credit Offers
```http
GET /api/credits?userId={userId}
Authorization: Bearer {token}

Response 200:
[
  {
    "creditId": 1,
    "userId": 1,
    "amount": 5000.00,
    "interestRate": 7.5,
    "term": 12,
    "status": "ACTIVE",
    "issueDate": "2024-01-15",
    "dueDateMonthly": 15
  }
]
```

### Get Installment Plans
```http
GET /api/payments/installments?userId={userId}
Authorization: Bearer {token}

Response 200:
[
  {
    "installmentId": 1,
    "transactionId": 1,
    "amount": 150.00,
    "totalInstallments": 3,
    "paidInstallments": 2,
    "nextPaymentDate": "2024-04-15",
    "monthlyAmount": 50.00,
    "status": "ONGOING"
  }
]
```

---

## 🎁 Rewards & Cashback Endpoints

### Get User Rewards
```http
GET /api/rewards?userId={userId}
Authorization: Bearer {token}

Response 200:
{
  "userId": 1,
  "totalCashback": 500.00,
  "totalRewards": 250,
  "pendingCashback": 150.00,
  "completedCashback": 350.00,
  "lastUpdated": "2024-03-23T10:00:00Z"
}
```

### Get Reward History
```http
GET /api/rewards/history?userId={userId}&limit=20
Authorization: Bearer {token}

Response 200:
[
  {
    "rewardId": 1,
    "type": "CASHBACK",
    "amount": 50.00,
    "source": "merchant_purchase",
    "date": "2024-03-20T15:00:00Z",
    "status": "COMPLETED"
  },
  {
    "rewardId": 2,
    "type": "BONUS",
    "amount": 100.00,
    "source": "loyalty_milestone",
    "date": "2024-03-15T10:00:00Z",
    "status": "COMPLETED"
  }
]
```

### Claim Reward
```http
POST /api/rewards/{rewardId}/claim
Authorization: Bearer {token}

Response 200:
{
  "message": "Reward claimed successfully",
  "amount": 50.00,
  "newBalance": 450.00
}
```

---

## 📄 File Access Endpoints

### Access KYC Images
```http
GET /api/files/kyc/{filename}

Example:
GET /api/files/kyc/123_front.jpg
GET /api/files/kyc/123_back.jpg
GET /api/files/kyc/123_selfie.jpg
```

### Access Merchant Logo
```http
GET /api/files/merchants/{filename}

Example:
GET /api/files/merchants/fashion.png
GET /api/files/merchants/tech.png
```

---

## ❌ Error Responses

### Unauthorized (401)
```json
{
  "error": "UNAUTHORIZED",
  "message": "Missing or invalid authentication token",
  "status": 401
}
```

### Not Found (404)
```json
{
  "error": "NOT_FOUND",
  "message": "Resource not found",
  "status": 404
}
```

### Bad Request (400)
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid request parameters",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  },
  "status": 400
}
```

### Server Error (500)
```json
{
  "error": "INTERNAL_SERVER_ERROR",
  "message": "An unexpected error occurred",
  "status": 500
}
```

---

## 🔑 Authentication Headers

All endpoints except `/api/auth/*` require:

```http
Authorization: Bearer {jwt_token}
```

**Example:**
```http
GET /api/users/1 HTTP/1.1
Host: localhost:8081
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "password":"Password123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"Password123!"
  }'
```

### Get User (with token)
```bash
curl -X GET http://localhost:8081/api/users/1 \
  -H "Authorization: Bearer {token}"
```

### Upload KYC
```bash
curl -X POST "http://localhost:8081/api/kyc/upload-multipart?userId=1" \
  -H "Authorization: Bearer {token}" \
  -F "cinFront=@/path/to/cin_front.jpg" \
  -F "cinBack=@/path/to/cin_back.jpg" \
  -F "selfie=@/path/to/selfie.jpg"
```

---

## 📊 Rate Limiting

- **Standard**: 100 requests per minute
- **KYC Upload**: 5 uploads per day per user
- **Search**: 50 searches per minute

---

**API Version**: 1.0.0
**Last Updated**: March 23, 2026
**Status**: ✅ Production Ready
