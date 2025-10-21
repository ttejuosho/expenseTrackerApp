import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  const { user, loading } = useAuth(); // ✅ use context instead of local state
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
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
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  };

  if (loading) return null; // or show spinner

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <Outlet context={{ user, darkMode, toggleDarkMode }} />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
