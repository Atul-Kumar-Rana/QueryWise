import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActivityItem {
  id: number;
  query: string;
  date: string;
  score: number;
  status: 'optimized' | 'good' | 'needs-optimization';
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimized':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'good':
        return <CheckCircle className="h-4 w-4 text-blue-400" />;
      case 'needs-optimization':
        return <AlertCircle className="h-4 w-4 text-orange-400" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'optimized':
        return 'Optimized';
      case 'good':
        return 'Good';
      case 'needs-optimization':
        return 'Needs Optimization';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized':
        return 'text-green-400';
      case 'good':
        return 'text-blue-400';
      case 'needs-optimization':
        return 'text-orange-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-slate-900/95 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-8 border border-green-500/50 shadow-xl"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-green-400 font-mono drop-shadow-sm">Recent Activity</h3>
        <Link 
          to="/run-query"
          className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-all duration-300 font-mono"
        >
          <span>./analyze --new</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-green-500/30">
              <th className="text-left py-4 px-4 text-green-400 font-mono font-medium">Query Snippet</th>
              <th className="text-left py-4 px-4 text-green-400 font-mono font-medium">Date Analyzed</th>
              <th className="text-left py-4 px-4 text-green-400 font-mono font-medium">Performance Score</th>
              <th className="text-left py-4 px-4 text-green-400 font-mono font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item) => (
              <motion.tr 
                key={item.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: item.id * 0.1 }}
                className="border-b border-green-500/20 hover:bg-green-500/5 transition-all duration-300"
              >
                <td className="py-4 px-4">
                  <code className="text-sm text-green-300 bg-slate-800/50 px-3 py-2 rounded-lg border border-green-500/30 font-mono shadow-sm">
                    {item.query}
                  </code>
                </td>
                <td className="py-4 px-4 text-slate-300 font-mono">{item.date}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.score * 10}%` }}
                      />
                    </div>
                    <span className="text-green-400 font-mono font-medium">{item.score}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(item.status)}
                    <span className={`text-sm font-mono font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentActivity;