import React, { useState, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Image, 
  HelpCircle,
  Lightbulb,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FooterAI = () => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAiQuery = async () => {
    if (!aiQuery.trim() && !uploadedImage) return;
    
    setAiLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResponse = `
╭─ AI SQL Code Generator & Optimizer ───────────────────────╮
│                                                           │
│ Generated Optimized SQL:                                 │
│                                                           │
│ ┌─ Optimized Query ─────────────────────────────────────┐ │
│ │ SELECT u.id, u.name, u.email,                       │ │
│ │        COUNT(o.id) as order_count,                   │ │
│ │        SUM(o.total) as total_revenue                 │ │
│ │ FROM users u                                         │ │
│ │ INNER JOIN orders o ON u.id = o.user_id             │ │
│ │ WHERE u.created_at >= '2024-01-01'                  │ │
│ │   AND u.status = 'active'                           │ │
│ │ GROUP BY u.id, u.name, u.email                      │ │
│ │ HAVING COUNT(o.id) > 0                              │ │
│ │ ORDER BY total_revenue DESC                          │ │
│ │ LIMIT 100;                                           │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─ Performance Analysis ────────────────────────────────┐ │
│ │ • Complexity: O(n log n)                            │ │
│ │ • Estimated Time: 8.3ms                             │ │
│ │ • Memory Usage: 1.8MB                               │ │
│ │ • Index Usage: Optimal                              │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─ Key Optimizations Applied ───────────────────────────┐ │
│ │ 1. Changed LEFT JOIN to INNER JOIN                   │ │
│ │ 2. Added HAVING clause to filter empty results      │ │
│ │ 3. Optimized WHERE clause ordering                   │ │
│ │ 4. Added proper indexing suggestions                 │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                           │
│ Status: ✓ Ready for production use                       │
│                                                           │
╰───────────────────────────────────────────────────────────╯`;

    setAiResponse(mockResponse);
    setAiLoading(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExplain = () => {
    setShowExplanation(!showExplanation);
  };

  const explanationText = `
╭─ SQL Query Explanation ───────────────────────────────────╮
│                                                           │
│ Query Breakdown:                                         │
│                                                           │
│ 1. SELECT Clause:                                        │
│    • u.id, u.name, u.email: User basic information      │
│    • COUNT(o.id): Number of orders per user             │
│    • SUM(o.total): Total revenue per user               │
│                                                           │
│ 2. FROM & JOIN:                                          │
│    • INNER JOIN ensures only users with orders          │
│    • More efficient than LEFT JOIN for this use case    │
│                                                           │
│ 3. WHERE Clause:                                         │
│    • Filters users created after 2024-01-01             │
│    • Only includes active users                         │
│    • Indexed columns for optimal performance            │
│                                                           │
│ 4. GROUP BY:                                             │
│    • Groups results by user for aggregation             │
│    • Required for COUNT and SUM functions               │
│                                                           │
│ 5. HAVING:                                               │
│    • Filters groups after aggregation                   │
│    • Ensures only users with orders are included        │
│                                                           │
│ 6. ORDER BY:                                             │
│    • Sorts by total revenue (highest first)             │
│    • Uses computed column for sorting                   │
│                                                           │
│ 7. LIMIT:                                                │
│    • Restricts results to top 100 users                 │
│    • Improves performance and usability                 │
│                                                           │
│ Performance Tips:                                        │
│ • Ensure indexes on: users.created_at, users.status     │
│ • Consider composite index: orders(user_id, total)      │
│ • Monitor execution plan for large datasets             │
│                                                           │
╰───────────────────────────────────────────────────────────╯`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-blue-500/30 shadow-xl"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold font-mono text-blue-400 mb-2 flex items-center justify-center space-x-2">
          <Bot className="h-6 w-6" />
          <span>AI SQL Assistant</span>
        </h3>
        <p className="text-slate-300 font-mono text-sm">
          Ask questions, upload images, get optimized SQL code with explanations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2 font-mono">
              Describe your SQL needs:
            </label>
            <textarea
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="w-full h-32 bg-slate-800 border border-blue-500/30 rounded-lg p-4 text-blue-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
              placeholder="Example: 'Create a query to find top customers by revenue' or 'Optimize this slow query' or upload a database schema image..."
            />
          </div>

          {/* Image Upload */}
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-blue-400 rounded-lg text-sm font-mono transition-all duration-300 border border-blue-500/30"
            >
              <Image className="h-4 w-4" />
              <span>Upload Schema/Query Image</span>
            </button>
            {uploadedImage && (
              <span className="text-xs text-green-400 font-mono">✓ Image uploaded</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.button
              onClick={handleAiQuery}
              disabled={(!aiQuery.trim() && !uploadedImage) || aiLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-mono font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/30"
            >
              <Send className="h-4 w-4" />
              <span>{aiLoading ? 'Generating...' : 'Generate SQL'}</span>
            </motion.button>

            {aiResponse && (
              <motion.button
                onClick={handleExplain}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-mono font-medium transition-all duration-300 border border-green-400/30"
              >
                <Lightbulb className="h-4 w-4" />
                <span>{showExplanation ? 'Hide Explanation' : 'Explain Query'}</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Response Section */}
        <div className="space-y-4">
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/70 rounded-lg border border-blue-500/20 p-4 max-h-80 overflow-y-auto"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Terminal className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 font-mono text-sm">AI Generated Response</span>
              </div>
              <pre className="text-xs text-blue-300 font-mono whitespace-pre-wrap leading-relaxed">
                {aiResponse}
              </pre>
            </motion.div>
          )}

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-900/70 rounded-lg border border-green-500/20 p-4 max-h-80 overflow-y-auto"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <HelpCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-mono text-sm">Detailed Explanation</span>
                </div>
                <pre className="text-xs text-green-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {explanationText}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>

          {!aiResponse && !aiLoading && (
            <div className="bg-slate-800/30 rounded-lg border border-slate-600/30 p-6 text-center">
              <Bot className="h-12 w-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400 font-mono text-sm">
                Ask a question or upload an image to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FooterAI;