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
    <div className="master-classes">
      <FormSlider heading={'Free Live Master Class'} paragraph={'⭐⭐⭐⭐⭐ 4.8 of 1000 + Reviews ✅11M+ Students Trusted Brand. We will happy to assist you to reach your desired band score.'} />

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
