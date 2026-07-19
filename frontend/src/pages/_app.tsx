/**
 * _app.tsx
 * MediFlow - App Root Component
 * Global setup, context providers, error boundaries, and theme initialization
 */

import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Optional NProgress for route transitions
let NProgress: any = null;
if (typeof window !== 'undefined') {
  try {
    NProgress = require('nprogress');
    require('nprogress/nprogress.css');
  } catch (e) {
    // NProgress not installed, will skip progress bar
  }
}

// Styles
import '@/styles/globals.css';


// Contexts
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { NotificationProvider } from '@/context/NotificationContext';

// Stores
import { useAuthStore } from '@/stores/auth';

// Components
import ErrorBoundary from '@/components/ErrorBoundary';
import Toast from '@/components/Toast';
import AppLayout from '@/components/AppLayout';

// Types
import type { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// NProgress configuration
if (NProgress) {
  NProgress.configure({ showSpinner: false, speed: 400, easing: 'ease', trickleSpeed: 200 });
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Initialize authentication on app mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Setup NProgress for route transitions if available
  useEffect(() => {
    if (!NProgress) return;
    
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  // Get layout from component or use default AppLayout
  const getLayout = Component.getLayout || ((page) => <AppLayout>{page}</AppLayout>);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="MediFlow - AI Healthcare Navigation & Patient Care Coordination" />
        <title>MediFlow - Healthcare Coordination Platform</title>
      </Head>

      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <ErrorBoundary>
              {getLayout(<Component {...pageProps} />)}
              <Toast />
            </ErrorBoundary>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
