import React from 'react';
import { Play, BarChart3, Zap, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActionButtonsProps {
  onExecute: () => void;
  onExplain: () => void;
  onAnalyze: () => void;
  onOptimize: () => void;
  disabled: boolean;
  loading: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onExecute,
  onExplain,
  onAnalyze,
  onOptimize,
  disabled,
  loading
}) => {
  const buttons = [
    {
      onClick: onExecute,
      icon: Play,
      label: loading ? 'Executing...' : './execute --query',
      gradient: 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
      border: 'border-green-400/30'
    },
    {
      onClick: onExplain,
      icon: BarChart3,
      label: loading ? 'Analyzing...' : './explain --plan',
      gradient: 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
      border: 'border-blue-400/30'
    },
    {
      onClick: onAnalyze,
      icon: Zap,
      label: './analyze --perf',
      gradient: 'from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700',
      border: 'border-purple-400/30'
    },
    {
      onClick: onOptimize,
      icon: Settings,
      label: './optimize --suggest',
      gradient: 'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
      border: 'border-orange-400/30'
    }
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {buttons.map((button, index) => (
        <motion.button
          key={index}
          onClick={button.onClick}
          disabled={disabled || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${button.gradient} text-white rounded-lg font-mono font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${button.border} shadow-lg`}
        >
          <button.icon className="h-5 w-5" />
          <span>{button.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ActionButtons;