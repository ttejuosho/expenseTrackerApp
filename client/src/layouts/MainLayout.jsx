import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Load user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser(); // calls /auth/me
        setUser(currentUser);
      } catch (err) {
        console.warn("No user logged in, redirecting...");
        setUser(null);
        // No need to redirect here — axios interceptor will handle 401
      } finally {
        setLoading(false);
      }
    };
    fetchUser();

    // Initialize theme from localStorage
    const theme = localStorage.getItem("theme");
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  };

  if (loading) return null; // Or a spinner while fetching user

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} />
      <main className="container mx-auto px-4 py-8">
        <Outlet context={{ user, darkMode, toggleDarkMode }} />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
