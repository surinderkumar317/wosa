import { Suspense } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15

const FormSlider = dynamic(() => import("@/components/FormSlider"), {
  loading: () => <Loading />,
});
const HotLineServcies = dynamic(() => import("@/components/HotLineServcies"), {
  loading: () => <Loading />,
});
const OurOffices = dynamic(() => import("@/components/OurOffices"), {
  loading: () => <Loading />,
});

const Contact = () => {
  return (
    <div className="contact-us-container">
      {/* High Priority: Loads first */}
      <FormSlider
        heading={"Contact Us"}
        paragraph={"If you have a question or need assistance with Visa and immigration services, please feel free to ask, our experts at Western Overseas will provide you with the best information & support"}
        modalType="Enquiry"
      />
      
      {/* Wrap non-critical sections inside Suspense */}
      <Suspense fallback={<Loading />}>
        <LazySection>
          <HotLineServcies />
        </LazySection>
        <LazySection>
          <OurOffices />
        </LazySection>
      </Suspense>
    </div>
  );
};

export default Contact;
