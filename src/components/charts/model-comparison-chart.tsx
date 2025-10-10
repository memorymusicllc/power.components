/**
 * Model Comparison Chart
 * Thin line style graph comparing different LLM models
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

interface ModelComparisonChartProps {
  className?: string
}

export function ModelComparisonChart({ className }: ModelComparisonChartProps) {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'GPT-4',
        data: [92, 94, 91, 93, 95, 92, 94, 93],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Claude-3',
        data: [88, 90, 89, 91, 89, 91, 90, 92],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Gemini Pro',
        data: [85, 87, 86, 88, 87, 89, 88, 90],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Llama-2',
        data: [82, 84, 83, 85, 84, 86, 85, 87],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false
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
        text: 'Model Performance Comparison',
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
          text: 'Accuracy Score (%)'
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

ModelComparisonChart.metadata = {
  name: 'ModelComparisonChart',
  label: 'Model Comparison Chart',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'Thin line chart comparing performance of different LLM models over time',
  phase: 'Core',
  category: 'Data Visualization',
  tags: ['LLM', 'Comparison', 'Models', 'Performance', 'Line Chart']
}
