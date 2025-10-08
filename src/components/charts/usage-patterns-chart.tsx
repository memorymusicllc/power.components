/**
 * Usage Patterns Chart
 * Thin line style graph for LLM usage pattern analysis
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

interface UsagePatternsChartProps {
  className?: string
}

export function UsagePatternsChart({ className }: UsagePatternsChartProps) {
  const data = {
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [
      {
        label: 'Text Generation',
        data: [5, 3, 2, 8, 25, 45, 55, 48, 35, 28, 15, 8],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Code Generation',
        data: [2, 1, 1, 3, 12, 18, 22, 20, 15, 12, 6, 3],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Analysis Tasks',
        data: [1, 0, 0, 2, 8, 12, 15, 18, 14, 10, 5, 2],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Translation',
        data: [0, 0, 0, 1, 3, 5, 8, 6, 4, 3, 1, 0],
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
        text: 'Usage Patterns by Task Type',
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
          text: 'Requests per Hour'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time of Day'
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

UsagePatternsChart.metadata = {
  name: 'UsagePatternsChart',
  label: 'Usage Patterns Chart',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Thin line chart analyzing LLM usage patterns by task type throughout the day',
  phase: 'Core',
  category: 'Data Visualization',
  tags: ['LLM', 'Usage', 'Patterns', 'Analytics', 'Line Chart']
}
