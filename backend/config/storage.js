import User from '../models/User.js';
import Course from '../models/Course.js';

export class MongoStorage {
  async getUser(id) {
    return await User.findById(id);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async updateUserRole(id, role) {
    return await User.findByIdAndUpdate(id, { role }, { new: true });
  }

  async getAllPublishedCourses() {
    return await Course.find({ isPublished: true }).populate('instructorId', 'firstName lastName');
  }

  async getCourseById(id) {
    return await Course.findById(id).populate('instructorId', 'firstName lastName');
  }

  async getCoursesByInstructor(instructorId) {
    return await Course.find({ instructorId }).populate('instructorId', 'firstName lastName');
  }

  async createCourse(courseData) {
    const course = new Course(courseData);
    return await course.save();
  }

  async getStudentStats(userId) {
    // TODO: replace with real enrollment stats once the enrollment model is implemented
    return { enrolledCount: 2, completedCount: 1 };
  }

  async getInstructorStats(userId) {
    const courseCount = await Course.countDocuments({ instructorId: userId });
    // TODO: replace hard-coded student count with real aggregated metrics
    return { courseCount, studentCount: 25 };
  }

  async getAdminStats() {
    const userCount = await User.countDocuments();
    const courseCount = await Course.countDocuments();
    // TODO: replace hard-coded enrollment count with real aggregated metrics
    return { userCount, courseCount, enrollmentCount: 15 };
  }
}

export const storage = new MongoStorage();