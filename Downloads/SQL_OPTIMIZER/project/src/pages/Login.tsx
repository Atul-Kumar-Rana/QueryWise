import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Database } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 opacity-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-75"></div>
            <Database className="h-24 w-24 text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text relative z-10" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 opacity-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full blur-2xl opacity-75"></div>
            <Database className="h-20 w-20 text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text relative z-10" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-lg opacity-75"></div>
              <Database className="h-12 w-12 text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text relative z-10" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Welcome to QueryWise
          </h1>
          <p className="text-slate-300">Sign in to analyze your SQL queries</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:from-indigo-600 hover:via-purple-700 hover:to-cyan-600 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-400/30"
            >
              <LogIn className="h-5 w-5" />
              <span>{loading ? 'Signing in...' : 'Login'}</span>
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text hover:from-cyan-300 hover:to-purple-300 font-medium transition-all duration-300">
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;