import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import authService from "../services/authService";

const Login = () => {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(formData.email, formData.password);
      setUser(res.user); // Update context with logged-in user
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="relative z-10">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h2 className="text-xl font-semibold mb-6 text-center">
                  Welcome back
                </h2>

                <form className="space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder=""
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300 dark:border-gray-600"
                      />
                      <label htmlFor="remember-me" className="ml-2 text-sm">
                        Remember me
                      </label>
                    </div>
                    <a
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-600 text-white py-2 rounded-lg disabled:opacity-50"
                  >
                    Sign In
                  </button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?{" "}
                    <a
                      href="/register"
                      className="text-primary hover:text-primary-600"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
