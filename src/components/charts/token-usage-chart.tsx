/**
 * Token Usage Chart
 * Thin line style graph for LLM token consumption tracking
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

interface TokenUsageChartProps {
  className?: string
}

export function TokenUsageChart({ className }: TokenUsageChartProps) {
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Input Tokens',
        data: [1200, 800, 2400, 3200, 1800, 2800, 1500],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Output Tokens',
        data: [400, 300, 800, 1200, 600, 900, 500],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Total Cost ($)',
        data: [0.12, 0.08, 0.24, 0.32, 0.18, 0.28, 0.15],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        yAxisID: 'y1'
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
        text: 'Token Usage & Cost Tracking',
        font: {
          size: 14,
          weight: 'bold' as const
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tokens'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost ($)'
        },
        grid: {
          drawOnChartArea: false,
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

TokenUsageChart.metadata = {
  name: 'TokenUsageChart',
  label: 'Token Usage Chart',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Thin line chart tracking LLM token consumption and costs over time',
  phase: 'Core',
  category: 'Data Visualization',
  tags: ['LLM', 'Tokens', 'Cost', 'Usage', 'Line Chart']
}
