/**
 * DashboardPage
 * MediFlow - Patient/Provider dashboard with stats, appointments, and medical records
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/DashboardLayout";
import Card, { CardTitle, CardHeader, CardBody } from "@/components/Card";
import Loading from "@/components/Loading";

import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { appointmentService, recordService } from "@/services/api";
import { getInitials, formatDate } from "@/utils/helpers";
import { APPOINTMENT_STATUSES, RECORD_TYPES } from "@/constants";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [appointmentData, setAppointmentData] = useState<any[]>([]);
  const [recordData, setRecordData] = useState<any[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentService.list({ limit: 3 });
        setAppointmentData(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated]);

  // Fetch medical records
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await recordService.list({ limit: 3 });
        setRecordData(response.data);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    };
    if (isAuthenticated) {
      fetchRecords();
    }
  }, [isAuthenticated]);

  const stats = [
    { label: "Active Appointments", value: appointmentData.length.toString(), icon: "📅" },
    { label: "Medical Records", value: recordData.length.toString(), icon: "📋" },
    { label: "Connected Providers", value: "4", icon: "🏥" },
    { label: "Health Score", value: "92%", icon: "💚" },
  ];

  const quickActions = [
    { icon: "📅", label: "Book Appointment", href: "/appointments" },
    { icon: "📋", label: "View Records", href: "/records" },
    { icon: "👤", label: "My Profile", href: "/profile" },
    { icon: "⚙️", label: "Settings", href: "/settings" },
  ];

  if (authLoading) {
    return (
      <DashboardLayout userName="" userRole="patient">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-body-md text-slate">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userName={user?.firstName || "User"} userRole={(user?.role === 'doctor' ? 'provider' : user?.role) || "patient"}>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-heading-lg font-bold text-ink mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-body-md text-slate">
          {appointmentData.length} upcoming appointments and stay on top of your health records.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} variant="base" padding="lg" className="flex flex-col items-center text-center">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <p className="text-body-sm text-slate mb-1">{stat.label}</p>
            <p className="text-heading-sm font-bold text-ink">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-heading-sm font-bold text-ink mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <Button
              key={idx}
              variant="secondary"
              size="md"
              fullWidth
              className="justify-center gap-2"
            >
              <span className="text-xl">{action.icon}</span>
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <Card variant="base" padding="lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-heading-sm font-bold text-ink">Upcoming Appointments</h2>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {appointmentData.length > 0 ? (
                  appointmentData.map((appointment, idx) => (
                    <div
                      key={idx}
                      className="pb-4 border-b border-hairline last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-body-md font-semibold text-ink">
                            {appointment.title}
                          </h3>
                          <p className="text-body-sm text-slate mt-1">
                            {appointment.provider?.name || "Dr. Unknown"}
                          </p>
                          <p className="text-body-sm text-slate mt-1">
                            📅 {formatDate(appointment.appointmentDate)} at {appointment.appointmentTime}
                          </p>
                        </div>
                        <Badge
                          variant={appointment.status === "scheduled" ? "success" : "warning"}
                          size="sm"
                        >
                          {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-body-sm text-slate text-center py-4">
                    No upcoming appointments. <a href="/appointments" className="text-primary font-semibold">Book one now</a>
                  </p>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Medical Records Summary */}
        <div>
          <Card variant="base" padding="lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-heading-sm font-bold text-ink">Recent Records</h2>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {recordData.length > 0 ? (
                  recordData.slice(0, 3).map((record, idx) => (
                    <div
                      key={idx}
                      className="pb-3 border-b border-hairline last:border-b-0 last:pb-0"
                    >
                      <p className="text-body-sm font-semibold text-ink">{record.title}</p>
                      <p className="text-caption text-slate mt-1">
                        {record.type} • {formatDate(record.uploadedAt)}
                      </p>
                      <p className="text-caption text-steel">{record.uploadedBy}</p>
                      <div className="mt-2">
                        <Badge variant="success" size="sm">
                          Available
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-body-sm text-slate text-center py-4">
                    No medical records yet. <a href="/records" className="text-primary font-semibold">Upload one now</a>
                  </p>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Health Insights */}
      <div className="mt-6">
        <Card variant="feature" padding="lg">
          <h2 className="text-heading-sm font-bold text-ink mb-4">Health Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-body-sm text-slate mb-2">Blood Pressure (Last 30 Days)</p>
              <p className="text-heading-sm font-bold text-ink">120/80 mmHg</p>
              <p className="text-body-sm text-success-text">✓ Normal range</p>
            </div>
            <div>
              <p className="text-body-sm text-slate mb-2">Weight Trend</p>
              <p className="text-heading-sm font-bold text-ink">-2.5 lbs</p>
              <p className="text-body-sm text-success-text">✓ Good progress</p>
            </div>
            <div>
              <p className="text-body-sm text-slate mb-2">Medication Adherence</p>
              <p className="text-heading-sm font-bold text-ink">98%</p>
              <p className="text-body-sm text-success-text">✓ Excellent compliance</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
