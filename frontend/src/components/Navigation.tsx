/**
 * Navigation Components
 * MediFlow Design System - Sidebar, TopNav, and navigation utilities
 */

import React, { ReactNode } from "react";

// ============================================================================
// SIDEBAR NAVIGATION
// ============================================================================

interface SidebarNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  icon?: ReactNode;
  isActive?: boolean;
  badge?: ReactNode;
  onClick?: () => void;
}

const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  (
    {
      href,
      label,
      icon,
      isActive = false,
      badge,
      onClick,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyle =
      "flex items-center gap-3 px-3 py-2 text-body-sm font-medium rounded-sm transition-all duration-200";
    const activeStyle = isActive
      ? "bg-surface text-ink"
      : "text-charcoal hover:bg-surface/50";

    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={`${baseStyle} ${activeStyle} ${className}`}
        {...props}
      >
        {icon && <span className="flex-shrink-0 w-5 h-5">{icon}</span>}
        <span className="flex-grow">{label}</span>
        {badge && <span className="flex-shrink-0">{badge}</span>}
      </a>
    );
  }
);

SidebarNavItem.displayName = "SidebarNavItem";

// ============================================================================
// SIDEBAR WRAPPER
// ============================================================================

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  width?: "narrow" | "normal" | "wide";
  sticky?: boolean;
  collapsible?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const widthStyles: Record<"narrow" | "normal" | "wide", string> = {
  narrow: "w-48",
  normal: "w-64",
  wide: "w-72",
};

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      children,
      width = "normal",
      sticky = true,
      collapsible = true,
      isOpen = true,
      onClose,
      className = "",
      ...props
    },
    ref
  ) => {
    const stickyStyle = sticky ? "sticky top-0" : "";
    const widthStyle = widthStyles[width];
    const sidebarClass = `${stickyStyle} ${widthStyle} bg-canvas border-r border-hairline overflow-y-auto ${className}`;

    return (
      <div ref={ref} className={sidebarClass} {...props}>
        {children}
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

// ============================================================================
// SIDEBAR SECTION
// ============================================================================

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={`border-t border-hairline first:border-t-0 ${className}`} {...props}>
      {title && (
        <button
          onClick={() => collapsible && setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-caption-bold text-steel font-semibold hover:bg-surface/50 transition-colors"
        >
          {title}
          {collapsible && (
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-0" : "-rotate-90"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      )}
      {(!collapsible || isOpen) && <div className="py-1">{children}</div>}
    </div>
  );
};

// ============================================================================
// TABLE OF CONTENTS (TOC)
// ============================================================================

interface TocItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  level?: 1 | 2 | 3;
  isActive?: boolean;
}

const TocItem = React.forwardRef<HTMLAnchorElement, TocItemProps>(
  (
    {
      href,
      label,
      level = 1,
      isActive = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const levelPadding: Record<number, string> = {
      1: "pl-0",
      2: "pl-3",
      3: "pl-6",
    };

    const baseStyle = "block py-1.5 text-body-sm transition-colors duration-200";
    const activeStyle = isActive ? "text-ink font-medium" : "text-steel hover:text-charcoal";

    return (
      <a
        ref={ref}
        href={href}
        className={`${baseStyle} ${levelPadding[level]} ${activeStyle} ${className}`}
        {...props}
      >
        {label}
      </a>
    );
  }
);

TocItem.displayName = "TocItem";

// ============================================================================
// TABLE OF CONTENTS WRAPPER
// ============================================================================

interface TableOfContentsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  sticky?: boolean;
  title?: string;
}

const TableOfContents = React.forwardRef<HTMLDivElement, TableOfContentsProps>(
  (
    {
      children,
      sticky = true,
      title = "On this page",
      className = "",
      ...props
    },
    ref
  ) => {
    const stickyStyle = sticky ? "sticky top-20" : "";

    return (
      <div
        ref={ref}
        className={`${stickyStyle} w-48 overflow-y-auto max-h-[calc(100vh-80px)] ${className}`}
        {...props}
      >
        {title && (
          <h4 className="text-caption-bold text-ink font-semibold mb-3 pb-2 border-b border-hairline">
            {title}
          </h4>
        )}
        {children}
      </div>
    );
  }
);

TableOfContents.displayName = "TableOfContents";

// ============================================================================
// BREADCRUMB
// ============================================================================

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLNavElement> {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
}

const Breadcrumb = React.forwardRef<HTMLNavElement, BreadcrumbProps>(
  (
    { items, onNavigate, className = "", ...props },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={`flex items-center gap-2 text-body-sm ${className}`}
        aria-label="Breadcrumb"
        {...props}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-slate mx-1">/</span>}
            {item.href ? (
              <a
                href={item.href}
                onClick={() => onNavigate?.(item.href)}
                className="text-brand-blue-deep hover:text-brand-blue-700 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-charcoal">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export default Sidebar;
export {
  SidebarNavItem,
  SidebarSection,
  TocItem,
  TableOfContents,
  Breadcrumb,
};
