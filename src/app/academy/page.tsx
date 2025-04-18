import React from 'react'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import LazySection from "@/components/LazySection";

const FormSlider = dynamic(() => import("@/components/FormSlider"), {
  loading: () => <Loading />,
});
const CoachingMediums = dynamic(() => import("@/components/CoachingMediums"), {
  loading: () => <Loading />,
});
const ImageGallery = dynamic(() => import("@/components/imagesgallery/ImageGallery"), {
  loading: () => <Loading />,
});
const LanguageCourses = dynamic(() => import("@/components/LanguageCourses"), {
  loading: () => <Loading />,
});
const Testimonials = dynamic(() => import("@/components/testimonials/Testimonials"), {
  loading: () => <Loading />,
});

const page = () => {
  return (
    <div className="academy-container">
      {/* High Priority: Loads first */}
      <FormSlider 
        heading={'IELTS  PTE TOEFL COACHING'} 
        paragraph={'Try our online and offline coaching to get instant scores on English proficiency tests like IELTS, PTE, TOEFL, DUOLINGO, and Foreign Languages.'} 
        modalType="Enquiry"
      />

      {/* Wrap non-critical sections inside Suspense */}
      <Suspense fallback={<Loading />}>
        <LazySection>
          <CoachingMediums />
        </LazySection>
        <LazySection>
          <LanguageCourses />
        </LazySection>
        <LazySection>
          <ImageGallery />
        </LazySection>
        <LazySection>
          <Testimonials />
        </LazySection>
      </Suspense>
    </div>
  )
}

export default page
