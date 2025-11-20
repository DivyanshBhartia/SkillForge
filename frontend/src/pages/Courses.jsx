import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://skillforge-1idj.onrender.com/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Mock data for demo
      setCourses([
        {
          id: "1",
          title: "Advanced React Patterns",
          description: "Learn advanced React patterns and best practices for building scalable applications.",
          category: "development",
          level: "intermediate",
          imageUrl: null,
        },
        {
          id: "2",
          title: "Machine Learning Fundamentals",
          description: "Introduction to machine learning concepts and practical applications.",
          category: "data-science",
          level: "beginner",
          imageUrl: null,
        },
        {
          id: "3",
          title: "UX Design Principles",
          description: "Master the fundamentals of user experience design and create intuitive interfaces.",
          category: "design",
          level: "beginner",
          imageUrl: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category) => {
    const colors = {
      development: "bg-blue-100 text-blue-800",
      "data-science": "bg-orange-100 text-orange-800",
      design: "bg-purple-100 text-purple-800",
      business: "bg-green-100 text-green-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getLevelColor = (level) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/">
                  <h1 className="text-2xl font-bold text-primary cursor-pointer">SkillForge</h1>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer">SkillForge</h1>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/courses">
                  <span className="text-primary font-medium cursor-pointer">Courses</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth">
                <button className="text-primary hover:text-primary/80">
                  Sign In
                </button>
              </Link>
              <Link href="/auth">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-4">Explore Courses</h1>
          <p className="text-lg text-muted-foreground">
            Discover amazing courses taught by expert instructors
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <svg className="h-12 w-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "No courses are available at the moment"
                }
              </p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div key={course.id} className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(course.category)}`}>
                        {course.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>4.8</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>12 hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span>1.2k students</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/auth">
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90">
                      Enroll Now
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}