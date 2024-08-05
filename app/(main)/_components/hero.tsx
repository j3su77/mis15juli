"use client";

import { Flower } from "@/components/flower";
import { FlowerYellow } from "@/components/flower-yellow";
import { Palm } from "@/components/palm";
import { Palm2 } from "@/components/palm-2";
import { Palm3 } from "@/components/palm-3";
import { Palm4 } from "@/components/palm-4";
import { Guest } from "@prisma/client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export const Hero = () => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <section
        style={{
          position: "relative",
          background: "url(/wave-sky.svg) 0% 0% / cover fixed",
          height: "100vh",
          overflow: "hidden",
          width: "100%",
          minWidth: "100%",
        }}
        className="min-h-[calc(100vh-60px)] w-full flex flex-col items-center p-2 overflow-hidden m-auto"
        id="home"
      >
        <Palm3 w={220} h={220} t="-20px" r="-90px" rt={350} />
        <Palm4 w={220} h={220} t="300px" r="-80px" rt={50} />
        <Flower w={150} h={120} b="30px" r="-10px" rt />

        <Palm w={220} h={220} t="300px" l="-80px" rt={80} />
        <Palm2 w={220} h={220} t="10px" l="-90px" rt={50} />
        <FlowerYellow w={140} h={100} b="30px" l="5px"/>
        {/* <Flower w={120} h={120} b="100px" l="0px" /> */}

        {/* <Cloud w={600} h={300} t="300px" l="0" r="0" className="mx-auto" /> */}
        <div className="flex flex-col items-center justify-start w-full gap-1 z-30">
          {/* <Image
          width={120}
          height={120}
          src="/crown.png"
          alt=""
          className="rotate-[350deg] justify-self-start "
        /> */}

          <h1 className=" font-normal text-5xl py-2 text-center text-white">
            Julianis Andrea Vergara Urieta
          </h1>
          <Image
            width={500}
            height={500}
            src="/juli.png"
            alt=""
            className=""
            style={{
              width: 300,
              height: "auto",
            }}
          />

          <div className="flex flex-col justify-center items-center relative h-fit z-20">
            <p className=" text-3xl text-center max-w-2xl text-white font-normal">
              Existen momentos en la vida que anhelamos con mucho cariño. Uno de
              esos momentos ha llegado:
            </p>
            <h1 className=" font-bold text-5xl mb-2 text-primary text-center">
              Mis 15
            </h1>
          </div>
        </div>
        {/* <Marquee
          gradient={false}
          speed={50}
          className="overflow-hidden bg-primary py-2 text-white"
        >
          <span className="mr-6"> {">>"}</span>
          {guests.map((guest) => (
            <div className="text-white ">
              <span className="font-bold">
                {guest.firstName} {guest.lastName}:
              </span>{" "}
            
              <span className="h-full w-1 border-r-2 border-white bg-white mx-5" />
            </div>
          ))}
        </Marquee> */}
      </section>
    </div>
  );
};
