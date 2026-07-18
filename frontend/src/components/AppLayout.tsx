/**
 * AppLayout.tsx
 * MediFlow - Main Application Layout
 * Wraps all pages with common structure (header, navigation, footer)
 */

import React, { ReactNode } from 'react';
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
      {/* Main Navigation - Simple top bar */}
      {!isAuthPage && (
        <nav className="h-16 border-b border-hairline bg-canvas flex items-center px-6">
          <div className="text-heading-sm font-bold text-ink">MediFlow</div>
          <div className="ml-auto flex gap-4">
            <a href="/dashboard" className="text-body-sm hover:text-brand-blue">Dashboard</a>
            <a href="/profile" className="text-body-sm hover:text-brand-blue">Profile</a>
            <a href="/settings" className="text-body-sm hover:text-brand-blue">Settings</a>
          </div>
        </nav>
      )}

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
