import { connectDB } from './config/db.js';
import User from './models/User.js';
import Course from './models/Course.js';

const instructorsData = [
	{
		email: 'instructor1@skillforge.com',
		password: 'password',
		firstName: 'Instructor',
		lastName: 'One',
		role: 'instructor'
	},
	{
		email: 'instructor2@skillforge.com',
		password: 'password',
		firstName: 'Instructor',
		lastName: 'Two',
		role: 'instructor'
	},
	{
		email: 'instructor3@skillforge.com',
		password: 'password',
		firstName: 'Instructor',
		lastName: 'Three',
		role: 'instructor'
	}
];

const coursesData = [
	{
		title: 'Advanced React Patterns',
		description: 'Learn advanced React patterns and best practices for building scalable applications.',
		category: 'development',
		level: 'intermediate',
		instructorEmail: 'instructor1@skillforge.com',
		isPublished: true
	},
	{
		title: 'Machine Learning Fundamentals',
		description: 'Introduction to machine learning concepts and practical applications.',
		category: 'data-science',
		level: 'beginner',
		instructorEmail: 'instructor2@skillforge.com',
		isPublished: true
	},
	{
		title: 'UX Design Principles',
		description: 'Master the fundamentals of user experience design and create intuitive interfaces.',
		category: 'design',
		level: 'beginner',
		instructorEmail: 'instructor3@skillforge.com',
		isPublished: true
	}
];

async function seed() {
	try {
		await connectDB();

		// Upsert instructors so running seed multiple times is safe
		const instructorsMap = {};
		for (const instr of instructorsData) {
			let user = await User.findOne({ email: instr.email });
			if (!user) {
				user = new User(instr);
				await user.save();
			}
			instructorsMap[instr.email] = user;
		}

		// Remove existing courses and recreate
		await Course.deleteMany({});

		const createdCourses = [];
		for (const c of coursesData) {
			const instructor = instructorsMap[c.instructorEmail];
			if (!instructor) continue;

			const newCourse = new Course({
				title: c.title,
				description: c.description,
				category: c.category,
				level: c.level,
				instructorId: instructor._id,
				isPublished: c.isPublished,
				imageUrl: c.imageUrl || null
			});

			await newCourse.save();
			createdCourses.push(newCourse);
		}

		console.log(`Seed complete: created ${createdCourses.length} courses and ${Object.keys(instructorsMap).length} instructors.`);
		process.exit(0);
	} catch (error) {
		console.error('Seeding error:', error);
		process.exit(1);
	}
}

if (require.main === module) {
	seed();
}

