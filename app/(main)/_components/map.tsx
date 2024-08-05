"use client";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
        position: position,
      });
    };
    initMap();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-5xl text-white text-center my-6">Lugar</h2>

        <h3 className="text-3xl text-white text-center my-6">
          Cabaña la gloria
        </h3>
       <div>
       <Image
          src={`/entrada-cb-gloria.jpg`}
          alt="Cabaña la gloria"
          width={300}
          height={300}
          className="border-2 border-white"
          style={{
            height: "auto",
          }}
        />
       </div>
        <Image
          src={`/piscina-cb-gloria.jpg`}
          className="border-2 border-white"
          alt="Cabaña la gloria"
          width={600}
          height={600}
          style={{
            height: "auto",
          
          }}
        />
      </div>
      <div className="flex flex-col mt-5">
        <h2 className="text-5xl text-white text-center my-6 ">Ubicación</h2>
        <Card className="m-2 rounded-md overflow-hidden">
          <CardContent className="p-0 ">
            <div style={{ height: "600px" }} ref={mapRef}></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
