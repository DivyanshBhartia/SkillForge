# SkillForge - AI-Powered Learning Management System

A modern, full-stack learning management system built with React, TypeScript, Express, and PostgreSQL. Features AI-powered course recommendations, role-based access control, and a beautiful, responsive UI.

## 🚀 Features

### Authentication & Authorization
- **Replit Auth Integration** - Seamless OAuth authentication
- **Role-Based Access Control** - Student, Instructor, and Admin roles
- **Modern Auth UI** - Beautiful login/signup pages with form validation
- **Session Management** - Secure session handling with PostgreSQL storage

### User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI Components** - Built with Radix UI and Tailwind CSS
- **Dark/Light Mode Support** - Automatic theme switching
- **Interactive Animations** - Smooth hover effects and transitions

### Learning Management
- **Course Discovery** - Browse and search through available courses
- **AI Recommendations** - Personalized course suggestions
- **Progress Tracking** - Monitor learning progress and completion
- **Role-Specific Dashboards** - Tailored experiences for each user type

### Technical Features
- **Full-Stack TypeScript** - Type safety across frontend and backend
- **Real-time Updates** - React Query for efficient data fetching
- **Database Integration** - PostgreSQL with Drizzle ORM
- **Modern Build Tools** - Vite for fast development and building

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **React Query** - Powerful data fetching and caching
- **Wouter** - Lightweight client-side routing
- **Framer Motion** - Smooth animations and transitions

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Fast, unopinionated web framework
- **TypeScript** - Type-safe backend development
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Robust relational database
- **Passport.js** - Authentication middleware
- **Express Session** - Session management

### Database
- **Neon PostgreSQL** - Serverless PostgreSQL database
- **Drizzle Kit** - Database migrations and schema management
- **Connection Pooling** - Efficient database connections

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkillForgeAuth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `SESSION_SECRET` - A secure random string for session encryption
   - `REPL_ID` - Your Replit app ID (if using Replit)

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5000`

## 🏗️ Project Structure

```
SkillForgeAuth/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   └── ui/         # Base UI components (Radix UI)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and configurations
│   │   ├── pages/          # Page components
│   │   └── main.tsx        # Application entry point
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── db.ts              # Database connection
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── replitAuth.ts      # Authentication setup
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── package.json           # Dependencies and scripts
```

## 🎯 Key Pages & Features

### Landing Page (`/`)
- Hero section with compelling value proposition
- Feature showcase with AI-powered learning highlights
- Course category overview
- Call-to-action buttons leading to authentication

### Authentication Page (`/auth`)
- Toggle between login and signup forms
- Email/password authentication with validation
- Replit OAuth integration
- Password visibility toggle
- Responsive design with beautiful UI

### Home Dashboard (`/`)
- Role-specific welcome messages and statistics
- AI-powered course recommendations
- Progress tracking for students
- Quick access to continue learning
- Role selection dialog for new users

### Courses Page (`/courses`)
- Browse all available courses
- Search and filter functionality
- Grid and list view modes
- Course enrollment with authentication check
- Category and difficulty level badges

## 👥 User Roles

### Student
- Browse and enroll in courses
- Track learning progress
- Receive AI-powered recommendations
- View personalized dashboard with enrolled courses

### Instructor
- Create and manage courses
- View student enrollment statistics
- Access instructor-specific dashboard
- Manage course content and lessons

### Admin
- Oversee entire platform
- Manage users and their roles
- View comprehensive platform statistics
- Access administrative controls

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check TypeScript
- `npm run db:push` - Push database schema changes

### Database Schema

The application uses a well-structured PostgreSQL schema with the following main tables:

- **users** - User profiles with role-based access
- **courses** - Course information and metadata
- **lessons** - Individual lessons within courses
- **enrollments** - Student course enrollments with progress
- **lesson_progress** - Detailed lesson completion tracking
- **sessions** - Secure session storage

## 🚀 Deployment

The application is designed to be deployed on platforms like:

- **Replit** - Integrated development and hosting
- **Vercel** - Frontend deployment with serverless functions
- **Railway** - Full-stack deployment with PostgreSQL
- **Heroku** - Traditional cloud platform deployment

## 🎨 UI/UX Features

- **Modern Design System** - Consistent spacing, typography, and colors
- **Accessibility First** - WCAG compliant components from Radix UI
- **Responsive Layout** - Mobile-first design approach
- **Interactive Elements** - Hover effects, loading states, and animations
- **Form Validation** - Real-time validation with helpful error messages
- **Toast Notifications** - User feedback for actions and errors

## 🔒 Security Features

- **Secure Authentication** - OAuth 2.0 with Replit integration
- **Session Security** - HTTP-only cookies with secure flags
- **CSRF Protection** - Built-in protection against cross-site attacks
- **Input Validation** - Server-side validation with Zod schemas
- **Role-Based Authorization** - Endpoint protection based on user roles

## 📱 Mobile Experience

The application is fully responsive and provides an excellent mobile experience:

- Touch-friendly interface elements
- Optimized navigation for small screens
- Fast loading times with code splitting
- Progressive Web App capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Radix UI** - For accessible, unstyled UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **Drizzle ORM** - For type-safe database operations
- **React Query** - For powerful data fetching and caching
- **Neon** - For serverless PostgreSQL hosting