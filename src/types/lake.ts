export type WaterStatus = 'safe' | 'moderate' | 'contaminated';

export interface WaterQualityData {
  temperature: number;
  ph: number;
  tds: number;
  turbidity: number;
  algaeGrowth: number;
  industrialWaste: number;
  timestamp: Date;
}

export interface HistoricalDataPoint {
  date: string;
  temperature: number;
  ph: number;
  tds: number;
  turbidity: number;
  algaeGrowth: number;
  industrialWaste: number;
}

export interface Lake {
  id: string;
  name: string;
  position: [number, number]; // [lat, lng]
  hasIoT: boolean;
  currentData?: WaterQualityData;
  historicalData: HistoricalDataPoint[];
  status: WaterStatus;
}
