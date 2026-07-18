/**
 * ErrorBoundary.tsx
 * MediFlow - React Error Boundary
 * Catches React errors and displays user-friendly error messages with recovery options
 */

import React, { ReactNode, ReactElement } from 'react';
import Button from '@/components/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // You could also log the error to an error reporting service here
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render(): ReactElement {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
          <div className="max-w-md w-full">
            {/* Error Card */}
            <div className="card-base text-center">
              {/* Error Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7a7 7 0 1114 0v2m0 0v2"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Title */}
              <h2 className="heading-sm text-ink mb-2">
                Oops! Something went wrong
              </h2>

              {/* Error Message */}
              <p className="body-sm text-slate mb-6">
                We encountered an unexpected error. Please try refreshing the page or
                contact support if the problem persists.
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                  <p className="body-sm font-semibold text-red-800 mb-2">Error Details:</p>
                  <code className="text-xs text-red-700 break-words block overflow-auto max-h-32">
                    {this.state.error.toString()}
                  </code>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button variant="primary" size="md" fullWidth onClick={this.handleReset}>
                  Try Again
                </Button>
                <Button variant="secondary" size="md" fullWidth onClick={this.handleReload}>
                  Refresh Page
                </Button>
                <Button
                  variant="tertiary"
                  size="md"
                  fullWidth
                  onClick={() => window.location.href = '/'}
                >
                  Go to Home
                </Button>
              </div>

              {/* Support Link */}
              <div className="mt-6 pt-6 border-t border-hairline">
                <p className="body-sm text-slate">
                  Need help?{' '}
                  <a href="/support" className="text-primary font-semibold hover:underline">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children as ReactElement;
  }
}

export default ErrorBoundary;
