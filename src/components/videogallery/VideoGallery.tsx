import React from "react";
import Content from "@/components/videogallery/Content";
import Gallery from "@/components/videogallery/Gallery";
import CommonImage from "@/components/common/Image";

const VideoGallery = () => {
  return (
    <div className="gallery-section py-24">
      <div className="gallery-inner-section">
        <div className="container flex lg:flex-row flex-col-reverse m-auto py-5 gap-10 items-center">          
          <div className="lg:w-1/5 w-full px-3">
            <Content />
          </div>
          <div className="lg:w-4/5 w-ful px-3">
            <Gallery />
          </div>
        </div>
      </div>
      <div className="image-shape-left">
        <CommonImage
          classname={"shape-icon"}
          src={"/images/img-galler-up.webp"}
          alt={"gallery shape"}
          width={119}
          height={139}
        />
      </div>
      <div className="image-shape-right">
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

export default VideoGallery;
