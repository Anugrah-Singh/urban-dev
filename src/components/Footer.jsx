import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">UrbanOasis AI</h3>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Empowering urban planners and sustainability officers with AI-driven insights 
              to create greener, more livable cities through intelligent park placement and 
              environmental planning.
            </p>
            <div className="flex space-x-4 mt-4">
              <div className="text-sm text-gray-400">
                <span className="text-emerald-400 font-semibold">200+</span> Cities Analyzed
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-emerald-400 font-semibold">1M+</span> People Served
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</a></li>
              <li><a href="#analytics" className="hover:text-emerald-400 transition-colors">Analytics</a></li>
              <li><a href="#reports" className="hover:text-emerald-400 transition-colors">Reports</a></li>
              <li><a href="#api" className="hover:text-emerald-400 transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#help" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
              <li><a href="#feedback" className="hover:text-emerald-400 transition-colors">Feedback</a></li>
              <li><a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 UrbanOasis AI. All rights reserved. Built with AI for sustainable urban development.
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="text-xs text-gray-500">
              Powered by Groq AI & React
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;