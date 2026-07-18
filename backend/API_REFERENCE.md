# MediFlow API Reference

Complete API endpoint documentation for the MediFlow backend.

## Base URL

```
http://localhost:3001/api/v1
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Health Endpoints

### Health Check
```
GET /health
```
Basic health check endpoint.

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 3600.5,
  "services": {
    "database": "ok",
    "redis": "ok"
  },
  "version": "1.0.0"
}
```

### Detailed Health
```
GET /health/detailed
```
Detailed service health status.

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 3600.5,
  "services": {
    "database": "ok",
    "redis": "ok"
  },
  "version": "1.0.0"
}
```

### Readiness Check
```
GET /health/ready
```
Kubernetes-compatible readiness probe.

**Response (200):**
```json
{
  "ready": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Liveness Check
```
GET /health/live
```
Kubernetes-compatible liveness probe.

**Response (200):**
```json
{
  "live": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Authentication Endpoints

### Register User
```
POST /auth/register
```
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe",
  "role": "patient"
}
```

**Role Options:**
- `patient` - Patient user
- `provider` - Healthcare provider

**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "usr_1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "patient",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400000
}
```

**Errors:**
- `400` - Missing required fields
- `409` - Email already registered

### Login User
```
POST /auth/login
```
Authenticate user and get tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "usr_1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "patient",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400000
}
```

**Errors:**
- `400` - Missing required fields
- `401` - Invalid email or password

### Get Current User
```
GET /auth/me
```
Get authenticated user profile.

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "usr_1234567890",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "patient",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- `401` - Invalid or missing token
- `404` - User not found

### Change Password
```
POST /auth/change-password
```
Change user's password.

**Headers Required:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Errors:**
- `400` - Missing required fields
- `401` - Current password incorrect
- `401` - Invalid or missing token

### Verify Token
```
POST /auth/verify-token
```
Verify if JWT token is valid.

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "valid": true,
  "payload": {
    "userId": "usr_1234567890",
    "email": "user@example.com",
    "role": "patient"
  }
}
```

**Response (401) - Invalid Token:**
```json
{
  "valid": false,
  "error": "Token verification failed"
}
```

---

## User Endpoints

### Update Profile
```
PUT /users/profile
```
Update current user's profile.

**Headers Required:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "newemail@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "usr_1234567890",
    "email": "newemail@example.com",
    "name": "John Updated",
    "role": "patient",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:35:00Z"
  }
}
```

**Errors:**
- `400` - No fields to update
- `401` - Invalid token
- `409` - Email already in use

### Get User
```
GET /users/:id
```
Get user profile by ID.

**Path Parameters:**
- `id` - User ID

**Response (200):**
```json
{
  "id": "usr_1234567890",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "patient",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- `404` - User not found

### Deactivate Account
```
DELETE /users/:id
```
Deactivate user account (soft delete).

**Headers Required:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` - User ID (must match authenticated user)

**Response (200):**
```json
{
  "success": true,
  "message": "User account deactivated"
}
```

**Errors:**
- `401` - Invalid token
- `403` - Cannot delete other users
- `404` - User not found

### Create/Update Patient Profile
```
POST /users/:id/patient-profile
```
Create or update patient profile.

**Headers Required:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` - User ID (must match authenticated user)

**Request Body:**
```json
{
  "dateOfBirth": "1990-01-15",
  "gender": "male",
  "bloodType": "O+",
  "medicalHistory": "Diabetes, high blood pressure",
  "allergies": "Penicillin, Sulfa drugs"
}
```

**Response (200):**
```json
{
  "success": true,
  "profile": {
    "id": "pat_1234567890",
    "userId": "usr_1234567890",
    "dateOfBirth": "1990-01-15",
    "gender": "male",
    "bloodType": "O+",
    "medicalHistory": "Diabetes, high blood pressure",
    "allergies": "Penicillin, Sulfa drugs",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Errors:**
- `400` - User is not a patient
- `403` - Forbidden
- `401` - Invalid token

### Get Patient Profile
```
GET /users/:id/patient-profile
```
Get patient profile by user ID.

**Path Parameters:**
- `id` - User ID

**Response (200):**
```json
{
  "id": "pat_1234567890",
  "userId": "usr_1234567890",
  "dateOfBirth": "1990-01-15",
  "gender": "male",
  "bloodType": "O+",
  "medicalHistory": "Diabetes, high blood pressure",
  "allergies": "Penicillin, Sulfa drugs",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- `404` - Patient profile not found

### Create/Update Provider Profile
```
POST /users/:id/provider-profile
```
Create or update provider profile.

**Headers Required:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` - User ID (must match authenticated user)

**Request Body:**
```json
{
  "licenseNumber": "MED-12345-XYZ",
  "specialization": "Cardiology",
  "yearsOfExperience": 15,
  "consultationFee": 100.00,
  "hospital": "City Medical Center",
  "department": "Cardiology Department",
  "qualifications": "MD, Board Certified Cardiologist"
}
```

**Response (200):**
```json
{
  "success": true,
  "profile": {
    "id": "prov_1234567890",
    "userId": "usr_1234567890",
    "licenseNumber": "MED-12345-XYZ",
    "specialization": "Cardiology",
    "hospital": "City Medical Center",
    "department": "Cardiology Department",
    "yearsOfExperience": 15,
    "qualifications": "MD, Board Certified Cardiologist",
    "consultationFee": 100.00,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Errors:**
- `400` - User is not a provider
- `403` - Forbidden
- `401` - Invalid token

### Get Provider Profile
```
GET /users/:id/provider-profile
```
Get provider profile by user ID.

**Path Parameters:**
- `id` - User ID

**Response (200):**
```json
{
  "id": "prov_1234567890",
  "userId": "usr_1234567890",
  "licenseNumber": "MED-12345-XYZ",
  "specialization": "Cardiology",
  "hospital": "City Medical Center",
  "department": "Cardiology Department",
  "yearsOfExperience": 15,
  "qualifications": "MD, Board Certified Cardiologist",
  "consultationFee": 100.00,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- `404` - Provider profile not found

---

## Error Response Format

All errors follow this format:

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-15T10:30:00Z",
  "code": "ERROR_CODE"
}
```

### Common HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error

---

## Example Usage

### Complete Authentication Flow

```bash
# 1. Register
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123",
    "name": "John Doe",
    "role": "patient"
  }'

# Response includes accessToken

# 2. Use token to get current user
TOKEN="eyJhbGciOiJIUzI1NiIs..."
curl -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"

# 3. Update profile
curl -X PUT http://localhost:3001/api/v1/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "John Updated"
  }'

# 4. Create patient profile
USER_ID="usr_1234567890"
curl -X POST http://localhost:3001/api/v1/users/$USER_ID/patient-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "dateOfBirth": "1990-01-15",
    "gender": "male",
    "bloodType": "O+",
    "allergies": "Penicillin"
  }'
```

---

## Rate Limiting

Currently not implemented. Will be added in future versions.

---

## Versioning

API Version: `1.0.0`

Current endpoint prefix: `/api/v1/`

---

## Additional Endpoints Coming Soon

- Appointments Management
- Medical Records Management
- Provider Search
- Notifications
- File Upload

---

**Last Updated:** 2024-01-15
**API Version:** 1.0.0
