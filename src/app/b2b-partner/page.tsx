import React from 'react'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import FormSlider from '@/components/FormSlider';

const OurservicesSlider = dynamic(() => import("@/components/OurservicesSlider"), {
  loading: () => <Loading />,
});
const PageContent = dynamic(() => import("@/components/pagecontent/pageContent"), {
  loading: () => <Loading />,
});


const page = () => {
  return (
    <div className="b2b-partner">
      {/* High Priority: Loads first */}
      <FormSlider
        heading={`Partner With Us`}
        paragraph={'Let us connect for immigration industry'}
        modalType="B2bRegistration"
      />

      {/* Wrap non-critical sections inside Suspense */}
      <Suspense fallback={<Loading />}>
        <LazySection>
          <OurservicesSlider />
        </LazySection>
        <LazySection>
          <PageContent />
        </LazySection>
      </Suspense>
    </div>
  )
}

export default page
