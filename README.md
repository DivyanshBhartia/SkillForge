# SkillForge - AI-Powered Learning Management System

## Project Structure

```
SkillForgeAuth/
├── frontend/          # React.js frontend
│   ├── src/          # React components and pages
│   ├── package.json  # Frontend dependencies
│   └── vite.config.js
├── backend/          # Node.js + Express API
│   ├── models/       # MongoDB models
│   ├── .env         # Environment variables
│   ├── package.json # Backend dependencies
│   └── dev-setup.js # Server entry point
└── README.md
```

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
# Update .env with your MongoDB URI
npm run dev  # Runs on http://localhost:4000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

## API Endpoints
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user
- GET `/api/courses` - Get all courses
- GET `/api/dashboard/stats` - Get user statistics

## Environment Variables (backend/.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```