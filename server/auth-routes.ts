import type { Express } from 'express';
import { z } from 'zod';
import { memoryStorage } from './memory-storage';
import { hashPassword, comparePassword, generateToken, authenticateToken, type AuthRequest } from './auth';

const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['student', 'instructor', 'admin']).default('student'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export function registerAuthRoutes(app: Express) {
  // Signup endpoint
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const validationResult = signupSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }

      const { email, password, firstName, lastName, role } = validationResult.data;

      // Check if user already exists
      const existingUser = await memoryStorage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists with this email' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await memoryStorage.createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
      });

      // Generate JWT token
      const token = generateToken(user.id, user.email!, user.role);

      // Return user data (without password) and token
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(201).json({
        message: 'User created successfully',
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Login endpoint
  app.post('/api/auth/login', async (req, res) => {
    try {
      const validationResult = loginSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }

      const { email, password } = validationResult.data;

      // Find user by email
      const user = await memoryStorage.getUserByEmail(email);
      if (!user || !user.password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Verify password
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = generateToken(user.id, user.email!, user.role);

      // Return user data (without password) and token
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        message: 'Login successful',
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get current user endpoint
  app.get('/api/auth/me', authenticateToken, async (req: AuthRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const user = await memoryStorage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Logout endpoint (client-side token removal)
  app.post('/api/auth/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
  });
}