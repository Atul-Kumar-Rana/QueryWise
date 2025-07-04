import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface SampleQuery {
  name: string;
  query: string;
}

interface SampleQueriesProps {
  queries: SampleQuery[];
  onSelectQuery: (query: string) => void;
}

const SampleQueries: React.FC<SampleQueriesProps> = ({ queries, onSelectQuery }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-slate-900 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl p-6 border border-green-500/30 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center space-x-2 font-mono">
        <FileText className="h-5 w-5" />
        <span>Sample Queries</span>
      </h3>
      
      <div className="space-y-3">
        {queries.map((sample, index) => (
          <motion.button
            key={index}
            onClick={() => onSelectQuery(sample.query)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-700/60 rounded-lg border border-green-500/20 hover:border-green-400/40 transition-all duration-300"
          >
            <div className="text-sm font-medium text-green-400 font-mono">{sample.name}</div>
            <div className="text-xs text-slate-400 mt-1 truncate font-mono">
              {sample.query.split('\n')[1] || sample.query.split('\n')[0]}...
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SampleQueries;