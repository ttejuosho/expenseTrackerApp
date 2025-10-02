import React from "react";
import { FiDollarSign, FiMoon, FiSun, FiUser } from "react-icons/fi";

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FiDollarSign className="text-indigo-500 w-8 h-8" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text text-transparent">
            PennyPincher Pro
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <FiUser className="w-5 h-5" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
