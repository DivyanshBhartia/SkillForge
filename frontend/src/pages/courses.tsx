import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import type { Course } from "@shared/schema";

export default function Courses() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const filteredCourses = courses?.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleEnroll = async (courseId: string) => {
    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        // Handle successful enrollment
        console.log("Enrolled successfully");
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      development: "bg-blue-100 text-blue-800",
      design: "bg-purple-100 text-purple-800",
      business: "bg-green-100 text-green-800",
      "data-science": "bg-orange-100 text-orange-800",
      marketing: "bg-pink-100 text-pink-800",
    };
    return colors[category.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    };
    return colors[level.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-4">Explore Courses</h1>
          <p className="text-lg text-muted-foreground">
            Discover amazing courses taught by expert instructors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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
              <Card 
                key={course.id} 
                className={`hover-elevate transition-all ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
              >
                {viewMode === "grid" ? (
                  <>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex gap-2">
                          {course.category && (
                            <Badge className={getCategoryColor(course.category)}>
                              {course.category}
                            </Badge>
                          )}
                          {course.level && (
                            <Badge className={getLevelColor(course.level)}>
                              {course.level}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>4.8</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>12 hours</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>1.2k students</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleEnroll(course.id)}
                        disabled={!user}
                      >
                        {user ? "Enroll Now" : "Sign In to Enroll"}
                      </Button>
                    </CardContent>
                  </>
                ) : (
                  <div className="flex w-full">
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex gap-2 mb-2">
                              {course.category && (
                                <Badge className={getCategoryColor(course.category)}>
                                  {course.category}
                                </Badge>
                              )}
                              {course.level && (
                                <Badge className={getLevelColor(course.level)}>
                                  {course.level}
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                            <CardDescription className="mt-2">
                              {course.description}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>4.8</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>12 hours</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>1.2k students</span>
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleEnroll(course.id)}
                            disabled={!user}
                          >
                            {user ? "Enroll Now" : "Sign In to Enroll"}
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}