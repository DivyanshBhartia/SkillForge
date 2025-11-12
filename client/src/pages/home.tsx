import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { RoleSelectionDialog } from "@/components/RoleSelectionDialog";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Brain,
  ArrowRight,
  Settings,
  Users,
} from "lucide-react";

export default function Home() {
  const { user, isLoading } = useAuth();
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  // Show role selection dialog for first-time users
  // Uses localStorage to track if user has completed role selection
  useEffect(() => {
    if (user && !isLoading) {
      const roleSelectionKey = `role_selected_${user.id}`;
      const hasCompletedRoleSelection = localStorage.getItem(roleSelectionKey);

      // Show dialog if user hasn't completed role selection yet
      if (!hasCompletedRoleSelection) {
        setRoleDialogOpen(true);
      }
    }
  }, [user, isLoading]);

  const handleRoleDialogClose = (open: boolean) => {
    // Only close dialog if user is not required to select a role
    // (i.e., they've already completed it before)
    if (!open && user) {
      const roleSelectionKey = `role_selected_${user.id}`;
      const hasCompletedRoleSelection = localStorage.getItem(roleSelectionKey);
      
      if (hasCompletedRoleSelection) {
        setRoleDialogOpen(false);
      }
    } else {
      setRoleDialogOpen(open);
    }
  };

  const getRoleGreeting = (role: string) => {
    switch (role) {
      case "admin":
        return "Manage and oversee the entire platform";
      case "instructor":
        return "Share your knowledge and teach amazing courses";
      default:
        return "Continue your learning journey";
    }
  };

  const getRoleDashboard = (role: string) => {
    switch (role) {
      case "admin":
        return [
          { icon: Users, title: "Total Users", value: "10,234", change: "+12%" },
          { icon: BookOpen, title: "Active Courses", value: "523", change: "+5%" },
          { icon: TrendingUp, title: "Platform Growth", value: "18%", change: "+3%" },
        ];
      case "instructor":
        return [
          { icon: BookOpen, title: "My Courses", value: "12", change: "+2" },
          { icon: Users, title: "Total Students", value: "1,847", change: "+142" },
          { icon: Award, title: "Avg. Rating", value: "4.8", change: "+0.2" },
        ];
      default:
        return [
          { icon: BookOpen, title: "Enrolled Courses", value: "5", change: "" },
          { icon: TrendingUp, title: "Courses Completed", value: "2", change: "+1" },
          { icon: Clock, title: "Learning Hours", value: "48", change: "+12" },
        ];
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-96 mb-4" />
          <Skeleton className="h-6 w-64 mb-12" />
          <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  const dashboardCards = getRoleDashboard(user?.role || "student");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold font-heading">
                  Welcome back, {user?.firstName || user?.email?.split("@")[0] || "Learner"}!
                </h1>
                <Badge variant="secondary" className="text-sm">
                  {user?.role || "student"}
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground">
                {getRoleGreeting(user?.role || "student")}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setRoleDialogOpen(true)}
              data-testid="button-change-role"
            >
              <Settings className="mr-2 h-4 w-4" />
              Change Role
            </Button>
          </div>
        </div>

        {user && (
          <RoleSelectionDialog
            user={user}
            open={roleDialogOpen}
            onOpenChange={handleRoleDialogClose}
          />
        )}

        {/* Dashboard Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {dashboardCards.map((card, index) => (
            <Card key={index} className="hover-elevate transition-all" data-testid={`card-stat-${index}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                {card.change && (
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-primary">{card.change}</span> from last month
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Recommendations Section */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-heading">Recommended For You</h2>
              <p className="text-muted-foreground">AI-powered course suggestions based on your profile</p>
            </div>
            <Button variant="outline" data-testid="button-view-all">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Advanced React Patterns",
                instructor: "Sarah Johnson",
                level: "Intermediate",
                duration: "12 hours",
                match: "95%",
              },
              {
                title: "Machine Learning Fundamentals",
                instructor: "Dr. James Chen",
                level: "Beginner",
                duration: "20 hours",
                match: "88%",
              },
              {
                title: "UX Design Principles",
                instructor: "Emily Rodriguez",
                level: "All Levels",
                duration: "8 hours",
                match: "82%",
              },
            ].map((course, index) => (
              <Card key={index} className="hover-elevate transition-all cursor-pointer" data-testid={`card-course-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">by {course.instructor}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                      <Brain className="mr-1 h-3 w-3" />
                      {course.match}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{course.level}</Badge>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Continue Learning Section */}
        {user?.role === "student" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-heading">Continue Learning</h2>
              <p className="text-muted-foreground">Pick up where you left off</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "JavaScript Masterclass",
                  progress: 65,
                  nextLesson: "Async/Await Patterns",
                },
                {
                  title: "Python for Data Science",
                  progress: 42,
                  nextLesson: "Pandas DataFrames",
                },
              ].map((course, index) => (
                <Card key={index} className="hover-elevate transition-all" data-testid={`card-continue-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>Next: {course.nextLesson}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <Button className="mt-4 w-full" data-testid={`button-continue-${index}`}>
                        Continue Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
