/**
 * HealthInsightsPage
 * MediFlow - AI-generated health insights and personalized recommendations
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import Card, { CardHeader, CardBody } from '@/components/Card';
import Badge from '@/components/Badge';
import { useAuth } from '@/hooks/useAuth';

interface HealthInsight {
  id: string;
  category: string;
  title: string;
  description: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  actionItems: string[];
}

const MOCK_INSIGHTS: HealthInsight[] = [
  {
    id: '1',
    category: 'Heart Health',
    title: 'Blood Pressure Management',
    description:
      'Your recent blood pressure readings show improvement with consistent medication adherence.',
    recommendation: 'Continue current medication regimen and monitor weekly.',
    priority: 'high',
    actionItems: [
      'Take readings every Monday and Friday',
      'Maintain low-sodium diet',
      'Aim for 30 minutes daily exercise',
      'Schedule follow-up with cardiologist in 3 months',
    ],
  },
  {
    id: '2',
    category: 'Lifestyle',
    title: 'Physical Activity Patterns',
    description: 'Your activity level has increased by 15% over the past month.',
    recommendation: 'Great progress! Consider adding strength training to your routine.',
    priority: 'medium',
    actionItems: [
      'Add 2 days of strength training',
      'Track daily steps with your device',
      'Set weekly activity goal of 10,000 steps',
    ],
  },
  {
    id: '3',
    category: 'Nutrition',
    title: 'Dietary Improvement Opportunity',
    description: 'Your cholesterol levels suggest dietary adjustments could be beneficial.',
    recommendation: 'Increase fiber intake and reduce saturated fats.',
    priority: 'high',
    actionItems: [
      'Add leafy greens to 2 meals daily',
      'Switch to whole grain bread',
      'Limit red meat to twice weekly',
      'Schedule nutrition consultation',
    ],
  },
];

export default function HealthInsightsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [insights] = useState<HealthInsight[]>(MOCK_INSIGHTS);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Insights</h1>
          <p className="mt-1 text-gray-600">
            AI-powered insights based on your health data and medical history
          </p>
        </div>

        {/* Overall Health Score */}
        <Card className="bg-gradient-to-r from-blue-50 to-teal-50">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 mb-2">Overall Health Score</p>
                <p className="text-5xl font-bold text-blue-600">78/100</p>
                <p className="text-sm text-gray-600 mt-2">↑ 5 points from last month</p>
              </div>
              <div className="text-right">
                <div className="inline-block">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Sleep Quality</p>
              <p className="text-2xl font-bold text-purple-600">7.2/10</p>
              <p className="text-xs text-gray-600 mt-1">Avg 6.5 hrs/night</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Activity Level</p>
              <p className="text-2xl font-bold text-green-600">8.1/10</p>
              <p className="text-xs text-gray-600 mt-1">7,850 steps today</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Stress Level</p>
              <p className="text-2xl font-bold text-orange-600">5.3/10</p>
              <p className="text-xs text-gray-600 mt-1">Moderate stress</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">Nutrition</p>
              <p className="text-2xl font-bold text-blue-600">6.8/10</p>
              <p className="text-xs text-gray-600 mt-1">Room for improvement</p>
            </CardBody>
          </Card>
        </div>

        {/* Insights List */}
        <div className="space-y-4">
          {insights.map((insight) => (
            <Card
              key={insight.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setExpandedId(expandedId === insight.id ? null : insight.id)}
            >
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={insight.priority === 'high' ? 'info' : 'success'}>
                        {insight.priority.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-medium text-gray-600">{insight.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{insight.description}</p>

                {expandedId === insight.id && (
                  <div className="pt-3 border-t border-gray-200 space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-medium text-blue-900">💡 Recommendation:</p>
                      <p className="text-sm text-blue-800 mt-1">{insight.recommendation}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Action Items:</p>
                      <ul className="space-y-1">
                        {insight.actionItems.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-teal-600">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Recommendations Footer */}
        <Card className="bg-gradient-to-r from-teal-50 to-green-50">
          <CardHeader title="Next Steps" />
          <CardBody className="space-y-2">
            <p className="text-sm text-gray-700">
              📅 Schedule annual comprehensive checkup
            </p>
            <p className="text-sm text-gray-700">
              🧑‍⚕️ Consult with nutrition specialist about cholesterol management
            </p>
            <p className="text-sm text-gray-700">
              💪 Begin structured workout program (personalized plan available)
            </p>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
