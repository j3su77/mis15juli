import { cn } from "@/lib/utils";
import Image from "next/image";

export const Cloud = ({
  w = 100,
  h = 100,
  t,
  b,
  l,
  r,
  rt = false,
  className,
}: {
  w: number;
  h: number;
  t?: string;
  b?: string;
  l?: string;
  r?: string;
  rt?: boolean;
  className?: string;
}) => {
  const style = {
    top: t,
    bottom: b,
    left: l,
    right: r,
  };

  return (
    <>
      <Image
        width={500}
        height={500}
        src="/cloud.png"
        alt=""
        className={cn("z-0",className)}
        style={{
          ...style,
          position: "absolute",
          width: w,
          height: "auto",
          transform: rt ? "rotate(310deg)" : "",
        }}
      />
    </>
  );
};
