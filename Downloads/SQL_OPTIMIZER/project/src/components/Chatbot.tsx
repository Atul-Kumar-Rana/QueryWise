import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm QueryBot, your SQL performance assistant. How can I help you optimize your queries today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How do I optimize my SQL query?",
    "What is an execution plan?",
    "How to create an index?",
    "Why is my query slow?",
    "How to use QueryWise?"
  ];

  const botResponses: { [key: string]: string } = {
    "optimize": "To optimize your SQL query, try these steps:\n1. Use specific column names instead of SELECT *\n2. Add appropriate indexes\n3. Use WHERE clauses to filter data early\n4. Consider query execution plans\n\nWould you like me to analyze a specific query?",
    "execution plan": "An execution plan shows how the database engine will execute your query. It includes:\n• Table scans and index usage\n• Join operations\n• Sorting and filtering steps\n• Cost estimates\n\nYou can view visual execution plans in our 'Visual EXPLAIN' section!",
    "index": "To create an index:\n```sql\nCREATE INDEX idx_column_name ON table_name(column_name);\n```\n\nIndexes speed up SELECT queries but can slow down INSERT/UPDATE operations. Use them wisely!",
    "slow query": "Common reasons for slow queries:\n• Missing indexes\n• Large table scans\n• Complex joins\n• Inefficient WHERE clauses\n• Outdated statistics\n\nTry our 'Run Query' feature to analyze your specific query!",
    "querywise": "QueryWise helps you:\n• Analyze SQL performance\n• Generate visual execution plans\n• Get optimization suggestions\n• Rewrite queries for better performance\n\nStart by pasting your query in the 'Run Query' section!",
    "default": "I understand you need help with SQL optimization. Here are some things I can assist with:\n• Query performance analysis\n• Index recommendations\n• Execution plan explanations\n• Best practices\n\nCould you be more specific about what you'd like to know?"
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && lowerInput.includes(key)) {
        return response;
      }
    }
    
    return botResponses.default;
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 text-white p-4 rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 border border-indigo-400/30"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-gradient-to-br from-slate-900/90 via-indigo-900/90 to-slate-900/90 backdrop-blur-2xl rounded-2xl border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 p-6 border-b border-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-lg opacity-75"></div>
                  <Bot className="h-8 w-8 text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text relative z-10" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">
                    QueryBot Assistant
                  </h3>
                  <p className="text-slate-300 text-sm">SQL Performance Helper</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                        : 'bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 text-slate-100 border border-indigo-500/20'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20">
                <p className="text-slate-300 text-sm mb-2">Quick questions:</p>
                <div className="space-y-1">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full text-left p-2 text-sm text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500/10 hover:via-purple-500/10 hover:to-cyan-500/10 rounded-lg transition-all duration-200"
                    >
                      <HelpCircle className="h-3 w-3 inline mr-2" />
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about SQL optimization..."
                  className="flex-1 bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 text-white p-2 rounded-xl hover:from-indigo-600 hover:via-purple-700 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;