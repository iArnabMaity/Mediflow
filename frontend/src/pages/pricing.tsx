/**
 * PricingPage
 * MediFlow - Pricing tiers with comparison table and FAQ
 */

import React, { useState } from "react";
import HomeLayout from "@/layouts/HomeLayout";
import Button from "@/components/Button";
import { Card, CardTitle } from "@/components/Card";
import Badge from "@/components/Badge";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "For individuals exploring healthcare coordination",
      price: 0,
      yearlyPrice: 0,
      features: [
        "📋 Basic medical records",
        "1 connected provider",
        "Appointment reminders",
        "Basic health dashboard",
        "Mobile app access",
        "Email support",
      ],
      notIncluded: [
        "Provider coordination",
        "AI insights",
        "Family health hub",
        "Advanced analytics",
        "Priority support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      description: "For active patients managing multiple providers",
      price: 19,
      yearlyPrice: 190,
      features: [
        "✓ Unified medical records",
        "✓ Up to 5 connected providers",
        "✓ Smart notifications",
        "✓ Health analytics",
        "✓ Prescription management",
        "✓ Medication reminders",
        "✓ Family hub (2 members)",
        "✓ Priority email support",
        "✓ Mobile app + web",
      ],
      notIncluded: ["AI-powered insights", "Dedicated care coordinator", "Advanced integrations"],
      cta: "Start Pro Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For organizations and healthcare providers",
      price: "Custom",
      yearlyPrice: "Custom",
      features: [
        "✓ Unlimited medical records",
        "✓ Unlimited provider coordination",
        "✓ Advanced analytics & reporting",
        "✓ Full family health hub",
        "✓ AI-powered insights",
        "✓ Custom integrations",
        "✓ Dedicated account manager",
        "✓ 24/7 phone + email support",
        "✓ Custom SLA",
        "✓ HIPAA compliance audit",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  const comparisonItems = [
    { category: "Medical Records", items: ["Unified records storage", "Provider coordination", "Records history"] },
    { category: "Appointments", items: ["Booking", "Reminders", "Rescheduling"] },
    { category: "Medications", items: ["Tracking", "Refill reminders", "Interaction checking"] },
    { category: "Analytics", items: ["Health trends", "Progress tracking", "AI insights"] },
    { category: "Support", items: ["Email support", "Phone support", "Dedicated manager"] },
  ];

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan anytime. Changes take effect on your next billing cycle.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer:
        "Your data is always yours. We'll keep it available for download for 30 days after cancellation, and you can export it anytime.",
    },
    {
      question: "Is there a contract or commitment?",
      answer:
        "No long-term contracts required. You can cancel monthly plans anytime. Annual plans offer a 10% discount.",
    },
    {
      question: "Do you offer student or non-profit discounts?",
      answer:
        "Yes! Students get 50% off Pro, and non-profits get 30% off. Contact our sales team with verification.",
    },
    {
      question: "How does the free trial work?",
      answer:
        "All plans include a 14-day free trial. No credit card required. Upgrade anytime during the trial.",
    },
    {
      question: "Is there multi-family support for enterprise?",
      answer:
        "Yes. Enterprise plans support unlimited family members and can be customized for your organization's needs.",
    },
  ];

  return (
    <HomeLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent pt-16 md:pt-24 pb-12 md:pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="info" size="md" className="justify-center mb-6">
            💰 Transparent Pricing
          </Badge>

          <h1 className="text-heading-lg font-bold text-ink mb-4">
            Healthcare That Works for Everyone
          </h1>
          <p className="text-heading-sm text-slate mb-8">
            Choose the plan that fits your needs. Always transparent pricing, no surprises.
          </p>

          {/* Toggle Annual/Monthly */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-body-md ${!isAnnual ? "text-ink font-semibold" : "text-slate"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-14 h-7 rounded-full transition-colors ${
                isAnnual ? "bg-teal" : "bg-hairline"
              } relative`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full absolute top-0.5 transition-transform ${
                  isAnnual ? "translate-x-7" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={`text-body-md ${isAnnual ? "text-ink font-semibold" : "text-slate"}`}>
              Annual <span className="text-teal font-semibold">Save 10%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative ${
                  plan.highlighted ? "md:scale-105 md:z-10" : ""
                }`}
              >
                {plan.highlighted && (
                  <Badge
                    variant="coral"
                    size="md"
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 justify-center"
                  >
                    Most Popular
                  </Badge>
                )}

                <Card
                  variant={plan.highlighted ? "base" : "feature"}
                  padding="lg"
                  className={`flex flex-col h-full ${
                    plan.highlighted ? "border-2 border-teal" : ""
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-heading-sm font-bold text-ink">{plan.name}</h3>
                    <p className="text-body-sm text-slate mt-2">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {typeof plan.price === "number" ? (
                      <>
                        <div className="flex items-baseline">
                          <span className="text-5xl font-bold text-ink">
                            ${isAnnual ? plan.yearlyPrice : plan.price}
                          </span>
                          {plan.price > 0 && (
                            <span className="text-body-md text-slate ml-2">
                              /{isAnnual ? "year" : "month"}
                            </span>
                          )}
                        </div>
                        {plan.price > 0 && (
                          <p className="text-body-sm text-slate mt-1">
                            ${(isAnnual ? plan.yearlyPrice / 12 : plan.price).toFixed(2)}/month billed
                            {isAnnual ? " annually" : " monthly"}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-4xl font-bold text-ink">{plan.price}</div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={plan.highlighted ? "primary" : "secondary"}
                    size="lg"
                    fullWidth
                    className="mb-6"
                  >
                    {plan.cta}
                  </Button>

                  {/* Features */}
                  <div className="flex-1">
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-teal mt-0.5">✓</span>
                          <span className="text-body-sm text-charcoal">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {plan.notIncluded.length > 0 && (
                      <div className="space-y-3 pt-6 border-t border-hairline">
                        {plan.notIncluded.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-slate">—</span>
                            <span className="text-body-sm text-slate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 px-6 bg-surface-soft">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-heading-lg font-bold text-ink mb-12 text-center">
            Detailed Feature Comparison
          </h2>

          {comparisonItems.map((category, idx) => (
            <div key={idx} className="mb-12">
              <h3 className="text-heading-sm font-bold text-ink mb-4">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, i) => (
                  <Card key={i} variant="base" padding="md" className="flex items-center gap-3">
                    <span className="text-teal text-xl">✓</span>
                    <span className="text-body-sm text-charcoal">{item}</span>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-heading-lg font-bold text-ink mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} variant="base" padding="lg">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between gap-4">
                    <h3 className="text-card-title font-semibold text-ink">{faq.question}</h3>
                    <span className="text-2xl text-slate group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="text-body-md text-charcoal mt-4 pt-4 border-t border-hairline">
                    {faq.answer}
                  </p>
                </details>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 px-6 bg-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-heading-lg font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-heading-sm opacity-90 mb-8">
            All plans include 14 days free. No credit card required.
          </p>
          <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </HomeLayout>
  );
}
