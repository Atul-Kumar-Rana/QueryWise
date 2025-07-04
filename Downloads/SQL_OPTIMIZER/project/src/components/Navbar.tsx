import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, User, LogOut, Mail, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: null },
    { name: 'SQL Terminal', path: '/run-query', icon: Terminal },
    { name: 'EXPLAIN Tree', path: '/explain-plan', icon: null },
    { name: 'Optimizer', path: '/optimization', icon: null },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 dark:bg-slate-900/98 backdrop-blur-xl border-b border-slate-200/80 dark:border-green-500/30 sticky top-0 z-50 shadow-lg dark:shadow-2xl transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-slate-900 dark:bg-slate-800 p-3 rounded-lg border border-green-500/50 shadow-lg">
                <Terminal className="h-8 w-8 text-green-400 drop-shadow-lg" />
              </div>
            </motion.div>
            <div>
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-green-400 tracking-tight drop-shadow-sm">
                QueryWise
              </span>
              <div className="text-sm text-slate-600 dark:text-green-300/90 hidden sm:block font-mono drop-shadow-sm">
                $ sql-performance-analyzer
              </div>
            </div>
          </Link>

          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-6 py-3 rounded-lg text-sm font-mono font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-slate-900/10 dark:bg-green-500/20 text-slate-900 dark:text-green-400 shadow-lg border border-slate-300/50 dark:border-green-500/50'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-green-500/10 hover:text-slate-900 dark:hover:text-green-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </div>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-slate-900/5 dark:bg-green-500/10 rounded-lg border border-slate-300/30 dark:border-green-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-300 border border-slate-200 dark:border-green-500/30 shadow-sm"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </motion.button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-6 py-3 bg-slate-100 dark:bg-slate-800/70 rounded-lg border border-slate-200 dark:border-green-500/30 backdrop-blur-xl transition-colors duration-300 shadow-sm">
                  <div className="relative">
                    <User className="h-5 w-5 text-slate-600 dark:text-green-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-slate-900"></div>
                  </div>
                  <span className="text-sm text-slate-700 dark:text-green-300 font-mono font-medium">{user?.name}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-mono font-medium bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all duration-300 border border-red-200 dark:border-red-500/30 shadow-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>exit</span>
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-green-500 via-blue-600 to-green-500 hover:from-green-600 hover:via-blue-700 hover:to-green-600 text-white px-8 py-3 rounded-lg text-sm font-mono font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-green-400/30"
                >
                  ./login
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;