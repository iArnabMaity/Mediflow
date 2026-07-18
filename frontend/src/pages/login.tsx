/**
 * LoginPage
 * MediFlow - User authentication login with form validation and error handling
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useForm } from "@/hooks/useForm";
import { useAuthStore } from "@/stores/auth";
import { useNotification } from "@/context/NotificationContext";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const loginValidationSchema = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 6,
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [isAttempting, setIsAttempting] = useState(false);

  const { login, isLoading } = useAuthStore((state) => ({
    login: state.login,
    isLoading: state.isLoading,
  }));

  const { formData, errors, setFormData, validateForm } = useForm<LoginFormData>(
    {
      email: "",
      password: "",
      rememberMe: false,
    },
    loginValidationSchema
  );

  // Redirect if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await useAuthStore.getState().checkAuth();
      if (isAuth) {
        router.push("/dashboard");
      }
    };
    checkAuth();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("Please fix the errors in the form", "error");
      return;
    }

    try {
      setIsAttempting(true);
      await login({
        email: formData.email,
        password: formData.password,
      });

      showNotification("Logged in successfully!", "success");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials and try again.";
      showNotification(errorMessage, "error");
    } finally {
      setIsAttempting(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const isSubmitting = isLoading || isAttempting;
  const isFormValid = formData.email && formData.password && !isSubmitting;

  return (
    <AuthLayout
      title="Sign In to MediFlow"
      subtitle="Access your medical records and appointments"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Email Address
          </label>
          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-900">
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot password?
            </button>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Keep me signed in
          </label>
        </div>

        {/* Sign In Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          type="submit"
          disabled={!isFormValid}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-sm text-gray-600">Or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Login Options */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <text x="0" y="20" fontSize="24" fill="currentColor">
                G
              </text>
            </svg>
            Google
          </button>
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <text x="0" y="20" fontSize="24" fill="currentColor">
                M
              </text>
            </svg>
            Microsoft
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link href="/signup">
              <span className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer">
                Create one now
              </span>
            </Link>
          </p>
        </div>

        {/* Security Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-900">
            🔒 <span className="font-semibold">Secure Login:</span> Your connection is encrypted. Your health data is always private and protected.
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

