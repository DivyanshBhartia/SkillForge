import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { GraduationCap, Users, BookOpen } from "lucide-react";
import type { User } from "@shared/schema";

interface RoleSelectionDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoleSelectionDialog({ user, open, onOpenChange }: RoleSelectionDialogProps) {
  const [selectedRole, setSelectedRole] = useState<string>(user.role || "student");
  const { toast } = useToast();

  const updateRoleMutation = useMutation({
    mutationFn: async (role: string) => {
      return await apiRequest("PATCH", `/api/users/${user.id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      
      // Mark role selection as completed in localStorage
      const roleSelectionKey = `role_selected_${user.id}`;
      localStorage.setItem(roleSelectionKey, "true");
      
      toast({
        title: "Success",
        description: "Your role has been updated successfully!",
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update role",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    // If user keeps the same role, just mark as completed and close
    if (selectedRole === user.role) {
      const roleSelectionKey = `role_selected_${user.id}`;
      localStorage.setItem(roleSelectionKey, "true");
      toast({
        title: "Success",
        description: "Your role has been confirmed!",
      });
      onOpenChange(false);
      return;
    }
    
    // Otherwise, update the role via API
    updateRoleMutation.mutate(selectedRole);
  };

  const roles = [
    {
      value: "student",
      icon: GraduationCap,
      title: "Student",
      description: "Learn and grow your skills with AI-powered course recommendations",
    },
    {
      value: "instructor",
      icon: BookOpen,
      title: "Instructor",
      description: "Share your knowledge and teach amazing courses to learners worldwide",
    },
    {
      value: "admin",
      icon: Users,
      title: "Admin",
      description: "Manage the platform, users, and oversee all educational content",
    },
  ];

  const handleDialogChange = (newOpen: boolean) => {
    // Check if user has completed role selection
    const roleSelectionKey = `role_selected_${user.id}`;
    const hasCompletedRoleSelection = localStorage.getItem(roleSelectionKey);
    
    // Only allow closing if they've completed it before
    if (!newOpen && !hasCompletedRoleSelection) {
      toast({
        title: "Role Selection Required",
        description: "Please select your role to continue using SkillForge.",
        variant: "destructive",
      });
      return;
    }
    
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-2xl" onEscapeKeyDown={(e) => {
        const roleSelectionKey = `role_selected_${user.id}`;
        const hasCompletedRoleSelection = localStorage.getItem(roleSelectionKey);
        if (!hasCompletedRoleSelection) {
          e.preventDefault();
        }
      }} onPointerDownOutside={(e) => {
        const roleSelectionKey = `role_selected_${user.id}`;
        const hasCompletedRoleSelection = localStorage.getItem(roleSelectionKey);
        if (!hasCompletedRoleSelection) {
          e.preventDefault();
        }
      }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Choose Your Role</DialogTitle>
          <DialogDescription>
            Select how you'd like to use SkillForge. You can change this later in your profile settings.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="gap-4">
          {roles.map((role) => (
            <div key={role.value} className="relative">
              <RadioGroupItem
                value={role.value}
                id={role.value}
                className="peer sr-only"
                data-testid={`radio-role-${role.value}`}
              />
              <Label
                htmlFor={role.value}
                className="cursor-pointer"
              >
                <Card className="hover-elevate transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <role.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{role.title}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-end gap-3 mt-4">
          {localStorage.getItem(`role_selected_${user.id}`) && (
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateRoleMutation.isPending}
              data-testid="button-cancel-role"
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={updateRoleMutation.isPending}
            data-testid="button-confirm-role"
          >
            {updateRoleMutation.isPending ? "Saving..." : "Confirm Role"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
