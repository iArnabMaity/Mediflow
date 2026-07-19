/**
 * SignupPage
 * MediFlow - User registration and account creation
 */

import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthLayout from "@/layouts/AuthLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useNotificationContext } from "@/context/NotificationContext";
import { validateEmail, validatePassword } from "@/utils/helpers";

export default function SignupPage() {
  const router = useRouter();
  const { addNotification } = useNotificationContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      addNotification({ type: "error", message: "First name is required" });
      return false;
    }
    if (!formData.lastName.trim()) {
      addNotification({ type: "error", message: "Last name is required" });
      return false;
    }
    if (!validateEmail(formData.email)) {
      addNotification({ type: "error", message: "Valid email is required" });
      return false;
    }
    if (!validatePassword(formData.password)) {
      addNotification({ type: "error", message: "Password must be at least 8 characters" });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      addNotification({ type: "error", message: "Passwords do not match" });
      return false;
    }
    if (!formData.agreeToTerms) {
      addNotification({ type: "error", message: "You must agree to terms and conditions" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addNotification({ type: "success", message: "Account created successfully!" });
      router.push("/login");
    } catch (error) {
      addNotification({ type: "error", message: "Failed to create account" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-heading-lg font-bold text-ink mb-2">Create Account</h1>
        <p className="text-body-md text-slate mb-6">Join MediFlow to manage your healthcare</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-hairline rounded-md text-body-sm"
          >
            <option value="patient">Patient</option>
            <option value="provider">Healthcare Provider</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-body-sm text-slate">
              I agree to the{" "}
              <a href="#" className="text-primary font-semibold hover:underline">
                Terms of Service
              </a>
            </span>
          </label>

          <Button variant="primary" type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-body-sm text-slate">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-semibold hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
