import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CommonImage from "./common/Image";
import Link from "next/link";

interface CoachingMedium {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  iconSrc: string;
  link: string;
}

const coachingMediums: CoachingMedium[] = [
  {
    id: 1,
    title: "Inhouse Coaching",
    description:
      "Explore our inhouse coaching courses to improve your English skills and crack English proficiency tests such as IELTS, PTE, TOEFL, learn foreign languages etc.",
    imageSrc: "/images/Inhouse-Coaching.webp",
    iconSrc: "/images/our-services-icon07.webp",
    link: "/inhouse-courses",
  },
  {
    id: 2,
    title: "Online Coaching",
    description:
      "Take online coaching at western overseas from anywhere to prepare for IELTS, PTE, TOEFL, Foreign languages and prepare more effectively at your own pace.",
    imageSrc: "/images/Online-Coaching.webp",
    iconSrc: "/images/our-services-icon08.webp",
    link: "/online-courses",
  },
  {
    id: 3,
    title: "Practice Packs",
    description:
      "Practice packs at Western Overseas analyze and improve performance. It removes difficulties and hesitation on the exam day to give confidence to crack the exam.",
    imageSrc: "/images/Practice-Pack.webp",
    iconSrc: "/images/our-services-icon09.webp",
    link: "/practice-packs",
  },
];

const CoachingMediums: React.FC = () => {
  return (
    <div className="our-coaching-mediums py-24">
      <div className="container m-auto">
        <div className="coaching-mediums-content mb-10 text-center">
          <h3>Education That Benefits</h3>
          <h2>Our Coaching Mediums</h2>
        </div>

        <div className="our-coaching-mediums our-services-new-section flex gap-10">
          {coachingMediums.map((medium) => (
            <Link key={medium.id} href={medium.link} className="no-underline w-2/6">
              <Card className="border p-3 bg-white shadow-lg rounded-md ourservices-box">
                <CardContent className="p-0">
                  <CommonImage
                    src={medium.imageSrc}
                    alt={medium.title}
                    width={300}
                    height={200}
                    classname="w-full object-cover rounded-md coach-img"
                  />
                  <div className="flex items-center mt-4 icon">
                    <CommonImage
                      src={medium.iconSrc}
                      alt={`${medium.title} icon`}
                      width={54}
                      height={54}
                    />
                  </div>
                  <div className="ourservices-content-container">
                    <h2 className="text-lg font-semibold text-center my-5">
                      {medium.title}
                    </h2>
                    <p className="mt-2 text-center">{medium.description}</p>
                    <Button className="mt-4 text-white rounded bg-white p-6">
                      Packages
                      <CommonImage
                        src="/images/our-services-arrow.webp"
                        alt="arrow"
                        width={43}
                        height={12}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachingMediums;
