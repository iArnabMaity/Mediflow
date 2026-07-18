/**
 * ProvidersPage
 * MediFlow - Search and discover healthcare providers
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardHeader, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Badge from '@/components/Badge';
import { useAuth } from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { useNotification } from '@/context/NotificationContext';
import Loading from '@/components/Loading';

interface Provider {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  hospital: string;
  experience: number;
  fee: number;
  availability: string[];
  avatar?: string;
}

const MOCK_PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    rating: 4.8,
    reviews: 247,
    hospital: 'Metropolitan Hospital',
    experience: 12,
    fee: 150,
    availability: ['Mon 10:00', 'Wed 14:00', 'Fri 09:00'],
    avatar: '👨‍⚕️',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    rating: 4.9,
    reviews: 189,
    hospital: 'City Medical Center',
    experience: 15,
    fee: 175,
    availability: ['Tue 11:00', 'Thu 15:00'],
    avatar: '👨‍⚕️',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Orthopedics',
    rating: 4.7,
    reviews: 156,
    hospital: 'Oak Ridge Hospital',
    experience: 10,
    fee: 160,
    availability: ['Mon 13:00', 'Wed 09:00', 'Fri 11:00'],
    avatar: '👩‍⚕️',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Dermatology',
    rating: 4.6,
    reviews: 203,
    hospital: 'Sunset Medical',
    experience: 8,
    fee: 140,
    availability: ['Tue 10:00', 'Thu 14:00', 'Sat 10:00'],
    avatar: '👨‍⚕️',
  },
];

const SPECIALIZATIONS = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'General Practice'];

export default function ProvidersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingReason, setBookingReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Filter providers
  useEffect(() => {
    let filtered = MOCK_PROVIDERS;

    if (selectedSpecialization !== 'All') {
      filtered = filtered.filter((p) => p.specialization === selectedSpecialization);
    }

    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    if (debouncedSearch) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          p.specialization.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    setFilteredProviders(filtered);
  }, [selectedSpecialization, minRating, debouncedSearch]);

  const handleBookAppointment = (provider: Provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedProvider || !bookingDate || !bookingTime) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    try {
      setIsLoading(true);
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showNotification(`Appointment booked with ${selectedProvider.name}`, 'success');
      setShowBookingModal(false);
      setBookingDate('');
      setBookingTime('');
      setBookingReason('');
    } catch (error) {
      showNotification('Failed to book appointment', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find a Provider</h1>
          <p className="mt-1 text-gray-600">
            Search and book appointments with qualified healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader title="Filters" />
              <CardBody className="space-y-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <Input
                    type="text"
                    placeholder="Provider name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <div className="space-y-2">
                    {SPECIALIZATIONS.map((spec) => (
                      <label key={spec} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="specialization"
                          checked={selectedSpecialization === spec}
                          onChange={() => setSelectedSpecialization(spec)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <div className="space-y-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">
                          {rating === 0 ? 'All ratings' : `${rating}+ stars`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialization('All');
                    setMinRating(0);
                  }}
                >
                  Clear Filters
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Provider List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredProviders.length}</span> providers
              </p>
            </div>

            {/* Provider Cards */}
            {filteredProviders.length === 0 ? (
              <Card className="border-gray-200">
                <CardBody className="text-center py-12">
                  <p className="text-lg text-gray-600">No providers found matching your criteria</p>
                </CardBody>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredProviders.map((provider) => (
                  <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                    <CardBody>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          {/* Avatar */}
                          <div className="text-4xl">{provider.avatar}</div>

                          {/* Provider Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg text-gray-900">{provider.name}</h3>
                              <Badge variant="success">{provider.specialization}</Badge>
                            </div>

                            <div className="space-y-1 text-sm text-gray-600">
                              <p>
                                {provider.rating}
                                {' '}
                                ⭐ ({provider.reviews} reviews)
                              </p>
                              <p>
                                {provider.experience}
                                {' '}
                                years experience
                              </p>
                              <p className="font-medium">{provider.hospital}</p>
                              <p>
                                Consultation fee: $
                                {provider.fee}
                              </p>
                            </div>

                            {/* Availability */}
                            <div className="mt-3 flex flex-wrap gap-2">
                              {provider.availability.map((slot) => (
                                <Badge key={slot} variant="info" size="sm">
                                  {slot}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Book Button */}
                        <Button
                          variant="primary"
                          onClick={() => handleBookAppointment(provider)}
                        >
                          Book Appointment
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader title={`Book Appointment with ${selectedProvider.name}`} />
            <CardBody className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <Input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <textarea
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  placeholder="Describe your symptoms or reason for visit..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </CardBody>
            <div className="bg-gray-50 border-t border-gray-200 p-4 flex gap-2 justify-end rounded-b-lg">
              <Button
                variant="secondary"
                onClick={() => setShowBookingModal(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmBooking}
                disabled={isLoading}
              >
                {isLoading ? 'Booking...' : 'Confirm'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
