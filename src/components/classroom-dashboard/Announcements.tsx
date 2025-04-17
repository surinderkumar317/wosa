"use client";
import React from "react";
import ClassroomHeaderData from "./ClassroomHeaderData";
import CommonImage from "../common/Image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const announcements = [
  {
    date: "02/04/2025 03:07 PM",
    title: "Rakhi 50% off",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    date: "02/04/2025 03:07 PM",
    title: "Dewali 50% off",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
];

const Announcements = () => {
  return (
    <div className="stu-classroom-cont flex flex-col w-full">
      <ClassroomHeaderData />

      <div className="stu-classroom-content w-full">
        <div className="stu-classroom-row-content w-full mb-5">
          <h2 className="text-2xl mb-5">Announcements</h2>

          <div className="annoucement-accord">
            {announcements.map((item, index) => (
              <Accordion key={index} type="single" collapsible className="mb-3">
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="announcement-accordion justify-between gap-5 bg-gray-100 p-2">
                    <p className="p-0 flex gap-3 items-center text-[18px] announcement-accordian">
                      <strong className="bg-yellow-300 p-3">
                        {item.date}
                      </strong>
                      <span>{item.title}</span>
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="p-5">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>

          <div className="no-image flex w-full justify-center hidden">
            <CommonImage
              classname={"icon"}
              src={"/dashboard-images/no-data-found.webp"}
              alt={"No Data Found"}
              width={300}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
