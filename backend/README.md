# TaskFlow Backend

Production-ready Express + TypeScript backend for TaskFlow SaaS.

## Quick Start

1. Install dependencies:
   npm install
2. Copy environment file:
   copy .env.example .env
3. Add your MongoDB Atlas URI and JWT secret in .env
4. Run development server:
   npm run dev

## Scripts

- npm run dev
- npm run build
- npm start

## Base URL

http://localhost:5000/api/v1

## Auth Endpoints

- POST /auth/signup
- POST /auth/login
- GET /auth/me
- POST /auth/logout
- GET /health
