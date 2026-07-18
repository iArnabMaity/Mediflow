/**
 * Badge Component
 * MediFlow Design System - Status badges and labels
 */

import React, { ReactNode } from "react";

type BadgeVariant = "success" | "error" | "warning" | "info" | "coral" | "teal" | "default";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success:
    "bg-success-bg text-success-text border border-success-text/20",
  error:
    "bg-error-bg text-error-text border border-error-text/20",
  warning:
    "bg-warning-bg text-warning-text border border-warning-text/20",
  info: "bg-info-bg text-info-text border border-info-text/20",
  coral: "bg-coral text-white border border-coral",
  teal: "bg-teal text-white border border-teal",
  default: "bg-surface text-ink border border-hairline",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-micro font-medium rounded-full",
  md: "px-3 py-1.5 text-caption-bold font-semibold rounded-full",
  lg: "px-4 py-2 text-body-sm font-semibold rounded-full",
};

/**
 * Badge Component
 *
 * Usage:
 * <Badge variant="success">Available</Badge>
 * <Badge variant="coral" icon={<NewIcon />}>New Feature</Badge>
 * <Badge variant="info" dismissible onDismiss={handleDismiss}>Alert</Badge>
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      children,
      icon,
      dismissible = false,
      onDismiss,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center gap-2 font-sans transition-all duration-200";
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];
    const badgeClass = `${baseStyles} ${variantStyle} ${sizeStyle} ${className}`;

    return (
      <span ref={ref} className={badgeClass} {...props}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 ml-1 focus:outline-none hover:opacity-70"
            aria-label="Dismiss badge"
          >
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

// Status Badge with indicator dot
interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: "active" | "inactive" | "pending" | "error";
  showDot?: boolean;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, showDot = true, children, className = "", ...props }, ref) => {
    const statusStyles: Record<string, string> = {
      active: "bg-success-bg text-success-text border border-success-text/20",
      inactive: "bg-surface text-slate border border-hairline",
      pending: "bg-warning-bg text-warning-text border border-warning-text/20",
      error: "bg-error-bg text-error-text border border-error-text/20",
    };

    const dotColors: Record<string, string> = {
      active: "bg-success-text",
      inactive: "bg-slate",
      pending: "bg-warning-text",
      error: "bg-error-text",
    };

    const statusLabel: Record<string, string> = {
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      error: "Error",
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-caption-bold font-semibold rounded-full ${
          statusStyles[status]
        } ${className}`}
        {...props}
      >
        {showDot && <span className={`w-2 h-2 rounded-full ${dotColors[status]}`} />}
        {children || statusLabel[status]}
      </span>
    );
  }
);

StatusBadge.displayName = "StatusBadge";

// Activity Badge
interface ActivityBadgeProps extends Omit<BadgeProps, "variant"> {
  count?: number;
  max?: number;
}

const ActivityBadge = React.forwardRef<HTMLSpanElement, ActivityBadgeProps>(
  ({ count = 0, max = 99, className = "", ...props }, ref) => {
    const displayCount = count > max ? `${max}+` : count;

    return (
      <span
        ref={ref}
        className={`inline-flex items-center justify-center w-6 h-6 bg-coral text-white text-micro font-bold rounded-full ${className}`}
        {...props}
      >
        {displayCount}
      </span>
    );
  }
);

ActivityBadge.displayName = "ActivityBadge";

export default Badge;
export { StatusBadge, ActivityBadge };
