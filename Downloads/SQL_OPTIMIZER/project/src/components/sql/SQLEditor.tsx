import React from 'react';
import { Upload } from 'lucide-react';
import Terminal from '../ui/Terminal';
import StatusBar from '../ui/StatusBar';

interface SQLEditorProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedDatabase: string;
  executionTime?: number;
}

const SQLEditor: React.FC<SQLEditorProps> = ({
  query,
  onQueryChange,
  selectedDatabase,
  executionTime
}) => {
  return (
    <Terminal 
      title="QueryWise Terminal v2.1.0"
      className="mb-6"
    >
      <div className="mb-3">
        <span className="text-green-400 font-mono text-sm">user@querywise:~$ </span>
        <span className="text-blue-400 font-mono text-sm">mysql --execute</span>
      </div>
      
      <textarea
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full h-80 bg-transparent border-none text-green-300 font-mono text-sm focus:outline-none resize-none placeholder-green-500/50 leading-relaxed"
        placeholder="-- Enter your SQL query here
-- Example:
SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC;"
        style={{
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          lineHeight: '1.6',
          tabSize: 2
        }}
      />

      <StatusBar
        lines={query.split('\n').length}
        chars={query.length}
        database={selectedDatabase}
        executionTime={executionTime}
      />
    </Terminal>
  );
};

export default SQLEditor;