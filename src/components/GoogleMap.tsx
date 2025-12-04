import React from 'react';

interface GoogleMapProps {
  address: string;
}

const GoogleMap = ({ address }: GoogleMapProps) => {
  // Use address for better Google Maps accuracy
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=17`;

  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mapa - ${address}`}
      />
    </div>
  );
};

export default GoogleMap;
