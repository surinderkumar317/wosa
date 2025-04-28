import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const MarqueeModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  const [renderModal, setRenderModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      document.body.classList.add("lock-scroll"); // 🚀 Add class to body
    } else {
      const timer = setTimeout(() => {
        setRenderModal(false);
        document.body.classList.remove("lock-scroll"); // 🚀 Remove class from body
      }, 300); // matches animation duration
  
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  

  if (!renderModal) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-85 pt-10 common-modal-content marquee-modal w-full">
      <div
        className={`bg-white relative rounded-lg p-6 w-full max-w-3xl transform transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="text-black font-bold hover:text-black"
          >
            ✕
          </button>
        </div>
        <ScrollArea className="h-[200px] w-full">
          <p className="text-black leading-5">{description}</p>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MarqueeModal;
