import Image from "next/image";

export const Palm2 = ({
  w = 100,
  h = 100,
  t,
  b,
  l,
  r,
  rt ,
}: {
  w: number;
  h: number;
  t?: string;
  b?: string;
  l?: string;
  r?: string;
  rt?: number;
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
        src="/palma2.svg"
        alt=""
        className=""
        style={{
          position: "absolute",
          ...style,
          width: w,
          height: "auto",
          transform: rt ? `rotate(${rt}deg)` : "rotate(0deg)",
        }}
      />
    </>
  );
};
