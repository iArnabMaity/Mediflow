// NotificationContext - Toast notification state provider
import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { NotificationContextType, Notification } from '../types';

export const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove notification
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

// Convenience hook for adding notifications
export const useNotification = () => {
  const { addNotification } = useNotificationContext();

  return {
    success: (message: string, title?: string) =>
      addNotification({ type: 'success', message, title }),
    error: (message: string, title?: string) =>
      addNotification({ type: 'error', message, title }),
    warning: (message: string, title?: string) =>
      addNotification({ type: 'warning', message, title }),
    info: (message: string, title?: string) =>
      addNotification({ type: 'info', message, title }),
    showNotification: (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', title?: string) =>
      addNotification({ type, message, title }),
  };
};


export default NotificationContext;
