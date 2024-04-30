import React, { useState, useEffect } from "react";
import Geocode from "react-geocode"; // Library to convert address to coordinates (optional)
import geolib from "geolib"; // Library for geographical calculations

const LocationTracker = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [distanceFromTarget, setDistanceFromTarget] = useState(null);
  const targetLocation = { latitude: 27.6924323, longitude: 85.2793506 }; // Example: New York City coordinates

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const currentUserLocation = { latitude, longitude };
            setUserLocation(currentUserLocation);

            // Calculate distance from target location
            const distance = geolib.getDistance(
              currentUserLocation,
              targetLocation
            );
            setDistanceFromTarget(distance);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []); // Run once on component mount

  return (
    <div className="LocationTracker">
      {userLocation ? (
        <div>
          <p>
            Your current location: {userLocation.latitude},{" "}
            {userLocation.longitude}
          </p>
          <p>Distance from target location: {distanceFromTarget} meters</p>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationTracker;
