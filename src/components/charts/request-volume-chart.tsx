/**
 * Request Volume Chart
 * Thin line style graph for LLM request volume tracking
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

interface RequestVolumeChartProps {
  className?: string
}

export function RequestVolumeChart({ className }: RequestVolumeChartProps) {
  const data = {
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [
      {
        label: 'Requests/min',
        data: [12, 8, 5, 15, 45, 78, 95, 88, 72, 65, 38, 25],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Successful',
        data: [11, 7, 5, 14, 42, 74, 90, 85, 68, 62, 36, 24],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Failed',
        data: [1, 1, 0, 1, 3, 4, 5, 3, 4, 3, 2, 1],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
        text: 'Request Volume & Success Rate',
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
          text: 'Requests per Minute'
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

RequestVolumeChart.metadata = {
  name: 'RequestVolumeChart',
  label: 'Request Volume Chart',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Thin line chart tracking LLM request volume and success rates over time',
  phase: 'Core',
  category: 'Data Visualization',
  tags: ['LLM', 'Volume', 'Traffic', 'Success Rate', 'Line Chart']
}
