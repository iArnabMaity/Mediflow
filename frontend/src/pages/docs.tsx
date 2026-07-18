/**
 * DocsIndexPage
 * MediFlow - Documentation and getting started guide
 * Features: Sidebar navigation, main content area, table of contents, search
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import HomeLayout from '@/layouts/HomeLayout';
import { Card, CardBody } from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
  category: 'getting-started' | 'features' | 'api' | 'guides' | 'faq';
  subSections?: { id: string; title: string }[];
}

const DOC_SECTIONS: DocSection[] = [
  {
    id: 'getting-started-intro',
    title: 'Getting Started',
    category: 'getting-started',
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome to MediFlow</h2>
          <p className="mb-4">
            MediFlow is a comprehensive healthcare management platform designed to connect patients
            with quality healthcare providers. Whether you're looking to book an appointment, manage
            your medical records, or monitor your health, MediFlow makes it simple and secure.
          </p>

          <h3 className="text-xl font-semibold mb-3">What is MediFlow?</h3>
          <p className="mb-4">MediFlow enables:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Easy appointment booking with healthcare providers</li>
            <li>Secure storage and management of medical records</li>
            <li>Real-time consultation capabilities</li>
            <li>Prescription management and medication tracking</li>
            <li>Health insights and analytics</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Who Can Use MediFlow?</h3>
          <p className="mb-4">MediFlow is designed for:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>
              <strong>Patients:</strong> Manage your health and appointments
            </li>
            <li>
              <strong>Healthcare Providers:</strong> Manage patient schedules and records
            </li>
            <li>
              <strong>Administrators:</strong> Monitor platform operations and analytics
            </li>
          </ul>
        </div>
      </div>
    ),
    subSections: [
      { id: 'intro', title: 'Introduction' },
      { id: 'features', title: 'Key Features' },
      { id: 'target-users', title: 'Target Users' },
    ],
  },
  {
    id: 'getting-started-signup',
    title: 'Creating Your Account',
    category: 'getting-started',
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Create Your MediFlow Account</h2>

          <h3 className="text-xl font-semibold mb-3">Step-by-Step Guide</h3>
          <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
            <li>Click the "Sign Up" button on the home page</li>
            <li>Select your role (Patient, Provider, or Admin)</li>
            <li>Enter your email address</li>
            <li>Create a strong password (minimum 8 characters)</li>
            <li>Fill in your personal information</li>
            <li>Accept the terms and conditions</li>
            <li>Click "Create Account"</li>
          </ol>

          <h3 className="text-xl font-semibold mb-3">Password Requirements</h3>
          <p className="mb-4">Your password must contain:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter (A-Z)</li>
            <li>At least one lowercase letter (a-z)</li>
            <li>At least one number (0-9)</li>
            <li>At least one special character (!@#$%^&*)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Email Verification</h3>
          <p className="mb-4">
            After signing up, you'll receive a verification email. Click the link to verify your
            email address and activate your account.
          </p>
        </div>
      </div>
    ),
    subSections: [
      { id: 'signup-steps', title: 'Signup Steps' },
      { id: 'password-requirements', title: 'Password Requirements' },
      { id: 'email-verification', title: 'Email Verification' },
    ],
  },
  {
    id: 'features-appointments',
    title: 'Managing Appointments',
    category: 'features',
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Managing Your Appointments</h2>

          <h3 className="text-xl font-semibold mb-3">Book an Appointment</h3>
          <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
            <li>Go to "Find a Provider" from your dashboard</li>
            <li>Search by provider name or specialization</li>
            <li>Filter by rating, availability, or location</li>
            <li>Click "Book Appointment" on your chosen provider</li>
            <li>Select your preferred date and time</li>
            <li>Describe your symptoms or reason for visit</li>
            <li>Confirm the booking</li>
          </ol>

          <h3 className="text-xl font-semibold mb-3">Reschedule an Appointment</h3>
          <p className="mb-4">To reschedule an existing appointment:</p>
          <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
            <li>Go to "My Appointments"</li>
            <li>Find the appointment you want to reschedule</li>
            <li>Click the "Reschedule" button</li>
            <li>Select a new date and time</li>
            <li>Confirm the changes</li>
          </ol>

          <h3 className="text-xl font-semibold mb-3">Cancel an Appointment</h3>
          <p className="mb-4">
            To cancel an appointment, go to "My Appointments", find the appointment, and click
            "Cancel". Please note that cancellations should be made at least 24 hours before the
            appointment.
          </p>
        </div>
      </div>
    ),
    subSections: [
      { id: 'booking', title: 'Book Appointment' },
      { id: 'reschedule', title: 'Reschedule' },
      { id: 'cancel', title: 'Cancel' },
    ],
  },
  {
    id: 'features-records',
    title: 'Medical Records',
    category: 'features',
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Medical Records</h2>

          <h3 className="text-xl font-semibold mb-3">Viewing Your Records</h3>
          <p className="mb-4">Access your medical records from the "Medical Records" section of your dashboard. You can view:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Prescriptions</li>
            <li>Diagnoses</li>
            <li>Lab reports</li>
            <li>Imaging results</li>
            <li>Vaccination records</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Uploading Records</h3>
          <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
            <li>Go to "Medical Records"</li>
            <li>Click "Upload New Record"</li>
            <li>Select the record type</li>
            <li>Add a title and description</li>
            <li>Upload the file or take a photo</li>
            <li>Click "Save"</li>
          </ol>

          <h3 className="text-xl font-semibold mb-3">Supported File Types</h3>
          <p className="mb-4">We support PDF, JPG, PNG, and DOC files. Maximum file size is 10 MB.</p>
        </div>
      </div>
    ),
    subSections: [
      { id: 'viewing-records', title: 'View Records' },
      { id: 'uploading', title: 'Upload Records' },
      { id: 'file-types', title: 'File Types' },
    ],
  },
  {
    id: 'api-overview',
    title: 'API Overview',
    category: 'api',
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">MediFlow API</h2>

          <h3 className="text-xl font-semibold mb-3">API Base URL</h3>
          <code className="bg-gray-100 p-2 rounded block mb-4">https://api.mediflow.com/v1</code>

          <h3 className="text-xl font-semibold mb-3">Authentication</h3>
          <p className="mb-4">
            All API requests require authentication using Bearer tokens. Include your token in the
            Authorization header:
          </p>
          <code className="bg-gray-100 p-2 rounded block mb-4">
            Authorization: Bearer YOUR_TOKEN
          </code>

          <h3 className="text-xl font-semibold mb-3">Common Endpoints</h3>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>
              <code>POST /auth/login</code> - User login
            </li>
            <li>
              <code>POST /auth/signup</code> - User registration
            </li>
            <li>
              <code>GET /appointments</code> - Get user appointments
            </li>
            <li>
              <code>POST /appointments</code> - Create appointment
            </li>
            <li>
              <code>GET /providers</code> - Search providers
            </li>
            <li>
              <code>GET /records</code> - Get medical records
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Error Handling</h3>
          <p className="mb-4">
            The API returns standard HTTP status codes. Error responses include a message and error
            code for debugging.
          </p>
        </div>
      </div>
    ),
    subSections: [
      { id: 'base-url', title: 'Base URL' },
      { id: 'authentication', title: 'Authentication' },
      { id: 'endpoints', title: 'Endpoints' },
      { id: 'errors', title: 'Error Handling' },
    ],
  },
  {
    id: 'guides-privacy',
    title: 'Privacy & Security',
    category: 'guides',
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>

          <h3 className="text-xl font-semibold mb-3">Data Security</h3>
          <p className="mb-4">MediFlow uses industry-standard encryption to protect your data:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>End-to-end encryption for all communications</li>
            <li>256-bit SSL/TLS encryption for data in transit</li>
            <li>AES-256 encryption for data at rest</li>
            <li>Regular security audits and penetration testing</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Your Privacy</h3>
          <p className="mb-4">We're committed to protecting your privacy:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>We never sell your personal data</li>
            <li>We follow all HIPAA and GDPR regulations</li>
            <li>You can control who sees your medical records</li>
            <li>You can delete your account and data anytime</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Two-Factor Authentication</h3>
          <p className="mb-4">
            Enable two-factor authentication in your settings for additional security. You'll
            receive a code on your phone when logging in from a new device.
          </p>
        </div>
      </div>
    ),
    subSections: [
      { id: 'security', title: 'Data Security' },
      { id: 'privacy', title: 'Privacy' },
      { id: '2fa', title: 'Two-Factor Auth' },
    ],
  },
  {
    id: 'faq-general',
    title: 'Frequently Asked Questions',
    category: 'faq',
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold mb-3">
            Q: Is MediFlow HIPAA compliant?
          </h3>
          <p className="mb-4">
            Yes, MediFlow is fully HIPAA compliant and meets all healthcare data protection
            requirements.
          </p>

          <h3 className="text-lg font-semibold mb-3">Q: Can I access MediFlow on mobile?</h3>
          <p className="mb-4">
            Yes, MediFlow is fully responsive and works on all devices including smartphones and
            tablets.
          </p>

          <h3 className="text-lg font-semibold mb-3">Q: How do I change my password?</h3>
          <p className="mb-4">
            Go to Settings → Account → Change Password and follow the prompts.
          </p>

          <h3 className="text-lg font-semibold mb-3">
            Q: Can I share my records with my provider?
          </h3>
          <p className="mb-4">
            Yes, you can grant access to your medical records to specific providers or share
            individual records.
          </p>

          <h3 className="text-lg font-semibold mb-3">
            Q: What if I forget my password?
          </h3>
          <p className="mb-4">
            Click "Forgot Password" on the login page and follow the instructions sent to your
            email.
          </p>

          <h3 className="text-lg font-semibold mb-3">
            Q: Is there customer support available?
          </h3>
          <p className="mb-4">Yes, our support team is available 24/7 via email, chat, and phone.</p>
        </div>
      </div>
    ),
    subSections: [
      { id: 'hipaa', title: 'HIPAA Compliance' },
      { id: 'mobile', title: 'Mobile Access' },
      { id: 'support', title: 'Support' },
    ],
  },
];

const CATEGORIES = [
  { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
  { id: 'features', label: 'Features', icon: '✨' },
  { id: 'api', label: 'API', icon: '🔌' },
  { id: 'guides', label: 'Guides', icon: '📖' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
];

export default function DocsIndexPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<DocSection | null>(DOC_SECTIONS[0]);
  const [filteredSections, setFilteredSections] = useState<DocSection[]>(DOC_SECTIONS);

  // Filter sections based on search and category
  useEffect(() => {
    let filtered = DOC_SECTIONS;

    if (searchQuery) {
      filtered = filtered.filter(
        (section) => section.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((section) => section.category === selectedCategory);
    }

    setFilteredSections(filtered);

    // Update selected section if it's filtered out
    if (selectedSection && !filtered.find((s) => s.id === selectedSection.id)) {
      setSelectedSection(filtered[0] || null);
    }
  }, [searchQuery, selectedCategory]);

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
            <p className="mt-2 text-gray-600">Everything you need to know about MediFlow</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              {/* Search */}
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Categories
                </p>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === category.id ? null : category.id
                      )
                    }
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-900 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Sections List */}
              <div className="mt-8">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Pages
                </p>
                <div className="space-y-1">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedSection?.id === section.id
                          ? 'bg-blue-100 text-blue-900 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {selectedSection ? (
                <Card className="border-gray-200">
                  <CardBody className="prose prose-sm max-w-none">
                    {selectedSection.content}
                  </CardBody>
                </Card>
              ) : (
                <Card className="border-gray-200">
                  <CardBody className="text-center py-12">
                    <p className="text-gray-600">Select a section to view documentation</p>
                  </CardBody>
                </Card>
              )}
            </div>

            {/* Right Sidebar - Table of Contents */}
            <div className="lg:col-span-1">
              {selectedSection && selectedSection.subSections && (
                <div className="sticky top-8">
                  <Card className="border-gray-200">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">On this page</h3>
                      <div className="space-y-2">
                        {selectedSection.subSections.map((subsection) => (
                          <a
                            key={subsection.id}
                            href={`#${subsection.id}`}
                            className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {subsection.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Quick Links */}
                  <div className="mt-8 space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Quick Links
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push('/signup')}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push('/login')}
                      className="w-full"
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        const email = 'support@mediflow.com';
                        window.location.href = `mailto:${email}`;
                      }}
                      className="w-full"
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
