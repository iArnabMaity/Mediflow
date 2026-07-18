# Backend Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your configuration:
# - DATABASE_URL: Your PostgreSQL connection string
# - JWT_SECRET: A strong random string
# - FRONTEND_URL: Your frontend URL
```

### Step 3: Set Up Database
```bash
# Option 1: Using psql directly
psql -U your_username -d mediflow_db -f migrations/001_initial_schema.sql

# Option 2: Create database and run migrations manually
createdb mediflow_db
psql -U your_username -d mediflow_db < migrations/001_initial_schema.sql
```

### Step 4: Start Development Server
```bash
npm run dev
```

You should see:
```
✅ Database connection established
✅ MediFlow Backend Server running on http://localhost:3001
📊 Health check available at http://localhost:3001/health
🔑 Auth endpoints at http://localhost:3001/api/v1/auth
👥 Users endpoints at http://localhost:3001/api/v1/users
🌍 Environment: development
```

### Step 5: Test the API
```bash
# Test health endpoint
curl http://localhost:3001/health

# Register a new user
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "name": "Test User",
    "role": "patient"
  }'

# Login
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

## 📋 Prerequisites

- **Node.js** v16+ - [Download](https://nodejs.org/)
- **PostgreSQL** v12+ - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)

### PostgreSQL Setup (if not already installed)

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
- Download and run [PostgreSQL installer](https://www.postgresql.org/download/windows/)
- Remember your superuser password

### Create PostgreSQL User and Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Inside psql:
CREATE USER mediflow_user WITH PASSWORD 'mediflow_password';
CREATE DATABASE mediflow_db OWNER mediflow_user;
GRANT ALL PRIVILEGES ON DATABASE mediflow_db TO mediflow_user;
\q
```

## 🔧 Common Issues & Solutions

### Issue: "Connection refused" when starting server
**Solution:** 
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify PostgreSQL port (default: 5432)

### Issue: "ENOENT: no such file or directory" for migrations
**Solution:**
```bash
# Make sure you're in the backend directory
cd backend
ls migrations/  # Should show 001_initial_schema.sql
```

### Issue: Password authentication failed
**Solution:**
```bash
# Reset PostgreSQL password
psql -U postgres

-- Inside psql:
ALTER USER mediflow_user WITH PASSWORD 'new_password';
-- Update .env with new password
\q
```

### Issue: Port 3001 already in use
**Solution:**
```bash
# Change PORT in .env or use:
PORT=3002 npm run dev

# Or kill the process on port 3001:
# macOS/Linux:
lsof -ti:3001 | xargs kill -9

# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

## 📚 Available Commands

```bash
# Development
npm run dev              # Start with hot reload
npm run build            # Compile TypeScript
npm start                # Run compiled version

# Database
npm run db:migrate       # Run migrations
npm run seed             # Seed database (if available)

# Quality
npm run lint             # Check code style
npm run format           # Format code
npm run type-check       # TypeScript type checking

# Testing
npm test                 # Run tests (watch mode)
npm run test:ci          # Run tests once with coverage
```

## 🔐 Default JWT Configuration

- **Access Token Expiry**: 24 hours
- **Refresh Token Expiry**: 7 days
- **Algorithm**: HS256

Change `JWT_SECRET` in production to a strong random value:
```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📡 API Base URL

During development:
```
http://localhost:3001/api/v1
```

All endpoints in this guide assume this base URL.

## 🔄 Common Workflows

### Register and Login
```bash
# 1. Register
REGISTER=$(curl -s -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123",
    "name": "User Name",
    "role": "patient"
  }')

# 2. Extract token from response
TOKEN=$(echo $REGISTER | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
echo "Token: $TOKEN"

# 3. Use token to get current user
curl -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Update User Profile
```bash
TOKEN="your_jwt_token_here"

curl -X PUT http://localhost:3001/api/v1/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Updated Name",
    "email": "newemail@example.com"
  }'
```

### Create Patient Profile
```bash
TOKEN="your_jwt_token_here"
USER_ID="usr_xxxx"  # Get this from login response

curl -X POST http://localhost:3001/api/v1/users/$USER_ID/patient-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "dateOfBirth": "1990-01-15",
    "gender": "male",
    "bloodType": "O+",
    "medicalHistory": "No significant history",
    "allergies": "Penicillin"
  }'
```

## 🛠️ Development Tips

1. **Use Postman or Insomnia** for testing API endpoints
2. **Install nodemon** for auto-restart: `npm install -g nodemon`
3. **Check logs** for error messages when requests fail
4. **Use Thunder Client** VSCode extension for integrated testing
5. **Read error messages** carefully - they contain helpful debugging info

## 📞 Support Resources

- **Documentation**: See `backend/README.md`
- **Implementation Summary**: See `BACKEND_IMPLEMENTATION_SUMMARY.md`
- **Environment Setup**: See `.env.example`
- **Database Schema**: See `migrations/001_initial_schema.sql`

## ✅ Verification Checklist

After setup, verify:
- [ ] Server starts without errors
- [ ] Health endpoint returns 200
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can get user profile with token
- [ ] Database tables are created
- [ ] JWT tokens are generated

## 🎯 Next Steps

1. Connect your frontend to these API endpoints
2. Implement additional features (appointments, medical records)
3. Set up error tracking and monitoring
4. Deploy to production with proper security configuration
5. Enable additional features (email, SMS, etc.)

## 📝 Project Structure Reminder

```
backend/
├── src/
│   ├── auth/          # JWT and authentication
│   ├── config/        # Configuration
│   ├── middleware/    # Express middleware
│   ├── models/        # Database models
│   ├── routes/        # API endpoints
│   ├── services/      # Business logic
│   └── server.ts      # Main entry point
├── migrations/        # Database schemas
├── .env.example       # Environment template
├── package.json       # Dependencies
└── README.md          # Full documentation
```

---

**You're all set!** 🎉 The backend is ready for development. Start with `npm run dev` and enjoy building MediFlow!
