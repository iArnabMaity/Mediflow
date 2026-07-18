# Backend Testing Guide

Comprehensive guide for testing the MediFlow backend API.

## Testing Tools Setup

### Option 1: Using Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Import the provided Postman collection (create from examples below)
3. Set environment variables
4. Run requests

### Option 2: Using Insomnia
1. Download [Insomnia](https://insomnia.rest/)
2. Create workspace
3. Add requests from examples below

### Option 3: Using curl (Command Line)
Already available on macOS/Linux. For Windows, use Git Bash or WSL.

### Option 4: Using Thunder Client (VSCode)
1. Install Thunder Client extension
2. Create requests in VSCode
3. View responses inline

## Manual Testing Workflow

### 1. Check Server Health

```bash
curl -X GET http://localhost:3001/health
```

**Expected Response (200):**
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

### 2. Register Patient User

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@test.com",
    "password": "PatientPass123",
    "name": "Test Patient",
    "role": "patient"
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "usr_[timestamp]_[random]",
    "email": "patient@test.com",
    "name": "Test Patient",
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

**Save the accessToken for next requests.**

### 3. Register Provider User

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@test.com",
    "password": "DoctorPass123",
    "name": "Dr. Test Doctor",
    "role": "provider"
  }'
```

### 4. Login Test

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@test.com",
    "password": "PatientPass123"
  }'
```

### 5. Get Current User

```bash
TOKEN="your_access_token_here"

curl -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### 6. Update User Profile

```bash
TOKEN="your_access_token_here"

curl -X PUT http://localhost:3001/api/v1/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Updated Test Patient",
    "email": "patient.updated@test.com"
  }'
```

### 7. Create Patient Profile

```bash
TOKEN="your_patient_token_here"
USER_ID="usr_xxxxxxxxxxxx"  # From registration response

curl -X POST http://localhost:3001/api/v1/users/$USER_ID/patient-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "dateOfBirth": "1990-05-15",
    "gender": "male",
    "bloodType": "B+",
    "medicalHistory": "Type 2 Diabetes",
    "allergies": "Penicillin, Aspirin"
  }'
```

### 8. Get Patient Profile

```bash
USER_ID="usr_xxxxxxxxxxxx"

curl -X GET http://localhost:3001/api/v1/users/$USER_ID/patient-profile
```

### 9. Create Provider Profile

```bash
TOKEN="your_provider_token_here"
PROVIDER_ID="usr_xxxxxxxxxxxx"  # From provider registration

curl -X POST http://localhost:3001/api/v1/users/$PROVIDER_ID/provider-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "licenseNumber": "MED-123456-ABC",
    "specialization": "Cardiology",
    "yearsOfExperience": 12,
    "consultationFee": 150.00,
    "hospital": "City Hospital",
    "department": "Cardiology",
    "qualifications": "MD, Board Certified"
  }'
```

### 10. Get Provider Profile

```bash
PROVIDER_ID="usr_xxxxxxxxxxxx"

curl -X GET http://localhost:3001/api/v1/users/$PROVIDER_ID/provider-profile
```

### 11. Verify Token

```bash
TOKEN="your_access_token_here"

curl -X POST http://localhost:3001/api/v1/auth/verify-token \
  -H "Authorization: Bearer $TOKEN"
```

### 12. Change Password

```bash
TOKEN="your_access_token_here"

curl -X POST http://localhost:3001/api/v1/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "currentPassword": "PatientPass123",
    "newPassword": "NewPatientPass456"
  }'
```

### 13. Deactivate Account

```bash
TOKEN="your_access_token_here"
USER_ID="usr_xxxxxxxxxxxx"

curl -X DELETE http://localhost:3001/api/v1/users/$USER_ID \
  -H "Authorization: Bearer $TOKEN"
```

## Error Scenario Testing

### Test: Invalid Email Format
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "Pass123",
    "name": "Test",
    "role": "patient"
  }'
```

### Test: Duplicate Email
```bash
# Register once
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"Pass123","name":"Test","role":"patient"}'

# Try to register with same email again
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"Pass456","name":"Test2","role":"patient"}'

# Expected: 409 Conflict
```

### Test: Invalid Credentials
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"WrongPassword"}'

