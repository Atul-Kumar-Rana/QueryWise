import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface TerminalProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-slate-900 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl border border-green-500/30 shadow-2xl overflow-hidden ${className}`}>
      {/* Terminal Header */}
      <div className="bg-slate-800 dark:bg-slate-800/90 px-4 py-3 border-b border-green-500/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2">
            <TerminalIcon className="h-4 w-4 text-green-400" />
            <span className="text-green-400 font-mono text-sm">{title}</span>
          </div>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Terminal;