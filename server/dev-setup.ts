// Development setup for running without a real database
import express, { type Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { setupVite, serveStatic, log } from "./vite";
import { registerAuthRoutes } from "./auth-routes";
import { memoryStorage } from "./memory-storage";
import { authenticateToken, type AuthRequest } from "./auth";

const app = express();

// Mock database for development
const mockUsers = new Map();
const mockCourses = [
  {
    id: "1",
    title: "Advanced React Patterns",
    description: "Learn advanced React patterns and best practices for building scalable applications.",
    category: "development",
    level: "intermediate",
    instructorId: "instructor-1",
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2", 
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning concepts and practical applications.",
    category: "data-science",
    level: "beginner",
    instructorId: "instructor-2",
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "UX Design Principles",
    description: "Master the fundamentals of user experience design and create intuitive interfaces.",
    category: "design",
    level: "beginner",
    instructorId: "instructor-3",
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Register authentication routes
registerAuthRoutes(app);

// Mock API routes for development
app.get('/api/auth/user', (req, res) => {
  // Mock authenticated user for backward compatibility
  const mockUser = {
    id: "user-123",
    email: "demo@skillforge.com",
    firstName: "Demo",
    lastName: "User",
    profileImageUrl: null,
    role: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  res.json(mockUser);
});

app.get('/api/courses', async (req, res) => {
  const courses = await memoryStorage.getAllPublishedCourses();
  res.json(courses);
});

app.get('/api/dashboard/stats', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await memoryStorage.getUser(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let stats;
    switch (user.role) {
      case 'admin':
        stats = await memoryStorage.getAdminStats();
        break;
      case 'instructor':
        stats = await memoryStorage.getInstructorStats(req.user.id);
        break;
      default:
        stats = await memoryStorage.getStudentStats(req.user.id);
    }

    res.json({ role: user.role, stats });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/enrollments', (req, res) => {
  const enrollment = {
    id: "enrollment-" + Date.now(),
    userId: "user-123",
    courseId: req.body.courseId,
    progress: 0,
    enrolledAt: new Date(),
  };
  res.status(201).json(enrollment);
});

app.get('/api/login', (req, res) => {
  res.redirect('/auth');
});

app.get('/api/logout', (req, res) => {
  res.redirect('/');
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

(async () => {
  const httpServer = createServer(app);
  
  // Setup Vite in development
  if (app.get("env") === "development") {
    await setupVite(app, httpServer);
  } else {
    serveStatic(app);
  }
  
  const port = parseInt(process.env.PORT || '3001', 10);
  httpServer.listen(port, "0.0.0.0", () => {
    log(`🚀 SkillForge development server running on port ${port}`);
    log(`📚 Visit http://localhost:${port} to start learning!`);
  });
})();