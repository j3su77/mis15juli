"use client";

import Image from "next/image";
import { RenderImageContext, RenderImageProps, RowsPhotoAlbum } from "react-photo-album";

import photos from "./photos-gallery";


function renderNextImage({ alt = "", title, sizes }: RenderImageProps, { photo, width, height }: RenderImageContext) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
      className="photo-frame"
    >
      <Image
        fill
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}

export const Gallery = () => {
  return (
    <section
      className="p-3 md:p-8 bg-primary mt-8"
      id="home"
      // style={{ position: "relative" }}
    >
      <RowsPhotoAlbum
        photos={photos}
        render={{ image: renderNextImage }}
        
        defaultContainerWidth={1200}
        sizes={{
          size: "1168px",
          sizes: [
            { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
          ],
        }}
      />
    </section>
  );
};
