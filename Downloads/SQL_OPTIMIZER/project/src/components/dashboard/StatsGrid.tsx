import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Stat {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  trend: string;
}

interface StatsGridProps {
  stats: Stat[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-slate-900/95 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-6 border border-green-500/50 hover:border-green-400/70 transition-all duration-300 group shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <stat.icon className="h-6 w-6 text-white drop-shadow-lg" />
            </div>
            <span className="text-green-400 text-sm font-mono font-medium drop-shadow-sm">{stat.trend}</span>
          </div>
          <div>
            <p className="text-slate-300 text-sm mb-1 font-mono">{stat.title}</p>
            <p className="text-3xl font-bold text-green-400 font-mono drop-shadow-sm">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;