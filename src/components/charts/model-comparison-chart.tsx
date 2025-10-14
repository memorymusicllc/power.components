/**
 * Model Comparison Chart Component
 * Compares different AI models across multiple metrics
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { withErrorBoundary } from '@/lib/design-system/error-boundary';
import { withMemo } from '@/lib/design-system/performance';

const data = [
  { metric: 'Accuracy', GPT4: 95, Claude3: 92, Gemini: 88, Llama2: 82 },
  { metric: 'Speed', GPT4: 85, Claude3: 90, Gemini: 95, Llama2: 75 },
  { metric: 'Cost', GPT4: 70, Claude3: 80, Gemini: 90, Llama2: 95 },
  { metric: 'Safety', GPT4: 90, Claude3: 95, Gemini: 85, Llama2: 80 },
  { metric: 'Creativity', GPT4: 95, Claude3: 88, Gemini: 82, Llama2: 85 },
];

const ModelComparisonChartBase = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          margin={{ top: 20, right: 80, bottom: 20, left: 20 }}
        >
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fontSize: 10 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fontSize: 8 }}
          />
          <Radar 
            name="GPT-4" 
            dataKey="GPT4" 
            stroke="hsl(210, 100%, 70%)" 
            fill="hsl(210, 100%, 70%)" 
            fillOpacity={0.3} 
          />
          <Radar 
            name="Claude-3" 
            dataKey="Claude3" 
            stroke="hsl(25, 100%, 60%)" 
            fill="hsl(25, 100%, 60%)" 
            fillOpacity={0.3} 
          />
          <Radar 
            name="Gemini" 
            dataKey="Gemini" 
            stroke="hsl(120, 50%, 60%)" 
            fill="hsl(120, 50%, 60%)" 
            fillOpacity={0.3} 
          />
          <Radar 
            name="Llama-2" 
            dataKey="Llama2" 
            stroke="hsl(330, 100%, 70%)" 
            fill="hsl(330, 100%, 70%)" 
            fillOpacity={0.3} 
          />
          <Legend 
            wrapperStyle={{ fontSize: 11 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ModelComparisonChart = withErrorBoundary(withMemo(ModelComparisonChartBase));
export default ModelComparisonChart;