"use client";

import { ButterFly } from "@/components/butterfly";
import { ButterFlySide } from "@/components/butterfly-side";
import { Cloud } from "@/components/cloud";
import Image from "next/image";

export const Hero = () => {
  return (
    <section
      className="min-h-[calc(100vh-60px)] w-full flex items-center p-2 overflow-hidden"
      id="home"
      style={{ position: "relative" }}
    >
      <ButterFly w={200} h={200} r="5px" t="0px" />
      <ButterFly w={120} h={120} r="5px" t="200px" rt />
      <ButterFly w={120} h={120} b="100px" />
      <ButterFlySide w={120} h={120} t="100px" />

      {/* <Cloud w={600} h={300} t="300px" l="0" r="0" className="mx-auto" /> */}
      <div className="flex flex-col items-center w-full gap-1 z-30">
        <Image
          width={120}
          height={120}
          src="/crown.png"
          alt=""
          className="rotate-[350deg] justify-self-start "
        />
        <Image
          width={1000}
          height={1000}
          src="/girl-formal.png"
          alt=""
          className=""
          style={{
            width: 500,
            height: "auto",
          }}
        />

        <div className="flex flex-col justify-center items-center relative h-fit z-20">
          <p className=" text-3xl text-center font-semibold max-w-2xl">
            Existen momentos en la vida que anhelamos con mucho cariño. Uno de
            esos momentos ha llegado:
          </p>
          <h1 className=" font-bold text-5xl mb-2 text-primary text-center">
            Mis 15
          </h1>
        </div>
      </div>
    </section>
  );
};
