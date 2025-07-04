import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Zap, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  ArrowRight,
  BarChart3,
  Settings,
  Users,
  Server,
  Activity,
  Star,
  Quote,
  Code,
  Database,
  Cpu,
  HardDrive
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

// Import organized components
import StatsGrid from '../components/dashboard/StatsGrid';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import QueryTypeChart from '../components/dashboard/QueryTypeChart';
import RecentActivity from '../components/dashboard/RecentActivity';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  const userReviews = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Database Engineer",
      company: "TechCorp",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "QueryWise transformed our database optimization process. We've seen 60% improvement in query performance across our entire platform.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Lead Developer",
      company: "DataFlow Inc",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "The terminal-style interface feels like home for developers. AI-powered suggestions are incredibly accurate. It's like having a SQL expert on our team 24/7.",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Data Analyst",
      company: "CloudBase",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "Visual execution plans made it so easy to understand complex queries. The complexity analysis feature is a game-changer for our team productivity.",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Kim",
      role: "DevOps Engineer",
      company: "QueryLabs",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "The performance insights helped us identify bottlenecks we never knew existed. Terminal-style UI is perfect for our workflow.",
      date: "1 week ago"
    }
  ];

  const features3D = [
    {
      title: "AI SQL Assistant",
      description: "Advanced AI that analyzes text and image queries, providing complexity graphs and detailed explanations",
      icon: "🤖",
      gradient: "from-green-400 via-blue-500 to-green-500"
    },
    {
      title: "Terminal Interface",
      description: "Professional terminal-style SQL editor with syntax highlighting and auto-completion",
      icon: "💻",
      gradient: "from-blue-400 via-cyan-500 to-blue-500"
    },
    {
      title: "Real-time Analysis",
      description: "Live performance metrics with complexity analysis and execution time predictions",
      icon: "⚡",
      gradient: "from-yellow-400 via-orange-500 to-red-500"
    },
    {
      title: "Smart Optimization",
      description: "Intelligent index suggestions and query rewrites based on your database patterns",
      icon: "🎯",
      gradient: "from-green-400 via-emerald-500 to-teal-500"
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Enhanced Terminal-style Background */}
        <div className="absolute inset-0">
          {/* Floating Terminal Icons */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 opacity-30 dark:opacity-40"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 rounded-lg blur-xl opacity-75"></div>
              <div className="relative bg-slate-900 dark:bg-slate-800 p-4 rounded-lg border border-green-500/50 shadow-xl">
                <Terminal className="h-16 w-16 text-green-400 drop-shadow-lg" />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-40 right-20 opacity-30 dark:opacity-40"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 rounded-lg blur-xl opacity-75"></div>
              <div className="relative bg-slate-900 dark:bg-slate-800 p-3 rounded-lg border border-blue-500/50 shadow-xl">
                <Database className="h-12 w-12 text-blue-400 drop-shadow-lg" />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -25, 0],
              x: [0, 10, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-40 left-20 opacity-30 dark:opacity-40"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-lg blur-xl opacity-75"></div>
              <div className="relative bg-slate-900 dark:bg-slate-800 p-3 rounded-lg border border-purple-500/50 shadow-xl">
                <Code className="h-14 w-14 text-purple-400 drop-shadow-lg" />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute bottom-20 right-10 opacity-30 dark:opacity-40"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 rounded-lg blur-xl opacity-75"></div>
              <div className="relative bg-slate-900 dark:bg-slate-800 p-2 rounded-lg border border-orange-500/50 shadow-xl">
                <Cpu className="h-10 w-10 text-orange-400 drop-shadow-lg" />
              </div>
            </div>
          </motion.div>

          {/* Terminal Code Snippets */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute top-60 left-0 text-green-400/70 dark:text-green-300/70 font-mono text-sm drop-shadow-sm"
          >
            $ SELECT * FROM performance<br/>
            WHERE optimization = 'MAX'<br/>
            <span className="text-blue-400/70">→ 1,247 rows optimized</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="absolute bottom-60 right-0 text-blue-400/70 dark:text-blue-300/70 font-mono text-sm text-right drop-shadow-sm"
          >
            $ CREATE INDEX idx_performance<br/>
            ON queries(execution_time)<br/>
            <span className="text-green-400/70">✓ Index created successfully</span>
          </motion.div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative mx-auto mb-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 rounded-2xl blur-3xl opacity-50"></div>
                <div className="relative bg-slate-900 dark:bg-slate-800 p-8 rounded-2xl border border-green-500/50 mx-auto w-fit shadow-2xl">
                  <Terminal className="h-32 w-32 text-green-400 mx-auto drop-shadow-2xl" />
                </div>
              </motion.div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-bold font-mono text-slate-900 dark:text-green-400 mb-6 tracking-tight drop-shadow-lg"
            >
              $ QueryWise --optimize
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-slate-600 dark:text-green-300/90 mb-12 max-w-4xl mx-auto leading-relaxed font-mono drop-shadow-sm"
            >
              Professional SQL performance analyzer with AI-powered insights.<br/>
              <span className="text-green-600 dark:text-green-400">Terminal-style interface for developers.</span>
            </motion.p>

            {/* Enhanced Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
            >
              <div className="bg-slate-900/95 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-6 border border-green-500/50 hover:border-green-400/70 transition-all duration-300 group shadow-xl">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-slate-800 p-3 rounded-lg border border-green-500/50">
                    <Zap className="h-8 w-8 text-green-400 mx-auto drop-shadow-lg" />
                  </div>
                </div>
                <h3 className="text-green-400 font-semibold mb-2 font-mono drop-shadow-sm">AI-Powered Analysis</h3>
                <p className="text-slate-300 text-sm font-mono">Machine learning optimization with complexity graphs</p>
              </div>
              <div className="bg-slate-900/95 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-6 border border-blue-500/50 hover:border-blue-400/70 transition-all duration-300 group shadow-xl">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-slate-800 p-3 rounded-lg border border-blue-500/50">
                    <Terminal className="h-8 w-8 text-blue-400 mx-auto drop-shadow-lg" />
                  </div>
                </div>
                <h3 className="text-blue-400 font-semibold mb-2 font-mono drop-shadow-sm">Terminal Interface</h3>
                <p className="text-slate-300 text-sm font-mono">Professional SQL editor with syntax highlighting</p>
              </div>
              <div className="bg-slate-900/95 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-6 border border-purple-500/50 hover:border-purple-400/70 transition-all duration-300 group shadow-xl">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-slate-800 p-3 rounded-lg border border-purple-500/50">
                    <Target className="h-8 w-8 text-purple-400 mx-auto drop-shadow-lg" />
                  </div>
                </div>
                <h3 className="text-purple-400 font-semibold mb-2 font-mono drop-shadow-sm">Smart Optimization</h3>
                <p className="text-slate-300 text-sm font-mono">Automated index recommendations and query rewrites</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 via-blue-600 to-green-500 hover:from-green-600 hover:via-blue-700 hover:to-green-600 text-white px-8 py-4 rounded-xl text-lg font-mono font-medium transition-all duration-300 shadow-2xl hover:shadow-green-500/25 border border-green-400/30"
                >
                  <Play className="h-6 w-6" />
                  <span>./start --now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-3 bg-slate-900/95 dark:bg-slate-800/70 hover:bg-slate-800 dark:hover:bg-slate-700/80 text-green-400 px-8 py-4 rounded-xl text-lg font-mono font-medium transition-all duration-300 border border-green-500/50 hover:border-green-400/70 backdrop-blur-xl shadow-xl"
                >
                  <Users className="h-6 w-6" />
                  <span>./contact --sales</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* 3D Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="py-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-mono text-slate-900 dark:text-green-400 mb-4 drop-shadow-lg">
                $ features --list --advanced
              </h2>
              <p className="text-xl text-slate-600 dark:text-green-300/90 max-w-3xl mx-auto font-mono drop-shadow-sm">
                Next-generation SQL optimization tools for professional developers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {features3D.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5
                  }}
                  className="bg-slate-900/95 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-8 border border-green-500/50 hover:border-green-400/70 transition-all duration-300 group shadow-xl transform-gpu perspective-1000"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="text-center">
                    <div className={`text-6xl mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-green-400 mb-3 font-mono drop-shadow-sm">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 font-mono text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* User Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="py-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-mono text-slate-900 dark:text-green-400 mb-4 drop-shadow-lg">
                $ testimonials --show --verified
              </h2>
              <p className="text-xl text-slate-600 dark:text-green-300/90 max-w-3xl mx-auto font-mono drop-shadow-sm">
                Trusted by developers and database engineers worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {userReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-slate-900/95 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-6 border border-green-500/50 hover:border-green-400/70 transition-all duration-300 shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-green-500/50 shadow-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-green-400 font-mono drop-shadow-sm">{review.name}</h4>
                      <p className="text-sm text-slate-300 font-mono">{review.role}</p>
                      <p className="text-xs text-slate-400 font-mono">{review.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current drop-shadow-sm" />
                    ))}
                  </div>
                  
                  <div className="relative mb-4">
                    <Quote className="h-6 w-6 text-green-500/50 absolute -top-2 -left-2" />
                    <p className="text-slate-300 text-sm leading-relaxed pl-4 font-mono">
                      {review.review}
                    </p>
                  </div>
                  
                  <p className="text-xs text-slate-400 font-mono">{review.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-center py-16"
          >
            <p className="text-slate-500 dark:text-slate-400 mb-6 font-mono drop-shadow-sm">$ companies --using QueryWise</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-slate-500 dark:text-slate-400 font-mono drop-shadow-sm">TechCorp</div>
              <div className="text-2xl font-bold text-slate-500 dark:text-slate-400 font-mono drop-shadow-sm">DataFlow</div>
              <div className="text-2xl font-bold text-slate-500 dark:text-slate-400 font-mono drop-shadow-sm">CloudBase</div>
              <div className="text-2xl font-bold text-slate-500 dark:text-slate-400 font-mono drop-shadow-sm">QueryLabs</div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Queries Analyzed', value: '2,847', icon: Terminal, color: 'from-green-500 to-blue-600', trend: '+12%' },
    { title: 'Average Optimization Score', value: '8.5/10', icon: Zap, color: 'from-blue-500 to-cyan-600', trend: '+5%' },
    { title: 'Recommended Indexes Added', value: '156', icon: Target, color: 'from-purple-500 to-pink-600', trend: '+23%' },
    { title: 'Performance Improvements', value: '34%', icon: TrendingUp, color: 'from-orange-500 to-red-600', trend: '+8%' },
  ];

  const performanceData = [
    { name: 'Jan', queries: 65, optimized: 45 },
    { name: 'Feb', queries: 89, optimized: 67 },
    { name: 'Mar', queries: 134, optimized: 98 },
    { name: 'Apr', queries: 156, optimized: 123 },
    { name: 'May', queries: 198, optimized: 167 },
    { name: 'Jun', queries: 234, optimized: 201 },
  ];

  const queryTypes = [
    { name: 'SELECT', value: 45, color: '#10B981' },
    { name: 'INSERT', value: 25, color: '#3B82F6' },
    { name: 'UPDATE', value: 20, color: '#F59E0B' },
    { name: 'DELETE', value: 10, color: '#EF4444' },
  ];

  const recentActivity = [
    {
      id: 1,
      query: 'SELECT * FROM users WHERE email = ?',
      date: '2025-01-13',
      score: 7.2,
      status: 'optimized' as const,
    },
    {
      id: 2,
      query: 'SELECT COUNT(*) FROM orders WHERE status IN (?)',
      date: '2025-01-12',
      score: 9.1,
      status: 'good' as const,
    },
    {
      id: 3,
      query: 'UPDATE products SET price = ? WHERE id = ?',
      date: '2025-01-12',
      score: 6.8,
      status: 'needs-optimization' as const,
    },
    {
      id: 4,
      query: 'SELECT p.*, c.name FROM products p JOIN categories c',
      date: '2025-01-11',
      score: 8.5,
      status: 'optimized' as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold font-mono text-slate-900 dark:text-green-400 mb-4 drop-shadow-lg">
          $ dashboard --performance
        </h1>
        <p className="text-xl text-slate-600 dark:text-green-300/90 font-mono drop-shadow-sm">Monitor, analyze, and optimize your SQL queries with intelligent insights</p>
      </motion.div>

      <StatsGrid stats={stats} />

      {/* Enhanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <PerformanceChart data={performanceData} />
        <QueryTypeChart data={queryTypes} />
      </div>

      <RecentActivity activities={recentActivity} />
    </div>
  );
};

export default Dashboard;