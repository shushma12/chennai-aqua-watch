import { useState, useEffect } from 'react';
import { Lake } from '@/types/lake';
import { lakesData } from '@/data/lakesData';
import WaterQualityMap from '@/components/WaterQualityMap';
import LakeDataModal from '@/components/LakeDataModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Droplets, Activity, MapPin, TrendingUp } from 'lucide-react';

const Index = () => {
  const [lakes, setLakes] = useState<Lake[]>(lakesData);
  const [selectedLake, setSelectedLake] = useState<Lake | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Simulate real-time updates for IoT lakes
  useEffect(() => {
    const interval = setInterval(() => {
      setLakes(prevLakes =>
        prevLakes.map(lake => {
          if (!lake.hasIoT || !lake.currentData) return lake;

          // Small random variations to simulate real-time data
          return {
            ...lake,
            currentData: {
              ...lake.currentData,
              temperature: lake.currentData.temperature + (Math.random() - 0.5) * 0.5,
              ph: Math.max(0, Math.min(14, lake.currentData.ph + (Math.random() - 0.5) * 0.1)),
              tds: Math.max(0, lake.currentData.tds + (Math.random() - 0.5) * 10),
              turbidity: Math.max(0, lake.currentData.turbidity + (Math.random() - 0.5) * 2),
              algaeGrowth: Math.max(0, Math.min(100, lake.currentData.algaeGrowth + (Math.random() - 0.5) * 2)),
              industrialWaste: Math.max(0, Math.min(100, lake.currentData.industrialWaste + (Math.random() - 0.5) * 1.5)),
              timestamp: new Date(),
            },
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLakeClick = (lake: Lake) => {
    // Update selected lake with current data from state
    const currentLake = lakes.find(l => l.id === lake.id) || lake;
    setSelectedLake(currentLake);
    setModalOpen(true);
  };

  const iotLakes = lakes.filter(l => l.hasIoT);
  const safeLakes = lakes.filter(l => l.status === 'safe').length;
  const moderateLakes = lakes.filter(l => l.status === 'moderate').length;
  const contaminatedLakes = lakes.filter(l => l.status === 'contaminated').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Chennai Water Quality Monitor</h1>
                <p className="text-sm text-muted-foreground">Real-time IoT & Historical Data Dashboard</p>
              </div>
            </div>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Add IoT Device
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-card hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">IoT Enabled</p>
                <p className="text-2xl font-bold text-foreground">{iotLakes.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Safe</p>
                <p className="text-2xl font-bold text-foreground">{safeLakes}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Moderate</p>
                <p className="text-2xl font-bold text-foreground">{moderateLakes}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-card hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Droplets className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contaminated</p>
                <p className="text-2xl font-bold text-foreground">{contaminatedLakes}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Map */}
        <Card className="p-0 overflow-hidden">
          <div className="h-[600px]">
            <WaterQualityMap lakes={lakes} onLakeClick={handleLakeClick} />
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">How It Works</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Click any pin on the map to view detailed water quality data. Lakes with IoT sensors show real-time readings, 
                while others display historical datasets. Monitor temperature, pH, TDS, turbidity, algae growth, and industrial waste levels.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-1 rounded">
                  🟢 Safe (pH 6.5-8.5, Low contamination)
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-warning/10 text-warning px-2 py-1 rounded">
                  🟡 Moderate (pH 6-9, Medium contamination)
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">
                  🔴 Contaminated (pH &lt;6 or &gt;9, High contamination)
                </span>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Lake Data Modal */}
      <LakeDataModal 
        lake={selectedLake} 
        open={modalOpen} 
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Index;
