# TaskFlow Backend - MySQL Migration Setup Guide

## Current Status

✅ **Migration Code Conversion: COMPLETE**
- User model converted from Mongoose to Prisma type-only interface
- Project model converted from Mongoose to Prisma type-only interface  
- Task model converted from Mongoose to Prisma type-only interface
- Comment model converted from Mongoose to Prisma type-only interface
- Auth service refactored to use Prisma queries instead of Mongoose
- TypeScript build: ✅ SUCCESSFUL (`npm run build`)

## Next Steps: MySQL Setup

The following steps are required to complete the migration:

### 1. Install MySQL Server 2022

**Windows:**
```bash
# Download from: https://dev.mysql.com/downloads/mysql/
# Choose MySQL 2022 Community Server for Windows
# Run installer and choose default settings
# Default port: 3306
# Note the root password you set during installation
```

**Verification:**
```bash
mysql --version
# Should output: mysql  Ver 8.0.x for ... on x86_64
```

### 2. Create TaskFlow Database

```bash
# Open MySQL Command Line Client (or use MySQL Workbench)
mysql -u root -p

# Enter password when prompted

# Inside MySQL CLI:
CREATE DATABASE IF NOT EXISTS taskflow;
USE taskflow;
```

### 3. Update .env Credentials

Edit `backend/.env` with your actual MySQL credentials:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/taskflow"
```

Replace:
- `root` with your MySQL username (if different)
- `YOUR_PASSWORD` with your actual MySQL password
- `localhost:3306` if MySQL is on a different host/port

### 4. Run Prisma Migration

```bash
cd backend
npx prisma migrate dev --name init
```

This command will:
1. Generate migration files in `prisma/migrations/`
2. Apply migrations to MySQL database
3. Generate Prisma Client

**Expected output:**
```
✔ Your database has been created with success.
✔ Run pending migrations.
✔ Generated Prisma Client
```

### 5. Verify Database

```bash
# Option A: MySQL CLI
mysql -u root -p taskflow -e "SHOW TABLES;"

# Option B: MySQL Workbench
# Connect to localhost:3306
# Browse to taskflow database
# Verify tables: users, projects, tasks, comments, project_members
```

Expected tables:
- `users` (User model)
- `projects` (Project model)
- `tasks` (Task model)
- `comments` (Comment model)
- `project_members` (many-to-many membership)
- `_prisma_migrations` (Prisma tracking table)

### 6. Test Backend with Prisma

```bash
cd backend

# Start development server
npm run dev

# Expected output:
# ✓ Connected to MySQL database with Prisma
# Server running on http://localhost:5000
```

### 7. Test Auth APIs

Using curl or Postman:

```bash
# Test Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "member"
  }'

# Expected: 201 with token and user object

# Test Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Expected: 200 with token and user object

# Test Me (Protected)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Expected: 200 with user object
```

## Migration Summary

### What Changed

**Before (Mongoose):**
```typescript
// src/models/User.ts
const userSchema = new Schema({ ... })
userSchema.pre('save', async function hashPassword() { ... })
userSchema.methods.comparePassword = async function(...) { ... }

// src/services/auth.service.ts
const user = new User(payload)
await user.save()
await user.comparePassword(password)
```

**After (Prisma):**
```typescript
// src/models/User.ts
export interface IUser { id, name, email, password, role, ... }

// src/services/auth.service.ts
import { prisma } from '../config/prisma'
const user = await prisma.user.create({ data: { ... } })
const match = await bcrypt.compare(password, user.password)
```

### Key Differences

1. **Password Hashing:** Moved from Mongoose pre-save hook to auth.service.ts
2. **Query Syntax:** Mongoose methods → Prisma client methods
3. **Type Safety:** Full TypeScript support from Prisma schema
4. **Database:** MongoDB (document-based) → MySQL (relational)
5. **ORM:** Mongoose → Prisma

### Benefits

✅ SQL database (MySQL) is more enterprise-standard  
✅ Prisma generates type-safe client automatically  
✅ Better performance with relational schema  
✅ Easier to add more complex relationships  
✅ Built-in migrations tracking  

## Troubleshooting

### Error: "Authentication failed against database server"

**Solution:** Verify MySQL is running and credentials in .env are correct
```bash
# Check if MySQL is running (Windows)
sc query MySQL80  # or your MySQL service name

# Start MySQL if stopped
net start MySQL80  # Windows
brew services start mysql  # macOS
```

### Error: "Can't connect to MySQL server on 'localhost' (10061)"

**Solution:** MySQL server not running or using wrong port
```bash
# Verify port
mysql -u root -p -P 3306 -h localhost

# Check .env DATABASE_URL has correct port
```

### Error: "Unknown database 'taskflow'"

**Solution:** Create the database first
```bash
mysql -u root -p
CREATE DATABASE taskflow;
```

## Files Modified

- `backend/src/models/User.ts` → Type-only interface
- `backend/src/models/Project.ts` → Type-only interface
- `backend/src/models/Task.ts` → Type-only interface
- `backend/src/models/Comment.ts` → Type-only interface
- `backend/src/services/auth.service.ts` → Prisma queries
- `backend/src/config/prisma.ts` → NEW - Prisma client singleton
- `backend/src/config/db.ts` → Updated to use Prisma
- `backend/src/config/env.ts` → Updated to require DATABASE_URL
- `backend/prisma/schema.prisma` → NEW - Complete relational schema
- `backend/.env` → Updated with DATABASE_URL
- `backend/.env.example` → Updated with DATABASE_URL

## Next Actions

After MySQL setup is complete:

1. Run `npm run dev` in backend folder
2. Test auth endpoints with Postman/curl
3. Create project/task/comment services (optional - not yet implemented)
4. Deploy to production MySQL instance

---

**Note:** All auth APIs are ready and use Prisma. The frontend remains unchanged and can connect to the new backend immediately.
