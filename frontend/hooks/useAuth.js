import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return null;
  }

  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem('authToken');
      return null;
    }

    return await response.json();
  } catch (error) {
    localStorage.removeItem('authToken');
    return null;
  }
};

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  };
}