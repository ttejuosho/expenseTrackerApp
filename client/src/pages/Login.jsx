import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await authService.login(data.email, data.password);
      toast.success("Login successful!");
      navigate("/home");
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

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
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
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-600 text-white py-2 rounded-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
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
