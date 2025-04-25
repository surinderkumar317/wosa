"use client"; // Ensures this runs only on the client side

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CommonImage from "./common/Image";

// Dynamically import CountUp to prevent SSR issues
const CountUp = dynamic(() => import("react-countup"), { ssr: false });

interface ContentItem {
  heading: string;
  subheading: string;
}

const contentItems: ContentItem[] = [
  { heading: "Why Choose Western Overseas?", subheading: "Success and Achievement" },
];

interface AchievementItem {
  end: number;
  label: string;
  modalHeading: string;
  modalText: string;
}

const achievements: AchievementItem[] = [
  { end: 50000, label: "IELTS Achievers", modalHeading: "IELTS Achievers", modalText: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour." },
  { end: 300000, label: "Reality Test", modalHeading: "Reality Test", modalText: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour." },
  { end: 17000, label: "PTE SUCCESS", modalHeading: "PTE Success", modalText: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour." },
  { end: 10000, label: "VISA Success", modalHeading: "VISA Success", modalText: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour." },
];

const Achievement: React.FC = () => {
  // Hook to detect if the section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Run animation only once
    threshold: 0.3, // Trigger when 30% of the section is in view
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ heading: "", text: "" });

  const handleOpenModal = (heading: string, text: string) => {
    setModalContent({ heading, text });
    setModalOpen(true);
  };

  return (
    <>
      <div ref={ref} className="achievements-container lg:py-24 py-12 justify-items-center">
        <div className="container m-auto lg:p-0 px-3">
          {contentItems.map((item, index) => (
            <div className="achievement-content relative z-10" key={index}>
                <h3 className="text-center">{item.heading}</h3>
                <h2 className="text-center">{item.subheading}</h2>            
            </div>
          ))}
          <div className="achievement-numbers flex-col lg:flex-row relative z-10">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="achievement-num-container cursor-pointer"
                onClick={() => handleOpenModal(achievement.modalHeading, achievement.modalText)}
              >
                <h2>
                  {inView && <CountUp start={0} end={achievement.end} duration={3} separator="" />}+
                </h2>
                <p>{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ach-left-shape">
          <CommonImage src="/images/usp-number-shape-left.webp" alt="shape-one" width={61} height={141} />
        </div>
        <div className="ach-right-shape">
          <CommonImage src="/images/usp-number-shape-right.webp" alt="shape-two" width={90} height={206} />
        </div>
      </div>
      
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="common-modal-content w-full max-w-4xl top-[5%] translate-y-0">
          <DialogHeader>
            <DialogTitle>{modalContent.heading}</DialogTitle>
            <DialogDescription>{modalContent.text}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Achievement;
