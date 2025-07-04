import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface PerformanceChartProps {
  data: Array<{
    name: string;
    queries: number;
    optimized: number;
  }>;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-slate-900/95 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-8 border border-green-500/50 shadow-xl"
    >
      <h3 className="text-xl font-semibold text-green-400 mb-6 font-mono drop-shadow-sm">Query Performance Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#10B981" className="font-mono" />
          <YAxis stroke="#10B981" className="font-mono" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.95)', 
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              color: '#10B981',
              fontFamily: 'monospace'
            }} 
          />
          <Bar dataKey="queries" fill="url(#greenGradient)" name="Total Queries" radius={[4, 4, 0, 0]} />
          <Bar dataKey="optimized" fill="url(#blueGradient)" name="Optimized" radius={[4, 4, 0, 0]} />
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PerformanceChart;