/**
 * Latency Distribution Chart
 * Thin line style graph for LLM latency analysis
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

interface LatencyDistributionChartProps {
  className?: string
}

export function LatencyDistributionChart({ className }: LatencyDistributionChartProps) {
  const data = {
    labels: ['0-100ms', '100-200ms', '200-300ms', '300-400ms', '400-500ms', '500-600ms', '600-700ms', '700-800ms', '800-900ms', '900-1000ms'],
    datasets: [
      {
        label: 'P50 (Median)',
        data: [0, 0, 15, 25, 20, 12, 8, 5, 3, 2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'P95',
        data: [0, 0, 0, 5, 10, 15, 20, 18, 12, 8],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'P99',
        data: [0, 0, 0, 0, 2, 5, 8, 12, 15, 10],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
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
        text: 'Latency Distribution Analysis',
        font: {
          size: 14,
          weight: 'bold' as const
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Request Count'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Latency Range (ms)'
        },
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

LatencyDistributionChart.metadata = {
  name: 'LatencyDistributionChart',
  label: 'Latency Distribution Chart',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Thin line chart showing LLM latency distribution and percentile analysis',
  phase: 'Core',
  category: 'Data Visualization',
  tags: ['LLM', 'Latency', 'Performance', 'Distribution', 'Line Chart']
}
