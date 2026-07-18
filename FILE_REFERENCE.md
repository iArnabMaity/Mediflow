# MediFlow File Reference Guide

## Complete File Listing with Purposes

---

## 📁 ROOT LEVEL (7 files)

### package.json
**Path:** `E:\Hackathon\package.json`
**Purpose:** Monorepo configuration with npm workspaces
**Contains:** 
- Workspace declarations (frontend, backend, ai-service)
- Root-level scripts (dev, build, docker commands)
- Project metadata

### docker-compose.yml
**Path:** `E:\Hackathon\docker-compose.yml`
**Purpose:** Docker service orchestration
**Services:** PostgreSQL, Redis, Frontend, Backend, AI Service, Ollama
**Volumes:** Database persistence, model caching
**Networks:** Custom bridge network

### tsconfig.json
**Path:** `E:\Hackathon\tsconfig.json`
**Purpose:** Root TypeScript configuration
**Features:** Path aliases, strict mode, source maps

### .gitignore
**Path:** `E:\Hackathon\.gitignore`
**Purpose:** Git exclusion rules
**Excludes:** node_modules, .env files, build outputs, logs

### .env.example
**Path:** `E:\Hackathon\.env.example`
**Purpose:** Environment variable template
**Contains:** All service configurations needed

### README.md
**Path:** `E:\Hackathon\README.md`
**Purpose:** Main project documentation
**Sections:** Overview, tech stack, setup, features, deployment

### PROJECT_SUMMARY.md & INITIALIZATION_COMPLETE.md
**Paths:** Summary documents
**Purpose:** Detailed initialization records and statistics

---

## 🎨 FRONTEND (23 files)

### Configuration Files

| File | Path | Purpose |
|------|------|---------|
| package.json | `frontend/package.json` | Dependencies & scripts |
| tsconfig.json | `frontend/tsconfig.json` | TypeScript config with aliases |
| next.config.js | `frontend/next.config.js` | Next.js framework config |
| tailwind.config.js | `frontend/tailwind.config.js` | Tailwind CSS customization |
| ENV_TEMPLATE.txt | `frontend/ENV_TEMPLATE.txt` | Environment variables |

### Components

| File | Path | Purpose |
|------|------|---------|
| index.ts | `frontend/src/components/index.ts` | Component exports |
| Button.tsx | `frontend/src/components/Button.tsx` | Reusable button component |
| Card.tsx | `frontend/src/components/Card.tsx` | Reusable card component |

### Pages

| File | Path | Purpose |
|------|------|---------|
| index.tsx | `frontend/src/pages/index.tsx` | Home page component |

### Services

| File | Path | Purpose |
|------|------|---------|
| api.ts | `frontend/src/services/api.ts` | Axios API client |

### State Management

| File | Path | Purpose |
|------|------|---------|
| auth.ts | `frontend/src/stores/auth.ts` | Zustand auth store |

### Type Definitions

| File | Path | Purpose |
|------|------|---------|
| index.ts | `frontend/src/types/index.ts` | TypeScript interfaces |

### Utilities

| File | Path | Purpose |
|------|------|---------|
| helpers.ts | `frontend/src/utils/helpers.ts` | Helper functions |

### Styles

| File | Path | Purpose |
|------|------|---------|
| globals.css | `frontend/src/styles/globals.css` | Global CSS & Tailwind |

### Directories

| Directory | Purpose |
|-----------|---------|
| `frontend/public/` | Static assets |
| `frontend/src/` | Source code |

---

## 🔌 BACKEND (13 files)

### Configuration Files

| File | Path | Purpose |
|------|------|---------|
| package.json | `backend/package.json` | Dependencies & scripts |
| tsconfig.json | `backend/tsconfig.json` | TypeScript config with aliases |
| .env.example | `backend/.env.example` | Environment template |

### Server Entry Point

| File | Path | Purpose |
|------|------|---------|
| server.ts | `backend/src/server.ts` | Express server setup |

### Configuration

| File | Path | Purpose |
|------|------|---------|
| index.ts | `backend/src/config/index.ts` | Config management |

