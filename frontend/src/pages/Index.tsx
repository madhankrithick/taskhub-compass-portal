import React, { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import TaskDashboard from '@/components/TaskDashboard';

interface User {
  id: string;
  name: string;
  email: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return <TaskDashboard user={user} onLogout={handleLogout} />;
};

export default Index;
