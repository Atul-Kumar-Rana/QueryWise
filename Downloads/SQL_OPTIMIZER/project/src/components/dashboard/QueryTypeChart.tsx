import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface QueryTypeChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const QueryTypeChart: React.FC<QueryTypeChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-slate-900/95 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-8 border border-green-500/50 shadow-xl"
    >
      <h3 className="text-xl font-semibold text-green-400 mb-6 font-mono drop-shadow-sm">Query Type Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.95)', 
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              color: '#10B981',
              fontFamily: 'monospace'
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default QueryTypeChart;