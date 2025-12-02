import express from "express";
import { createServer } from "http";
import cors from "cors";
import { z } from "zod";

function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

import { registerAuthRoutes } from "./routes/auth-routes.js";
import { authenticateToken, requireRole } from "./middleware/auth.js";
import { storage } from "./config/storage.js";
import { connectDB } from "./config/db.js";

const app = express();

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

// Real API routes backed by MongoDB
app.get('/api/auth/user', authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await storage.getUser(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user.toObject
      ? user.toObject()
      : user;

    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get /api/auth/user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Courses list - always from MongoDB
app.get('/api/courses', async (_req, res) => {
  try {
    const courses = await storage.getAllPublishedCourses();
    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Course details by id
app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await storage.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Get course by id error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const courseCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  imageUrl: z.string().url('Invalid image URL').optional().nullable(),
  isPublished: z.boolean().optional(),
});

// Create course - open to anyone (no auth required)
app.post('/api/courses', async (req, res) => {
  try {
    const validationResult = courseCreateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationResult.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    const data = validationResult.data;

    const course = await storage.createCourse({
      title: data.title,
      description: data.description,
      category: data.category,
      level: data.level,
      imageUrl: data.imageUrl ?? null,
      isPublished: data.isPublished ?? true,
      // No authenticated user; instructor is anonymous/unspecified
      instructorId: null,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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

const httpServer = createServer(app);
const port = 4000;

async function start() {
  try {
    await connectDB();
    httpServer.listen(port, "0.0.0.0", () => {
      log(`🚀 SkillForge backend running on port ${port}`);
      log(`📚 API available at http://localhost:${port}`);
      log(`🗄️ Connected to MongoDB - serving real data`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();