# Expected: 401 Unauthorized
```

### Test: Missing Token
```bash
curl -X GET http://localhost:3001/api/v1/auth/me

# Expected: 401 Unauthorized
```

### Test: Invalid Token
```bash
curl -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer invalid-token-here"

# Expected: 401 Unauthorized
```

### Test: Expired Token
```bash
# Tokens expire after 24 hours
# To test: Update JWT_EXPIRE to "1s" in .env, restart server
# Wait 1 second, then try a request with that token
```

## Postman Collection Template

Create a new Postman collection with these requests:

```json
{
  "info": {
    "name": "MediFlow API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health",
      "item": [
        {
          "name": "Health Check",
          "request": {
            "method": "GET",
            "url": "{{base_url}}/health"
          }
        }
      ]
    },
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/v1/auth/register",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"{{email}}\",\"password\":\"{{password}}\",\"name\":\"{{name}}\",\"role\":\"patient\"}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/v1/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"{{email}}\",\"password\":\"{{password}}\"}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {"key": "base_url", "value": "http://localhost:3001"},
    {"key": "email", "value": "test@example.com"},
    {"key": "password", "value": "TestPass123"},
    {"key": "name", "value": "Test User"},
    {"key": "token", "value": ""}
  ]
}
```

## Automated Testing (Unit Tests)

Create test files in `backend/tests/`:

```typescript
// tests/auth.test.ts
describe('Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'TestPass123',
        name: 'Test User',
        role: 'patient'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('accessToken');
  });

  it('should login successfully', async () => {
    // First register
    await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'TestPass123',
        name: 'Test User',
        role: 'patient'
      });

    // Then login
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'TestPass123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
});
```

Run tests:
```bash
npm test              # Watch mode
npm run test:ci       # CI mode with coverage
```

## Load Testing

### Using Apache Bench
```bash
# 100 requests, 10 concurrent
ab -n 100 -c 10 http://localhost:3001/health
```

### Using wrk
```bash
# 100 connections, 4 threads, 30 second duration
wrk -t4 -c100 -d30s http://localhost:3001/health
```

## Continuous Integration Testing

### GitHub Actions Example
```yaml
name: Backend Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - run: npm run test:ci
```

## Debugging Tips

### Enable Verbose Logging
```bash
LOG_LEVEL=debug npm run dev
```

### Use Node Debugger
```bash
node --inspect dist/server.js
# Open chrome://inspect
```

### Check Database
```bash
# Connect to PostgreSQL
psql -U mediflow_user -d mediflow_db

# List tables
\dt

# View users
SELECT * FROM users;

# View appointments
SELECT * FROM appointments;
```

## Security Testing

### Test: SQL Injection
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin\"; DROP TABLE users;--",
    "password": "anything"
  }'
```
Expected: 401 (parametrized queries prevent this)

### Test: XSS in Input
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "Pass123",
    "name": "<script>alert(1)</script>",
    "role": "patient"
  }'
```
Expected: Stored safely, no XSS execution

## Performance Testing

### Check Response Time
```bash
time curl http://localhost:3001/health
```

### Database Query Performance
```sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'test@example.com';
```

## Testing Checklist

- [ ] Health endpoints return 200
- [ ] User registration works
- [ ] Login returns valid token
- [ ] Token verification works
- [ ] Protected endpoints require token
- [ ] Invalid tokens are rejected
- [ ] Duplicate emails are rejected
- [ ] Wrong password login fails
- [ ] User profile can be updated
- [ ] Patient profile can be created
- [ ] Provider profile can be created
- [ ] Password change works
- [ ] Account deactivation works
- [ ] Error responses are consistent
- [ ] CORS headers are present
- [ ] Database migrations work

## Troubleshooting

### 500 Internal Server Error
1. Check console logs for error details
2. Verify database connection
3. Check JWT_SECRET is set
4. Run migrations if tables are missing

### 401 Unauthorized
1. Ensure token is in Authorization header
2. Use "Bearer " prefix
3. Check token hasn't expired
4. Verify token in /auth/verify-token

### 409 Conflict (Email exists)
1. Use different email for testing
2. Clear database and restart
3. Check for duplicate users in database

---

**Happy Testing!** 🚀
