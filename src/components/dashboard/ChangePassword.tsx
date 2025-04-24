"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import CommonImage from "../common/Image";

// 🔹 Password Schema with Confirmation Validation
const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current Password is required"),
    newPassword: z
      .string()
      .min(6, "New Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// 🔹 Labels for input fields
const fieldLabels = {
  currentPassword: "Current Password",
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
} as const;

const ChangePassword: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const changePasswordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 🔹 Handle form submission
  const handlePasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    console.log("Form Data Submitted:", data);
    setTimeout(() => {
      setOpen(false);
      changePasswordForm.reset();
    }, 1000);
  };

  // 🔹 Reset form when modal closes
  useEffect(() => {
    if (!open) changePasswordForm.reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full flex justify-start p-2 h-11"
          variant="outline"
        >
          <CommonImage
            classname="view-profile"
            src="/dashboard-images/Change_Password.webp"
            alt="Profile Image"
            width={25}
            height={25}
          />
          Change Password
        </Button>
      </DialogTrigger>

      <DialogContent className="common-modal-form w-full max-w-[450px] top-[5%] translate-y-0">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...changePasswordForm}>
          <form
            onSubmit={changePasswordForm.handleSubmit(handlePasswordSubmit)}
            className="space-y-4 p-0 w-full"
          >
            {/** 🔹 Password Input Fields **/}
            {Object.keys(fieldLabels).map((fieldName) => (
              <FormField
                key={fieldName}
                control={changePasswordForm.control}
                name={fieldName as keyof typeof fieldLabels}
                render={({ field }) => (
                  <FormItem className="form-row">
                    <Label>
                      {fieldLabels[fieldName as keyof typeof fieldLabels]}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPasswords[fieldName] ? "text" : "password"}
                          placeholder={`Enter ${
                            fieldLabels[fieldName as keyof typeof fieldLabels]
                          }`}
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2 text-gray-500"
                          aria-label={`Toggle ${
                            fieldLabels[fieldName as keyof typeof fieldLabels]
                          } visibility`}
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              [fieldName]: !prev[fieldName],
                            }))
                          }
                        >
                          {showPasswords[fieldName] ? (
                            <Eye size={20} />
                          ) : (
                            <EyeOff size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="common-error-msg" />
                  </FormItem>
                )}
              />
            ))}

            <div className="w-full flex justify-center">
              <Button type="submit" className="upload-file mt-4">
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
