/**
 * FeaturesPage
 * MediFlow - Detailed features page with feature cards and comparison table
 */

import React from "react";
import HomeLayout from "@/layouts/HomeLayout";
import Button from "@/components/Button";
import { Card, CardTitle, CardDescription } from "@/components/Card";
import Badge from "@/components/Badge";

export default function FeaturesPage() {
  const allFeatures = [
    {
      icon: "📋",
      title: "Unified Medical Records",
      description:
        "Centralize all health data from multiple providers in one secure location. Access lab results, imaging, medications, and diagnoses instantly.",
      details:
        "Automatically aggregates records from hospitals, clinics, and specialists. HIPAA-compliant encryption keeps your data secure.",
    },
    {
      icon: "🤝",
      title: "Smart Provider Coordination",
      description:
        "Enable seamless communication between your healthcare providers. Eliminate duplicate tests and conflicting prescriptions.",
      details:
        "Secure messaging, automatic record sharing, and provider collaboration tools ensure coordinated care.",
    },
    {
      icon: "🏥",
      title: "Healthcare Navigation",
      description:
        "Find the right hospitals, specialists, and diagnostic centers with real-time availability and ratings.",
      details:
        "AI-powered recommendations based on your condition, insurance, and location. Check wait times and book appointments instantly.",
    },
    {
      icon: "📱",
      title: "Mobile-First Platform",
      description: "Manage your health from anywhere. Full functionality on iOS, Android, and web.",
      details:
        "Responsive design optimized for mobile. Offline access to critical documents. Biometric authentication for security.",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description:
        "Never miss an appointment, prescription refill, or lab result. Customizable alerts and reminders.",
      details:
        "Get notified for upcoming appointments, medication reminders, lab results, and appointment confirmations.",
    },
    {
      icon: "📊",
      title: "Health Analytics",
      description:
        "Visualize your health trends with interactive charts and reports. Track progress towards health goals.",
      details:
        "Blood pressure trends, weight tracking, medication adherence, and personalized health recommendations.",
    },
    {
      icon: "💊",
      title: "Medication Management",
      description: "Track all prescriptions, refills, and interactions in one place.",
      details:
        "Automatic drug interaction checking, refill reminders, insurance coverage information, and dosage tracking.",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family Health Hub",
      description: "Manage health records for your entire family. Simple role-based access control.",
      details: "Add family members, manage permissions, and coordinate care for elderly parents or children.",
    },
    {
      icon: "🔐",
      title: "Enterprise Security",
      description: "Bank-level security with HIPAA compliance and regular security audits.",
      details: "256-bit encryption, multi-factor authentication, role-based access, and comprehensive audit logs.",
    },
  ];

  const comparisonFeatures = [
    { name: "Unified Records", mediflow: true, others: false },
    { name: "Provider Coordination", mediflow: true, others: false },
    { name: "Mobile App", mediflow: true, others: true },
    { name: "Appointment Booking", mediflow: true, others: true },
    { name: "Prescription Refills", mediflow: true, others: true },
    { name: "Health Analytics", mediflow: true, others: false },
    { name: "Family Health Hub", mediflow: true, others: false },
    { name: "HIPAA Compliant", mediflow: true, others: true },
    { name: "AI Recommendations", mediflow: true, others: false },
    { name: "Insurance Integration", mediflow: true, others: false },
  ];

  return (
    <HomeLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent pt-16 md:pt-24 pb-12 md:pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="info" size="md" className="justify-center mb-6">
            ✨ Complete Healthcare Platform
          </Badge>

          <h1 className="text-heading-lg font-bold text-ink mb-4">
            Everything You Need for Better Healthcare
          </h1>
          <p className="text-heading-sm text-slate">
            Comprehensive features designed to coordinate your care, manage records, and improve health outcomes.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature, idx) => (
              <Card key={idx} variant="base" padding="lg" className="flex flex-col">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <CardTitle className="text-card-title">{feature.title}</CardTitle>
                <CardDescription className="mb-4">{feature.description}</CardDescription>
                <p className="text-body-sm text-steel mt-auto">{feature.details}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 px-6 bg-surface-soft">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-ink mb-4">How MediFlow Compares</h2>
            <p className="text-heading-sm text-slate">
              See why MediFlow is the most comprehensive healthcare platform
            </p>
          </div>

          <Card variant="base" padding="lg" className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="text-left py-4 px-4 font-semibold text-ink">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-teal">MediFlow</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate">Other Platforms</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((item, idx) => (
                  <tr key={idx} className="border-b border-hairline hover:bg-canvas">
                    <td className="py-4 px-4 text-body-md text-ink">{item.name}</td>
                    <td className="text-center py-4 px-4">
                      {item.mediflow ? (
                        <span className="text-2xl">✓</span>
                      ) : (
                        <span className="text-slate">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {item.others ? (
                        <span className="text-2xl">✓</span>
                      ) : (
                        <span className="text-slate">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-ink mb-4">Integrations & Partnerships</h2>
            <p className="text-heading-sm text-slate">
              Connect with your favorite health and wellness apps
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "🏥 Epic EHR",
              "💊 Pharmacy",
              "⌚ Wearables",
              "🏋️ Fitness",
              "📱 Apple Health",
              "🔐 Insurance",
            ].map((integration, idx) => (
              <Card key={idx} variant="feature" padding="md" className="text-center flex items-center justify-center min-h-32">
                <div className="text-body-md font-semibold text-ink">{integration}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 bg-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-heading-lg font-bold mb-4">Start Using MediFlow Today</h2>
          <p className="text-heading-sm opacity-90 mb-8">
            Experience better healthcare coordination with all these features included
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}
