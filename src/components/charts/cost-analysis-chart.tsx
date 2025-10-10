/**
 * Cost Analysis Chart
 * Thin line style graph for LLM cost tracking and analysis
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

interface CostAnalysisChartProps {
  className?: string
}

export function CostAnalysisChart({ className }: CostAnalysisChartProps) {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Daily Cost ($)',
        data: [12.50, 18.75, 22.30, 28.90, 35.20, 42.10, 38.75, 45.60, 52.30, 48.90],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Budget Limit',
        data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderWidth: 2,
        tension: 0,
        borderDash: [5, 5],
        fill: false
      },
      {
        label: 'Projected Cost',
        data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        borderDash: [3, 3]
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
        text: 'Cost Analysis & Budget Tracking',
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
          text: 'Cost ($)'
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

CostAnalysisChart.metadata = {
  name: 'CostAnalysisChart',
  label: 'Cost Analysis Chart',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Thin line chart tracking LLM costs, budget limits, and projections over time',
  phase: 'Core',
  category: 'Data Visualization',
  tags: ['LLM', 'Cost', 'Budget', 'Analysis', 'Line Chart']
}
