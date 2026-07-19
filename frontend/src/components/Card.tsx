/**
 * Card Component
 * MediFlow Design System - Multiple card variants
 */

import React, { ReactNode } from "react";
import { colors, borderRadius, spacing, elevation } from "../design/tokens";

type CardVariant = "base" | "feature" | "showcase" | "product" | "compact";
type ShowcaseColor = "coral" | "magenta" | "blue" | "purple" | "teal" | "green";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  showcaseColor?: ShowcaseColor;
  children: ReactNode;
  padding?: "sm" | "md" | "lg" | "xl" | "xxl";
  shadow?: boolean;
  clickable?: boolean;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  base: `bg-canvas border border-hairline rounded-xl`,
  feature: `bg-surface rounded-xl`,
  showcase: `rounded-hero`,
  product: `bg-canvas border border-hairline rounded-xxxl`,
  compact: `bg-canvas border border-hairline rounded-lg`,
};

const showcaseColorStyles: Record<ShowcaseColor, string> = {
  coral: `bg-coral text-white`,
  magenta: `bg-magenta text-white`,
  blue: `bg-brand-blue text-white`,
  purple: `bg-purple text-white`,
  teal: `bg-teal text-white`,
  green: `bg-medical-500 text-white`,
};

const paddingStyles: Record<"sm" | "md" | "lg" | "xl" | "xxl", string> = {
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
  xl: "p-6",
  xxl: "p-8",
};

const shadowStyles: Record<string, string> = {
  none: "shadow-elevation-0",
  subtle: "shadow-elevation-1",
  default: "shadow-elevation-2",
  elevated: "shadow-elevation-3",
  modal: "shadow-elevation-4",
};

/**
 * Card Component
 *
 * Usage:
 * <Card variant="base"><p>Content</p></Card>
 * <Card variant="showcase" showcaseColor="teal">Healthcare Content</Card>
 * <Card variant="feature" padding="xl">Featured Info</Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "base",
      showcaseColor,
      children,
      padding = "lg",
      shadow = false,
      clickable = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles = "transition-all duration-300";
    const variantStyle = variantStyles[variant];
    const showcaseStyle = variant === "showcase" && showcaseColor ? showcaseColorStyles[showcaseColor] : "";
    const paddingStyle = paddingStyles[padding];
    const shadowStyle = shadow ? shadowStyles.default : shadowStyles.none;
    const clickableStyle = clickable ? "cursor-pointer hover:shadow-elevation-2" : "";

    const cardClass = `${baseStyles} ${variantStyle} ${showcaseStyle} ${paddingStyle} ${shadowStyle} ${clickableStyle} ${className}`;

    return (
      <div ref={ref} className={cardClass} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Sub-component for Card Content
interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
  title?: string | ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "", title }) => (
  <div className={`mb-4 pb-4 border-b border-hairline ${className}`}>
    {title ? (
      typeof title === 'string' ? <h3 className="font-semibold text-gray-900">{title}</h3> : title
    ) : (
      children
    )}
  </div>
);


// Sub-component for Card Body
interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

// Sub-component for Card Footer
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = "" }) => (
  <div className={`mt-4 pt-4 border-t border-hairline ${className}`}>{children}</div>
);

// Sub-component for Card Title
interface CardTitleProps {
  children: ReactNode;
  className?: string;
  level?: "h1" | "h2" | "h3" | "h4";
}

const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = "",
  level = "h3",
}) => {
  const Element = level;
  return (
    <Element className={`text-card-title font-semibold text-ink ${className}`}>
      {children}
    </Element>
  );
};

// Sub-component for Card Description
interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = "",
}) => (
  <p className={`text-body-sm text-slate mt-1 ${className}`}>{children}</p>
);

export default Card;
export { CardHeader, CardBody, CardFooter, CardTitle, CardDescription };
