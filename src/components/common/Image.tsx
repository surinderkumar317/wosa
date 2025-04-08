import React from "react";
import Image from "next/image";

interface ImageDimensionI {
  width: number;
  height: number;
  alt: string;
  src: string;
  classname?: string;
}

const CommonImage = ({
  width,
  height,
  alt,
  src,
  classname,
}: ImageDimensionI) => {
  return (
    <Image
      src={src !== "" ? src : "/images/No-Image-Placeholder.webp"}
      alt={alt}
      width={width}
      height={height}      
      className={classname}
    />
  );
};

export default CommonImage;
