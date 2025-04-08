"use client";  // Now this is a client component
import React from 'react'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import LazySection from "@/components/LazySection";

const EmblaCarousel = dynamic(() => import("@/components/EmblaCarousel"), {
  loading: () => <Loading />,
});
const PageContent = dynamic(() => import("@/components/pagecontent/pageContent"), {
  loading: () => <Loading />,
});

const page = () => {
  return (
    <div className="b2b-partner">
      <EmblaCarousel />
      <Suspense fallback={<Loading />}>
        <LazySection>
          <PageContent />
        </LazySection>
      </Suspense>
    </div>
  )
}

export default page
