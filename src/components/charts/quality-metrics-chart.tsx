/**
 * Quality Metrics Chart
 * Thin line style graph for LLM quality assessment
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface QualityMetricsChartProps {
  className?: string
}

export function QualityMetricsChart({ className }: QualityMetricsChartProps) {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Relevance Score',
        data: [85, 87, 89, 91, 88, 92, 90, 93],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Coherence Score',
        data: [82, 84, 86, 88, 85, 89, 87, 90],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Fluency Score',
        data: [88, 90, 89, 91, 87, 93, 91, 94],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Safety Score',
        data: [95, 96, 94, 97, 95, 98, 96, 99],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Quality Metrics Assessment',
        font: {
          size: 14,
          weight: 'bold' as const
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 80,
        max: 100,
        title: {
          display: true,
          text: 'Quality Score (%)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 6
      }
    }
  }

  return (
    <div className={`w-full h-64 ${className}`}>
      <Line data={data} options={options} />
    </div>
  )
}

QualityMetricsChart.metadata = {
  name: 'QualityMetricsChart',
  label: 'Quality Metrics Chart',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Thin line chart tracking LLM quality metrics including relevance, coherence, fluency, and safety scores',
  phase: 'Core',
  category: 'Data Visualization',
  tags: ['LLM', 'Quality', 'Metrics', 'Assessment', 'Line Chart']
}
