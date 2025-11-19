import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, LogOut, User, BookOpen } from "lucide-react";
import { Link } from "wouter";

export function Navigation() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    if (!firstName && !lastName) return "U";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-destructive/10 text-destructive hover-elevate";
      case "instructor":
        return "bg-primary/10 text-primary hover-elevate";
      default:
        return "bg-muted text-muted-foreground hover-elevate";
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    window.location.href = "/auth";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="flex items-center gap-2 hover-elevate cursor-pointer">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-heading">SkillForge</span>
              </div>
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/courses">
                <Button variant="ghost" className="hover-elevate">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Courses
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 hover-elevate"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex md:flex-col md:items-start">
                      <span className="text-sm font-medium">
                        {user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : user.email}
                      </span>
                      <Badge variant="secondary" className={`text-xs ${getRoleColor(user.role || "student")}`}>
                        {user.role || "student"}
                      </Badge>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">
                        {user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "User"}
                      </span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover-elevate" data-testid="menu-profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive hover-elevate"
                    data-testid="menu-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin} data-testid="button-login">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
