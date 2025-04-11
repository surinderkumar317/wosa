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
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <Loading />,
});

const page = () => {
  return (
    <div className="exam-booking">
      <FormSlider 
        heading={'Book Exam at Discounted Price'} 
        paragraph={'Exclusive Discounts: Book Your PTE, TOEFL or IELTS Exam Now and Save Big!'} 
        modalType="Enquiry"
      />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <AboutCompany />
        </LazySection>
        <LazySection>
          <Testimonials />
        </LazySection>
      </Suspense>
    </div>
  )
}

export default page
