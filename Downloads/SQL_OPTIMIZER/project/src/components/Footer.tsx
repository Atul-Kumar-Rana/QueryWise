import React from 'react';
import { 
  Heart, 
  Shield, 
  Mail, 
  Database, 
  Github, 
  Twitter, 
  Linkedin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FooterAI from './ai/FooterAI';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'SQL Terminal', href: '/run-query' },
    { name: 'Optimization', href: '/optimization' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-slate-900/98 dark:bg-slate-900/98 backdrop-blur-xl border-t border-green-500/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* AI Assistant Section */}
        <FooterAI />

        {/* Traditional Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 rounded-lg blur-sm opacity-75"></div>
                <div className="relative bg-slate-800 p-3 rounded-lg border border-green-500/50 shadow-lg">
                  <Database className="h-8 w-8 text-green-400 drop-shadow-lg" />
                </div>
              </div>
              <span className="text-2xl font-bold font-mono text-green-400 tracking-tight drop-shadow-sm">
                QueryWise
              </span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md leading-relaxed font-mono text-sm">
              Professional SQL performance analysis and optimization platform with AI-powered insights. 
              Terminal-style interface designed for developers.
            </p>
            <div className="flex items-center space-x-2 text-slate-300 font-mono text-sm">
              <span>© 2025 QueryWise. Built with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>for developers worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-green-400 font-semibold mb-6 font-mono">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-slate-400 hover:text-green-400 font-mono text-sm transition-all duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div>
            <h3 className="text-green-400 font-semibold mb-6 font-mono">
              Connect
            </h3>
            <div className="space-y-4">
              <Link 
                to="/contact"
                className="flex items-center space-x-2 text-slate-400 hover:text-green-400 transition-all duration-300 font-mono text-sm font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Support</span>
              </Link>
              <a 
                href="#"
                className="flex items-center space-x-2 text-slate-400 hover:text-green-400 transition-all duration-300 font-mono text-sm font-medium"
              >
                <Shield className="h-4 w-4" />
                <span>Privacy Policy</span>
              </a>
              <div className="flex space-x-4 pt-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/60 transition-all duration-300 border border-green-500/30 hover:border-green-400/50 shadow-sm"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-slate-400 hover:text-green-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-500/30 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm font-mono">
            QueryWise - Professional SQL performance analysis platform designed for enterprise-grade applications.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;