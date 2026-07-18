/**
 * AppointmentsPage
 * MediFlow - Appointments management with scheduling, filtering, and history
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardHeader, CardBody, CardFooter, CardTitle } from "@/components/Card";
import Button from "@/components/Button";
import Input, { SearchPill } from "@/components/Input";
import Badge from "@/components/Badge";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { appointmentService } from "@/services/api";
import { useNotification } from "@/context/NotificationContext";
import { formatDate, formatTime } from "@/utils/helpers";
import Loading from "@/components/Loading";

interface Appointment {
  id: string;
  title: string;
  doctor: string;
  hospital: string;
  appointmentDate: string;
  appointmentTime: string;
  type: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  reason?: string;
  notes?: string;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await appointmentService.list({ limit: 50 });

        // Separate upcoming and past appointments
        const now = new Date();
        const upcoming = response.data.filter(
          (apt: Appointment) => new Date(apt.appointmentDate) >= now
        );
        const past = response.data.filter(
          (apt: Appointment) => new Date(apt.appointmentDate) < now
        );

        setAppointments(upcoming.sort((a: Appointment, b: Appointment) => 
          new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
        ));
        setPastAppointments(past.sort((a: Appointment, b: Appointment) => 
          new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
        ));
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        showNotification("Failed to load appointments", "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated, showNotification]);

  const handleReschedule = (appointmentId: string) => {
    router.push(`/appointments/${appointmentId}/reschedule`);
  };

  const handleCancel = async (appointmentId: string) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await appointmentService.cancel(appointmentId);
        setAppointments(appointments.filter((apt) => apt.id !== appointmentId));
        showNotification("Appointment cancelled successfully", "success");
      } catch (error) {
        showNotification("Failed to cancel appointment", "error");
      }
    }
  };

  const handleScheduleNew = () => {
    router.push("/appointments/new");
  };

  const filterAppointments = (appts: Appointment[]) => {
    return appts.filter((apt) => {
      const matchesStatus =
        filterStatus === "all" || apt.status === filterStatus;
      const matchesSearch =
        debouncedSearch === "" ||
        apt.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        apt.doctor.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        apt.hospital.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  const filteredUpcoming = filterAppointments(appointments);
  const filteredPast = filterAppointments(pastAppointments);
  const displayedAppointments =
    activeTab === "upcoming" ? filteredUpcoming : filteredPast;

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  };

  const statusBadgeVariant: Record<string, any> = {
    confirmed: "success",
    pending: "warning",
    cancelled: "error",
    completed: "info",
  };

  if (!isAuthenticated) {
    return <Loading />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="mt-1 text-gray-600">
              Schedule and manage your medical appointments
            </p>
          </div>
          <Button variant="primary" onClick={handleScheduleNew}>
            + Schedule Appointment
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center flex-wrap">
          <SearchPill
            placeholder="Search by doctor, hospital, or appointment type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2">
            {["all", "confirmed", "pending", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterStatus === status
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-3 font-medium transition-all border-b-2 ${
              activeTab === "upcoming"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Upcoming ({filteredUpcoming.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-3 font-medium transition-all border-b-2 ${
              activeTab === "past"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Past ({filteredPast.length})
          </button>
        </div>

        {/* Appointments List */}
        {isLoading ? (
          <Loading />
        ) : displayedAppointments.length === 0 ? (
          <Card>
            <CardBody className="py-12 text-center">
              <p className="text-gray-500">
                {activeTab === "upcoming"
                  ? "No upcoming appointments"
                  : "No past appointments"}
              </p>
              {activeTab === "upcoming" && (
                <Button
                  variant="primary"
                  onClick={handleScheduleNew}
                  className="mt-4"
                >
                  Schedule Your First Appointment
                </Button>
              )}
            </CardBody>
          </Card>
        ) : (
          <div className="grid gap-4">
            {displayedAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardBody className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.title}
                        </h3>
                        <Badge
                          variant={statusBadgeVariant[appointment.status]}
                          className={statusColors[appointment.status]}
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Doctor:</span> Dr.{" "}
                        {appointment.doctor}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Hospital:</span>{" "}
                        {appointment.hospital}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatDate(appointment.appointmentDate)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.appointmentTime}
                      </p>
                    </div>
                  </div>

                  {appointment.reason && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Reason:</span>{" "}
                        {appointment.reason}
                      </p>
                    </div>
                  )}

                  {appointment.notes && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm text-blue-900">
                        <span className="font-medium">Notes:</span>{" "}
                        {appointment.notes}
                      </p>
                    </div>
                  )}

                  {activeTab === "upcoming" && appointment.status !== "cancelled" && (
                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleReschedule(appointment.id)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="tertiary"
                        size="sm"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}


  return (
    <DashboardLayout userName="John Doe" userRole="patient">
      <div className="space-y-6">
        {/* Header */}
  return (
    <DashboardLayout userName={user?.firstName || "User"} userRole={user?.role || "patient"}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-heading-lg font-bold text-ink">My Appointments</h1>
          <Button variant="primary" size="md" onClick={handleScheduleNew}>
            + Schedule New
          </Button>
        </div>

        {/* Search and Filter */}
        <Card variant="base" padding="lg">
          <div className="space-y-4">
            <SearchPill
              placeholder="Search appointments, doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex gap-2 flex-wrap">
              {["all", "scheduled", "completed", "cancelled"].map((status) => (
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

        {/* Loading State */}
        {isLoading && (
          <Card variant="feature" padding="lg" className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-body-md text-slate">Loading appointments...</p>
          </Card>
        )}

        {!isLoading && (
          <>
            {/* Upcoming Appointments */}
            <div>
              <h2 className="text-heading-sm font-bold text-ink mb-4">Upcoming Appointments</h2>
              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <Card
                      key={appointment.id}
                      variant="base"
                      padding="lg"
                      className="hover:shadow-elevation-2 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-card-title font-semibold text-ink">
                            {appointment.title}
                          </h3>
                          <p className="text-body-sm text-slate mt-1">
                            {appointment.provider?.name || "Dr. Unknown"}
                          </p>
                          <p className="text-body-sm text-slate">
                            {appointment.provider?.hospital || "Healthcare Provider"}
                          </p>
                        </div>
                        <Badge
                          variant={appointment.status === "scheduled" ? "success" : "warning"}
                          size="md"
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-t border-hairline pt-4">
                        <div>
                          <p className="text-caption text-slate">Date & Time</p>
                          <p className="text-body-sm font-semibold text-ink">
                            📅 {formatDate(appointment.appointmentDate)}
                          </p>
                          <p className="text-body-sm font-semibold text-ink">
                            🕐 {appointment.appointmentTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-caption text-slate">Type</p>
                          <Badge variant="info" size="sm">
                            {appointment.appointmentType || "In-Person"}
                          </Badge>
                        </div>
                        <div className="flex items-end gap-2 col-span-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleReschedule(appointment.id)}
                          >
                            Reschedule
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
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

                    </p>
                  </Card>
                )}
              </div>
            </div>

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
                            {appointment.provider?.name || "Dr. Unknown"}
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

          <div className="space-y-4">
            <SearchPill
              placeholder="Search appointments, doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        <div>
          <h2 className="text-heading-sm font-bold text-ink mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  variant="base"
                  padding="lg"
                  className="hover:shadow-elevation-2 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-card-title font-semibold text-ink">
                        {appointment.title}
                      </h3>
                      <p className="text-body-sm text-slate mt-1">
                        {appointment.doctor} • {appointment.specialty}
                      </p>
                      <p className="text-body-sm text-slate">
                        {appointment.hospital} • {appointment.location}
                      </p>
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-t border-hairline pt-4">
                    <div>
                      <p className="text-caption text-slate">Date & Time</p>
                      <p className="text-body-sm font-semibold text-ink">
                        📅 {appointment.date}
                      </p>
                      <p className="text-body-sm font-semibold text-ink">🕐 {appointment.time}</p>
                    </div>
                    <div>
                      <p className="text-caption text-slate">Duration</p>
                      <p className="text-body-sm font-semibold text-ink">{appointment.duration}</p>
                    </div>
                    <div>
                      <p className="text-caption text-slate">Type</p>
                      <Badge variant="info" size="sm">
                        {appointment.type}
                      </Badge>
                    </div>
                    <div className="flex items-end gap-2">
                      <Button variant="secondary" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="ghost" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card variant="feature" padding="lg" className="text-center">
                <p className="text-body-md text-slate">No appointments found matching your search</p>
              </Card>
            )}
          </div>
        </div>

        {/* Past Appointments */}
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
                      {appointment.doctor} • {appointment.specialty}
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
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-caption text-slate">Notes</p>
                    <p className="text-body-sm text-charcoal">{appointment.notes}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    View Records
                  </Button>
                  <Button variant="ghost" size="sm">
                    Print Summary
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Schedule Appointment Widget */}
        <Card variant="feature" padding="lg" className="bg-gradient-to-br from-teal/5 to-primary/5 border-teal/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-title font-bold text-ink">Need to Schedule an Appointment?</h3>
              <p className="text-body-sm text-slate mt-2">
                Browse available doctors and book directly through MediFlow
              </p>
            </div>
            <Button variant="primary" size="md">
              Browse Doctors
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
