/**
 * PrescriptionManagementPage
 * MediFlow - Manage prescriptions, refills, and request renewals
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardHeader, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { useAuth } from '@/hooks/useAuth';

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  quantity: string;
  prescribedBy: string;
  dateIssued: string;
  expiryDate: string;
  refillsRemaining: number;
  status: 'active' | 'expired' | 'refill-requested';
  pharmacy?: string;
}

const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: '1',
    medication: 'Lisinopril',
    dosage: '10mg',
    quantity: '30 tablets',
    prescribedBy: 'Dr. Sarah Johnson',
    dateIssued: '2024-01-01',
    expiryDate: '2025-01-01',
    refillsRemaining: 5,
    status: 'active',
    pharmacy: 'Main Street Pharmacy',
  },
  {
    id: '2',
    medication: 'Metformin',
    dosage: '500mg',
    quantity: '60 tablets',
    prescribedBy: 'Dr. Michael Chen',
    dateIssued: '2023-12-15',
    expiryDate: '2024-12-15',
    refillsRemaining: 2,
    status: 'active',
    pharmacy: 'City Pharmacy',
  },
  {
    id: '3',
    medication: 'Aspirin',
    dosage: '100mg',
    quantity: '30 tablets',
    prescribedBy: 'Dr. Emily Rodriguez',
    dateIssued: '2023-06-01',
    expiryDate: '2024-06-01',
    refillsRemaining: 0,
    status: 'expired',
  },
];

export default function PrescriptionManagementPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'refill-requested':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRequestRefill = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowRefillModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
          <p className="mt-1 text-gray-600">Manage your prescriptions and request refills</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Active Prescriptions</p>
              <p className="text-3xl font-bold text-green-600">
                {prescriptions.filter((p) => p.status === 'active').length}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Refills Remaining</p>
              <p className="text-3xl font-bold text-blue-600">
                {prescriptions.reduce((sum, p) => sum + p.refillsRemaining, 0)}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Expired</p>
              <p className="text-3xl font-bold text-red-600">
                {prescriptions.filter((p) => p.status === 'expired').length}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Prescriptions List */}
        <Card>
          <CardHeader title="Your Prescriptions" />
          <CardBody className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{prescription.medication}</h3>
                      <Badge variant={prescription.status === 'active' ? 'success' : 'info'}>
                        {prescription.status === 'active' && 'Active'}
                        {prescription.status === 'expired' && 'Expired'}
                        {prescription.status === 'refill-requested' && 'Refill Requested'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{prescription.dosage} - {prescription.quantity}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">Prescribed By</p>
                    <p className="font-medium text-gray-900">{prescription.prescribedBy}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Issued</p>
                    <p className="font-medium text-gray-900">{prescription.dateIssued}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expires</p>
                    <p className="font-medium text-gray-900">{prescription.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Refills Left</p>
                    <p className={`font-medium ${prescription.refillsRemaining === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                      {prescription.refillsRemaining}
                    </p>
                  </div>
                </div>

                {prescription.pharmacy && (
                  <div className="mb-3 p-3 bg-blue-50 rounded">
                    <p className="text-sm">
                      <span className="text-gray-600">Pharmacy: </span>
                      <span className="font-medium text-gray-900">{prescription.pharmacy}</span>
                    </p>
                  </div>
                )}

                {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleRequestRefill(prescription)}
                    >
                      Request Refill
                    </Button>
                    <Button variant="tertiary" size="sm">
                      Transfer to Pharmacy
                    </Button>
                  </div>
                )}

                {prescription.status === 'expired' && (
                  <div className="p-3 bg-red-50 rounded">
                    <p className="text-sm text-red-800">
                      This prescription has expired. Contact your doctor for a new prescription.
                    </p>
                  </div>
                )}

                {prescription.status === 'refill-requested' && (
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">Refill request submitted. Awaiting approval.</p>
                  </div>
                )}
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Refill Modal */}
        {showRefillModal && selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader title="Request Refill" />
              <CardBody className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900">{selectedPrescription.medication}</p>
                  <p className="text-sm text-gray-600">{selectedPrescription.dosage}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Send to Pharmacy
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Main Street Pharmacy</option>
                    <option>City Pharmacy</option>
                    <option>24-Hour Pharmacy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any special instructions..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </CardBody>
              <div className="bg-gray-50 border-t border-gray-200 p-4 flex gap-2 justify-end">
                <Button variant="secondary" onClick={() => setShowRefillModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setShowRefillModal(false)}>
                  Request Refill
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
