// Protected Routes Middleware
import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole | UserRole[];
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallback,
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthContext();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback || null;
  }

  // Check role-based access
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!user || !roles.includes(user.role)) {
      return fallback || (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-gray-600">You do not have permission to access this page.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

// HOC to wrap pages with authentication
export const withAuth = <P extends object, >(
  Component: React.ComponentType<P>,
  requiredRole?: UserRole | UserRole[]
): React.ComponentType<P> => {
  return (props: P) => (
    <ProtectedRoute requiredRole={requiredRole}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

// HOC to wrap pages with optional authentication
export const withOptionalAuth = <P extends object, >(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  return (props: P) => {
    const { isLoading } = useAuthContext();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};

export default ProtectedRoute;
