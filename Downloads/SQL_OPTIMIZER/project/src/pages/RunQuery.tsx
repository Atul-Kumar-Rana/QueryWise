import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import organized components
import SQLEditor from '../components/sql/SQLEditor';
import QueryResults from '../components/ui/QueryResults';
import ActionButtons from '../components/ui/ActionButtons';
import DatabaseConfig from '../components/sql/DatabaseConfig';
import AIAssistant from '../components/ai/AIAssistant';
import SampleQueries from '../components/sql/SampleQueries';

const RunQuery = () => {
  const [query, setQuery] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('MySQL');
  const [simulateData, setSimulateData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [queryResults, setQueryResults] = useState<any>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const navigate = useNavigate();

  const databases = ['MySQL', 'PostgreSQL', 'H2', 'SQL Server', 'Oracle', 'SQLite'];

  const sampleQueries = [
    {
      name: 'User Orders Analysis',
      query: `-- User Orders Analysis Query
SELECT u.name, u.email, COUNT(o.id) as order_count, SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC
LIMIT 100;`
    },
    {
      name: 'Product Performance',
      query: `-- Product Performance Analysis
SELECT p.name, p.category, AVG(r.rating) as avg_rating, COUNT(r.id) as review_count
FROM products p
JOIN reviews r ON p.id = r.product_id
WHERE r.created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
GROUP BY p.id, p.name, p.category
HAVING COUNT(r.id) > 10
ORDER BY avg_rating DESC, review_count DESC;`
    },
    {
      name: 'Complex Join Query',
      query: `-- Complex Multi-table Join
SELECT 
  c.name as customer_name,
  o.order_date,
  p.name as product_name,
  oi.quantity,
  oi.price
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.order_date BETWEEN '2024-01-01' AND '2024-12-31'
  AND p.category = 'Electronics'
ORDER BY o.order_date DESC;`
    }
  ];

  const handleRunQuery = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults = {
      columns: ['id', 'name', 'email', 'created_at', 'order_count'],
      rows: [
        [1, 'John Doe', 'john@example.com', '2024-01-15', 5],
        [2, 'Jane Smith', 'jane@example.com', '2024-01-16', 3],
        [3, 'Bob Johnson', 'bob@example.com', '2024-01-17', 8],
        [4, 'Alice Brown', 'alice@example.com', '2024-01-18', 2],
        [5, 'Charlie Wilson', 'charlie@example.com', '2024-01-19', 12]
      ],
      rowCount: 5,
      executionTime: Math.random() * 100 + 10
    };
    
    setQueryResults(mockResults);
    setExecutionTime(mockResults.executionTime);
    setLoading(false);
  };

  const handleRunExplainPlan = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    navigate('/explain-plan');
  };

  const handleAnalyzePerformance = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    navigate('/optimization');
  };

  const handleOptimize = () => {
    navigate('/optimization');
  };

  const handleAiQuery = async () => {
    if (!aiQuery.trim() && !uploadedImage) return;
    
    setAiLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResponse = `
╭─ AI SQL Analysis Results ─────────────────────────────────╮
│                                                           │
│ Query Complexity: O(n log n)                            │
│ Estimated Execution Time: 12.5ms                        │
│ Memory Usage: 2.4MB                                      │
│                                                           │
│ ┌─ Performance Metrics ─────────────────────────────────┐ │
│ │ • Index Scans: 2                                     │ │
│ │ • Table Scans: 1                                     │ │
│ │ • Join Operations: 3                                 │ │
│ │ • Sort Operations: 1                                 │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─ Optimization Suggestions ───────────────────────────┐ │
│ │ 1. Add index on users.email (High Priority)         │ │
│ │ 2. Consider LIMIT clause for large datasets         │ │
│ │ 3. Use EXISTS instead of IN for subqueries          │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─ Generated SQL ───────────────────────────────────────┐ │
│ │ SELECT u.id, u.name, u.email,                       │ │
│ │        COUNT(o.id) as order_count                    │ │
│ │ FROM users u                                         │ │
│ │ LEFT JOIN orders o ON u.id = o.user_id              │ │
│ │ WHERE u.created_at >= '2024-01-01'                  │ │
│ │ GROUP BY u.id, u.name, u.email                      │ │
│ │ ORDER BY order_count DESC                            │ │
│ │ LIMIT 100;                                           │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                           │
│ Complexity Graph:                                        │
│ ████████████████████████████████████████████████████████ │
│ ████████████████████████████████████████████████████████ │
│ ████████████████████████████████████████████████████████ │
│ ████████████████████████████████████████████████████████ │
│ ████████████████████████████████████████████████████████ │
│                                                           │
╰───────────────────────────────────────────────────────────╯`;

    setAiResponse(mockResponse);
    setAiLoading(false);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold font-mono text-slate-900 dark:text-green-400 mb-2 drop-shadow-sm">
          $ sql-terminal --interactive
        </h1>
        <p className="text-slate-600 dark:text-green-300/80 font-mono">Professional SQL analysis environment with AI assistance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main SQL Editor Section */}
        <div className="lg:col-span-2">
          <SQLEditor
            query={query}
            onQueryChange={setQuery}
            selectedDatabase={selectedDatabase}
            executionTime={executionTime}
          />

          {/* Query Results */}
          {queryResults && (
            <QueryResults
              results={queryResults}
              database={selectedDatabase}
            />
          )}

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ActionButtons
              onExecute={handleRunQuery}
              onExplain={handleRunExplainPlan}
              onAnalyze={handleAnalyzePerformance}
              onOptimize={handleOptimize}
              disabled={!query.trim()}
              loading={loading}
            />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <DatabaseConfig
            selectedDatabase={selectedDatabase}
            onDatabaseChange={setSelectedDatabase}
            simulateData={simulateData}
            onSimulateDataChange={setSimulateData}
            databases={databases}
          />

          <AIAssistant
            query={aiQuery}
            onQueryChange={setAiQuery}
            response={aiResponse}
            loading={aiLoading}
            uploadedImage={uploadedImage}
            onImageUpload={handleImageUpload}
            onSubmit={handleAiQuery}
          />

          <SampleQueries
            queries={sampleQueries}
            onSelectQuery={setQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default RunQuery;