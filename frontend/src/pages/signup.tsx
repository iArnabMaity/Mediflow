/**
 * SignupPage
 * MediFlow - User registration and account creation
 */

import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthLayout from "@/layouts/AuthLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Badge from "@/components/Badge";
import { useForm } from "@/hooks/useForm";
import { useNotification } from "@/context/NotificationContext";
import { validateEmail, validatePassword } from "@/utils/helpers";
import { useAuthStore } from "@/stores/auth";

export default function SignupPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const { signup, isLoading: authLoading } = useAuthStore((state) => ({
    signup: state.signup,
    isLoading: state.isLoading,
  }));

  const { values, errors, setValues } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setValues({
        ...values,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const validateForm = (): boolean => {
    if (!values.firstName.trim()) {
      showNotification("First name is required", "error");
      return false;
    }
    if (!values.lastName.trim()) {
      showNotification("Last name is required", "error");
      return false;
    }
    if (!validateEmail(values.email)) {
      showNotification("Valid email is required", "error");
      return false;
    }
    if (!validatePassword(values.password)) {
      showNotification(
        "Password must be at least 8 characters with uppercase, lowercase, number, and symbol",
        "error"
      );
      return false;
    }
    if (values.password !== values.confirmPassword) {
      showNotification("Passwords do not match", "error");
      return false;
    }
    if (!values.agreeToTerms) {
      showNotification("You must agree to the terms and conditions", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signup({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: values.role as "patient" | "provider" | "admin",
      });

      showNotification("Account created successfully!", "success");
      router.push("/dashboard");
    } catch (error: any) {
      showNotification(error.message || "Signup failed. Please try again.", "error");
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join MediFlow and manage your health">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-body-sm font-semibold text-ink mb-2">First Name</label>
            <Input
              type="text"
              name="firstName"
              placeholder="John"
              value={values.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-body-sm font-semibold text-ink mb-2">Last Name</label>
            <Input
              type="text"
              name="lastName"
              placeholder="Doe"
              value={values.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-body-sm font-semibold text-ink mb-2">Email Address</label>
          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-body-sm font-semibold text-ink mb-2">I am a</label>
          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-hairline text-ink bg-canvas"
          >
            <option value="patient">Patient</option>
            <option value="provider">Healthcare Provider</option>
          </select>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-body-sm font-semibold text-ink mb-2">Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <p className="text-caption text-slate mt-1">
            At least 8 characters with uppercase, lowercase, number, and symbol
          </p>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-body-sm font-semibold text-ink mb-2">Confirm Password</label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Terms Agreement */}
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={values.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 rounded border-hairline mt-1"
            required
          />
          <span className="text-body-sm text-slate">
            I agree to the <a href="/terms" className="text-primary font-semibold">Terms of Service</a> and{" "}
            <a href="/privacy" className="text-primary font-semibold">Privacy Policy</a>
          </span>
        </label>

        {/* Sign Up Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          isLoading={authLoading}
          disabled={authLoading}
        >
          Create Account
        </Button>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-body-sm text-slate">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-semibold hover:text-primary-dark">
              Sign in
            </a>
          </p>
        </div>

        {/* Info Banner */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-caption text-blue-800">
            🔐 Your data is encrypted and secure. We comply with HIPAA and healthcare privacy regulations.
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
          )}
          <p className="text-caption text-slate mt-2">
            Use a mix of uppercase, lowercase, numbers, and symbols for security
          </p>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-body-sm font-semibold text-ink mb-2">
            Confirm Password
          </label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-error-text text-caption mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms Agreement */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-1 rounded border-hairline"
            />
            <span className="text-body-sm text-charcoal">
              I agree to MediFlow's{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              , including HIPAA compliance for health data protection
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-error-text text-caption mt-1">{errors.agreeToTerms}</p>
          )}
        </div>

        {/* Sign Up Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.password
          }
        >
          Create Account
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 border-t border-hairline"></div>
          <span className="text-body-sm text-slate">Or sign up with</span>
          <div className="flex-1 border-t border-hairline"></div>
        </div>

        {/* Social Sign Up Options */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="secondary" size="md">
            Google
          </Button>
          <Button variant="secondary" size="md">
            Microsoft
          </Button>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-body-sm text-slate">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-semibold hover:text-primary-dark">
              Sign in
            </a>
          </p>
        </div>

        {/* Security Info */}
        <div className="mt-8 p-4 bg-success-bg rounded-lg border border-success-text/20">
          <p className="text-caption text-success-text">
            ✓ HIPAA Compliant • ✓ Enterprise Security • ✓ Your data is encrypted and protected
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
