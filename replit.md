# SkillForge - AI-Powered Learning Management System

## Project Overview
SkillForge is a comprehensive Learning Management System (LMS) with AI-powered features, designed to facilitate online education for students, instructors, and administrators.

## Current State
MVP authentication system is complete and functional, featuring:
- Replit Auth integration with OAuth support (Google, GitHub, X, Apple, email/password)
- Role-based access control (Student, Instructor, Admin)
- Landing page for unauthenticated users
- Role-based home dashboards for authenticated users
- Mandatory role selection for first-time users

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui, Wouter (routing)
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL (Neon-backed via Replit)
- **Authentication**: Replit Auth (OpenID Connect)
- **State Management**: TanStack Query
- **Build Tool**: Vite

## Project Structure

### Database Schema (`shared/schema.ts`)
- **users**: id (serial), replitId (unique), email, firstName, lastName, profileImageUrl, role (student/instructor/admin), createdAt

### Backend (`server/`)
- `index.ts`: Express server entry point
- `replitAuth.ts`: Replit Auth configuration and middleware
- `routes.ts`: API routes for user management
- `storage.ts`: Storage interface (currently using in-memory)

### Frontend (`client/src/`)
- `pages/landing.tsx`: Landing page for unauthenticated users
- `pages/home.tsx`: Role-based dashboard for authenticated users
- `components/Navigation.tsx`: Navigation bar with auth state
- `components/RoleSelectionDialog.tsx`: Mandatory role selection for new users

## Authentication Flow
1. Unauthenticated users land on landing page
2. Click "Sign In" → Redirected to Replit Auth
3. After successful auth, user is redirected back to app
4. New users see mandatory role selection dialog
5. Users select role (Student/Instructor/Admin) and confirm
6. Role selection completion tracked in localStorage (keyed by user.id)
7. Authenticated users see role-based dashboard
8. Users can change role via "Change Role" button in navigation dropdown

## Design Guidelines
- **Font**: Inter (body text), Space Grotesk (headings)
- **Color Palette**: Education/AI-focused with primary blues, accent purples
- **Components**: Using shadcn/ui components consistently
- **Interactions**: Subtle hover/active states using hover-elevate utilities
- **Layout**: Clean, modern, with proper spacing and contrast

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Express session secret
- Plus standard Replit database env vars (PGHOST, PGPORT, etc.)

## Development
- Run `npm run dev` to start both frontend and backend
- Frontend served at port 5000
- Hot module reloading enabled

## User Preferences
None documented yet.

## Recent Changes (November 12, 2025)
- Implemented complete authentication system with Replit Auth
- Extended user schema with role-based access control
- Created landing page and role-based home dashboards
- Built mandatory role selection dialog with localStorage tracking
- Fixed role selection flow to ensure all users (including those keeping default "student" role) can complete onboarding
