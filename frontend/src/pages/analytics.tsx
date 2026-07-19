/**
 * AnalyticsPage
 * MediFlow - Hospital and provider analytics dashboard
 * Shows metrics: missed follow-ups, appointment bottlenecks, patient compliance, treatment timelines
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import Card from '@/components/Card';
import { CardHeader, CardBody } from '@/components/Card';
import Badge from '@/components/Badge';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/Loading';

interface AnalyticsMetric {
  label: string;
  value: string | number;
  trend?: number;
  trendDirection?: 'up' | 'down';
  unit?: string;
}

interface HospitalStats {
  totalPatients: number;
  totalAppointments: number;
  missedFollowUpRate: number;
  patientComplianceRate: number;
  averageTreatmentDays: number;
  appointmentBottleneck: number;
}

// Mock analytics data
const MOCK_HOSPITAL_STATS: HospitalStats = {
  totalPatients: 2450,
  totalAppointments: 1890,
  missedFollowUpRate: 12.5,
  patientComplianceRate: 87.3,
  averageTreatmentDays: 42,
  appointmentBottleneck: 8.2,
};

interface DepartmentMetric {
  name: string;
  appointments: number;
  missedFollowUps: number;
  compliance: number;
  averageDays: number;
}

const MOCK_DEPARTMENT_METRICS: DepartmentMetric[] = [
  {
    name: 'Cardiology',
    appointments: 450,
    missedFollowUps: 32,
    compliance: 92.8,
    averageDays: 38,
  },
  {
    name: 'Neurology',
    appointments: 320,
    missedFollowUps: 28,
    compliance: 91.2,
    averageDays: 45,
  },
  {
    name: 'Orthopedics',
    appointments: 380,
    missedFollowUps: 45,
    compliance: 88.1,
    averageDays: 52,
  },
  {
    name: 'Dermatology',
    appointments: 280,
    missedFollowUps: 15,
    compliance: 94.6,
    averageDays: 28,
  },
  {
    name: 'General Practice',
    appointments: 460,
    missedFollowUps: 42,
    compliance: 81.5,
    averageDays: 35,
  },
];

export default function AnalyticsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'departments' | 'timeline'>('overview');
  const [hospitalStats, setHospitalStats] = useState<HospitalStats>(MOCK_HOSPITAL_STATS);
  const [departmentMetrics, setDepartmentMetrics] = useState<DepartmentMetric[]>(MOCK_DEPARTMENT_METRICS);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, router]);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'text-green-600';
    if (compliance >= 80) return 'text-blue-600';
    return 'text-orange-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Hospital-level metrics and performance indicators
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200">
          {(['overview', 'departments', 'timeline'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'departments' && 'By Department'}
              {tab === 'timeline' && 'Timeline Trends'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Total Patients */}
              <Card className="border-gray-200">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Patients</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {hospitalStats.totalPatients.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-3xl">👥</div>
                  </div>
                  <div className="mt-2 text-xs text-green-600">↑ 5% from last month</div>
                </CardBody>
              </Card>

              {/* Total Appointments */}
              <Card className="border-gray-200">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Appointments</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {hospitalStats.totalAppointments.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-3xl">📅</div>
                  </div>
                  <div className="mt-2 text-xs text-green-600">↑ 8% from last month</div>
                </CardBody>
              </Card>

              {/* Missed Follow-up Rate */}
              <Card className="border-gray-200">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Missed Follow-up Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {hospitalStats.missedFollowUpRate}%
                      </p>
                    </div>
                    <div className="text-3xl">⚠️</div>
                  </div>
                  <div className="mt-2 text-xs text-red-600">↓ 2% from last month</div>
                </CardBody>
              </Card>

              {/* Patient Compliance Rate */}
              <Card className="border-gray-200">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Patient Compliance Rate</p>
                      <p className="text-2xl font-bold text-green-600">
                        {hospitalStats.patientComplianceRate}%
                      </p>
                    </div>
                    <div className="text-3xl">✓</div>
                  </div>
                  <div className="mt-2 text-xs text-green-600">↑ 3% from last month</div>
                </CardBody>
              </Card>

              {/* Average Treatment Timeline */}
              <Card className="border-gray-200">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Treatment Timeline</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {hospitalStats.averageTreatmentDays} days
                      </p>
                    </div>
                    <div className="text-3xl">⏱️</div>
                  </div>
                  <div className="mt-2 text-xs text-orange-600">→ Stable from last month</div>
                </CardBody>
              </Card>

              {/* Appointment Bottleneck */}
              <Card className="border-gray-200">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Appointment Bottleneck</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {hospitalStats.appointmentBottleneck} hrs
                      </p>
                    </div>
                    <div className="text-3xl">🚦</div>
                  </div>
                  <div className="mt-2 text-xs text-green-600">↓ 1.5 hrs from last month</div>
                </CardBody>
              </Card>
            </div>

            {/* Key Insights */}
            <Card className="border-gray-200">
              <CardHeader title="Key Insights" />
              <CardBody className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <p className="font-semibold text-gray-900">Patient Compliance Trend</p>
                    <p className="text-sm text-gray-600">
                      87.3% of patients are following prescribed treatment plans, up 3% from last month.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <p className="font-semibold text-gray-900">Follow-up Effectiveness</p>
                    <p className="text-sm text-gray-600">
                      Missed follow-up rate decreased to 12.5%, indicating improved appointment tracking and reminders.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <p className="font-semibold text-gray-900">Appointment Efficiency</p>
                    <p className="text-sm text-gray-600">
                      Average bottleneck reduced to 8.2 hours. Consider load balancing across departments.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="space-y-4">
            <Card className="border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Appointments</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Missed Follow-ups</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Compliance Rate</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Avg Treatment Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentMetrics.map((dept) => (
                      <tr key={dept.name} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{dept.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{dept.appointments}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <span className="text-red-600 font-semibold">{dept.missedFollowUps}</span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Badge variant="success">
                            <span className={getComplianceColor(dept.compliance)}>
                              {dept.compliance}%
                            </span>
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{dept.averageDays} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader title="Treatment Timeline Trends" />
              <CardBody className="space-y-6">
                {/* Chart placeholder - in real app would use charts library */}
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                  <p className="text-gray-500">
                    [Chart visualization would appear here]
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average treatment timeline:</span>
                    <span className="font-semibold text-gray-900">42 days (↔ stable)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Fastest recovery:</span>
                    <span className="font-semibold text-green-600">Dermatology - 28 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Longest recovery:</span>
                    <span className="font-semibold text-orange-600">Orthopedics - 52 days</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-gray-200">
              <CardHeader title="Recommendations" />
              <CardBody className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Consider implementing automated reminders for follow-up appointments to reduce the missed follow-up rate further.
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900">
                    Patient compliance is strong at 87.3%. Continue current engagement strategies.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-900">
                    Appointment bottleneck of 8.2 hours can be improved by load balancing across peak hours.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
