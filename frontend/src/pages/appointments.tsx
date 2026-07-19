/**
 * AppointmentsPage
 * MediFlow - Appointments management with scheduling, filtering, and history
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/DashboardLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { SearchPill } from "@/components/Input";
import Badge from "@/components/Badge";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/helpers";
import Loading from "@/components/Loading";

interface Appointment {
  id: string;
  title: string;
  doctor?: string;
  provider?: { name: string };
  hospital?: string;
  location?: string;
  specialty?: string;
  appointmentDate: string;
  appointmentTime: string;
  date?: string;
  time?: string;
  duration?: string;
  type?: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  reason?: string;
  notes?: string;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.doctor?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleScheduleNew = () => {
    router.push("/providers");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-heading-lg font-bold text-ink">Appointments</h1>
          <p className="text-body-md text-slate mt-2">
            Manage your consultations, schedule new appointments, and view your history
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Search and Filter */}
            <Card variant="base" padding="lg">
              <div className="space-y-4">
                <SearchPill
                  placeholder="Search appointments, doctors..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
                <div className="flex gap-2 flex-wrap">
                  {["all", "confirmed", "pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded-full text-body-sm font-medium transition-colors ${
                        filterStatus === status
                          ? "bg-primary text-white"
                          : "bg-surface text-charcoal hover:bg-hairline"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Upcoming Appointments */}
            {filteredAppointments.length > 0 ? (
              <div>
                <h2 className="text-heading-sm font-bold text-ink mb-4">Upcoming Appointments</h2>
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <Card
                      key={appointment.id}
                      variant="base"
                      padding="lg"
                      className="hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-card-title font-semibold text-ink">
                            {appointment.title}
                          </h3>
                          <p className="text-body-sm text-slate mt-1">
                            {appointment.doctor || appointment.provider?.name || "Dr. Unknown"}
                          </p>
                          {appointment.specialty && (
                            <p className="text-body-sm text-slate">
                              {appointment.specialty}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant={
                            appointment.status === "confirmed"
                              ? "success"
                              : appointment.status === "pending"
                              ? "warning"
                              : "info"
                          }
                          size="md"
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 pb-4 border-t border-hairline pt-4">
                        <div>
                          <p className="text-caption text-slate">Date & Time</p>
                          <p className="text-body-sm font-semibold text-ink">
                            {formatDate(appointment.appointmentDate)} at {appointment.appointmentTime}
                          </p>
                        </div>
                        {appointment.hospital && (
                          <div>
                            <p className="text-caption text-slate">Hospital</p>
                            <p className="text-body-sm font-semibold text-ink">
                              {appointment.hospital}
                            </p>
                          </div>
                        )}
                        {appointment.type && (
                          <div>
                            <p className="text-caption text-slate">Type</p>
                            <Badge variant="info" size="sm">
                              {appointment.type}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card variant="feature" padding="lg" className="text-center">
                <p className="text-body-md text-slate">
                  No upcoming appointments.{" "}
                  <a
                    href="#"
                    className="text-primary font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScheduleNew();
                    }}
                  >
                    Schedule one now
                  </a>
                </p>
              </Card>
            )}

            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <div>
                <h2 className="text-heading-sm font-bold text-ink mb-4">Past Appointments</h2>
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <Card key={appointment.id} variant="base" padding="lg">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="text-card-title font-semibold text-ink">
                            {appointment.title}
                          </h3>
                          <p className="text-body-sm text-slate mt-1">
                            {appointment.doctor || appointment.provider?.name || "Dr. Unknown"}
                          </p>
                        </div>
                        <Badge variant="info" size="md">
                          Completed
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 pb-4 border-t border-hairline pt-4">
                        <div>
                          <p className="text-caption text-slate">Date & Time</p>
                          <p className="text-body-sm font-semibold text-ink">
                            {formatDate(appointment.appointmentDate)} at {appointment.appointmentTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          View Records
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule Appointment Widget */}
            <Card
              variant="feature"
              padding="lg"
              className="bg-gradient-to-br from-blue-50 to-primary/5 border-teal/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-card-title font-bold text-ink">Need to Schedule an Appointment?</h3>
                  <p className="text-body-sm text-slate mt-2">
                    Browse available doctors and book directly through MediFlow
                  </p>
                </div>
                <Button variant="primary" size="md" onClick={handleScheduleNew}>
                  Browse Doctors
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
