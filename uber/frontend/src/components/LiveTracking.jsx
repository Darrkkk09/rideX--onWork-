import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const LiveTracking = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState({ lat: 20.5937, lng: 78.9629 }); 

  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.stadiamaps.com/styles/osm_bright.json', // ORS-compatible tile source
      center: [position.lng, position.lat],
      zoom: 19,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    markerRef.current = new maplibregl.Marker({ color: 'red' })
      .setLngLat([position.lng, position.lat])
      .addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const updateLocation = (pos) => {
      const { latitude, longitude } = pos.coords;
      const newPos = { lat: latitude, lng: longitude };
      setPosition(newPos);

      if (mapRef.current && markerRef.current) {
        markerRef.current.setLngLat([longitude, latitude]);
        mapRef.current.flyTo({ center: [longitude, latitude], speed: 1.2 });
      }
    };

    navigator.geolocation.getCurrentPosition(updateLocation);

    const watchId = navigator.geolocation.watchPosition(updateLocation);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default LiveTracking;
