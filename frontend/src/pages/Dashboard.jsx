import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLocation('/auth');
      return;
    }

    // Get user info from token or API
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
  }, [setLocation]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLocation('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">SkillForge</h1>
              <span className="ml-4 text-gray-600">Admin Dashboard</span>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {user.firstName || user.email}!
          </h2>
          <p className="text-gray-600 mb-8">
            You are logged in as an administrator. Manage your learning platform from here.
          </p>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Active Courses</h3>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Enrollments</h3>
              <p className="text-3xl font-bold text-purple-600">0</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-left transition-colors">
                <h4 className="font-semibold">Manage Courses</h4>
                <p className="text-blue-100 text-sm">Add, edit, or remove courses</p>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-left transition-colors">
                <h4 className="font-semibold">View Users</h4>
                <p className="text-green-100 text-sm">Manage user accounts and roles</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;