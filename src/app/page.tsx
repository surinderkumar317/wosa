import React from 'react'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15

// 🎯 Dynamic imports for other components
const EmblaCarousel = dynamic(
  () => import("@/components/EmblaCarousel"),
  { loading: () => <Loading /> }
);
const AboutCompany = dynamic(
  () => import("@/components/about-company/AboutCompany"),
  { loading: () => <Loading /> }
);
const OurservicesSlider = dynamic(
  () => import("@/components/OurservicesSlider"),
  { loading: () => <Loading /> }
);
const Event = dynamic(() => import("@/components/events/Event"), {
  loading: () => <Loading />,
});
const Achievement = dynamic(() => import("@/components/Achievement"), {
  loading: () => <Loading />,
});
const LatestArticles = dynamic(() => import("@/components/LatestArticles"), {
  loading: () => <Loading />,
});
const EvaluationsTools = dynamic(
  () => import("@/components/EvaluationsTools"),
  { loading: () => <Loading /> }
);
const ImageGallery = dynamic(
  () => import("@/components/imagesgallery/ImageGallery"),
  { loading: () => <Loading /> }
);
const VideoGallery = dynamic(
  () => import("@/components/videogallery/VideoGallery"),
  { loading: () => <Loading /> }
);
const Testimonials = dynamic(() => import("@/components/testimonials/Testimonials"), {
  loading: () => <Loading />,
});
const Accolades = dynamic(() => import("@/components/Accolades"), {
  loading: () => <Loading />,
}); 

export default function Home() {
  return (
    <>
      
      {/* High Priority: Loads first */}
      <EmblaCarousel />

      {/* Wrap non-critical sections inside Suspense */}
      <Suspense fallback={<Loading />}>
        <LazySection>
          <AboutCompany />
        </LazySection>
        <LazySection>
          <Achievement />
        </LazySection>
        <LazySection>
          <OurservicesSlider />
        </LazySection>
        <LazySection>
          <Event />
        </LazySection>
        <LazySection>
          <LatestArticles />
        </LazySection>
        <LazySection>
          <EvaluationsTools />
        </LazySection>
        <LazySection>
          <ImageGallery />
        </LazySection>
        <LazySection>
          <VideoGallery />
        </LazySection>
        <LazySection>
          <Testimonials showButton={false} />
        </LazySection>
        <LazySection>
          <Accolades />
        </LazySection>
      </Suspense>
    </>
  );
}
