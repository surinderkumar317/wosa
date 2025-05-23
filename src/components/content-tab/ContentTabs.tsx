"use client";

import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CommonImage from "../common/Image";

interface TabContent {
  id: number;
  title: string;
  content: React.ReactNode;
}

const tabData: TabContent[] = [
  {
    id: 1,
    title: "Western Overseas Delhi",
    content: (
      <>
        <h2>Best Visa Consultants in Delhi</h2>
        <p>
          Since 2004, Western Overseas has always been in the limelight due to our transparent, reliable, and trusted VISA and Immigration Services.
        </p>
        <CommonImage
          src="/images/image-gallery01.webp"
          alt="image"
          width={1080}
          height={1080}
        />
        <h3>Why do we need study VISA consultants?</h3>
        <p>
          Let&apos;s find out why international education has touched the pinnacle.
        </p>
        <h3>Our Achievements:</h3>
        <ul>
          <li>CIEC – Canada India Education Council</li>
          <li>IEAA – The International Education Association of Australia</li>
          <li>ISANA – International Education Associations Inc.</li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    title: "Best Visa Consultants in Delhi",
    content: (
      <>
        <h2>Best Visa Consultants</h2>
        <p>
          Western Overseas has always been in the limelight due to our transparent, reliable, and trusted VISA and Immigration Services.
        </p>
        <h3>Why do we need study VISA consultants?</h3>
        <p>
          Globalization has changed the ways countries contribute to bringing prosperity at the international level.
        </p>
        <h3>Our Achievements:</h3>
        <ul>
          <li>CIEC – Canada India Education Council</li>
          <li>IEAA – The International Education Association of Australia</li>
          <li>ISANA – International Education Associations Inc.</li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    title: "Best Visa",
    content: (
      <>
        <h2>Best Visa</h2>
        <p>
          Western Overseas has always been in the limelight due to our transparent, reliable, and trusted VISA and Immigration Services.
        </p>
        <h3>Why do we need study VISA consultants?</h3>
        <p>
          Globalization has changed the ways countries contribute to bringing prosperity at the international level.
        </p>
        <h3>Our Achievements:</h3>
        <ul>
          <li>CIEC – Canada India Education Council</li>
          <li>IEAA – The International Education Association of Australia</li>
          <li>ISANA – International Education Associations Inc.</li>
        </ul>
      </>
    ),
  },
];

const ContantTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(String(tabData[0].id));
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setHasInteracted(true);
  };

  useEffect(() => {
    if (hasInteracted && scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeTab, hasInteracted]);
  
  return (
    <div className="container m-auto content-tab lg:py-20 py-5" ref={scrollTargetRef}>
      {/* Tabs - Visible only on larger screens */}
      <div className="hidden md:flex">
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full px-4 pb-5 flex gap-4 justify-between common-main-tabcont"
        >
            {tabData.map((tab) => (
              <TabsContent
                key={tab.id}
                value={String(tab.id)}
                className="tab-content w-3/4"
              >
                {tab.content}
              </TabsContent>
            ))}
          <TabsList className="flex flex-col gap-10 w-1/4 common-tab-list">
            <div className="tab-sticky">
              {tabData.map((tab) => (
                <TabsTrigger key={tab.id} value={String(tab.id)}>
                  <CommonImage
                    src="/images/our-services-arrow.webp"
                    alt="arrow"
                    width={43}
                    height={12}
                  />{" "}
                  {tab.title}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </Tabs>
      </div>

      {/* Accordion - Visible only on mobile screens */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="content-tab-mobile">
          {tabData.map((tab) => (
            <AccordionItem key={tab.id} value={String(tab.id)} className="content-tab-list">
              <AccordionTrigger>{tab.title}</AccordionTrigger>
              <AccordionContent className="tab-content">{tab.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ContantTabs;
