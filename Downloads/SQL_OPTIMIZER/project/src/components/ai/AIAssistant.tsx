import React, { useRef } from 'react';
import { Bot, Send, Image } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIAssistantProps {
  query: string;
  onQueryChange: (query: string) => void;
  response: string;
  loading: boolean;
  uploadedImage: string | null;
  onImageUpload: (file: File) => void;
  onSubmit: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  query,
  onQueryChange,
  response,
  loading,
  uploadedImage,
  onImageUpload,
  onSubmit
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-slate-900 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl p-6 border border-blue-500/30 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center space-x-2 font-mono">
        <Bot className="h-5 w-5" />
        <span>AI Assistant</span>
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-300 mb-2 font-mono">Ask AI:</label>
          <textarea
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full h-20 bg-slate-800 border border-blue-500/30 rounded-lg p-3 text-blue-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
            placeholder="Describe your SQL query needs or upload an image..."
          />
        </div>

        {/* Image Upload */}
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded text-sm font-mono transition-all duration-300 border border-blue-500/30"
          >
            <Image className="h-4 w-4" />
            <span>Upload Image</span>
          </button>
          {uploadedImage && (
            <span className="text-xs text-green-400 font-mono">✓ Image uploaded</span>
          )}
        </div>

        <motion.button
          onClick={onSubmit}
          disabled={(!query.trim() && !uploadedImage) || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-mono font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/30"
        >
          <Send className="h-4 w-4" />
          <span>{loading ? 'Processing...' : './ai --analyze'}</span>
        </motion.button>

        {/* AI Response Terminal */}
        {response && (
          <div className="mt-4 bg-slate-800/50 rounded-lg border border-blue-500/20 p-3 max-h-60 overflow-y-auto">
            <pre className="text-xs text-blue-300 font-mono whitespace-pre-wrap leading-relaxed">
              {response}
            </pre>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIAssistant;