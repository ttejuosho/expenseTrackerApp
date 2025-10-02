import { useEffect } from "react";
import feather from "feather-icons";

const ForgotPassword = () => {
  useEffect(() => {
    feather.replace();

    // Theme detection
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <i data-feather="dollar-sign" className="text-primary w-8 h-8"></i>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PennyPincher Pro
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Track your expenses, save more money
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Forgot your password?
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-600 text-white py-2 rounded-lg"
            >
              Send reset link
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Remember your password?{" "}
              <a href="/login" className="text-primary hover:text-primary-600">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
