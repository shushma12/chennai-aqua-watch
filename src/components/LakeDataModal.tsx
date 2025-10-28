import { useState } from 'react';
import { Lake } from '@/types/lake';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, AlertTriangle, BarChart3, Droplets, Thermometer, TrendingUp } from 'lucide-react';
import LiveDataPanel from './LiveDataPanel';
import HistoricalDataPanel from './HistoricalDataPanel';

interface LakeDataModalProps {
  lake: Lake | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LakeDataModal = ({ lake, open, onOpenChange }: LakeDataModalProps) => {
  const [activeTab, setActiveTab] = useState('live');

  if (!lake) return null;

  const getStatusBadge = () => {
    const statusConfig = {
      safe: { label: '🟢 Safe', variant: 'default' as const, className: 'bg-success text-success-foreground' },
      moderate: { label: '🟡 Moderate', variant: 'secondary' as const, className: 'bg-warning text-warning-foreground' },
      contaminated: { label: '🔴 Contaminated', variant: 'destructive' as const, className: 'bg-destructive text-destructive-foreground' },
    };
    
    const config = statusConfig[lake.status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const hasAlgaeAlert = lake.currentData && lake.currentData.algaeGrowth > 60;
  const hasWasteAlert = lake.currentData && lake.currentData.industrialWaste > 50;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Droplets className="h-6 w-6 text-primary" />
                {lake.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                {getStatusBadge()}
                {lake.hasIoT && (
                  <Badge variant="outline" className="border-primary text-primary">
                    <Activity className="h-3 w-3 mr-1" />
                    Live IoT
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Alert Badges */}
        {(hasAlgaeAlert || hasWasteAlert) && (
          <div className="flex gap-2 mt-2">
            {hasAlgaeAlert && (
              <div className="flex items-center gap-2 bg-warning/10 border border-warning rounded-lg px-3 py-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-warning-foreground">High Algae Growth Detected</span>
              </div>
            )}
            {hasWasteAlert && (
              <div className="flex items-center gap-2 bg-destructive/10 border border-destructive rounded-lg px-3 py-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-destructive-foreground">Industrial Waste Alert</span>
              </div>
            )}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {lake.hasIoT ? 'Live Readings' : 'Latest Data'}
            </TabsTrigger>
            <TabsTrigger value="historical" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Historical Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-6">
            <LiveDataPanel lake={lake} />
          </TabsContent>

          <TabsContent value="historical" className="mt-6">
            <HistoricalDataPanel lake={lake} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LakeDataModal;
