import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrophyIcon, TableCellsMergeIcon as TableCellsIcon, CalendarIcon, MenuIcon, XIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: <TrophyIcon size={18} /> },
    { to: '/points-table', label: 'Points Table', icon: <TableCellsIcon size={18} /> },
    { to: '/schedule', label: 'Schedule', icon: <CalendarIcon size={18} /> },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <TrophyIcon size={24} />
            <span className="text-xl font-bold">IPL Dashboard</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1 py-2 transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-white border-b-2 border-white font-medium'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-2 py-3 px-2 ${
                  location.pathname === link.to
                    ? 'bg-blue-800 text-white rounded'
                    : 'text-blue-100 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;