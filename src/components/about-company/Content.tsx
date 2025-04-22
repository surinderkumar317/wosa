"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CommonImage from "@/components/common/Image";

interface ModalContent {
  title: string;
  description: string;
}

const AboutContent: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: "",
    description: "",
  });

  const openModal = (title: string, description: string): void => {
    setModalContent({ title, description });
    setModalOpen(true);
  };

  const aboutContentData: { title: string; subtitle: string; description: string }[] = [
    {
      title: "About Us",
      subtitle: "BEST VISA AND IMMIGRATION CONSULTANTS",
      description:
        "Western Overseas is one of the world’s top visa consultants in India, established in 2004. We are registered and certified immigration consultants in Canada and Australia.",
    },
  ];

  const listItems: { title: string; description: string }[] = [
    {
      title: "IELTS PTE TOEFL, etc. Coaching for Exam Success",
      description:
        "Giving an English proficiency test is the initial step of your journey abroad. Western Overseas offers exclusive online and offline courses for IELTS, PTE, TOEFL, DUOLINGO, and foreign languages to achieve desired scores.",
    },
    {
      title: "Get Free Counseling Today Anytime Anywhere",
      description:
        "If you plan to go abroad, visit Western Overseas for free counseling. We help our clients in coaching for English proficiency tests, selection of colleges and courses, and choosing a country by assessing the profile.",
    },
    {
      title: "Your Visa Needs Our Expert Solutions",
      description:
        "Lodging your visa application with Western Overseas improves the chances of success and peace of mind. Our visa experts team provides seamless solutions for all visa types worldwide.",
    },
  ];

  return (
    <>
      <div className="aboutcomp-container">
        {aboutContentData.map((item, index) => (
          <div key={index} className="aboutcomp-content">
            <h3>{item.title}</h3>
            <h2>{item.subtitle}</h2>
            <p>{item.description}</p>
          </div>
        ))}

        <div className="aboutcomp-list">
          <ul>
            {listItems.map((item, index) => (
              <li key={index} onClick={() => openModal(item.title, item.description)} className="cursor-pointer">
                <h3>{item.title}</h3>
                <CommonImage
                classname={"large-arrow"}
                src={"/images/common-large-arrow.webp"}
                alt={"arrow"}
                width={43}
                height={12}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="common-modal-content w-full max-w-3xl top-[5%] translate-y-0">
          <DialogHeader>
            <DialogTitle>{modalContent.title}</DialogTitle>
            <DialogDescription>{modalContent.description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutContent;
