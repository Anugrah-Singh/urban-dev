import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-500/20 backdrop-blur-xl relative">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-cyan-500/10 to-purple-600/10 animate-pulse"></div>
      
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-3">
              <svg className="w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="transform group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                UrbanOasis AI
              </h1>
              <p className="text-slate-300 text-sm font-medium">Smart Urban Planning for Sustainable Cities</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#dashboard" className="text-slate-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
              Dashboard
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#analytics" className="text-slate-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
              Analytics
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#reports" className="text-slate-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
              Reports
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-slate-300 bg-white/5 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/10">
              <svg className="w-4 h-4 text-cyan-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Bangalore, Karnataka</span>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-xl font-medium hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-2xl transform hover:scale-105 hover:shadow-cyan-500/25 border border-white/20 backdrop-blur-sm">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;