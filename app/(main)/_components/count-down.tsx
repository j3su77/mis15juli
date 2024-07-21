"use client";

import { useInterval } from "usehooks-ts";
import confetti from "canvas-confetti";
import { useState, useEffect } from "react";
import { timeLeft } from "@/lib/utils";
import { Cloud } from "@/components/cloud";

export const CountDown = () => {
  const [time, setTimer] = useState(timeLeft());

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useInterval(() => {
    setTimer(timeLeft());
  }, 1000);

  const startConffeti = () => {
    const defaults = {
      spread: 200,
      ticks: 500,
      gravity: 0.9,
      decay: 0.94,
      startVelocity: 30,
      origin: { y: 0.6 },
    };

    confetti({
      ...defaults,
      particleCount: 100,
    });

    confetti({
      ...defaults,
      particleCount: 75,
    });

    confetti({
      ...defaults,
      particleCount: 30,
    });
  };

  return (
    <div className="relative flex flex-col z-40 min-h-[500px]">
      <div className="text-center object-fill flex-1 flex flex-col justify-center items-center">
      <p className="text-3xl z-50">
          Faltan:
        </p>
        <Cloud w={600} h={300} t="20px" l="0px" r="0px" className="mx-auto" />
        {isClient && (
          <div
            className="relative flex gap-2 p-6 justify-center px-3 h-fit"
            onClick={() => startConffeti()}
          >
            <TimeBox unitName="Días" unit={time.days} />
            <TimeBox unitName="Minutos" unit={time.minutes} />
            <TimeBox unitName="Horas" unit={time.hours} />
            <TimeBox unitName="Segundos" unit={time.seconds} />
          </div>
        )}

        <p className="text-3xl z-50">
          Para mis <span className="text-red-900 font-semibold ">{15}</span>.
        </p>
      </div>
    </div>
  );
};

const TimeBox = (props: { unitName: string; unit: number }) => {
  return (
    <div className="bg-primary text-primary-foreground w-fit h-fit rounded-full flex items-center p-2">
      <div className="m-3 rounded-full w-16 h-16 flex flex-col justify-center items-center">
        <p className="text-5xl h-fit leading-5">{props.unit}</p>
        <p className="text-xl">{props.unitName}</p>
      </div>
    </div>
  );
};
