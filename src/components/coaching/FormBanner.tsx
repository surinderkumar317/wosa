import React from "react";
import CommonImage from "../common/Image";
import CourseModal from "./CourseModal";
import PrackticePackModal from "./PrackticePackModal";
import RealitytestModal from "./RealitytestModal";

interface FormBannerProps {
  heading: string;
  paragraph: string;
}

interface BannerContent {
  title: string;
  subtitle: string;
  features: { icon: string; text: string }[];
  originalPrice: string;
  discountedPrice: string;
}

const images: string[] = ["/images/package-img.webp"];

const bannerContent: BannerContent = {
  title: "CELPIP | 90 DAYS",
  subtitle: "CELPIP | General",
  features: [
    { icon: "fa-book", text: "LISTENING, READING, SPEAKING, WRITING" },
    { icon: "fa-clock", text: "90 Days" },
  ],
  originalPrice: "INR 14500",
  discountedPrice: "INR 11441",
};

interface FormBannerProps {
  heading: string;
  paragraph: string;
  modalType: "course" | "practice" | "realitytest";
}

const FormBanner: React.FC<FormBannerProps> = ({ heading, paragraph, modalType }) => {
  return (
    <div className="form-slider-container form-banner lg:relative flex lg:justify-between lg:items-center lg:mx-auto 2xl:py-20 xl:py-11 lg:flex-row flex-col flex-col-reverse">
      <div className="lg:w-1/3 lg:p-6 lg:ml-11 w-full p-10 left-slideform">
        <h1>{heading}</h1>
        <p>{paragraph}</p>
        {modalType === "course" && <CourseModal heading="Inhouse Package" />}
        {modalType === "practice" && <PrackticePackModal heading="Practice Pack" />}
        {modalType === "realitytest" && <RealitytestModal heading="Reality Test Package" />}
      </div>
      <div className="lg:w-2/4 lg:p-0 px-5 pt-5 w-full form-slider-img relative">
        <div className="coaching-text absolute top-10 left-5">
          <h2 className="text-3xl font-bold">{bannerContent.title}</h2>
          <h3 className="text-2xl my-3">{bannerContent.subtitle}</h3>
          <div className="single-reality-list my-3">
            <ul>
              {bannerContent.features.map((feature, idx) => (
                <li key={idx} className={feature.icon}>
                  <i className={`fa-solid ${feature.icon}`}></i> {feature.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="pack-cont-holder">
            <span className="cross-price text-3xl font-bold text-[#f00]">
              <del>{bannerContent.originalPrice}</del>
            </span>
            <p className="pack-big-text text-3xl font-bold">
              {bannerContent.discountedPrice}
            </p>
          </div>
        </div>
        <div className="flex pricebanner-img">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%]">
              <CommonImage
                src={src}
                alt="Banner Image"
                width={1470}
                height={570}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormBanner;
