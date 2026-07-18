/**
 * ProtectedPage
 * HOC for protecting routes that require authentication
 * Provides withAuth and withOptionalAuth HOCs
 */

import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/Loading';
import { User, UserRole } from '@/types';

interface ProtectedPageProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * withAuth - HOC that requires authentication
 * Redirects to login if not authenticated
 */
export function withAuth<P extends ProtectedPageProps>(
  Component: ComponentType<P>,
  requiredRoles?: UserRole[]
) {
  return function ProtectedComponent(props: Omit<P, keyof ProtectedPageProps>) {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuth();
    const [isClientReady, setIsClientReady] = useState(false);

    // Wait for client-side hydration
    useEffect(() => {
      setIsClientReady(true);
    }, []);

    // Check authentication and redirect if needed
    useEffect(() => {
      if (!isClientReady || isLoading) return;

      if (!isAuthenticated) {
        router.push(`/login?redirect=${router.pathname}`);
        return;
      }

      // Check roles if specified
      if (requiredRoles && user && !requiredRoles.includes(user.role)) {
        router.push('/dashboard');
      }
    }, [isClientReady, isAuthenticated, isLoading, user, router]);

    // Show loading while checking auth or hydrating
    if (!isClientReady || isLoading) {
      return <Loading />;
    }

    // Show loading if not authenticated yet
    if (!isAuthenticated) {
      return <Loading />;
    }

    // Render protected component
    return <Component {...(props as P)} />;
  };
}

/**
 * withOptionalAuth - HOC that allows both authenticated and non-authenticated users
 * But shows loading until auth check is complete
 */
export function withOptionalAuth<P extends ProtectedPageProps>(
  Component: ComponentType<P>
) {
  return function OptionalAuthComponent(props: Omit<P, keyof ProtectedPageProps>) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const [isClientReady, setIsClientReady] = useState(false);

    // Wait for client-side hydration
    useEffect(() => {
      setIsClientReady(true);
    }, []);

    // Show loading while checking auth or hydrating
    if (!isClientReady || isLoading) {
      return <Loading />;
    }

    // Render component with or without auth
    return <Component {...(props as P)} />;
  };
}

/**
 * ProtectedPage component - wrapper for protecting route
 * Usage: Wrap your page component with withAuth or withOptionalAuth
 * 
 * Example:
 * export default withAuth(MyPage);
 */
export const ProtectedPage = {
  withAuth,
  withOptionalAuth,
};

export default ProtectedPage;
