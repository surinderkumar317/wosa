import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommonImage from "../common/Image";

type FilePreviewModalProps = {
  trigger: ReactNode;
  type: "image" | "video";
  src: string;
  title?: string;
  alt?: string;
};

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  trigger,
  type,
  src,
  title = "File Preview",
  alt = "preview",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="w-full max-w-[800px] fliepreview-modal top-[5%] translate-y-0" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-3xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[65vh] overflow-auto pr-2">
          {type === "image" ? (
            <CommonImage
              classname="w-full h-auto"
              src={src}
              alt={alt}
              width={1080}
              height={1080}
            />
          ) : (
            <video
              className="w-full h-auto"
              controls
              src={src}
              title={alt}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewModal;
