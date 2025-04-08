"use client";  // Now this is a client component
import React from 'react'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15

const FormSlider = dynamic(() => import("@/components/FormSlider"), {
  loading: () => <Loading />,
});
const AboutCompany = dynamic(() => import("@/components/about-company/AboutCompany"), {
  loading: () => <Loading />,
});
const Accolades = dynamic(() => import("@/components/Accolades"), {
  loading: () => <Loading />,
});
const ImageGallery = dynamic(() => import("@/components/imagesgallery/ImageGallery"), {
  loading: () => <Loading />,
});
const ImmigrationVisaSlider = dynamic(() => import("@/components/ImmigrationVisa"), {
  loading: () => <Loading />,
});

const page = () => {
  return (
    <div className="visa-landing">
      <FormSlider heading={'Apply for PR Visa'} paragraph={'Permanent Residency status allows you to be a legal resident of another country like Canada or Australia, etc. PR includes Express Entry and PNP programs.'} />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <ImmigrationVisaSlider subHeading={'We are professional Expert in Immigration Visa'} heading={'Countries We Serve For Permanent Residency Visa'} />
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
  )
}

export default page
