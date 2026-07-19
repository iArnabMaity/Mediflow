/**
 * Input Component
 * MediFlow Design System - Text input and related fields
 */

import React, { ReactNode } from "react";
import { colors, borderRadius } from "../design/tokens";

type InputVariant = "text" | "email" | "password" | "search" | "number" | "tel";
type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  placeholder?: string;
  error?: string;
  success?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  helpText?: string;
  fullWidth?: boolean;
  className?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "px-3 py-1.5 text-body-sm",
  md: "px-4 py-2.5 text-body-sm",
  lg: "px-4 py-3 text-body-md",
};

/**
 * Input Component
 *
 * Usage:
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="user@example.com"
 *   error={emailError}
 * />
 * <Input
 *   type="search"
 *   placeholder="Search patients..."
 *   icon={<SearchIcon />}
 * />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "text",
      size = "md",
      label,
      placeholder,
      error,
      success,
      icon,
      iconPosition = "left",
      helpText,
      fullWidth = false,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeStyles[size];
    const widthStyle = fullWidth ? "w-full" : "";
    const borderStyle = error
      ? "border-2 border-error-text"
      : success
      ? "border-2 border-success-text"
      : "border border-hairline focus:border-2 focus:border-brand-blue-deep";
    const bgStyle = disabled ? "bg-hairline-soft" : "bg-canvas";
    const iconWrapperStyle = icon ? (iconPosition === "left" ? "pl-2" : "pr-2") : "";

    const inputClass = `${sizeStyle} ${widthStyle} ${borderStyle} ${bgStyle} rounded-md outline-none transition-all duration-200 ${iconWrapperStyle} ${className}`;

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label className="block text-body-sm-medium text-ink mb-2 font-medium">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 text-steel pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={variant}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClass}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <div className="absolute right-3 text-steel pointer-events-none">
              {icon}
            </div>
          )}

          {success && (
            <div className="absolute right-3 text-success-text">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {error && (
            <div className="absolute right-3 text-error-text">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-body-sm text-error-text">{error}</p>}
        {helpText && !error && (
          <p className="mt-1 text-body-sm text-slate">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Search Pill variant
interface SearchPillProps
  extends Omit<InputProps, "variant" | "size" | "label"> {
  className?: string;
}

const SearchPill = React.forwardRef<HTMLInputElement, SearchPillProps>(
  ({ placeholder = "Search...", icon, className = "", ...props }, ref) => {
    return (
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-steel">{icon}</div>}
        <input
          ref={ref}
          type="search"
          placeholder={placeholder}
          className={`w-full px-4 py-2 bg-surface text-steel text-body-sm border border-hairline rounded-md focus:border-2 focus:border-brand-blue-deep outline-none transition-all duration-200 ${
            icon ? "pl-10" : ""
          } ${className}`}
          {...props}
        />
      </div>
    );
  }
);

SearchPill.displayName = "SearchPill";

export default Input;
export { SearchPill };
