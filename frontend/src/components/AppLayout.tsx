/**
 * AppLayout.tsx
 * MediFlow - Main Application Layout
 * Wraps all pages with common structure (header, navigation, footer)
 */

import React, { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/router';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const router = useRouter();

  // Don't show navigation on auth pages
  const isAuthPage = router.pathname.startsWith('/auth') || 
                     router.pathname === '/login' || 
                     router.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* Main Navigation */}
      {!isAuthPage && <Navigation />}

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer - Optional */}
      {/* <footer className="footer-region mt-auto">
        Footer content here
      </footer> */}
    </div>
  );
};

export default AppLayout;
