import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, User, LogOut } from 'lucide-react';
import { NavSection, User as UserType } from '../types';

interface NavbarProps {
  activeSection: NavSection;
  scrollToSection: (section: NavSection) => void;
  onLoginClick: () => void;
  user: UserType | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection, onLoginClick, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: NavSection.HOME, label: 'Home' },
    { id: NavSection.SERVICES, label: 'Services' },
    { id: NavSection.PORTFOLIO, label: 'Portfolio' },
    { id: NavSection.PRICING, label: 'Pricing' },
    { id: NavSection.DOMAIN, label: 'Domains' },
    { id: NavSection.CONTACT, label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-emerald-950/90 backdrop-blur-md shadow-lg border-b border-emerald-800' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => scrollToSection(NavSection.HOME)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-brand-500/20 transition-all border border-brand-400/20">
              <Code2 className="text-white w-5 h-5" />
            </div>
            <span className="ml-3 text-xl font-bold text-white tracking-tight">
              WebUX <span className="text-brand-400">BD</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-brand-400'
                    : 'text-emerald-100/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg transition-colors border border-emerald-700"
                >
                  <User className="w-4 h-4 text-brand-400" />
                  <span>{user.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-emerald-900 border border-emerald-700 rounded-xl shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-emerald-800">
                      <p className="text-xs text-emerald-400">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-emerald-800 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium shadow-lg shadow-brand-500/20 transition-all transform hover:scale-105"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
             {/* Mobile Auth Icon if logged in */}
             {user && (
                <div className="w-8 h-8 rounded-full bg-brand-900 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30">
                  {user.name.charAt(0)}
                </div>
             )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-emerald-100 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 border-b border-emerald-800 shadow-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  activeSection === item.id
                    ? 'text-white bg-brand-900/30'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-emerald-800 mt-4 pt-4 px-3">
              {user ? (
                 <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 border border-red-500/30 rounded-md text-red-400 bg-red-500/10 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full block text-center px-4 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-md font-bold"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};