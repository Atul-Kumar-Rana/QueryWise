import React, { useState } from 'react';
import { Download, Eye, Table, GitBranch, Clock, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ExplainPlan = () => {
  const [viewType, setViewType] = useState<'tree' | 'table'>('tree');

  const executionPlan = {
    totalCost: 1847.25,
    totalTime: '12.5ms',
    rowsEstimate: 1500,
    operations: [
      {
        id: 1,
        type: 'Nested Loop',
        cost: 1847.25,
        rows: 1500,
        width: 68,
        children: [2, 3],
        details: 'Join Filter: (u.id = o.user_id)'
      },
      {
        id: 2,
        type: 'Seq Scan',
        cost: 23.50,
        rows: 1000,
        width: 32,
        children: [],
        details: 'Table: users, Filter: (created_at >= \'2024-01-01\')'
      },
      {
        id: 3,
        type: 'Index Scan',
        cost: 1823.75,
        rows: 1500,
        width: 36,
        children: [],
        details: 'Index: orders_user_id_idx, Condition: (user_id = u.id)'
      }
    ]
  };

  const recommendations = [
    {
      type: 'Index',
      priority: 'High',
      description: 'Add composite index on (user_id, created_at) for orders table',
      impact: 'Expected 60% performance improvement'
    },
    {
      type: 'Query',
      priority: 'Medium',
      description: 'Consider using LIMIT clause if not all results are needed',
      impact: 'Reduces memory usage and I/O operations'
    },
    {
      type: 'Statistics',
      priority: 'Low',
      description: 'Update table statistics for better cost estimation',
      impact: 'Improves query planner decisions'
    }
  ];

  const ExecutionNode = ({ node, level = 0 }: { node: any, level?: number }) => {
    const getNodeColor = (type: string) => {
      switch (type) {
        case 'Nested Loop': return 'from-red-500/20 to-pink-500/20 border-red-500/30';
        case 'Seq Scan': return 'from-orange-500/20 to-yellow-500/20 border-orange-500/30';
        case 'Index Scan': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
        default: return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      }
    };

    const getNodeIcon = (type: string) => {
      switch (type) {
        case 'Nested Loop': return GitBranch;
        case 'Seq Scan': return Table;
        case 'Index Scan': return Database;
        default: return Database;
      }
    };

    const Icon = getNodeIcon(node.type);

    return (
      <div className={`ml-${level * 8}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: level * 0.1 }}
          className={`p-4 rounded-xl border bg-gradient-to-r ${getNodeColor(node.type)} mb-4 backdrop-blur-xl`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">{node.type}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-300">
              <span>Cost: {node.cost}</span>
              <span>Rows: {node.rows}</span>
            </div>
          </div>
          <p className="text-sm text-slate-300">{node.details}</p>
        </motion.div>
        
        {node.children.map((childId: number) => {
          const child = executionPlan.operations.find(op => op.id === childId);
          return child ? (
            <ExecutionNode key={childId} node={child} level={level + 1} />
          ) : null;
        })}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Visual Execution Plan
        </h1>
        <p className="text-slate-300">Interactive execution tree showing how your query will be processed</p>
      </motion.div>

      {/* Enhanced Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-3 rounded-xl">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-slate-300 text-sm">Total Cost</p>
              <p className="text-2xl font-bold text-white">{executionPlan.totalCost}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-slate-300 text-sm">Estimated Time</p>
              <p className="text-2xl font-bold text-white">{executionPlan.totalTime}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-slate-300 text-sm">Rows Estimate</p>
              <p className="text-2xl font-bold text-white">{executionPlan.rowsEstimate.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced View Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewType('tree')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              viewType === 'tree' 
                ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white border border-indigo-400/30' 
                : 'bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 text-slate-300 hover:text-white border border-indigo-500/20 hover:border-indigo-400/40'
            }`}
          >
            <GitBranch className="h-4 w-4" />
            <span>Tree View</span>
          </button>
          
          <button
            onClick={() => setViewType('table')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              viewType === 'table' 
                ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white border border-indigo-400/30' 
                : 'bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 text-slate-300 hover:text-white border border-indigo-500/20 hover:border-indigo-400/40'
            }`}
          >
            <Table className="h-4 w-4" />
            <span>Table View</span>
          </button>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-300 border border-green-400/30"
        >
          <Download className="h-4 w-4" />
          <span>Download Plan as Image</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Execution Plan */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
          >
            <h3 className="text-lg font-semibold text-white mb-6 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">Execution Tree</h3>
            
            {viewType === 'tree' ? (
              <div className="space-y-4">
                <ExecutionNode node={executionPlan.operations[0]} />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Operation</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Cost</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Rows</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {executionPlan.operations.map((op) => (
                      <tr key={op.id} className="border-b border-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 hover:bg-gradient-to-r hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-cyan-500/5 transition-all duration-300">
                        <td className="py-3 px-4 text-white font-medium">{op.type}</td>
                        <td className="py-3 px-4 text-slate-300">{op.cost}</td>
                        <td className="py-3 px-4 text-slate-300">{op.rows}</td>
                        <td className="py-3 px-4 text-slate-300 text-sm">{op.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>

        {/* Enhanced Recommendations */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
        >
          <h3 className="text-lg font-semibold text-white mb-4 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">Quick Recommendations</h3>
          
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 rounded-xl border border-indigo-500/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{rec.type}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.priority === 'High' ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border border-red-500/30' :
                    rec.priority === 'Medium' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30' :
                    'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">{rec.description}</p>
                <p className="text-xs text-green-400">{rec.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExplainPlan;