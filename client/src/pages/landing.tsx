import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import {
  Brain,
  TrendingUp,
  Search,
  Code,
  Briefcase,
  Palette,
  Database,
  CheckCircle,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function Landing() {
  const handleGetStarted = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="flex flex-col justify-center lg:col-span-3">
              <Badge variant="secondary" className="mb-6 w-fit">
                AI-Powered Learning Platform
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight font-heading sm:text-5xl lg:text-6xl">
                Master Skills with{" "}
                <span className="text-primary">AI-Powered Learning</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Discover personalized course recommendations, track your progress, and advance your career with SkillForge's intelligent learning management system.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="text-base"
                  data-testid="button-get-started"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-base" data-testid="button-explore">
                  Explore Courses
                </Button>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">10,000+ Active Learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">500+ Courses</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl" />
                <Card className="relative w-full max-w-md border-primary/20 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Brain className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">AI Recommendation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Based on your profile, we recommend:</p>
                      <div className="rounded-lg border bg-card p-4 space-y-2">
                        <h4 className="font-semibold">Advanced React Patterns</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Intermediate</Badge>
                          <Badge variant="secondary">12 hours</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>95% match to your goals</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="border-b py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold font-heading sm:text-4xl">
              Powered by Artificial Intelligence
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Smart features designed to accelerate your learning journey
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Our AI analyzes your learning style, goals, and progress to suggest courses perfectly matched to your needs
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Monitor your learning journey with detailed analytics and insights that help you stay on track
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Course Discovery</CardTitle>
                <CardDescription>
                  Find exactly what you need with intelligent search and filtering across our comprehensive course library
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="border-b py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold font-heading sm:text-4xl">
              Explore Our Course Categories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn from industry experts across diverse fields
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Code, title: "Development", count: "150+ courses", color: "text-blue-500" },
              { icon: Briefcase, title: "Business", count: "120+ courses", color: "text-green-500" },
              { icon: Palette, title: "Design", count: "80+ courses", color: "text-purple-500" },
              { icon: Database, title: "Data Science", count: "100+ courses", color: "text-orange-500" },
            ].map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover-elevate transition-all"
                data-testid={`card-category-${category.title.toLowerCase()}`}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted ${category.color}`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.count}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold font-heading sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three simple steps to start your learning journey
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border lg:block" />
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  description: "Create your account and tell us about your learning goals and interests",
                },
                {
                  step: "2",
                  title: "Get Recommendations",
                  description: "Our AI analyzes your profile and recommends personalized courses",
                },
                {
                  step: "3",
                  title: "Start Learning",
                  description: "Begin your journey with expert-led courses and track your progress",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-8 lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1">
                    <Card className={index % 2 === 0 ? "lg:ml-auto lg:mr-8" : "lg:ml-8"}>
                      <CardHeader>
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                          {item.step}
                        </div>
                        <CardTitle className="text-2xl">{item.title}</CardTitle>
                        <CardDescription className="text-base">{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  <div className="hidden flex-1 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-heading sm:text-4xl lg:text-5xl">
            Start Your Learning Journey Today
          </h2>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Join thousands of learners advancing their careers with SkillForge
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="mt-8 text-base"
            data-testid="button-cta-signup"
          >
            Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2025 SkillForge. AI-Powered Learning Management System.</p>
        </div>
      </footer>
    </div>
  );
}
