// In-memory storage for development
class MemoryStorage {
  constructor() {
    this.users = new Map();
    this.usersByEmail = new Map();
    this.idCounter = 1;
  }

  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByEmail(email) {
    return this.usersByEmail.get(email);
  }

  async createUser(userData) {
    const id = userData.id || `user-${this.idCounter++}`;
    const user = {
      id,
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profileImageUrl: userData.profileImageUrl,
      role: userData.role || 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.set(id, user);
    this.usersByEmail.set(user.email, user);
    
    return user;
  }

  async upsertUser(userData) {
    const existingUser = userData.email ? this.usersByEmail.get(userData.email) : undefined;
    
    if (existingUser) {
      const updatedUser = {
        ...existingUser,
        ...userData,
        updatedAt: new Date(),
      };
      this.users.set(existingUser.id, updatedUser);
      this.usersByEmail.set(updatedUser.email, updatedUser);
      return updatedUser;
    }
    
    return this.createUser(userData);
  }

  async updateUserRole(id, role) {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = {
      ...user,
      role,
      updatedAt: new Date(),
    };

    this.users.set(id, updatedUser);
    this.usersByEmail.set(user.email, updatedUser);
    
    return updatedUser;
  }

  // Mock methods for other operations
  async getAllPublishedCourses() {
    return [
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
  }

  async getStudentStats(userId) {
    return { enrolledCount: 2, completedCount: 1 };
  }

  async getInstructorStats(userId) {
    return { courseCount: 3, studentCount: 25 };
  }

  async getAdminStats() {
    return { userCount: this.users.size, courseCount: 3, enrollmentCount: 15 };
  }
}

export const memoryStorage = new MemoryStorage();