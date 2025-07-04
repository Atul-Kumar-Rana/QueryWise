import React from 'react';
import { Database, Cpu, HardDrive, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface DatabaseConfigProps {
  selectedDatabase: string;
  onDatabaseChange: (database: string) => void;
  simulateData: boolean;
  onSimulateDataChange: (simulate: boolean) => void;
  databases: string[];
}

const DatabaseConfig: React.FC<DatabaseConfigProps> = ({
  selectedDatabase,
  onDatabaseChange,
  simulateData,
  onSimulateDataChange,
  databases
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-slate-900 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl p-6 border border-green-500/30 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center space-x-2 font-mono">
        <Database className="h-5 w-5" />
        <span>Database Config</span>
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-green-300 mb-2 font-mono">Engine:</label>
          <select
            value={selectedDatabase}
            onChange={(e) => onDatabaseChange(e.target.value)}
            className="w-full bg-slate-800 border border-green-500/30 rounded-lg p-3 text-green-300 font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
          >
            {databases.map(db => (
              <option key={db} value={db} className="bg-slate-800">{db}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="simulateData"
            checked={simulateData}
            onChange={(e) => onSimulateDataChange(e.target.checked)}
            className="w-4 h-4 text-green-600 bg-slate-800 border-green-500/30 rounded focus:ring-green-500"
          />
          <label htmlFor="simulateData" className="text-sm text-green-300 font-mono">
            --simulate-data
          </label>
        </div>

        {/* Performance Indicators */}
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-green-500/20">
          <div className="text-xs font-mono text-green-400 mb-2">System Status:</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="h-3 w-3 text-blue-400" />
                <span className="text-xs text-green-300 font-mono">CPU</span>
              </div>
              <span className="text-xs text-green-400 font-mono">23%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-3 w-3 text-purple-400" />
                <span className="text-xs text-green-300 font-mono">Memory</span>
              </div>
              <span className="text-xs text-green-400 font-mono">1.2GB</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-green-300 font-mono">Queries/sec</span>
              </div>
              <span className="text-xs text-green-400 font-mono">847</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DatabaseConfig;