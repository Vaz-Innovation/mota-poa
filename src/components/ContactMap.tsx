import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface ContactMapProps {
  address: string;
  coordinates: [number, number];
}

const ContactMap = ({ address, coordinates }: ContactMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates,
        zoom: 15,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add marker
      const marker = new mapboxgl.Marker({ color: '#ff6200' })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div style="padding: 8px;"><strong>Mota & Advogados Associados</strong><br/>${address}</div>`)
        )
        .addTo(map.current);

      // Show popup by default
      marker.togglePopup();

      setIsTokenSet(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
      {!isTokenSet ? (
        <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center p-6 z-10">
          <MapPin className="w-12 h-12 text-accent mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">Configure o Mapa</h3>
          <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
            Para visualizar o mapa, insira seu token público do Mapbox. 
            <a 
              href="https://account.mapbox.com/access-tokens/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline ml-1"
            >
              Obtenha seu token aqui
            </a>
          </p>
          <div className="flex gap-2 w-full max-w-md">
            <Input
              type="text"
              placeholder="Cole seu token do Mapbox"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={initializeMap} disabled={!mapboxToken}>
              Ativar
            </Button>
          </div>
        </div>
      ) : null}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default ContactMap;
