# MediFlow Backend API

A comprehensive REST API for healthcare patient-provider coordination built with Express.js, TypeScript, and PostgreSQL.

## 📋 Overview

This backend provides:
- **Authentication & Authorization**: JWT-based auth with role-based access control (RBAC)
- **User Management**: Patient and provider profiles
- **Appointment Scheduling**: Appointment booking, confirmation, and management
- **Medical Records**: Secure storage and retrieval of medical documents
- **Health Checks**: Service availability monitoring endpoints

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── auth/                    # Authentication modules
│   │   ├── types.ts            # Auth types and interfaces
│   │   └── jwt.ts              # JWT token generation/verification
│   ├── config/
│   │   └── index.ts            # Configuration management
│   ├── middleware/
│   │   └── auth.ts             # Authentication & authorization middleware
│   ├── models/                 # Database models
│   │   ├── User.ts             # User model
│   │   ├── Patient.ts          # Patient profile model
│   │   ├── Provider.ts         # Provider profile model
│   │   ├── Appointment.ts      # Appointment model
│   │   └── MedicalRecord.ts    # Medical record model
│   ├── routes/                 # API route handlers
│   │   ├── auth.ts             # Authentication routes
│   │   ├── users.ts            # User management routes
│   │   └── health.ts           # Health check routes
│   ├── services/               # Business logic services
│   │   ├── database.ts         # Database connection management
│   │   ├── AuthService.ts      # Authentication service
│   │   ├── UserService.ts      # User service
│   │   └── AppointmentService.ts # Appointment business logic
│   ├── utils/
│   │   └── helpers.ts          # Utility functions
│   └── server.ts               # Express application entry point
├── migrations/
│   └── 001_initial_schema.sql  # Initial database schema
├── tests/
│   └── example.test.ts         # Test examples
├── .env.example                # Environment variables template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Initialize the database**
   ```sql
   -- Run the migration file in your PostgreSQL client
   psql -U your_user -d your_database -f migrations/001_initial_schema.sql
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user profile
- `POST /api/v1/auth/change-password` - Change password
- `POST /api/v1/auth/verify-token` - Verify JWT token

### Users
- `PUT /api/v1/users/profile` - Update user profile
- `GET /api/v1/users/:id` - Get user by ID
- `DELETE /api/v1/users/:id` - Deactivate account
- `POST /api/v1/users/:id/patient-profile` - Create/update patient profile
- `GET /api/v1/users/:id/patient-profile` - Get patient profile
- `POST /api/v1/users/:id/provider-profile` - Create/update provider profile
- `GET /api/v1/users/:id/provider-profile` - Get provider profile

### Health
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed health status
- `GET /health/ready` - Readiness probe
- `GET /health/live` - Liveness probe

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles
- `patient` - Patient user
- `provider` - Healthcare provider
- `admin` - Administrator

## 📦 Database Schema

### Tables
- **users** - User accounts with authentication
- **patients** - Patient profiles
- **providers** - Healthcare provider profiles
- **appointments** - Appointment records
- **medical_records** - Patient medical documents and records

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Build & Deploy
npm run build            # Compile TypeScript to JavaScript
npm start                # Start production server
npm run type-check       # Type check without emitting

# Database
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run test             # Run tests in watch mode
npm run test:ci          # Run tests once with coverage
```

## 🔧 Configuration

Edit `.env` file to configure:
- `PORT` - Server port (default: 3001)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing
- `FRONTEND_URL` - Frontend URL for CORS
- `REDIS_URL` - Redis connection (optional)
- `LOG_LEVEL` - Logging level

## 📝 Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

## 🧪 Testing

Run tests with:
```bash
npm test                 # Watch mode
npm run test:ci          # CI mode with coverage
```

## 📖 API Documentation

### User Registration Example
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "SecurePassword123",
    "name": "John Doe",
    "role": "patient"
  }'
```

### Login Example
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "SecurePassword123"
  }'
```

### Get Current User (with JWT)
```bash
curl -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer <your_jwt_token>"
```

## 🚀 Deployment

### Docker
```bash
docker build -f docker/Dockerfile.backend -t mediflow-backend .
docker run -p 3001:3001 mediflow-backend
```

### Environment Considerations
- Set strong `JWT_SECRET` in production
- Use environment-specific database URLs
- Enable HTTPS in production
- Configure appropriate CORS origins
- Use log aggregation service

## 📜 License

This project is part of the MediFlow healthcare coordination system.

## 🤝 Contributing

Follow the project's coding standards:
- Use TypeScript for type safety
- Follow the existing folder structure
- Write meaningful commit messages
- Add tests for new features
- Run `npm run format` before committing
