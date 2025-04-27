import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define metric types
type Metric = 'revenue' | 'conversion' | 'efficiency' | 'satisfaction';

// Sample case study data
const caseStudies = [
  {
    id: 1,
    title: 'Global Tech Enterprise',
    industry: 'Technology',
    challenge: 'Needed to streamline their customer support process and reduce response times.',
    solution: 'Implemented our AI-powered chatbot solution integrated with their existing CRM.',
    results: {
      revenue: { before: 1000000, after: 1300000 },
      conversion: { before: 3.2, after: 4.8 },
      efficiency: { before: 65, after: 92 },
      satisfaction: { before: 72, after: 94 }
    },
    testimonial: 'The Novastra solution transformed our customer service operations. Response times decreased by 78% and customer satisfaction scores are at an all-time high.',
    contactPerson: 'Sarah Johnson, CTO'
  },
  {
    id: 2,
    title: 'National Retail Chain',
    industry: 'Retail',
    challenge: 'Struggling with inventory management and forecasting accuracy across 500+ locations.',
    solution: 'Deployed our predictive analytics platform with custom retail modules.',
    results: {
      revenue: { before: 750000, after: 920000 },
      conversion: { before: 2.8, after: 3.9 },
      efficiency: { before: 59, after: 87 },
      satisfaction: { before: 68, after: 89 }
    },
    testimonial: 'Inventory costs reduced by 23% while product availability improved by 15%. The ROI exceeded our expectations within the first quarter.',
    contactPerson: 'Michael Rodriguez, Supply Chain Director'
  },
  // Add more case studies as needed
];

// Function to generate chart data based on the active metric
const generateChartData = (metric: Metric) => {
  return {
    labels: ['Before', 'After'],
    datasets: caseStudies.map((study, index) => ({
      label: study.title,
      data: [study.results[metric].before, study.results[metric].after],
      borderColor: getColorByIndex(index),
      backgroundColor: getColorByIndex(index, 0.2),
      tension: 0.4
    }))
  };
};

// Function to get colors for charts
const getColorByIndex = (index: number, alpha = 1) => {
  const colors = [
    `rgba(75, 192, 192, ${alpha})`,
    `rgba(153, 102, 255, ${alpha})`,
    `rgba(255, 159, 64, ${alpha})`,
    `rgba(54, 162, 235, ${alpha})`,
    `rgba(255, 99, 132, ${alpha})`
  ];
  return colors[index % colors.length];
};

// Calculate improvement percentage
const calculateImprovement = (before: number, after: number) => {
  const improvement = ((after - before) / before) * 100;
  return improvement.toFixed(1);
};

// Main component
const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(caseStudies[0].id);
  const [activeMetric, setActiveMetric] = useState<Metric>('revenue');

  const selectedCase = caseStudies.find(cs => cs.id === activeCase) || caseStudies[0];

  // Fixed chart options with correct typing for 'weight'
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1a2e44',
        titleFont: {
          size: 14,
          weight: 'bold' as const // Using 'as const' to ensure TypeScript knows this is a literal
        },
        bodyFont: {
          size: 12
        },
        padding: 10,
        cornerRadius: 4
      }
    }
  };

  // Metrics displayed in the dashboard
  const metrics = [
    { id: 'revenue', label: 'Revenue Increase', prefix: '$', suffix: '' },
    { id: 'conversion', label: 'Conversion Rate', prefix: '', suffix: '%' },
    { id: 'efficiency', label: 'Operational Efficiency', prefix: '', suffix: '%' },
    { id: 'satisfaction', label: 'Customer Satisfaction', prefix: '', suffix: '%' }
  ];

  return (
    <section id="case-studies" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how organizations in different industries achieved remarkable results with our solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Case Study Selector */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Featured Case Studies</h3>
            <div className="space-y-3">
              {caseStudies.map(study => (
                <div
                  key={study.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeCase === study.id
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'bg-white hover:bg-gray-100 border-l-4 border-transparent'
                  }`}
                  onClick={() => setActiveCase(study.id)}
                >
                  <h4 className="font-semibold text-gray-800">{study.title}</h4>
                  <p className="text-sm text-gray-500">{study.industry}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{selectedCase.title}</h3>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                {selectedCase.industry}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Challenge</h4>
                <p className="text-gray-600">{selectedCase.challenge}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Solution</h4>
                <p className="text-gray-600">{selectedCase.solution}</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Results</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {metrics.map(metric => (
                  <div
                    key={metric.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      activeMetric === metric.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveMetric(metric.id as Metric)}
                  >
                    <div className="text-sm font-medium mb-1">{metric.label}</div>
                    <div className="font-bold text-lg">
                      {metric.prefix}
                      {calculateImprovement(
                        selectedCase.results[metric.id as Metric].before,
                        selectedCase.results[metric.id as Metric].after
                      )}
                      {metric.suffix}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="mb-6">
                  <div className="h-60">
                    <Line data={generateChartData(activeMetric) || { labels: ['Before', 'After'], datasets: [] }} options={chartOptions} />
                  </div>
                  <div className="mt-4 text-center">
                    <span className="font-semibold">Improvement: </span>
                    {calculateImprovement(
                      selectedCase.results[activeMetric].before,
                      selectedCase.results[activeMetric].after
                    )}%
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="italic text-gray-600 mb-2">
                    "{selectedCase.testimonial}"
                  </div>
                  <div className="text-sm text-gray-500">— {selectedCase.contactPerson}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                Request a Similar Solution
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;