### Routes

| File | Path | Purpose |
|------|------|---------|
| index.ts | `backend/src/routes/index.ts` | API route definitions |

### Services

| File | Path | Purpose |
|------|------|---------|
| UserService.ts | `backend/src/services/UserService.ts` | User business logic |

### Models

| File | Path | Purpose |
|------|------|---------|
| User.ts | `backend/src/models/User.ts` | User data model |

### Middleware

| File | Path | Purpose |
|------|------|---------|
| auth.ts | `backend/src/middleware/auth.ts` | JWT authentication |

### Utilities

| File | Path | Purpose |
|------|------|---------|
| helpers.ts | `backend/src/utils/helpers.ts` | Helper functions |

### Tests & Migrations

| Directory | Purpose |
|-----------|---------|
| `backend/tests/` | Test suites |
| `backend/migrations/` | Database migrations |

---

## 🤖 AI SERVICE (8 files)

### Main Application Files

| File | Path | Purpose |
|------|------|---------|
| main.py | `ai-service/main.py` | FastAPI application entry |
| config.py | `ai-service/config.py` | Configuration settings |
| requirements.txt | `ai-service/requirements.txt` | Python dependencies |

### Modules

| File | Path | Purpose |
|------|------|---------|
| __init__.py | `ai-service/app/__init__.py` | App module init |
| __init__.py | `ai-service/services/__init__.py` | Services module init |
| __init__.py | `ai-service/utils/__init__.py` | Utils module init |
| __init__.py | `ai-service/tests/__init__.py` | Tests module init |

### Directories

| Directory | Purpose |
|-----------|---------|
| `ai-service/models/` | ML model storage |
| `ai-service/services/` | AI service logic |

---

## 🐳 DOCKER (4 files)

### Dockerfiles

| File | Path | Purpose | Port |
|------|------|---------|------|
| Dockerfile.frontend | `docker/Dockerfile.frontend` | Frontend container | 3000 |
| Dockerfile.backend | `docker/Dockerfile.backend` | Backend container | 3001 |
| Dockerfile.ai | `docker/Dockerfile.ai` | AI service container | 8000 |

### Orchestration

| File | Path | Purpose |
|------|------|---------|
| docker-compose.yml | `E:\Hackathon\docker-compose.yml` | Service orchestration |

---

## 📜 SCRIPTS (3 files)

### Development Scripts

| File | Path | Purpose |
|------|------|---------|
| setup.sh | `scripts/setup.sh` | Initial project setup |
| dev.sh | `scripts/dev.sh` | Start all dev servers |
| db-migrate.sh | `scripts/db-migrate.sh` | Database migrations |

---

## 📚 DOCUMENTATION (4 files)

### Documentation Files

| File | Path | Purpose |
|------|------|---------|
| README.md | `E:\Hackathon\README.md` | Main documentation |
| INDEX.md | `docs/INDEX.md` | Documentation index |
| README.md | `infrastructure/README.md` | Infrastructure guide |
| PROJECT_SUMMARY.md | `E:\Hackathon\PROJECT_SUMMARY.md` | Initialization summary |
| INITIALIZATION_COMPLETE.md | `E:\Hackathon\INITIALIZATION_COMPLETE.md` | Completion report |

---

## 🗂️ DIRECTORY STRUCTURE SUMMARY

```
Total Directories: 30
├── Root Level: 1
├── Frontend: 8 (frontend + src + 5 subdirs + public)
├── Backend: 8 (backend + src + 6 subdirs + tests + migrations)
├── AI Service: 5 (ai-service + 4 subdirs)
├── Docker: 1
├── Scripts: 1
├── Documentation: 2 (docs + infrastructure)
```

---

## 📊 FILE TYPE SUMMARY

```
TypeScript (.ts, .tsx):    16 files
JSON (.json):              7 files
Python (.py):              6 files
Markdown (.md):            5 files
Shell Scripts (.sh):       3 files
JavaScript (.js):          2 files
CSS (.css):                1 file
YAML (.yml):               1 file
Text (.txt):               1 file
Placeholder (.keep):       2 files
───────────────────────────────────
TOTAL:                     44+ files
```

