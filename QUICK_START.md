# Quick Start - MySQL Setup Commands

Follow these commands **in order** to complete the TaskFlow backend migration.

## 1. Install MySQL (One-Time)

### Windows
```
Download: https://dev.mysql.com/downloads/mysql/
Choose: MySQL 2022 Community Server
Run installer with default settings
Remember your root password
```

### macOS
```bash
brew install mysql
brew services start mysql
mysql_secure_installation  # Follow prompts
```

### Linux (Ubuntu)
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation  # Follow prompts
sudo service mysql start
```

## 2. Create Database

```bash
mysql -u root -p

# When prompted, enter your MySQL root password
# Then in the MySQL CLI, run:

CREATE DATABASE IF NOT EXISTS taskflow;
EXIT;
```

## 3. Update .env File

Edit `backend/.env` and set the correct password:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="mysql://root:YOUR_ROOT_PASSWORD_HERE@localhost:3306/taskflow"
JWT_SECRET=taskflow_super_secret_key_2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Replace `YOUR_ROOT_PASSWORD_HERE` with your actual MySQL root password.

## 4. Run Prisma Migration

```bash
cd backend
npx prisma migrate dev --name init
```

Expected output:
```
✔ Your database has been created with success.
✔ Run pending migrations.
✔ Generated Prisma Client (x.x.x)
```

## 5. Verify Database Tables

```bash
mysql -u root -p taskflow -e "SHOW TABLES;"
```

Expected tables:
```
+-----------------------------+
| Tables_in_taskflow          |
+-----------------------------+
| _prisma_migrations          |
| comments                    |
| project_members             |
| projects                    |
| tasks                       |
| users                       |
+-----------------------------+
```

## 6. Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
✓ MySQL database connected successfully
Server running on http://localhost:5000
```

## 7. Test Signup (New Terminal)

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "member"
  }'
```

Expected response:
```json
{
  "message": "Account created successfully",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": "cuid123...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "MEMBER"
  }
}
```

## 8. Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected response: Same as signup (token + user object)

## 9. Test Protected Route

```bash
# Use the token from signup/login response
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Expected response:
```json
{
  "user": {
    "id": "cuid123...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "MEMBER"
  }
}
```

## 10. Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

Open: http://localhost:5173

---

## Troubleshooting

### Error: "Authentication failed against database server"

**Solution:** Check MySQL is running and password is correct

```bash
# Verify MySQL is running
mysql -u root -p  # Try to connect

# If it fails, restart MySQL:
# Windows: net start MySQL80
# macOS: brew services start mysql
# Linux: sudo service mysql start
```

### Error: "Can't connect to MySQL server"

**Solution:** MySQL not running on port 3306

```bash
# Check if MySQL is listening on port 3306
# Windows: netstat -an | findstr 3306
# macOS: lsof -i :3306
# Linux: sudo netstat -tlnp | grep 3306
```

### Error: "Unknown database 'taskflow'"

**Solution:** Database not created

```bash
mysql -u root -p
CREATE DATABASE taskflow;
EXIT;
```

### Error: "Prisma migration fails"

**Solution:** Ensure MySQL is running and .env is correct

```bash
# Test .env DATABASE_URL:
mysql -u root -p -h localhost -D taskflow

# If that works, try migration again:
npx prisma migrate dev --name init
```

## Success Indicators ✅

- ✅ 6 tables created in MySQL
- ✅ Signup returns token
- ✅ Login works with correct credentials
- ✅ Me endpoint returns user object
- ✅ Frontend loads at http://localhost:5173
- ✅ Backend server running without errors

---

**You're ready to go! Backend + Frontend + MySQL = Full Stack TaskFlow** 🚀
