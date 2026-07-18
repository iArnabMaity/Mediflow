/**
 * DashboardLayout
 * MediFlow authenticated user dashboard layout
 * Features: Sidebar navigation, top navbar, main content area
 */

import React, { ReactNode, useState } from "react";
import Sidebar from "@/components/Navigation";

interface DashboardLayoutProps {
  children: ReactNode;
  userName?: string;
  userRole?: "patient" | "provider" | "admin";
  onLogout?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userName = "User",
  userRole = "patient",
  onLogout,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const patientNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "My Appointments", href: "/appointments", icon: "📅" },
    { label: "Medical Records", href: "/records", icon: "📋" },
    { label: "Prescriptions", href: "/prescriptions", icon: "💊" },
    { label: "Health Insights", href: "/insights", icon: "📈" },
    { label: "Connected Devices", href: "/devices", icon: "⌚" },
  ];

  const providerNavItems = [
    { label: "Dashboard", href: "/provider", icon: "📊" },
    { label: "Patients", href: "/patients", icon: "👥" },
    { label: "Schedule", href: "/schedule", icon: "📅" },
    { label: "Consultations", href: "/consultations", icon: "💬" },
    { label: "Records", href: "/provider-records", icon: "📋" },
    { label: "Reports", href: "/reports", icon: "📊" },
  ];

  const adminNavItems = [
    { label: "Admin Dashboard", href: "/admin", icon: "⚙️" },
    { label: "Users", href: "/admin/users", icon: "👥" },
    { label: "Hospitals", href: "/admin/hospitals", icon: "🏥" },
    { label: "Analytics", href: "/admin/analytics", icon: "📊" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  const navItems =
    userRole === "patient"
      ? patientNavItems
      : userRole === "provider"
      ? providerNavItems
      : adminNavItems;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">MediFlow</h1>
            <p className="text-sm text-gray-600 mt-1 capitalize">{userRole}</p>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h2 className="text-xl font-semibold text-gray-900 hidden md:block">
              Dashboard
            </h2>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors relative">
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-600 capitalize">{userRole}</p>
              </div>

              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="ml-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Logout"
              >
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
