import { Lake, HistoricalDataPoint } from '@/types/lake';

// Generate historical data for the past 30 days
const generateHistoricalData = (baseValues: {
  temp: number;
  ph: number;
  tds: number;
  turbidity: number;
  algae: number;
  waste: number;
}): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      temperature: baseValues.temp + (Math.random() - 0.5) * 4,
      ph: baseValues.ph + (Math.random() - 0.5) * 0.8,
      tds: baseValues.tds + (Math.random() - 0.5) * 100,
      turbidity: baseValues.turbidity + (Math.random() - 0.5) * 10,
      algaeGrowth: Math.max(0, Math.min(100, baseValues.algae + (Math.random() - 0.5) * 20)),
      industrialWaste: Math.max(0, Math.min(100, baseValues.waste + (Math.random() - 0.5) * 15)),
    });
  }
  
  return data;
};

export const lakesData: Lake[] = [
  // IoT-enabled lakes
  {
    id: 'narayanapuram',
    name: 'Narayanapuram Lake',
    position: [13.0067, 80.2206],
    hasIoT: true,
    currentData: {
      temperature: 28.5,
      ph: 7.2,
      tds: 450,
      turbidity: 12,
      algaeGrowth: 35,
      industrialWaste: 15,
      timestamp: new Date(),
    },
    status: 'safe',
    historicalData: generateHistoricalData({
      temp: 28,
      ph: 7.2,
      tds: 450,
      turbidity: 12,
      algae: 35,
      waste: 15,
    }),
  },
  {
    id: 'chitlapakkam',
    name: 'Chitlapakkam Lake',
    position: [12.9396, 80.1394],
    hasIoT: true,
    currentData: {
      temperature: 29.2,
      ph: 6.8,
      tds: 620,
      turbidity: 25,
      algaeGrowth: 58,
      industrialWaste: 42,
      timestamp: new Date(),
    },
    status: 'moderate',
    historicalData: generateHistoricalData({
      temp: 29,
      ph: 6.8,
      tds: 620,
      turbidity: 25,
      algae: 58,
      waste: 42,
    }),
  },
  {
    id: 'adyar',
    name: 'Adyar Lake',
    position: [13.0097, 80.2565],
    hasIoT: true,
    currentData: {
      temperature: 30.1,
      ph: 6.2,
      tds: 850,
      turbidity: 45,
      algaeGrowth: 75,
      industrialWaste: 68,
      timestamp: new Date(),
    },
    status: 'contaminated',
    historicalData: generateHistoricalData({
      temp: 30,
      ph: 6.2,
      tds: 850,
      turbidity: 45,
      algae: 75,
      waste: 68,
    }),
  },
  // Historical data only lakes
  {
    id: 'red-hills',
    name: 'Red Hills Lake',
    position: [13.1545, 80.1834],
    hasIoT: false,
    status: 'safe',
    historicalData: generateHistoricalData({
      temp: 27.5,
      ph: 7.4,
      tds: 420,
      turbidity: 10,
      algae: 25,
      waste: 10,
    }),
  },
  {
    id: 'porur',
    name: 'Porur Lake',
    position: [13.0358, 80.1569],
    hasIoT: false,
    status: 'moderate',
    historicalData: generateHistoricalData({
      temp: 28.8,
      ph: 6.9,
      tds: 580,
      turbidity: 28,
      algae: 52,
      waste: 38,
    }),
  },
  {
    id: 'chembarambakkam',
    name: 'Chembarambakkam Lake',
    position: [13.0883, 80.0539],
    hasIoT: false,
    status: 'safe',
    historicalData: generateHistoricalData({
      temp: 27.2,
      ph: 7.3,
      tds: 410,
      turbidity: 8,
      algae: 22,
      waste: 12,
    }),
  },
  {
    id: 'sholinganallur',
    name: 'Sholinganallur Lake',
    position: [12.9007, 80.2265],
    hasIoT: false,
    status: 'contaminated',
    historicalData: generateHistoricalData({
      temp: 30.5,
      ph: 6.1,
      tds: 920,
      turbidity: 52,
      algae: 82,
      waste: 75,
    }),
  },
  {
    id: 'pallikaranai',
    name: 'Pallikaranai Marsh',
    position: [12.9244, 80.2118],
    hasIoT: false,
    status: 'moderate',
    historicalData: generateHistoricalData({
      temp: 29.5,
      ph: 6.7,
      tds: 640,
      turbidity: 32,
      algae: 60,
      waste: 45,
    }),
  },
];
