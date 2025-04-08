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
const PageContent = dynamic(() => import("@/components/pagecontent/pageContent"), {
  loading: () => <Loading />,
});

const page = () => {
  return (
    <div className="about-reality-test">
      {/* High Priority: Loads first */}
      <FormSlider heading={'BOOK REALITY TEST'} paragraph={'PTE | TOEFL | CD-IELTS | Assess your Actual Level Before Final Exam'}/>
      
      {/* Wrap non-critical sections inside Suspense */}
      <Suspense fallback={<Loading />}>        
        <LazySection>   
          <AboutCompany/>
        </LazySection>
        <LazySection>      
          <PageContent/>
        </LazySection>
      </Suspense>
    </div>
  )
}

export default page
