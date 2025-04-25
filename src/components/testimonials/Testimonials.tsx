import React from "react";
import TestimonialsSlider from "@/components/testimonials/TestimonialsSlider";
import CommonImage from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TestimonialsProps {
  showButton?: boolean; // Prop to control button visibility
}

const Testimonials: React.FC<TestimonialsProps> = ({ showButton = true }) => {
  return (
    <div className="testimonials-section lg:py-24 py-5">
      <div className="container m-auto relative">
        <div className="w-full testimonial-text items-center">
          <h3 className="text-center">What The People Thinks About Us</h3>
          <h2>Testimonials</h2>
        </div>
        <div className="w-full testimonails-slider my-10 relative lg:gap-10 gap-0 flex lg:px-0 px-5">
          <TestimonialsSlider />
        </div>

        {/* Conditionally Render Button */}
        {showButton && (
          <div className="w-full loader-btn pb-10 flex justify-center">
            <Button asChild>
              <Link href="/testimonials">
                View All
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
        )}

        <div className="testi-shape-top absolute top-0 left-0">
          <CommonImage
            classname={"shape-icon"}
            src={"/images/testi-bottom.webp"}
            alt={"Testimonials shape"}
            width={248}
            height={183}
          />
        </div>
        <div className="testi-shape-top absolute -bottom-11 right-0">
          <CommonImage
            classname={"shape-icon"}
            src="/images/testi-bottom.webp"
            alt="Testimonials Shape"
            width={248}
            height={183}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
