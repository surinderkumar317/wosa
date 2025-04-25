import React from "react";
import Content from "@/components/imagesgallery/Content";
import Gallery from "@/components/imagesgallery/Gallery";
import CommonImage from "@/components/common/Image";

const ImageGallery: React.FC = () => {
  return (
    <div className="gallery-section lg:py-24 py-12">
      <div className="gallery-inner-section">
        <div className="container flex lg:flex-row flex-col m-auto py-5 gap-10 items-center">
          <div className="lg:w-4/5 w-full px-3">
            <Gallery />
          </div>
          <div className="lg:w-1/5 w-full px-3">
            <Content />
          </div>
        </div>
      </div>
      <div className="image-shape-left lg:block hidden">
        <CommonImage
          classname={"shape-icon"}
          src={"/images/img-galler-up.webp"}
          alt={"gallery shape"}
          width={119}
          height={139}
        />
      </div>
      <div className="image-shape-right lg:block hidden">
        <CommonImage
          classname={"shape-icon"}
          src={"/images/clould.webp"}
          alt={"gallery shape"}
          width={135}
          height={66}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
