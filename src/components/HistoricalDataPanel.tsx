import { Lake } from '@/types/lake';
import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HistoricalDataPanelProps {
  lake: Lake;
}

const HistoricalDataPanel = ({ lake }: HistoricalDataPanelProps) => {
  const data = lake.historicalData;

  return (
    <div className="space-y-6">
      {/* Water Quality Parameters */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Water Quality Parameters (30 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#f97316" 
              name="Temperature (°C)"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="ph" 
              stroke="#3b82f6" 
              name="pH Level"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* TDS and Turbidity */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Dissolved Solids & Turbidity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="tds" 
              stroke="#06b6d4" 
              name="TDS (ppm)"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="turbidity" 
              stroke="#14b8a6" 
              name="Turbidity (NTU)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Algae Growth and Industrial Waste */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Contamination Indicators</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar 
              dataKey="algaeGrowth" 
              fill="#22c55e" 
              name="Algae Growth (%)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="industrialWaste" 
              fill="#ef4444" 
              name="Industrial Waste (%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Stats */}
      <Card className="p-4 bg-muted/50">
        <h3 className="text-sm font-semibold mb-3 text-foreground">30-Day Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Avg Temperature</p>
            <p className="text-lg font-semibold text-foreground">
              {(data.reduce((sum, d) => sum + d.temperature, 0) / data.length).toFixed(1)}°C
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Avg pH</p>
            <p className="text-lg font-semibold text-foreground">
              {(data.reduce((sum, d) => sum + d.ph, 0) / data.length).toFixed(1)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Avg TDS</p>
            <p className="text-lg font-semibold text-foreground">
              {(data.reduce((sum, d) => sum + d.tds, 0) / data.length).toFixed(0)} ppm
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Avg Turbidity</p>
            <p className="text-lg font-semibold text-foreground">
              {(data.reduce((sum, d) => sum + d.turbidity, 0) / data.length).toFixed(1)} NTU
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HistoricalDataPanel;
