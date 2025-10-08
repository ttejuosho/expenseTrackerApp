import { useEffect } from "react";
import feather from "feather-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema.js";
import authService from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    feather.replace();
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Account created! Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Track your expenses, save more money
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Create an account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                {...register("terms")}
                className="w-4 h-4 text-primary rounded border-gray-300 dark:border-gray-600"
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                I agree to the{" "}
                <a href="#" className="text-primary hover:text-primary-600">
                  terms and conditions
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">
                {errors.terms.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-600 text-white py-2 rounded-lg"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
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

export default Register;
