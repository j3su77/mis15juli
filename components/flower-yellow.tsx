import Image from "next/image";

export const FlowerYellow = ({
  w = 100,
  h = 100,
  t,
  b,
  l,
  r,
  rt = false,
}: {
  w: number;
  h: number;
  t?: string;
  b?: string;
  l?: string;
  r?: string;
  rt?: boolean;
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
        width={w}
        height={h}
        src="/flor3.svg"
        alt=""
        className=""
        style={{
          position: "absolute",
          ...style,
          width: w,
          height: "auto",
          transform: rt ? "rotate(310deg)" : "rotate(0deg)",
        }}
      />
    </>
  );
};