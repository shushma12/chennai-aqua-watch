import { Lake } from '@/types/lake';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HistoricalDataPanelProps {
  lake: Lake;
}

const HistoricalDataPanel = ({ lake }: HistoricalDataPanelProps) => {
  const data = lake.historicalData;
  
  // Sort all data by date (most recent first) and get unique dates
  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Get unique dates from the data
  const uniqueDates = Array.from(new Set(sortedData.map(record => {
    const date = new Date(record.date);
    return date.toISOString().split('T')[0]; // Get just the date part (YYYY-MM-DD)
  })));
  
  // Get the most recent 5 unique dates
  const recentDates = uniqueDates.slice(0, 5);
  
  // Filter records that fall within those 5 most recent dates
  const recentData = sortedData.filter(record => {
    const recordDateStr = new Date(record.date).toISOString().split('T')[0];
    return recentDates.includes(recordDateStr);
  });

  return (
    <div className="space-y-6">
      {/* Scrollable 5-Day Records Table */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Last 5 Days Records ({recentData.length} readings)</h3>
        <ScrollArea className="h-[400px] w-full rounded-md border border-border">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead className="font-semibold">Date & Time</TableHead>
                <TableHead className="font-semibold text-right">Temp (°C)</TableHead>
                <TableHead className="font-semibold text-right">pH</TableHead>
                <TableHead className="font-semibold text-right">TDS (ppm)</TableHead>
                <TableHead className="font-semibold text-right">Turbidity</TableHead>
                <TableHead className="font-semibold text-right">Algae (%)</TableHead>
                <TableHead className="font-semibold text-right">Waste (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentData.map((record, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {new Date(record.date).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="text-right">{record.temperature.toFixed(1)}</TableCell>
                  <TableCell className="text-right">{record.ph.toFixed(1)}</TableCell>
                  <TableCell className="text-right">{record.tds.toFixed(0)}</TableCell>
                  <TableCell className="text-right">{record.turbidity.toFixed(1)}</TableCell>
                  <TableCell className="text-right">{record.algaeGrowth.toFixed(1)}</TableCell>
                  <TableCell className="text-right">{record.industrialWaste.toFixed(0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
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
