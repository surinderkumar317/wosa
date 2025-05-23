import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommonImage from "@/components/common/Image";

const Content: React.FC = () => {
  return (
    <div className="image-gallery-text">
      <h2>Image Gallery</h2>
      <Button className="gallery-btn hover-section" asChild>
        <Link href="/web-media">
          View All{" "}          
           <CommonImage
            classname={"large-arrow"}
            src={"/images/our-services-arrow.webp"}
            alt={"arrow"}
            width={43}
            height={12}
            />
        </Link>
      </Button>
    </div>
  );
};

export default Content;
