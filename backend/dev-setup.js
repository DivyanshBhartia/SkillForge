import express from "express";
import { createServer } from "http";
import cors from "cors";
// import { setupVite, serveStatic, log } from "./vite.js";
function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
import { registerAuthRoutes } from "./auth-routes.js";
import { storage } from "./storage.js";
import { connectDB } from "./db.js";
import { authenticateToken } from "./auth.js";

const app = express();

// Mock courses data
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

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

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
  const courses = await storage.getAllPublishedCourses();
  res.json(courses);
});

app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await storage.getUser(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let stats;
    switch (user.role) {
      case 'admin':
        stats = await storage.getAdminStats();
        break;
      case 'instructor':
        stats = await storage.getInstructorStats(req.user.id);
        break;
      default:
        stats = await storage.getStudentStats(req.user.id);
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

app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

(async () => {
  await connectDB();
  const httpServer = createServer(app);
  
  const port = parseInt(process.env.PORT || '4000', 10);
  httpServer.listen(port, "0.0.0.0", () => {
    log(`🚀 SkillForge backend running on port ${port}`);
    log(`📚 API available at http://localhost:${port}`);
  });
})();