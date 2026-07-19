/**
 * TelemedicineConsultationPage
 * MediFlow - Real-time video/chat consultation with healthcare providers
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import Card, { CardHeader, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/Loading';

interface ConsultationSession {
  id: string;
  provider: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  reason: string;
  type: 'video' | 'chat';
}

const MOCK_SESSIONS: ConsultationSession[] = [
  {
    id: '1',
    provider: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    time: '10:00 AM',
    duration: 30,
    status: 'scheduled',
    reason: 'Follow-up Cardiology Consultation',
    type: 'video',
  },
  {
    id: '2',
    provider: 'Dr. Michael Chen',
    date: '2024-01-10',
    time: '2:30 PM',
    duration: 45,
    status: 'completed',
    reason: 'Neurological Assessment',
    type: 'video',
  },
];

export default function TelemedicineConsultationPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<ConsultationSession[]>(MOCK_SESSIONS);
  const [selectedSession, setSelectedSession] = useState<ConsultationSession | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
    setIsLoading(false);
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Telemedicine</h1>
            <p className="mt-1 text-gray-600">Schedule and manage video/chat consultations</p>
          </div>
          <Button variant="primary" onClick={() => setShowScheduleModal(true)}>
            Schedule Consultation
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardBody>
              <div>
                <p className="text-sm text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.filter((s) => s.status === 'scheduled').length}
                </p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {sessions.filter((s) => s.status === 'completed').length}
                </p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div>
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(sessions.reduce((sum, s) => sum + s.duration, 0) / 60).toFixed(1)} hrs
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sessions List */}
        <Card>
          <CardHeader title="Consultation Sessions" />
          <CardBody>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{session.provider}</h3>
                        <Badge variant={session.type === 'video' ? 'success' : 'info'}>
                          {session.type === 'video' ? '📹 Video' : '💬 Chat'}
                        </Badge>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(session.status)}`}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{session.reason}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📅 {session.date}</span>
                        <span>🕐 {session.time}</span>
                        <span>⏱️ {session.duration} mins</span>
                      </div>
                    </div>
                    {session.status === 'scheduled' && (
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm">
                          Join
                        </Button>
                        <Button variant="secondary" size="sm">
                          Cancel
                        </Button>
                      </div>
                    )}
                    {session.status === 'completed' && (
                      <Button variant="tertiary" size="sm">
                        View Recording
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Schedule Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader title="Schedule Consultation" />
              <CardBody className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Provider
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Dr. Sarah Johnson - Cardiology</option>
                    <option>Dr. Michael Chen - Neurology</option>
                    <option>Dr. Emily Rodriguez - Orthopedics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consultation Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Video Call</option>
                    <option>Chat Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Consultation
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your symptoms or concerns..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </CardBody>
              <div className="bg-gray-50 border-t border-gray-200 p-4 flex gap-2 justify-end rounded-b-lg">
                <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowScheduleModal(false);
                  }}
                >
                  Schedule
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
