import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        priority: 'medium'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@querywise.com',
      description: 'Get help within 24 hours',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9AM-6PM EST',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: 'San Francisco, CA',
      description: 'Visit our headquarters',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const supportTopics = [
    'Technical Support',
    'Billing & Pricing',
    'Feature Request',
    'Bug Report',
    'Partnership Inquiry',
    'General Question'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Have questions about QueryWise? Our expert team is here to help you optimize your SQL performance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30 hover:border-indigo-400/50 transition-all duration-300 text-center group"
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${info.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <info.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">{info.title}</h3>
            <p className="text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-medium mb-2">{info.details}</p>
            <p className="text-slate-400 text-sm">{info.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Enhanced Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30"
        >
          <div className="flex items-center space-x-3 mb-8">
            <MessageSquare className="h-6 w-6 text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text" />
            <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">Send us a Message</h2>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-slate-300">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="low" className="bg-slate-900">Low</option>
                    <option value="medium" className="bg-slate-900">Medium</option>
                    <option value="high" className="bg-slate-900">High</option>
                    <option value="urgent" className="bg-slate-900">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="" className="bg-slate-900">Select a topic</option>
                  {supportTopics.map((topic) => (
                    <option key={topic} value={topic} className="bg-slate-900">
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-gradient-to-r from-slate-800/50 via-indigo-800/50 to-slate-800/50 border border-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Please describe your question or issue in detail..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:from-indigo-600 hover:via-purple-700 hover:to-cyan-600 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 border border-indigo-400/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Enhanced Additional Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* FAQ Section */}
          <div className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30">
            <h3 className="text-xl font-semibold text-white mb-6 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="border-b border-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 pb-4">
                <h4 className="text-white font-medium mb-2">How quickly do you respond to support requests?</h4>
                <p className="text-slate-300 text-sm">We typically respond within 24 hours for standard inquiries and within 4 hours for urgent issues.</p>
              </div>
              <div className="border-b border-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 pb-4">
                <h4 className="text-white font-medium mb-2">Do you offer phone support?</h4>
                <p className="text-slate-300 text-sm">Yes, phone support is available for enterprise customers during business hours (9AM-6PM EST).</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Can you help with custom SQL optimization?</h4>
                <p className="text-slate-300 text-sm">Absolutely! Our team of SQL experts can provide personalized optimization recommendations for your specific use case.</p>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30">
            <h3 className="text-xl font-semibold text-white mb-6 bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">Expected Response Times</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                  <span className="text-slate-300">General Inquiries</span>
                </div>
                <span className="text-white font-medium">24 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  <span className="text-slate-300">Technical Support</span>
                </div>
                <span className="text-white font-medium">12 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"></div>
                  <span className="text-slate-300">Urgent Issues</span>
                </div>
                <span className="text-white font-medium">4 hours</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text" />
              <h3 className="text-xl font-semibold text-white bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent">Business Hours</h3>
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-white">9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">10:00 AM - 4:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-slate-400">Closed</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;