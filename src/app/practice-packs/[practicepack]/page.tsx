"use client"; // Now this is a client component
import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import LazySection from "@/components/LazySection";

const FormBanner = dynamic(() => import("@/components/coaching/FormBanner"), {
  loading: () => <Loading />,
});
const PageContent = dynamic(
  () => import("@/components/pagecontent/pageContent"),
  {
    loading: () => <Loading />,
  }
);

const singlePracticepackCourse = [
  "value-pack",
];

export default function SinlePrackticepack() {
  const pathname = usePathname();
  const singleprackticepack = pathname.split("/").pop()?.toLowerCase(); // Extract the last part of the pathname

  if (!singleprackticepack || !singlePracticepackCourse .includes(singleprackticepack)) {
    return notFound();
  }

  return (
    <>
      <FormBanner
        heading={`Ielts 15 Days Value-pack`}
        paragraph={'Terms and conditions are mentioned below.'}
        modalType="practice"
      />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <PageContent />
        </LazySection>       
      </Suspense>
    </>
  );
}
