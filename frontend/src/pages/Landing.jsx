import { Link } from "wouter";

export default function Landing() {
  const handleGetStarted = () => {
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span className="text-xl font-bold font-heading">SkillForge</span>
            </div>
            <div className="flex items-center gap-4">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 py-20 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="flex flex-col justify-center lg:col-span-3">
              <div className="mb-6 w-fit bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                AI-Powered Learning Platform
              </div>
              <h1 className="text-4xl font-bold tracking-tight font-heading sm:text-5xl lg:text-6xl">
                Master Skills with{" "}
                <span className="text-primary">AI-Powered Learning</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Discover personalized course recommendations, track your progress, and advance your career with SkillForge's intelligent learning management system.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleGetStarted}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 text-base"
                >
                  Get Started
                  <svg className="ml-2 h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <Link href="/courses">
                  <button className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 text-base">
                    Explore Courses
                  </button>
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span className="text-sm font-medium">10,000+ Active Learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-sm font-medium">500+ Courses</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl" />
                <div className="relative w-full max-w-md border border-primary/20 shadow-xl bg-card rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="text-xl font-semibold">AI Recommendation</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Based on your profile, we recommend:</p>
                    <div className="rounded-lg border bg-card p-4 space-y-2">
                      <h4 className="font-semibold">Advanced React Patterns</h4>
                      <div className="flex items-center gap-2">
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">Intermediate</span>
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">12 hours</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>95% match to your goals</span>
                      </div>
                    </div>
                  </div>
                </div>
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
            <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your learning style, goals, and progress to suggest courses perfectly matched to your needs
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your learning journey with detailed analytics and insights that help you stay on track
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Course Discovery</h3>
              <p className="text-muted-foreground">
                Find exactly what you need with intelligent search and filtering across our comprehensive course library
              </p>
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
          <button
            onClick={handleGetStarted}
            className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 text-base"
          >
            Create Free Account
          </button>
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