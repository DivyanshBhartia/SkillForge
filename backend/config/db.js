import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL || process.env.MONGODB_URI;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL or MONGODB_URI must be set. Did you forget to add your MongoDB Atlas connection string?");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default mongoose;