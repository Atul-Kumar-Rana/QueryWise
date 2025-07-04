import React, { useState } from 'react';
import { Copy, CheckCircle, AlertTriangle, Info, Lightbulb, Code, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const OptimizationSuggestions = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const indexSuggestions = [
    {
      priority: 'High',
      table: 'users',
      columns: ['email'],
      description: 'Add an index on \'users.email\' to improve WHERE clause performance.',
      impact: 'Expected 75% improvement in query execution time',
      sql: 'CREATE INDEX idx_users_email ON users(email);'
    },
    {
      priority: 'High',
      table: 'orders',
      columns: ['user_id', 'created_at'],
      description: 'Add composite index on \'orders.user_id\' and \'orders.created_at\' for better JOIN performance.',
      impact: 'Expected 60% improvement in JOIN operations',
      sql: 'CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);'
    },
    {
      priority: 'Medium',
      table: 'products',
      columns: ['category', 'price'],
      description: 'Add composite index for filtering by category and sorting by price.',
      impact: 'Expected 40% improvement in filtered queries',
      sql: 'CREATE INDEX idx_products_category_price ON products(category, price);'
    }
  ];

  const queryRewriteSuggestions = [
    {
      issue: 'SELECT * Usage',
      description: 'Consider avoiding \'SELECT *\', only select required columns.',
      impact: 'Reduces network traffic and memory usage',
      severity: 'Medium'
    },
    {
      issue: 'Subquery in WHERE',
      description: 'Replace correlated subquery with EXISTS for better performance.',
      impact: 'Significant performance improvement for large datasets',
      severity: 'High'
    },
    {
      issue: 'Function in WHERE clause',
      description: 'Avoid using functions on columns in WHERE clause to utilize indexes.',
      impact: 'Allows index usage, dramatically improves query speed',
      severity: 'High'
    }
  ];

  const joinOptimizations = [
    {
      issue: 'Join Order',
      description: 'Use indexed columns for JOIN operations where possible.',
      impact: 'Reduces join cost and improves execution time',
      recommendation: 'Ensure foreign key columns have appropriate indexes'
    },
    {
      issue: 'Join Type',
      description: 'Consider using INNER JOIN instead of LEFT JOIN when appropriate.',
      impact: 'Reduces result set size and improves performance',
      recommendation: 'Use INNER JOIN when you don\'t need NULL values from the right table'
    },
    {
      issue: 'Join Conditions',
      description: 'Place most selective conditions first in multi-table joins.',
      impact: 'Reduces intermediate result sets',
      recommendation: 'Order joins by selectivity (most restrictive first)'
    }
  ];

  const aiRewrittenQuery = {
    original: `SELECT * FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
AND o.total > 100
ORDER BY o.created_at DESC;`,
    optimized: `SELECT u.id, u.name, u.email, o.id as order_id, o.total, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
  AND o.total > 100
ORDER BY o.created_at DESC
LIMIT 1000;`,
    improvements: [
      'Replaced SELECT * with specific columns',
      'Changed LEFT JOIN to INNER JOIN (appropriate for this use case)',
      'Added LIMIT clause to prevent excessive result sets',
      'Ensured indexed columns are used in WHERE and JOIN clauses'
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30';
      case 'Medium': return 'from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30';
      case 'Low': return 'from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30';
      default: return 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'Medium': return <Info className="h-4 w-4 text-yellow-400" />;
      case 'Low': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <Info className="h-4 w-4 text-blue-400" />;
    }
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
          SQL Optimization Recommendations
        </h1>
        <p className="text-slate-300">AI-powered suggestions to improve your query performance</p>
      </motion.div>

      {/* Enhanced Index Suggestions */}
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
            <Database className="h-6 w-6 text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text" />
            <span>Index Suggestions</span>
          </h3>
          
          <div className="space-y-4">
            {indexSuggestions.map((suggestion, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 rounded-xl border border-indigo-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium border bg-gradient-to-r ${getPriorityColor(suggestion.priority)}`}>
                      {suggestion.priority}
                    </span>
                    <span className="text-white font-medium">{suggestion.table}</span>
                    <span className="text-slate-400 text-sm">({suggestion.columns.join(', ')})</span>
                  </div>
                  <motion.button
                    onClick={() => copyToClipboard(suggestion.sql, `index-${index}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text rounded-md text-sm hover:from-indigo-500/30 hover:to-cyan-500/30 transition-all duration-300 border border-indigo-500/20"
                  >
                    {copiedText === `index-${index}` ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copiedText === `index-${index}` ? 'Copied!' : 'Copy SQL'}</span>
                  </motion.button>
                </div>
                
                <p className="text-slate-300 mb-2">{suggestion.description}</p>
                <p className="text-sm text-green-400 mb-3">{suggestion.impact}</p>
                
                <div className="bg-gradient-to-r from-slate-900/50 via-indigo-900/50 to-slate-900/50 p-3 rounded-md border border-indigo-500/20">
                  <code className="text-sm text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text">{suggestion.sql}</code>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Query Rewrite Suggestions */}
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
            <Code className="h-6 w-6 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text" />
            <span>Query Rewrite Suggestions</span>
          </h3>
          
          <div className="space-y-4">
            {queryRewriteSuggestions.map((suggestion, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 rounded-xl border border-indigo-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getSeverityIcon(suggestion.severity)}
                    <span className="text-white font-medium">{suggestion.issue}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border bg-gradient-to-r ${getPriorityColor(suggestion.severity)}`}>
                    {suggestion.severity}
                  </span>
                </div>
                
                <p className="text-slate-300 mb-2">{suggestion.description}</p>
                <p className="text-sm text-green-400">{suggestion.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Join Optimization */}
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
            <Zap className="h-6 w-6 text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text" />
            <span>Joins Optimization</span>
          </h3>
          
          <div className="space-y-4">
            {joinOptimizations.map((optimization, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 rounded-xl border border-indigo-500/20"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Info className="h-5 w-5 text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text" />
                  <span className="text-white font-medium">{optimization.issue}</span>
                </div>
                
                <p className="text-slate-300 mb-2">{optimization.description}</p>
                <p className="text-sm text-green-400 mb-2">{optimization.impact}</p>
                <p className="text-sm text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">💡 {optimization.recommendation}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced AI Suggested Rewritten Query */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
      >
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
          <Lightbulb className="h-6 w-6 text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text" />
          <span>AI Suggested Rewritten Query</span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">Original Query</h4>
            <div className="bg-gradient-to-r from-slate-900/50 via-indigo-900/50 to-slate-900/50 p-4 rounded-xl mb-4 border border-indigo-500/20">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap">{aiRewrittenQuery.original}</pre>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium text-white bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">Optimized Query</h4>
              <motion.button
                onClick={() => copyToClipboard(aiRewrittenQuery.optimized, 'optimized-query')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-md text-sm hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 border border-green-500/30"
              >
                {copiedText === 'optimized-query' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedText === 'optimized-query' ? 'Copied!' : 'Copy to Clipboard'}</span>
              </motion.button>
            </div>
            <div className="bg-gradient-to-r from-slate-900/50 via-indigo-900/50 to-slate-900/50 p-4 rounded-xl mb-4 border border-green-500/20">
              <pre className="text-sm text-transparent bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text whitespace-pre-wrap">{aiRewrittenQuery.optimized}</pre>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-lg font-medium text-white mb-3 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">Key Improvements</h4>
          <ul className="space-y-2">
            {aiRewrittenQuery.improvements.map((improvement, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{improvement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default OptimizationSuggestions;