import { Suspense } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15

const FormSlider = dynamic(() => import("@/components/FormSlider"), {
  loading: () => <Loading />,
});

const OurservicesSlider = dynamic(() => import("@/components/OurservicesSlider"), {
    loading: () => <Loading />,
  }
);

const LatestArticles = dynamic(() => import("@/components/LatestArticles"), {
    loading: () => <Loading />,
  }
);

const EvaluationsTools = dynamic(() => import("@/components/EvaluationsTools"), {
  loading: () => <Loading />,
}
);

const page = () => {
  return (
    <div className="enquiry-setion">
      {/* High Priority: Loads first */}
      <FormSlider
        heading={"Quick Enquiry"}
        paragraph={
          "Get quick enquiry and answers related to visa, English proficiency tests, career opportunities, and overseas information at Western Overseas. Register today!"
        }
        modalType="Enquiry"
      />

      {/* Wrap non-critical sections inside Suspense */}
      <Suspense fallback={<Loading />}>
        <LazySection>
          <OurservicesSlider />
        </LazySection>
        <LazySection>
          <LatestArticles />
        </LazySection>
        <LazySection>
          <EvaluationsTools/>
        </LazySection>
      </Suspense>
    </div>
  );
};

export default page;
