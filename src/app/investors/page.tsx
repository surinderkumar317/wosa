import React from 'react'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import Loading from "@/app/loading"; // ✅ Correct import for Next.js 15
import Link from "next/link";

const Slider = dynamic(() => import("@/components/SliderFull"), {
  loading: () => <Loading />,
});
const CommonImage = dynamic(() => import("@/components/common/Image"), {
  loading: () => <Loading />,
});
const OurOffices = dynamic(() => import("@/components/OurOffices"), {
  loading: () => <Loading />,
});

interface InvestorContent {
  heading: string;
  subheading: string;
}

interface InvestorLink {
  href: string;
  src: string;
  alt: string;
  title: string;
}

const investorContent: InvestorContent[] = [
  {
    heading: "Empowering Investors",
    subheading:
      "Transparency and trust – Your gateway to company insights, reports, and investor information.",
  },
];

const investorLinks: InvestorLink[] = [
  {
    href: "/investors/board-of-directors",
    src: "/images/board-dirctors.webp",
    alt: "Board Director",
    title: "Board Of Directors",
  },
  {
    href: "/investors/committee-board",
    src: "/images/committee-board.webp",
    alt: "Committee Board",
    title: "Committee Board",
  },
  {
    href: "#",
    src: "/images/financial-results.webp",
    alt: "Financial Results",
    title: "Financial Results",
  },
  {
    href: "/investors/shareholding-pattern",
    src: "/images/shareholding-pattern.webp",
    alt: "Shareholding Pattern",
    title: "Shareholding Pattern",
  },
  {
    href: "#",
    src: "/images/corporate-policies.webp",
    alt: "Corporate Policies",
    title: "Corporate Policies",
  },
  {
    href: "#",
    src: "/images/annual-report.webp",
    alt: "Annual Report",
    title: "Annual Report",
  },
  {
    href: "/investors/investor-grievance",
    src: "/images/investor-grievances.webp",
    alt: "Investor Grievances",
    title: "Investor Grievances",
  },
  {
    href: "/investors/prospectus",
    src: "/images/prospectus.webp",
    alt: "Draft Prospectus",
    title: "Draft Prospectus",
  },
];

const Investors: React.FC = () => {
  return (
    <>
      <Slider />
      
      <Suspense fallback={<Loading />}>        
        <LazySection>
          <div className="investor-container py-24">
            <div className="container m-auto">
              {investorContent.map(({ heading, subheading }, index) => (
                <div key={index} className="inverstor-content">
                  <h2>{heading}</h2>
                  <h3>{subheading}</h3>
                </div>
              ))}

              <div className="investor-grid-container">
                {investorLinks.map(({ href, src, alt, title }, index) => (
                  <Link
                    key={index}
                    href={href}
                    target='_blank'
                    className={`investor-grid ${
                      href === "#" ? "cursor-default" : ""
                    }`}
                  >
                    <div className="invest-g-img">
                      <CommonImage
                        classname="visa-flag-icon"
                        src={src}
                        alt={alt}
                        width={115}
                        height={115}
                      />
                    </div>
                    <h2>{title}</h2>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </LazySection>
        <LazySection>
          <OurOffices />
        </LazySection>
      </Suspense>
    </>
  );
};

export default Investors;
