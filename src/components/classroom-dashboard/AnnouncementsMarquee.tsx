import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define type for announcement items
type MarqueeAnnouncement = {
  title: string;
  date: string;
  dialogTitle: string;
  dialogDescription: string;
};

// Typed data
const marqueeAnnouncements: MarqueeAnnouncement[] = [
  {
    title: "Rakhi 50% off",
    date: "2nd April 2025 3:07 PM",
    dialogTitle: "Are you absolutely sure?",
    dialogDescription:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  },
  // Add more if needed
];

const AnnouncementsMarquee: React.FC = () => {
  return (
    <div className="stu-classroom-header bg-yellow-100 p-4 flex justify-center items-center gap-5 rounded-xl text-black mb-6 announcement-marquee-container">
      {marqueeAnnouncements.map((item, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <button className="text-2xl annoucement-marquee-text">
              <strong>{item.title}</strong>{" "}
              <span className="text-red-600">{item.date}</span>
            </button>
          </DialogTrigger>
          <DialogContent className="common-modal-content w-full max-w-xl top-[5%] translate-y-0">
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
