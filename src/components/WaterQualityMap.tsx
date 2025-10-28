import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Lake } from '@/types/lake';
import { MapPin } from 'lucide-react';

interface WaterQualityMapProps {
  lakes: Lake[];
  onLakeClick: (lake: Lake) => void;
}

const WaterQualityMap = ({ lakes, onLakeClick }: WaterQualityMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Chennai
    map.current = L.map(mapContainer.current).setView([13.0827, 80.2707], 11);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for each lake
    lakes.forEach(lake => {
      const statusColor = 
        lake.status === 'safe' ? '#16a34a' :
        lake.status === 'moderate' ? '#ea580c' :
        '#dc2626';

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background: ${statusColor};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: 16px;
              font-weight: bold;
            ">●</div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      const marker = L.marker(lake.position, { icon })
        .addTo(map.current!)
        .on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          onLakeClick(lake);
        });

      // Add tooltip on hover only
      marker.bindTooltip(lake.name, {
        permanent: false,
        direction: 'top',
        offset: [0, -32],
        className: 'lake-tooltip',
        opacity: 0.9,
      });

      markers.current.push(marker);
    });
  }, [lakes, onLakeClick]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0 z-0" />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg shadow-md border border-border">
        <h3 className="text-sm font-semibold mb-2 text-foreground">Water Quality Status</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-foreground">Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-foreground">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span className="text-foreground">Contaminated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterQualityMap;
