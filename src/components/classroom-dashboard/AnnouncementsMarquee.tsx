import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const marqueeAnnouncements = [
  {
    title: "Rakhi 50% off",
    date: "2nd April 2025 3:07 PM",
    dialogTitle: "Are you absolutely sure?",
    dialogDescription:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  },
  // Add more if needed
];

const AnnouncementsMarquee = () => {
  return (
    <div className="stu-classroom-header bg-yellow-100 p-4 flex justify-center items-center gap-5 rounded-xl text-black mb-6 announcement-marquee-container">
      {marqueeAnnouncements.map((item, index) => (
        <Dialog key={index}>
          <DialogTrigger className="text-2xl annoucement-marquee-text">
            <strong>{item.title}</strong>{" "}
            <span className="text-red-600">{item.date}</span>
          </DialogTrigger>
          <DialogContent className="common-modal-form w-full max-w-xl">
            <DialogHeader>
              <DialogTitle>{item.dialogTitle}</DialogTitle>
              <DialogDescription className="!my-6 text-black">
                {item.dialogDescription}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default AnnouncementsMarquee;
