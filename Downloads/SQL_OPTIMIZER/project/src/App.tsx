import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import RunQuery from './pages/RunQuery';
import ExplainPlan from './pages/ExplainPlan';
import OptimizationSuggestions from './pages/OptimizationSuggestions';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            {/* Terminal-style animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/5 via-transparent to-transparent dark:from-green-400/10"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent dark:from-blue-400/10"></div>
            
            {/* Terminal grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)]"></div>
            
            <div className="relative z-10">
              <Navbar />
              <main className="pb-20">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/run-query" element={<RunQuery />} />
                  <Route path="/explain-plan" element={<ExplainPlan />} />
                  <Route path="/optimization" element={<OptimizationSuggestions />} />
                  <Route path="/contact" element={<ContactUs />} />
                </Routes>
              </main>
              <Footer />
              <Chatbot />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;