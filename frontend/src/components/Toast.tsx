/**
 * Toast.tsx
 * MediFlow - Toast/Notification Display Component
 * Displays notifications from NotificationContext with auto-dismiss
 */

import React, { useEffect, useState } from 'react';
import { useNotification } from '@/context/NotificationContext';
import { NOTIFICATION_DURATION_MS } from '@/constants';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

/**
 * Individual Toast Item Component
 */
const ToastItem: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation
    }, NOTIFICATION_DURATION_MS);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Icon based on type
  const IconComponent = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  // Styles based on type
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-success-bg border border-green-300',
          text: 'text-success-text',
          icon: 'text-success-text',
        };
      case 'error':
        return {
          container: 'bg-red-50 border border-red-200',
          text: 'text-red-800',
          icon: 'text-red-500',
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border border-yellow-200',
          text: 'text-yellow-800',
          icon: 'text-yellow-600',
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-50 border border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-500',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`
        fixed top-20 right-4 max-w-sm w-full
        rounded-lg shadow-lg
        transform transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        z-50
      `}
    >
      <div className={`flex items-center gap-3 p-4 ${styles.container}`}>
        {/* Icon */}
        <div className={`flex-shrink-0 ${styles.icon}`}>
          <IconComponent />
        </div>

        {/* Message */}
        <div className={`flex-1 ${styles.text} body-sm`}>
          {message}
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`flex-shrink-0 ${styles.text} hover:opacity-70 transition-opacity`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

/**
 * Toast Container Component
 */
const Toast: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      <div className="fixed top-4 right-4 pointer-events-auto space-y-3">
        {notifications.map((notification) => (
          <ToastItem
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Toast;
