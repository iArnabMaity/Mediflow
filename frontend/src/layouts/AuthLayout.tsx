/**
 * AuthLayout
 * MediFlow authentication pages layout (login, signup, forgot password)
 * Features: Centered form, left-side branding
 */

import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showBranding?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBranding = true,
}) => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Branding (hidden on mobile) */}
      {showBranding && (
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-teal items-center justify-center p-12">
          <div className="text-center text-white max-w-lg">
            <h1 className="text-5xl font-bold mb-4">MediFlow</h1>
            <p className="text-xl opacity-90 mb-8">
              Unified Healthcare Navigation & Coordination
            </p>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold">Unified Medical Records</p>
                  <p className="text-sm opacity-75">Access all your health data in one place</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold">Smart Coordination</p>
                  <p className="text-sm opacity-75">Seamless provider-to-provider communication</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold">Healthcare Navigation</p>
                  <p className="text-sm opacity-75">Find the right providers and facilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right side - Form */}
      <div className={`flex-1 flex items-center justify-center p-6 md:p-12 ${showBranding ? "lg:w-1/2" : "w-full"}`}>
        <div className="w-full max-w-md">
          {/* Mobile Branding */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">MediFlow</h1>
            <p className="text-slate">Healthcare coordination made simple</p>
          </div>

          {/* Form Header */}
          {title && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-ink mb-2">{title}</h2>
              {subtitle && <p className="text-slate">{subtitle}</p>}
            </div>
          )}

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
