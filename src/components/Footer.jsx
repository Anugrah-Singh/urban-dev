import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900/95 to-black backdrop-blur-xl border-t border-slate-800/50 text-white py-12 mt-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 group">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 animate-float">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">UrbanOasis AI</h3>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md text-sm mb-6">
              Empowering urban planners and sustainability officers with AI-driven insights 
              to create greener, more livable cities through intelligent park placement and 
              environmental planning.
            </p>
            <div className="flex space-x-6 mt-4">
              <div className="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer">
                <span className="text-cyan-400 font-bold text-lg">200+</span> 
                <br />
                <span className="text-xs">Cities Analyzed</span>
              </div>
              <div className="text-sm text-slate-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                <span className="text-purple-400 font-bold text-lg">1M+</span>
                <br />
                <span className="text-xs">People Served</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Quick Links</h4>
            <ul className="space-y-3 text-slate-300">
              <li><a href="#dashboard" className="hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-1 hover:drop-shadow-lg flex items-center space-x-2">
                <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span>Dashboard</span>
              </a></li>
              <li><a href="#analytics" className="hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-1 hover:drop-shadow-lg flex items-center space-x-2">
                <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span>Analytics</span>
              </a></li>
              <li><a href="#reports" className="hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-1 hover:drop-shadow-lg flex items-center space-x-2">
                <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span>Reports</span>
              </a></li>
              <li><a href="#api" className="hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-1 hover:drop-shadow-lg flex items-center space-x-2">
                <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span>API Documentation</span>
              </a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="group">
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Support</h4>
            <ul className="space-y-3 text-slate-300">
              <li><a href="#help" className="hover:text-purple-400 transition-all duration-300 transform hover:translate-x-1 hover:drop-shadow-lg flex items-center space-x-2">
                <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span>Help Center</span>
              </a></li>
              <li><a href="#contact" className="hover:text-purple-400 transition-all duration-300 transform hover:translate-x-1 hover:drop-shadow-lg flex items-center space-x-2">
                <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span>Contact Us</span>
              </a></li>
              <li><a href="#feedback" className="hover:text-purple-400 transition-all duration-300 transform hover:translate-x-1 hover:drop-shadow-lg flex items-center space-x-2">
                <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span>Feedback</span>
              </a></li>
              <li><a href="#privacy" className="hover:text-purple-400 transition-all duration-300 transform hover:translate-x-1 hover:drop-shadow-lg flex items-center space-x-2">
                <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span>Privacy Policy</span>
              </a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center backdrop-blur-sm">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2025 UrbanOasis AI. All rights reserved. Built with AI for sustainable urban development.
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-xs text-slate-500 flex items-center space-x-2">
              <span>Powered by</span>
              <span className="text-cyan-400 font-semibold">Groq AI</span>
              <span>&</span>
              <span className="text-purple-400 font-semibold">React</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              <span className="text-xs text-slate-400">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;