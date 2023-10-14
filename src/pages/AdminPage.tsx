// pages/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../auth';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [autoLogoutTimer, setAutoLogoutTimer] = useState<number | null>(null);

  const handleLogout = () => {
    if (autoLogoutTimer !== null) {
      clearTimeout(autoLogoutTimer);
    }
    logout();
    navigate('/login');
  };

  const startAutoLogoutTimer = () => {
    const AUTO_LOGOUT_DELAY = 15 * 60 * 1000;

    if (autoLogoutTimer !== null) {
      clearTimeout(autoLogoutTimer);
    }

    const timerId: number = window.setTimeout(() => {
      handleLogout();
    }, AUTO_LOGOUT_DELAY);

    setAutoLogoutTimer(timerId);
  };

  useEffect(() => {
    const handleActivity = () => {
      startAutoLogoutTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    startAutoLogoutTimer();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (autoLogoutTimer !== null) {
        clearTimeout(autoLogoutTimer);
      }
    };
  }, [startAutoLogoutTimer]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/admin/register">Register New Visitor</Link>
      <Link to="/admin/visitors">Visitor List</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminPage;
