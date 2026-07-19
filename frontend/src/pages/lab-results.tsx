/**
 * LabResultsPage
 * MediFlow - View, track, and manage laboratory test results
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import Card, { CardHeader, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { useAuth } from '@/hooks/useAuth';

interface LabResult {
  id: string;
  testName: string;
  date: string;
  facility: string;
  doctor: string;
  status: 'normal' | 'abnormal' | 'pending';
  results: { name: string; value: string; unit: string; normal: string; status: string }[];
}

const MOCK_RESULTS: LabResult[] = [
  {
    id: '1',
    testName: 'Complete Blood Count (CBC)',
    date: '2024-01-12',
    facility: 'City Diagnostic Lab',
    doctor: 'Dr. Sarah Johnson',
    status: 'normal',
    results: [
      { name: 'WBC', value: '7.2', unit: 'K/uL', normal: '4.5-11.0', status: 'normal' },
      { name: 'RBC', value: '4.8', unit: 'M/uL', normal: '4.5-5.5', status: 'normal' },
      { name: 'Hemoglobin', value: '13.8', unit: 'g/dL', normal: '13.5-17.5', status: 'normal' },
    ],
  },
  {
    id: '2',
    testName: 'Lipid Panel',
    date: '2024-01-08',
    facility: 'Metropolitan Hospital',
    doctor: 'Dr. Michael Chen',
    status: 'abnormal',
    results: [
      {
        name: 'Total Cholesterol',
        value: '215',
        unit: 'mg/dL',
        normal: '<200',
        status: 'abnormal',
      },
      { name: 'LDL', value: '140', unit: 'mg/dL', normal: '<100', status: 'abnormal' },
      { name: 'HDL', value: '35', unit: 'mg/dL', normal: '>40', status: 'abnormal' },
    ],
  },
  {
    id: '3',
    testName: 'Thyroid Function Test',
    date: '2024-01-15',
    facility: 'Quick Labs',
    doctor: 'Dr. Emily Rodriguez',
    status: 'pending',
    results: [],
  },
];

export default function LabResultsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [results, setResults] = useState<LabResult[]>(MOCK_RESULTS);
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'abnormal':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getValueStatusColor = (status: string) => {
    return status === 'abnormal' ? 'text-red-600 font-semibold' : 'text-green-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lab Results</h1>
          <p className="mt-1 text-gray-600">Track and view your laboratory test results</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Total Tests</p>
              <p className="text-3xl font-bold text-gray-900">{results.length}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Normal Results</p>
              <p className="text-3xl font-bold text-green-600">
                {results.filter((r) => r.status === 'normal').length}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Attention Needed</p>
              <p className="text-3xl font-bold text-red-600">
                {results.filter((r) => r.status === 'abnormal').length}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Results Timeline */}
        <Card>
          <CardHeader title="Recent Lab Tests" />
          <CardBody className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedResult(result)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{result.testName}</h3>
                    <p className="text-sm text-gray-600">{result.date}</p>
                  </div>
                  <Badge variant={result.status === 'normal' ? 'success' : result.status === 'abnormal' ? 'info' : 'info'}>
                    {result.status === 'normal' && 'Normal'}
                    {result.status === 'abnormal' && 'Abnormal'}
                    {result.status === 'pending' && 'Pending'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Facility</p>
                    <p className="font-medium text-gray-900">{result.facility}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Doctor</p>
                    <p className="font-medium text-gray-900">{result.doctor}</p>
                  </div>
                </div>

                {result.results.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-600 mb-2">Preview:</div>
                    <div className="flex gap-4 flex-wrap">
                      {result.results.slice(0, 2).map((r) => (
                        <div key={r.name} className="text-xs">
                          <p className="text-gray-600">{r.name}</p>
                          <p className={getValueStatusColor(r.status)}>
                            {r.value} {r.unit}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button variant="tertiary" size="sm" className="mt-3">
                  View Details →
                </Button>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Detail Modal */}
        {selectedResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-96 overflow-y-auto">
              <CardHeader title={selectedResult.testName} />
              <CardBody className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">{selectedResult.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Facility</p>
                    <p className="font-semibold text-gray-900">{selectedResult.facility}</p>
                  </div>
                </div>

                {selectedResult.results.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Results</h4>
                    <div className="space-y-2">
                      {selectedResult.results.map((r) => (
                        <div key={r.name} className="p-3 bg-gray-50 rounded">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{r.name}</span>
                            <span className={`font-semibold ${getValueStatusColor(r.status)}`}>
                              {r.value} {r.unit}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">Normal: {r.normal}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardBody>
              <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
                <Button variant="secondary" onClick={() => setSelectedResult(null)}>
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
