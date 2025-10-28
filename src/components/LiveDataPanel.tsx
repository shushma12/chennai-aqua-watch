import { Lake } from '@/types/lake';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Thermometer, Droplets, Activity, Waves, Leaf, Factory } from 'lucide-react';

interface LiveDataPanelProps {
  lake: Lake;
}

const LiveDataPanel = ({ lake }: LiveDataPanelProps) => {
  const data = lake.currentData || lake.historicalData[lake.historicalData.length - 1];
  
  const metrics = [
    {
      icon: Thermometer,
      label: 'Temperature',
      value: data.temperature.toFixed(1),
      unit: '°C',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Droplets,
      label: 'pH Level',
      value: data.ph.toFixed(1),
      unit: '',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Activity,
      label: 'TDS',
      value: data.tds.toFixed(0),
      unit: 'ppm',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
    {
      icon: Waves,
      label: 'Turbidity',
      value: data.turbidity.toFixed(1),
      unit: 'NTU',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
    },
  ];

  const percentageMetrics = [
    {
      icon: Leaf,
      label: 'Algae Growth',
      value: data.algaeGrowth,
      color: 'bg-green-500',
    },
    {
      icon: Factory,
      label: 'Industrial Waste',
      value: data.industrialWaste,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Numeric Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-2">
              <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}
                  <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Percentage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {percentageMetrics.map((metric) => (
          <Card key={metric.label} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-lg ${metric.color}/10 flex items-center justify-center`}>
                <metric.icon className={`h-4 w-4 ${metric.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{metric.label}</p>
                <p className="text-xs text-muted-foreground">{metric.value.toFixed(1)}%</p>
              </div>
            </div>
            <Progress value={metric.value} className="h-2" />
          </Card>
        ))}
      </div>

      {/* Data Source Info */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <Activity className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {lake.hasIoT ? 'Real-time IoT Data' : 'Latest Available Data'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {lake.hasIoT 
                ? 'Data is being continuously updated from IoT sensors deployed at this location.'
                : 'Showing the most recent data from historical datasets for this location.'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveDataPanel;
