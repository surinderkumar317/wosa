"use client"; // Now this is a client component
import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import LazySection from "@/components/LazySection";

const FormSlider = dynamic(() => import("@/components/FormSlider"), {
  loading: () => <Loading />,
});
const PageContent = dynamic(
  () => import("@/components/pagecontent/pageContent"),
  {
    loading: () => <Loading />,
  }
);

const singleEvents = [
  "educationfair",
];

export default function SingleEventPage() {
  const pathname = usePathname();
  const singleevent = pathname.split("/").pop()?.toLowerCase(); // Extract the last part of the pathname

  if (!singleevent || !singleEvents.includes(singleevent)) {
    return notFound();
  }

  return (
    <>
      <FormSlider
        heading={`Biggest Education & Immigration Fair 2025`}
        paragraph={'We invite you to be a part of India Biggest Education and Immigration Fair 2025, taking place from 8th to 20th April across 12 cities.'}
      />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <PageContent />
        </LazySection>       
      </Suspense>
    </>
  );
}
