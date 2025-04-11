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

const singleInhouseCourse = [
  "duolingo-90-days",
];

export default function SinleInhouseCourse() {
  const pathname = usePathname();
  const singleinhouse = pathname.split("/").pop()?.toLowerCase(); // Extract the last part of the pathname

  if (!singleinhouse || !singleInhouseCourse .includes(singleinhouse)) {
    return notFound();
  }

  return (
    <>
      <FormBanner
        heading={`CELPIP | 90 DAYS | AMBALA`}
        paragraph={'Terms and conditions are mentioned below.'}
        modalType="course"
      />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <PageContent />
        </LazySection>       
      </Suspense>
    </>
  );
}
