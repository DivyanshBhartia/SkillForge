import express from "express";
import { createServer } from "http";
import cors from "cors";
import { connectDB } from "./backend/config/db.js";
import { registerAuthRoutes } from "./backend/routes/auth-routes.js";
import { storage } from "./backend/config/storage.js";
import { authenticateToken } from "./backend/middleware/auth.js";

function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Register authentication routes
registerAuthRoutes(app);

// API routes
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

app.get('/', (req, res) => {
  res.json({ message: 'SkillForge API is running!' });
});

(async () => {
  await connectDB();
  const httpServer = createServer(app);
  
  const port = parseInt(process.env.PORT || '10000', 10);
  httpServer.listen(port, "0.0.0.0", () => {
    log(`🚀 SkillForge backend running on port ${port}`);
    log(`📚 API available at http://localhost:${port}`);
  });
})();