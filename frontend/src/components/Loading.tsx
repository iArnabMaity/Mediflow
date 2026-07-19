/**
 * Loading.tsx
 * MediFlow - Loading States Component
 * Loading spinner, skeleton, and overlay components
 */

import React from 'react';

/**
 * Loading Spinner Component
 */
export const Spinner: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={`${className} animate-spin text-primary`}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Skeleton Loading Component
 */
interface SkeletonProps {
  className?: string;
  count?: number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = 'h-4 w-full',
  count = 1,
  circle = false,
}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            ${className}
            bg-hairline
            animate-pulse
            ${circle ? 'rounded-full' : 'rounded-md'}
          `}
        />
      ))}
    </div>
  );
};

/**
 * Loading Overlay Component
 */
interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Loading...',
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-canvas rounded-lg shadow-lg p-8 flex flex-col items-center gap-4">
        <Spinner className="w-10 h-10" />
        <p className="body-md text-ink text-center">{message}</p>
      </div>
    </div>
  );
};

/**
 * Page Loading Component
 */
export const PageLoading: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <Spinner className="w-12 h-12" />
      <p className="body-md text-slate">Loading...</p>
    </div>
  </div>
);

/**
 * Card Skeleton Component
 */
interface CardSkeletonProps {
  className?: string;
  count?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className = '', count = 1 }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-base">
          <Skeleton count={3} />
        </div>
      ))}
    </div>
  );
};

/**
 * Table Skeleton Component
 */
interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns = 4, rows = 5 }) => (
  <div className="card-base overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b border-hairline">
          {Array.from({ length: columns }).map((_, i) => (
            <td key={i} className="p-4">
              <Skeleton />
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx} className="border-b border-hairline last:border-b-0">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <td key={colIdx} className="p-4">
                <Skeleton />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * Loading Component Wrapper
 */
interface LoadingProps {
  isLoading?: boolean;
  children?: React.ReactNode;
  skeleton?: 'card' | 'table' | 'custom';
  skeletonProps?: any;
  fallback?: React.ReactNode;
}

export const Loading: React.FC<LoadingProps> = ({
  isLoading = false,
  children,
  skeleton = 'card',
  skeletonProps = {},
  fallback,
}) => {
  if (isLoading) {
    if (fallback) return <>{fallback}</>;

    switch (skeleton) {
      case 'table':
        return <TableSkeleton {...skeletonProps} />;
      case 'custom':
        return <>{skeletonProps.render?.() || <CardSkeleton {...skeletonProps} />}</>;
      case 'card':
      default:
        return <CardSkeleton {...skeletonProps} />;
    }
  }

  return children ? <>{children}</> : <PageLoading />;
};

export default Loading;
