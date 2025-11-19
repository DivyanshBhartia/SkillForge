// Storage interface and implementation for SkillForge LMS
import { 
  users, 
  courses,
  lessons,
  enrollments,
  lessonProgress,
  type User, 
  type UpsertUser,
  type Course,
  type InsertCourse,
  type Lesson,
  type InsertLesson,
  type Enrollment,
  type InsertEnrollment,
  type LessonProgress,
  type InsertLessonProgress,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, count, sql, inArray } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: UpsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserRole(id: string, role: string): Promise<User | undefined>;
  
  // Course operations
  getCourse(id: string): Promise<Course | undefined>;
  getCoursesByInstructor(instructorId: string): Promise<Course[]>;
  getAllPublishedCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<void>;
  
  // Enrollment operations
  getEnrollmentsByUser(userId: string): Promise<Enrollment[]>;
  getEnrollmentsByCourse(courseId: string): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(id: string, progress: number): Promise<Enrollment | undefined>;
  
  // Dashboard statistics
  getStudentStats(userId: string): Promise<{enrolledCount: number, completedCount: number}>;
  getInstructorStats(userId: string): Promise<{courseCount: number, studentCount: number}>;
  getAdminStats(): Promise<{userCount: number, courseCount: number, enrollmentCount: number}>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: UpsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserRole(id: string, role: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async getCoursesByInstructor(instructorId: string): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.instructorId, instructorId));
  }

  async getAllPublishedCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isPublished, true));
  }

  async createCourse(courseData: InsertCourse): Promise<Course> {
    const [course] = await db.insert(courses).values(courseData).returning();
    return course;
  }

  async updateCourse(id: string, courseData: Partial<InsertCourse>): Promise<Course | undefined> {
    const [course] = await db
      .update(courses)
      .set({ ...courseData, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return course;
  }

  async deleteCourse(id: string): Promise<void> {
    await db.delete(courses).where(eq(courses.id, id));
  }

  async getEnrollmentsByUser(userId: string): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  }

  async getEnrollmentsByCourse(courseId: string): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.courseId, courseId));
  }

  async createEnrollment(enrollmentData: InsertEnrollment): Promise<Enrollment> {
    const [enrollment] = await db.insert(enrollments).values(enrollmentData).returning();
    return enrollment;
  }

  async updateEnrollmentProgress(id: string, progress: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db
      .update(enrollments)
      .set({ progress })
      .where(eq(enrollments.id, id))
      .returning();
    return enrollment;
  }

  async getStudentStats(userId: string): Promise<{enrolledCount: number, completedCount: number}> {
    const userEnrollments = await db
      .select({
        progress: enrollments.progress,
        completedAt: enrollments.completedAt,
      })
      .from(enrollments)
      .where(eq(enrollments.userId, userId));

    const enrolledCount = userEnrollments.length;
    const completedCount = userEnrollments.filter(e => e.completedAt !== null).length;

    return { enrolledCount, completedCount };
  }

  async getInstructorStats(userId: string): Promise<{courseCount: number, studentCount: number}> {
    const instructorCourses = await db
      .select({ id: courses.id })
      .from(courses)
      .where(eq(courses.instructorId, userId));

    const courseCount = instructorCourses.length;

    if (courseCount === 0) {
      return { courseCount: 0, studentCount: 0 };
    }

    const courseIds = instructorCourses.map(c => c.id);
    const studentEnrollments = await db
      .select({ userId: enrollments.userId })
      .from(enrollments)
      .where(inArray(enrollments.courseId, courseIds));

    const uniqueStudents = new Set(studentEnrollments.map(e => e.userId));
    const studentCount = uniqueStudents.size;

    return { courseCount, studentCount };
  }

  async getAdminStats(): Promise<{userCount: number, courseCount: number, enrollmentCount: number}> {
    const [userCountResult] = await db.select({ count: count() }).from(users);
    const [courseCountResult] = await db.select({ count: count() }).from(courses);
    const [enrollmentCountResult] = await db.select({ count: count() }).from(enrollments);

    return {
      userCount: Number(userCountResult?.count || 0),
      courseCount: Number(courseCountResult?.count || 0),
      enrollmentCount: Number(enrollmentCountResult?.count || 0),
    };
  }
}

export const storage = new DatabaseStorage();
