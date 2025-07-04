import React from 'react';
import { Database, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Terminal from './Terminal';

interface QueryResultsProps {
  results: {
    columns: string[];
    rows: any[][];
    rowCount: number;
    executionTime: number;
  };
  database: string;
}

const QueryResults: React.FC<QueryResultsProps> = ({ results, database }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-6"
    >
      <div className="bg-slate-900 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl border border-blue-500/30 shadow-2xl overflow-hidden">
        {/* Results Header */}
        <div className="bg-slate-800 dark:bg-slate-800/90 px-4 py-3 border-b border-blue-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 font-mono text-sm">Query Results</span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="text-green-400">{results.rowCount} rows</span>
            <span className="text-blue-400">{results.executionTime.toFixed(2)}ms</span>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-green-400">Success</span>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="p-4 max-h-80 overflow-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b border-blue-500/30">
                {results.columns.map((col: string, index: number) => (
                  <th key={index} className="text-left py-2 px-3 text-blue-400 font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.rows.map((row: any[], rowIndex: number) => (
                <tr key={rowIndex} className="border-b border-blue-500/20 hover:bg-blue-500/5">
                  {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className="py-2 px-3 text-green-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Results Footer */}
        <div className="bg-slate-800/50 px-4 py-2 border-t border-blue-500/20">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              Query executed successfully on {database}
            </span>
            <span className="text-blue-400">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QueryResults;