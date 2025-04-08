import React from 'react'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import LazySection from "@/components/LazySection";

const Slider = dynamic(() => import("@/components/SliderFull"), {
  loading: () => <Loading />,
});
const PageContent = dynamic(
  () => import("@/components/pagecontent/pageContent"),
  { loading: () => <Loading /> }
);
const OurOffices = dynamic(() => import("@/components/OurOffices"), {
  loading: () => <Loading />,
});

const About = () => {
  return (
    <>
      {/* High Priority: Loads first */}
      <Slider />
      
      {/* Wrap non-critical sections inside Suspense */}
      <Suspense fallback={<Loading />}>        
        <LazySection>
          <PageContent />
        </LazySection>
        <LazySection>
          <OurOffices />
        </LazySection>
      </Suspense>
    </>
  );
};

export default About;
