import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Waves, Activity, BarChart, User, Menu, X, Sun, Moon } from 'lucide-react';
import '../styles/sidebar.css';
import logo from '../media/logo.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentPath = location.pathname.split('/')[1] || 'dashboard';

  const sidebarItems = [
    { id: 'dashboard', icon: BarChart, label: 'Dashboard', path: '/dashboard' },
    { id: 'activities', icon: Activity, label: 'Activities', path: '/activities' },
    { id: 'mood', icon: Waves, label: 'Mood', path: '/mood' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="logo-container">
            <img src={logo} alt="MoodFlow" className="app-logo" />
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {sidebarItems.map(({ id, icon: Icon, label, path }) => (
            <button
              key={id}
              onClick={() => handleNavigation(path)}
              className={`nav-item ${currentPath === id ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;