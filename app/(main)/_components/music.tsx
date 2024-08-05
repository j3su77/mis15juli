"use client";

import { cn } from "@/lib/utils";
import { Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";

export const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const radiocontrol = useRef<any>();

  useEffect(() => {
    if (isPlaying) {
      setIsLoading(true);
      radiocontrol.current.audio.current.src = "/soy-feliz.mp3";
      radiocontrol.current.audio.current.play();
    } else {
      radiocontrol.current.audio.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (radiocontrol.current) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [radiocontrol]);

  useEffect(() => {
    if (!isPlaying) {
      isPaused();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const onLoaded = () => setIsLoading(false);

  const isRealPlaying = () => {
    setIsPlaying(true);
  };

  const isPaused = () => {
    setIsPlaying(false);
  };
  return (
    <div
      className={"fixed bottom-2 left-0 right-0 m-auto w-full"}
      style={{ zIndex: 600 }}
    >
      <div className={cn("w-full flex justify-center",  isPlaying && "justify-end")}>
        <div className="bg-primary w-fit rounded-full flex justify-center items-center p-2 border border-white fadeIn">
          {isLoading ? (
            <span className="fadeIn">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </span>
          ) : isPlaying ? (
            <button
              type="button"
              className="pause text-white fadeIn"
              onClick={() => setIsPlaying(false)}
              aria-label="Pause"
            >
              <Pause className=" w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              className="fadeIn text-white"
              onClick={() => setIsPlaying(true)}
              aria-label="Play"
            >
              <Play className="w-12 h-12 fadeIn" />
            </button>
          )}
        </div>

        <AudioPlayer
          style={{ display: "none" }}
          preload="metadata"
          ref={radiocontrol}
          onPlaying={isRealPlaying}
          onLoadedMetaData={onLoaded}
          onPause={isPaused}
        />
      </div>
    </div>
  );
};
