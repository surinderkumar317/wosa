"use client";  // Now this is a client component
import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import LazySection from "@/components/LazySection";

const FormSlider = dynamic(() => import("@/components/FormSlider"), {
  loading: () => <Loading />,
});
const ImageGallery = dynamic(() => import("@/components/imagesgallery/ImageGallery"), {
  loading: () => <Loading />,
});
const PageContent = dynamic(() => import("@/components/pagecontent/pageContent"), {
  loading: () => <Loading />,
});
const VideoGallery = dynamic(() => import("@/components/videogallery/VideoGallery"), {
  loading: () => <Loading />,
});

const allowedCountries = ["canada", "australia", "united-kingdom", "united-states", "new-zealand"];

export default function CountryVisaPage() {
  const pathname = usePathname();
  const country = pathname.split("/").pop()?.toLowerCase(); // Extract the last part of the pathname

  if (!country || !allowedCountries.includes(country)) {
    return notFound();
  }

  return (
    <div>
      <FormSlider
        heading={`Country ${country.toUpperCase()}`}
        paragraph={'If you have a question or need assistance with Visa and immigration services, please feel free to ask, our experts at Western Overseas will provide you with the best information & support'}
        modalType="Enquiry"
      />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <PageContent />
        </LazySection>
        <LazySection>
          <ImageGallery />
        </LazySection>
        <LazySection>
          <VideoGallery />
        </LazySection>
      </Suspense>
    </div>
  );
}
