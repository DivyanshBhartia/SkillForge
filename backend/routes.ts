// API routes for SkillForge LMS
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertCourseSchema, insertEnrollmentSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up Replit Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user role (protected endpoint)
  app.patch('/api/users/:id/role', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const currentUserId = req.user.claims.sub;

      // Only allow users to update their own role, or admins to update any role
      const currentUser = await storage.getUser(currentUserId);
      if (currentUser?.role !== 'admin' && currentUserId !== id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Validate role
      if (!['student', 'instructor', 'admin'].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const updatedUser = await storage.updateUserRole(id, role);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  // Get dashboard statistics
  app.get('/api/dashboard/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let stats;
      switch (user.role) {
        case 'admin':
          stats = await storage.getAdminStats();
          break;
        case 'instructor':
          stats = await storage.getInstructorStats(userId);
          break;
        default:
          stats = await storage.getStudentStats(userId);
      }

      res.json({ role: user.role, stats });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Course routes
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getAllPublishedCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.post('/api/courses', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (user?.role !== 'instructor' && user?.role !== 'admin') {
        return res.status(403).json({ message: "Only instructors and admins can create courses" });
      }

      // Validate request body
      const validationResult = insertCourseSchema.safeParse({ ...req.body, instructorId: userId });
      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const course = await storage.createCourse(validationResult.data);
      res.status(201).json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  // Enrollment routes
  app.get('/api/enrollments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const enrollments = await storage.getEnrollmentsByUser(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.post('/api/enrollments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const validationResult = insertEnrollmentSchema.safeParse({
        ...req.body,
        userId,
        progress: 0,
      });
      
      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      // Check if enrollment already exists
      const existingEnrollments = await storage.getEnrollmentsByUser(userId);
      const alreadyEnrolled = existingEnrollments.some(
        e => e.courseId === validationResult.data.courseId
      );
      
      if (alreadyEnrolled) {
        return res.status(409).json({ message: "Already enrolled in this course" });
      }
      
      const enrollment = await storage.createEnrollment(validationResult.data);
      res.status(201).json(enrollment);
    } catch (error) {
      console.error("Error creating enrollment:", error);
      res.status(500).json({ message: "Failed to create enrollment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
