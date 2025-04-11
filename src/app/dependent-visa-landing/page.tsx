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
      {/* High Priority: Loads first */}
      <FormSlider 
        heading={'Apply for Dependent Visa'} 
        paragraph={'Dependents can be a spouse or minor children (unmarried) who want to join the main applicant in any of the countries. Apply with western overseas to accompany your family member abroad.'} 
        modalType="Enquiry"
      />

      {/* Wrap non-critical sections inside Suspense */}
      <Suspense fallback={<Loading />}>
        <LazySection>
          <ImmigrationVisaSlider subHeading={'We are professional Expert in Immigration Visa'} heading={'Countries We Serve For Dependent Visa'} />
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
