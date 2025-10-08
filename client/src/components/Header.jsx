import { useEffect, useState } from "react";
import { FiDollarSign, FiMoon, FiSun, FiUser, FiLogOut } from "react-icons/fi";
import authService from "../services/authService";

const Header = ({ darkMode, toggleDarkMode, user }) => {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <FiDollarSign className="text-indigo-500 w-8 h-8" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text text-transparent">
          PennyPincher Pro
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? (
            <FiSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <FiMoon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {user ? (
          <button
            onClick={authService.logout}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <FiUser className="w-5 h-5" />
            <span>Log out</span>
          </button>
        ) : (
          <>
            <a
              href="/login"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FiUser className="w-5 h-5" />
              <span>Sign in</span>
            </a>
            <a
              href="/register"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FiUser className="w-5 h-5" />
              <span>Sign up</span>
            </a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
