import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold mb-2">IPL T20 Dashboard</div>
            <p className="text-gray-400 text-sm">
              All cricket data is provided for informational purposes only.
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-sm text-gray-400 mb-2">
              &copy; {currentYear} IPL Dashboard. All rights reserved.
            </div>
            <div className="flex space-x-4 justify-center md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;