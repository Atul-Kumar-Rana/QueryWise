import React from 'react';

interface StatusBarProps {
  lines: number;
  chars: number;
  database: string;
  executionTime?: number;
  status?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  lines, 
  chars, 
  database, 
  executionTime, 
  status = 'Ready' 
}) => {
  return (
    <div className="border-t border-green-500/30 pt-3 mt-3 flex items-center justify-between text-xs font-mono">
      <div className="flex items-center space-x-4">
        <span className="text-green-400">Lines: {lines}</span>
        <span className="text-blue-400">Chars: {chars}</span>
        <span className="text-yellow-400">DB: {database}</span>
        {executionTime && (
          <span className="text-purple-400">Last: {executionTime.toFixed(2)}ms</span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400">{status}</span>
      </div>
    </div>
  );
};

export default StatusBar;