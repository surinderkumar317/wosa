import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommonImage from "../common/Image";
import { Label } from "@radix-ui/react-label";

// **Zod Schema for File Validation**
const ProfileChangeSchema = z.object({
  attachments: z
    .custom<FileList | null>((files) => files instanceof FileList, {
      message: "Please select an image file.",
    })
    .refine((files) => files && files.length > 0, {
      message: "Please select an image file.",
    })
    .refine(
      (files) =>
        files &&
        Array.from(files).every((file) =>
          ["image/jpeg", "image/png", "image/webp"].includes(file.type)
        ),
      {
        message: "Invalid file format. Allowed: jpg, png, jpeg, webp",
      }
    ),
});

const ProfilePicture = () => {
  const [open, setOpen] = useState(false); // State to control modal visibility

  const profileChangeForm = useForm<z.infer<typeof ProfileChangeSchema>>({
    resolver: zodResolver(ProfileChangeSchema),
    defaultValues: {
      attachments: null,
    },
  });

  const handleProfileChangeSubmit = (
    data: z.infer<typeof ProfileChangeSchema>
  ) => {
    console.log("Form Data Submitted:", data);

    // Simulate an upload process (replace with actual API call)
    setTimeout(() => {
      setOpen(false); // Close modal after successful upload
      profileChangeForm.reset(); // Optional: Reset form after submission
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full flex justify-start p-2 h-11"
          onClick={() => setOpen(true)}
          variant="outline"
        >
          <CommonImage
            classname="view-profile"
            src="/dashboard-images/Change_Profile_Picture.webp"
            alt="Profile Image"
            width={25}
            height={25}
          />
          Change Profile Picture
        </Button>
      </DialogTrigger>

      <DialogContent className="common-modal-form w-full max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="profile-img w-full max-w-[180px] m-auto p-3">
          <CommonImage
            classname="view-profile"
            src="/dashboard-images/default_profile_pic.webp"
            alt="Profile Image"
            width={180}
            height={180}
          />
        </div>

        <Form {...profileChangeForm}>
          <form
            onSubmit={profileChangeForm.handleSubmit(handleProfileChangeSubmit)}
            className="space-y-4 p-0 w-full"
          >
            <FormField
              control={profileChangeForm.control}
              name="attachments"
              render={({ field: { onChange } }) => (
                <FormItem className="form-row w-full file-attachment profile-pic">
                  <div className="flex flex-col gap-2 relative">
                    <Label htmlFor="file-upload" className="font-medium">
                      Upload Image
                    </Label>
                    <FormControl>
                      <Input
                        type="file"
                        id="file-upload"
                        accept="image/jpeg, image/png, image/webp"
                        onChange={(e) => onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage className="common-error-msg" />
                    <small className="text-gray-500">
                      Allowed formats: jpg, png, jpeg, webp
                    </small>
                  </div>
                </FormItem>
              )}
            />

            <div className="w-full flex justify-center">
              <Button type="submit" className="upload-file mt-4">
                Upload Image
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePicture;
