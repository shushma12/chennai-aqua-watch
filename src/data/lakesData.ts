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
  // IoT-enabled lakes with real sensor data
  {
    id: 'narayanapuram',
    name: 'Narayanapuram Lake',
    position: [13.0067, 80.2206],
    hasIoT: true,
    currentData: {
      temperature: 26.7,
      ph: 7.2,
      tds: 173,
      turbidity: 2.9,
      algaeGrowth: 11,
      industrialWaste: 8,
      timestamp: new Date(),
    },
    status: 'safe',
    historicalData: [
      { date: '2025-11-02', temperature: 26.5, ph: 7.2, tds: 172, turbidity: 2.8, algaeGrowth: 10, industrialWaste: 8 },
      { date: '2025-11-02', temperature: 26.7, ph: 7.3, tds: 173, turbidity: 2.9, algaeGrowth: 11, industrialWaste: 8 },
      { date: '2025-11-02', temperature: 26.8, ph: 7.2, tds: 174, turbidity: 3.0, algaeGrowth: 12, industrialWaste: 9 },
      { date: '2025-11-02', temperature: 26.7, ph: 7.3, tds: 173, turbidity: 2.9, algaeGrowth: 11, industrialWaste: 8 },
      { date: '2025-11-02', temperature: 26.6, ph: 7.2, tds: 172, turbidity: 2.8, algaeGrowth: 10, industrialWaste: 8 },
      { date: '2025-11-02', temperature: 26.7, ph: 7.3, tds: 173, turbidity: 2.9, algaeGrowth: 11, industrialWaste: 8 },
      { date: '2025-11-02', temperature: 26.8, ph: 7.3, tds: 174, turbidity: 3.0, algaeGrowth: 12, industrialWaste: 9 },
      { date: '2025-11-02', temperature: 26.9, ph: 7.4, tds: 175, turbidity: 3.1, algaeGrowth: 13, industrialWaste: 9 },
      { date: '2025-11-02', temperature: 26.8, ph: 7.3, tds: 174, turbidity: 3.0, algaeGrowth: 12, industrialWaste: 9 },
      { date: '2025-11-02', temperature: 26.7, ph: 7.2, tds: 173, turbidity: 2.9, algaeGrowth: 11, industrialWaste: 8 },
    ],
  },
  {
    id: 'chitlapakkam',
    name: 'Chitlapakkam Lake',
    position: [12.9396, 80.1394],
    hasIoT: true,
    currentData: {
      temperature: 28.7,
      ph: 7.4,
      tds: 182,
      turbidity: 3.1,
      algaeGrowth: 14,
      industrialWaste: 10,
      timestamp: new Date(),
    },
    status: 'safe',
    historicalData: [
      { date: '2025-10-18', temperature: 28.5, ph: 7.4, tds: 180, turbidity: 3.2, algaeGrowth: 12, industrialWaste: 10 },
      { date: '2025-10-18', temperature: 28.6, ph: 7.3, tds: 182, turbidity: 3.0, algaeGrowth: 13, industrialWaste: 10 },
      { date: '2025-10-18', temperature: 28.7, ph: 7.4, tds: 181, turbidity: 3.1, algaeGrowth: 14, industrialWaste: 10 },
      { date: '2025-10-18', temperature: 28.6, ph: 7.5, tds: 179, turbidity: 3.3, algaeGrowth: 12, industrialWaste: 9 },
      { date: '2025-10-18', temperature: 28.5, ph: 7.5, tds: 180, turbidity: 3.4, algaeGrowth: 13, industrialWaste: 10 },
      { date: '2025-10-18', temperature: 28.7, ph: 7.4, tds: 182, turbidity: 3.2, algaeGrowth: 14, industrialWaste: 10 },
      { date: '2025-10-18', temperature: 28.6, ph: 7.3, tds: 183, turbidity: 3.1, algaeGrowth: 15, industrialWaste: 11 },
      { date: '2025-10-18', temperature: 28.8, ph: 7.4, tds: 181, turbidity: 3.0, algaeGrowth: 13, industrialWaste: 10 },
      { date: '2025-10-18', temperature: 28.7, ph: 7.4, tds: 182, turbidity: 3.1, algaeGrowth: 14, industrialWaste: 10 },
      { date: '2025-10-18', temperature: 28.5, ph: 7.5, tds: 180, turbidity: 3.3, algaeGrowth: 15, industrialWaste: 11 },
    ],
  },
  {
    id: 'ramapuram',
    name: 'Ramapuram Lake',
    position: [13.0404, 80.1710],
    hasIoT: true,
    currentData: {
      temperature: 27.9,
      ph: 7.4,
      tds: 179,
      turbidity: 3.7,
      algaeGrowth: 18,
      industrialWaste: 12,
      timestamp: new Date(),
    },
    status: 'safe',
    historicalData: [
      { date: '2025-10-26', temperature: 27.8, ph: 7.3, tds: 178, turbidity: 3.5, algaeGrowth: 16, industrialWaste: 12 },
      { date: '2025-10-26', temperature: 27.9, ph: 7.4, tds: 179, turbidity: 3.6, algaeGrowth: 17, industrialWaste: 12 },
      { date: '2025-10-26', temperature: 28.0, ph: 7.4, tds: 180, turbidity: 3.7, algaeGrowth: 18, industrialWaste: 13 },
      { date: '2025-10-26', temperature: 27.9, ph: 7.3, tds: 179, turbidity: 3.6, algaeGrowth: 16, industrialWaste: 12 },
      { date: '2025-10-26', temperature: 28.0, ph: 7.5, tds: 180, turbidity: 3.8, algaeGrowth: 17, industrialWaste: 13 },
      { date: '2025-10-26', temperature: 27.9, ph: 7.4, tds: 178, turbidity: 3.7, algaeGrowth: 16, industrialWaste: 12 },
      { date: '2025-10-26', temperature: 27.8, ph: 7.3, tds: 179, turbidity: 3.6, algaeGrowth: 17, industrialWaste: 12 },
      { date: '2025-10-26', temperature: 27.7, ph: 7.3, tds: 177, turbidity: 3.5, algaeGrowth: 16, industrialWaste: 11 },
      { date: '2025-10-26', temperature: 27.8, ph: 7.4, tds: 178, turbidity: 3.6, algaeGrowth: 17, industrialWaste: 12 },
      { date: '2025-10-26', temperature: 27.9, ph: 7.4, tds: 179, turbidity: 3.7, algaeGrowth: 18, industrialWaste: 12 },
    ],
  },
  {
    id: 'live-demo',
    name: '🔴 LIVE IoT Demo Station',
    position: [13.0827, 80.2707], // Anna University area
    hasIoT: true,
    currentData: {
      temperature: 27.5,
      ph: 7.0,
      tds: 150,
      turbidity: 2.5,
      algaeGrowth: 10,
      industrialWaste: 5,
      timestamp: new Date(),
    },
    status: 'safe',
    historicalData: [],
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
