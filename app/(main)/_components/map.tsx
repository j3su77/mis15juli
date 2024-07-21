"use client";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");
      const position = {
        lat: 10.7653185,
        lng: -74.759868,
        
      };

      // map options
      const mapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };

      // setup the map
      const map = new Map(mapRef.current, mapOptions);

      const marker = new Marker({
        map: map,
        position: position
      })
    };
    initMap();
  }, []);

  return <div>
    <div style={{ height: "600px" }} ref={mapRef}></div>;

   
  </div>

};
