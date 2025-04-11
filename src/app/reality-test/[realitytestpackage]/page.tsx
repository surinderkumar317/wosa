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

const singleRealitytestPack = [
  "toefl", "cd-ielts"
];

export default function SinlePrackticepack() {
  const pathname = usePathname();
  const realitytestpack = pathname.split("/").pop()?.toLowerCase(); // Extract the last part of the pathname

  if (!realitytestpack || !singleRealitytestPack .includes(realitytestpack)) {
    return notFound();
  }

  return (
    <>
      <FormBanner
        heading={`Toefl`}
        paragraph={'Terms and conditions are mentioned below.'}
        modalType="realitytest"
      />

      <Suspense fallback={<Loading />}>
        <LazySection>
          <PageContent />
        </LazySection>       
      </Suspense>
    </>
  );
}
