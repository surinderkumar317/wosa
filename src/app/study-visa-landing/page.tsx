"use client";  // Now this is a client componentimport React from "react";
import React from 'react'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import LazySection from "@/components/LazySection";

const FormSlider = dynamic(() => import("@/components/FormSlider"), {
  loading: () => <Loading />,
});
const AboutCompany = dynamic(
  () => import("@/components/about-company/AboutCompany"),
  {
    loading: () => <Loading />,
  }
);
const Accolades = dynamic(() => import("@/components/Accolades"), {
  loading: () => <Loading />,
});
const ImageGallery = dynamic(
  () => import("@/components/imagesgallery/ImageGallery"),
  {
    loading: () => <Loading />,
  }
);
const ImmigrationVisaSlider = dynamic(
  () => import("@/components/ImmigrationVisa"),
  {
    loading: () => <Loading />,
  }
);

const page = () => {
  return (
    <div className="visa-landing">
      <FormSlider
        heading={"Make your Future with our Experts"}
        paragraph={
          "Get free online and offline counseling from experts on courses, colleges, admission criteria, and the application process."
        }
      />
      <Suspense fallback={<Loading />}>
        <LazySection>
          <ImmigrationVisaSlider
            subHeading={"We are professional Expert in Immigration Visa"}
            heading={"Countries We Serve For Study Visa"}
          />
        </LazySection>
        <LazySection>
          <AboutCompany />
        </LazySection>
        <LazySection>
          <ImageGallery />
        </LazySection>
        <LazySection>
          <Accolades />
        </LazySection>
      </Suspense>
    </div>
  );
};

export default page;
