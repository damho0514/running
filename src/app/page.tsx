"use client"; // Next.js 13+의 App Router 환경에서 클라이언트 컴포넌트임을 명시

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

const GeoLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  console.log({ location });
  const [error, setError] = useState<string>();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <GoogleMap
        center={{ lat: location?.latitude ?? 0, lng: location?.longitude ?? 0 }}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "80vh" }}
      >
        <Marker
          position={{
            lat: location?.latitude ?? 0,
            lng: location?.longitude ?? 0,
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default GeoLocation;
