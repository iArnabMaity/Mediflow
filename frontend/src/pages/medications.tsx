/**
 * MedicationTrackerPage
 * MediFlow - Track active medications, dosage schedules, and interactions
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import Card, { CardHeader, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { useAuth } from '@/hooks/useAuth';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  reason: string;
  status: 'active' | 'completed' | 'paused';
  nextDue?: string;
  sideEffects?: string[];
}

const MOCK_MEDICATIONS: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2023-06-15',
    prescribedBy: 'Dr. Sarah Johnson',
    reason: 'Hypertension management',
    status: 'active',
    nextDue: '2024-01-15',
    sideEffects: ['Dizziness (mild)', 'Dry cough'],
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily with meals',
    startDate: '2023-08-20',
    prescribedBy: 'Dr. Michael Chen',
    reason: 'Blood sugar control',
    status: 'active',
    nextDue: '2024-01-18',
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    startDate: '2023-05-10',
    endDate: '2024-01-10',
    prescribedBy: 'Dr. Sarah Johnson',
    reason: 'Cholesterol management',
    status: 'completed',
  },
];

export default function MedicationTrackerPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDICATIONS);
  const [showAddModal, setShowAddModal] = useState(false);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '💊';
      case 'completed':
        return '✓';
      case 'paused':
        return '⏸️';
      default:
        return '📋';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medication Tracker</h1>
            <p className="mt-1 text-gray-600">Manage your medications and track adherence</p>
          </div>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Medication
          </Button>
        </div>

        {/* Active Medications Count */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Active Medications</p>
              <p className="text-3xl font-bold text-blue-600">
                {medications.filter((m) => m.status === 'active').length}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Due Today</p>
              <p className="text-3xl font-bold text-orange-600">2</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Adherence Rate</p>
              <p className="text-3xl font-bold text-green-600">94%</p>
            </CardBody>
          </Card>
        </div>

        {/* Medications List */}
        <Card>
          <CardHeader title="Your Medications" />
          <CardBody className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getStatusIcon(med.status)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{med.name}</h3>
                        <p className="text-sm text-gray-600">{med.dosage}</p>
                      </div>
                      <Badge variant={med.status === 'active' ? 'success' : 'info'}>
                        {med.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Frequency</p>
                        <p className="font-medium text-gray-900">{med.frequency}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-medium text-gray-900">{med.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Prescribed By</p>
                        <p className="font-medium text-gray-900">{med.prescribedBy}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Reason</p>
                        <p className="font-medium text-gray-900">{med.reason}</p>
                      </div>
                    </div>

                    {med.sideEffects && med.sideEffects.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Reported Side Effects:</p>
                        <div className="flex flex-wrap gap-2">
                          {med.sideEffects.map((effect) => (
                            <Badge key={effect} variant="info">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {med.status === 'active' && (
                    <div className="flex gap-2">
                      <Button variant="primary" size="sm">
                        Mark Taken
                      </Button>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Medication Interactions Warning */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader title="Interaction Alert" />
          <CardBody>
            <p className="text-sm text-orange-800">
              ⚠️ Potential interaction detected between Lisinopril and Metformin. Please consult your
              doctor if you experience unusual symptoms.
            </p>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
