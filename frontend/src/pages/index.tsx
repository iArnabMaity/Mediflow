/**
 * HomePage
 * MediFlow - Landing page with hero, features, showcase, testimonials, and CTAs
 */

import React from "react";
import HomeLayout from "@/layouts/HomeLayout";
import Button from "@/components/Button";
import Card, { CardTitle, CardDescription } from "@/components/Card";
import Badge from "@/components/Badge";

export default function HomePage() {
  const features = [
    {
      icon: "📋",
      title: "Unified Medical Records",
      description:
        "Access all your health data in one secure place - lab results, prescriptions, and diagnoses from all providers.",
    },
    {
      icon: "🤝",
      title: "Smart Coordination",
      description:
        "Providers communicate seamlessly. No more duplicated tests or conflicting prescriptions.",
    },
    {
      icon: "🏥",
      title: "Healthcare Navigation",
      description:
        "Find the right hospitals, specialists, and diagnostic centers. Real-time appointment availability.",
    },
    {
      icon: "📱",
      title: "Mobile-First Access",
      description:
        "Check your health records, book appointments, and message providers from your phone anytime.",
    },
    {
      icon: "🔒",
      title: "HIPAA Compliant",
      description:
        "Your data is encrypted, secured, and accessible only to authorized providers and you.",
    },
    {
      icon: "⚡",
      title: "Real-Time Updates",
      description:
        "Get instant notifications for appointments, lab results, and prescription refills.",
    },
  ];

  const showcaseFeatures = [
    {
      color: "teal",
      title: "AI-Powered Insights",
      description: "Get smart health recommendations based on your entire medical history",
    },
    {
      color: "coral",
      title: "Emergency Ready",
      description: "Your complete medical history available instantly to emergency responders",
    },
    {
      color: "blue",
      title: "Insurance Integration",
      description: "Verify coverage, submit claims, and track reimbursements seamlessly",
    },
    {
      color: "purple",
      title: "Family Health Hub",
      description: "Manage health records for your entire family in one place",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      avatar: "SJ",
      text: "MediFlow helped me find the perfect specialist for my chronic condition. The coordination between my doctors is seamless!",
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Cardiologist",
      avatar: "RK",
      text: "As a provider, having instant access to patient histories reduces errors and improves care quality significantly.",
    },
    {
      name: "Michael Chen",
      role: "Senior Patient",
      avatar: "MC",
      text: "The simple interface makes it easy for me to manage my appointments and medications. My family can also help monitor my health.",
    },
  ];

  return (
    <HomeLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <Badge variant="info" size="md" className="justify-center mb-6">
              ✨ Now Available - Healthcare Coordination Reimagined
            </Badge>

            <h1 className="text-hero-display font-bold text-ink mb-6 leading-tight">
              Your Health,
              <br />
              <span className="text-teal">Perfectly Coordinated</span>
            </h1>

            <p className="text-heading-md text-slate max-w-2xl mx-auto mb-8">
              MediFlow connects you with your healthcare providers, medical records, and health
              insights in one secure platform. No more lost prescriptions or duplicate appointments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="primary" size="lg">
                Get Started Free
              </Button>
              <Button variant="secondary" size="lg">
                Watch Demo
              </Button>
            </div>

            <p className="text-body-sm text-slate mt-6">
              ✓ HIPAA Compliant • ✓ No Credit Card Required • ✓ 14-Day Free Trial
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-ink mb-4">
              Everything You Need to Stay Healthy
            </h2>
            <p className="text-heading-sm text-slate max-w-2xl mx-auto">
              MediFlow simplifies healthcare management with powerful tools designed for patients
              and providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                variant="feature"
                padding="lg"
                className="hover:shadow-elevation-2 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-heading-sm">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-16 md:py-24 px-6 bg-surface-soft">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-ink mb-4">
              Advanced Healthcare Features
            </h2>
            <p className="text-heading-sm text-slate max-w-2xl mx-auto">
              Discover what makes MediFlow the most trusted healthcare platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseFeatures.map((showcase, idx) => (
              <Card
                key={idx}
                variant="showcase"
                showcaseColor={showcase.color as any}
                padding="lg"
                className="flex flex-col justify-between min-h-48"
              >
                <div>
                  <h3 className="text-card-title font-semibold mb-2">{showcase.title}</h3>
                  <p className="text-body-sm opacity-90">{showcase.description}</p>
                </div>
                <div className="text-3xl mt-4">→</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg font-bold text-ink mb-4">
              Loved by Patients & Providers
            </h2>
            <p className="text-heading-sm text-slate max-w-2xl mx-auto">
              See why thousands of users trust MediFlow with their healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} variant="base" padding="lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal text-white rounded-full flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-body-sm text-slate">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-body-md text-charcoal italic">"{testimonial.text}"</p>
                <div className="text-coral mt-4">★★★★★</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 bg-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-heading-lg font-bold mb-4">Ready to Transform Your Healthcare?</h2>
          <p className="text-heading-sm opacity-90 mb-8">
            Join thousands of patients and providers using MediFlow to coordinate better care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100">
              Start Your Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-body-sm opacity-75 mt-6">
            No credit card required. 14 days free. Cancel anytime.
          </p>
        </div>
      </section>
    </HomeLayout>
  );
}