---

## 🔗 File Dependencies & Relationships

### Frontend Dependencies
```
package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── src/
    ├── pages/ (uses components, services, stores)
    ├── components/ (uses types, utils, styles)
    ├── services/ (calls backend API)
    ├── stores/ (manages app state)
    ├── types/ (shared types)
    └── utils/ (shared functions)
```

### Backend Dependencies
```
package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── server.ts (uses all modules)
    ├── config/ (configuration)
    ├── routes/ (uses services)
    ├── services/ (uses models)
    ├── models/ (data structures)
    ├── middleware/ (request processing)
    └── utils/ (helper functions)
```

### AI Service Dependencies
```
requirements.txt (all dependencies)
├── main.py (FastAPI app)
├── config.py (configuration)
└── modules/
    ├── app/ (FastAPI setup)
    ├── services/ (AI logic)
    ├── models/ (ML models)
    └── utils/ (helpers)
```

---

## 🚀 Usage Quick Reference

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run test         # Run tests
```

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start dev server (port 3001)
npm run build        # Compile TypeScript
npm run test         # Run tests
npm run db:migrate   # Run migrations
```

### AI Service
```bash
cd ai-service
pip install -r requirements.txt  # Install dependencies
python main.py                    # Start service (port 8000)
pytest                            # Run tests
```

### Docker
```bash
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose build              # Build images
docker-compose logs -f            # View logs
```

---

## 🔑 Key Ports

| Service | Port | Protocol |
|---------|------|----------|
| Frontend | 3000 | HTTP |
| Backend API | 3001 | HTTP |
| PostgreSQL DB | 5432 | TCP |
| Redis Cache | 6379 | TCP |
| AI Service | 8000 | HTTP |
| Ollama LLM | 11434 | HTTP |

---

## 💾 Volume Mounts

| Service | Volume | Purpose |
|---------|--------|---------|
| PostgreSQL | `postgres_data` | Database persistence |
| Redis | `redis_data` | Cache persistence |
| AI Service | `ai_models` | Model caching |
| Ollama | `ollama_data` | LLM model storage |

---

## 🔐 Security Files

- ✅ `.env.example` - Secrets template (use `.env`)
- ✅ `.gitignore` - Excludes sensitive files
- ✅ `docker/Dockerfile.*` - Non-root users
- ✅ `backend/src/middleware/auth.ts` - JWT auth

---

## 📝 Configuration Files

### Environment Templates
- `.env.example` - Root level
- `backend/.env.example` - Backend specific
- `frontend/ENV_TEMPLATE.txt` - Frontend specific

### Build Configurations
- `tsconfig.json` - TypeScript (root)
- `frontend/tsconfig.json` - Frontend TypeScript
- `backend/tsconfig.json` - Backend TypeScript

### Framework Configurations
- `frontend/next.config.js` - Next.js config
- `frontend/tailwind.config.js` - Tailwind config
- `ai-service/config.py` - AI service config

---

## 🎯 File Navigation Map

```
When working on...           Navigate to...
─────────────────────────────────────────────
User Interface              frontend/src/components/
                            frontend/src/pages/
                            frontend/src/styles/

API Endpoints               backend/src/routes/
                            backend/src/services/

Database                    backend/migrations/
                            backend/src/models/

Authentication              backend/src/middleware/auth.ts
                            frontend/src/stores/auth.ts

AI Features                 ai-service/services/
                            ai-service/models/

Deployment                  docker/
                            infrastructure/

Configuration               .env.example
                            **/tsconfig.json
                            package.json
```

---

## ✨ Complete Reference

This file system is organized to support:
- ✅ Full-stack development
- ✅ Monorepo management
- ✅ Docker containerization
- ✅ TypeScript compilation
- ✅ Testing frameworks
- ✅ Database migrations
- ✅ CI/CD integration
- ✅ Production deployment

**All files are ready for development!**
