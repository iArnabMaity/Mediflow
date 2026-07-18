/**
 * Button Component
 * MediFlow Design System - Multiple button variants inspired by MiniMax
 */

import React, { ReactNode } from "react";
import { colors, borderRadius, spacing } from "../design/tokens";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "coral"
  | "teal"
  | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `bg-ink text-white hover:bg-charcoal active:bg-slate disabled:bg-hairline disabled:text-muted`,
  secondary: `bg-transparent text-ink border border-ink hover:bg-surface active:bg-hairline disabled:border-hairline disabled:text-muted`,
  tertiary: `bg-canvas text-ink border border-hairline hover:bg-surface active:bg-hairline disabled:border-hairline disabled:text-muted`,
  ghost: `bg-transparent text-ink hover:text-charcoal active:text-slate disabled:text-muted`,
  coral: `bg-coral text-white hover:bg-coralDark active:bg-coralLight disabled:bg-hairline disabled:text-muted`,
  teal: `bg-teal text-white hover:bg-tealDark active:bg-tealLight disabled:bg-hairline disabled:text-muted`,
  danger: `bg-error-text text-white hover:bg-coralDark active:bg-coral disabled:bg-hairline disabled:text-muted`,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: `px-3 py-1.5 text-body-sm font-medium rounded-full`,
  md: `px-6 py-2.5 text-button-md rounded-full`,
  lg: `px-8 py-3.5 text-body-md font-semibold rounded-full`,
};

/**
 * Button Component
 *
 * Usage:
 * <Button variant="primary" size="md">Sign Up</Button>
 * <Button variant="secondary" icon={<ArrowIcon />}>Next</Button>
 * <Button variant="coral" fullWidth>Emergency Alert</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      isLoading = false,
      isDisabled = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 transition-all duration-200 font-sans cursor-pointer";
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];
    const widthStyle = fullWidth ? "w-full" : "";
    const disabledStyle = isDisabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

    const buttonClass = `${baseStyles} ${variantStyle} ${sizeStyle} ${widthStyle} ${disabledStyle} ${className}`;

    return (
      <button
        ref={ref}
        disabled={isDisabled || isLoading}
        className={buttonClass}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
