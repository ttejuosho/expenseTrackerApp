import { FiDollarSign, FiMoon, FiSun, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ use React Router’s location

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <FiDollarSign className="text-indigo-500 w-8 h-8" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text text-transparent">
          PennyPincher Pro
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? (
            <FiSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <FiMoon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* Auth buttons */}
        {user ? (
          <div className="flex items-center space-x-3">
            <Link
              to="/home"
              className={`${
                location.pathname === "/dashboard"
                  ? "underline text-indigo-500"
                  : "text-gray-800 dark:text-gray-200"
              } font-medium hover:text-indigo-500`}
            >
              Dashboard
            </Link>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Hi, {user.firstName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600 
                text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FiUser className="w-5 h-5" />
              <span>Log out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            {location.pathname !== "/login" && (
              <Link
                to="/login"
                className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600
                  text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <FiUser className="w-5 h-5" />
                <span>Sign in</span>
              </Link>
            )}

            {location.pathname !== "/register" && (
              <Link
                to="/register"
                className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600
                  text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <FiUser className="w-5 h-5" />
                <span>Sign Up</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
