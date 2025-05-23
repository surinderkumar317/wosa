import React from "react";
import AboutContent from "@/components/about-company/Content";
import CommonImage from "@/components/common/Image";

const AboutCompany: React.FC = () => {
  return (
    <div className="w-full lg:py-24 py-12 about-company-container">
      <div className="container m-auto flex gap-10 items-center lg:flex-row lg:px-0 flex-col px-5">
        <div className="lg:w-6/12 w-full">
          <div className="w-full">
            <CommonImage
              classname={"about-image"}
              src={"/images/aboutcompany.webp"}
              alt={"About Company"}
              width={1000}
              height={787}
            />
          </div>
        </div>
        <div className="lg:w-6/12 w-full">
          <AboutContent />
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
