"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PhoneCountryCodeSelect from "@/components/PhoneCountrySelect/PhoneCountrycodeSelect";
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
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Toaster } from "sonner";

// Country Code Options
// const countryOptions = [
//   { value: "+91", label: "+91 - IN", searchable: "india" },
//   { value: "+1", label: "+1 - U", searchable: "usa" },
//   { value: "+44", label: "+44 - GB", searchable: "uk" },
//   { value: "+61", label: "+61 - AU", searchable: "australia" },
//   { value: "+81", label: "+81 - JP", searchable: "japan" },
// ];

// Validation Schemas
const phoneSchema = z.object({
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),
});

// b2b form
const B2bSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().optional(),
  email: z.string().email("Invalid email format"),
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),
  companyname: z.string().min(2, "Company/Entity name is required"),
  message: z.string().min(5, "Message is required"),
});

const B2bRegistrationEnquiry: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  //const [selectedCountry, setSelectedCountry] = useState("+91");

  const [searchTerm] = useState("");

  // Place the filter here, inside your component
  // const filteredOptions = countryOptions.filter((country) =>
  //   country.searchable.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // B2B Form Hook
  const b2bForm = useForm({
    resolver: zodResolver(B2bSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      countryCode: "+91",
      phoneNumber: "",
      companyname: "",
      message: "",
    },
  });
  // Phone Form Hook
  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: "+91",
      phoneNumber: "",
    },
  });
  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    setSelectedCountry({ value: "+91", label: "+91 - IN" });
  }, []);

  const handleb2bSubmit = async (data: z.infer<typeof B2bSchema>) => {
    console.log("Form Data Submitted:", data);
    toast.success("B2B Registration & Enquiry successful! 🎉");
    setMessageLength(0);
    b2bForm.reset(); // Optional: reset the form
    setIsDialogOpen(false); // 👈 Close the dialog
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus(); // Re-focus after dropdown opens
    }, 50); // Small delay ensures it's mounted

    return () => clearTimeout(timer);
  }, [searchTerm]); // Optional: focus each time dropdown resets

  return (
    <>
      {/* B2B Dialog */}
      <Toaster position="bottom-center" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="py-6 px-6 text-2xl mt-5 mobile-join">Join Us</Button>
        </DialogTrigger>
        <DialogContent
          className="common-modal-form w-full max-w-xl top-[5%] translate-y-0"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>B2B Registration & Enquiry</DialogTitle>
          </DialogHeader>
          <Form {...b2bForm}>
            <form
              onSubmit={b2bForm.handleSubmit(handleb2bSubmit)}
              className="space-y-4 p-0 w-full"
            >
              <div className="max-h-[65vh] overflow-auto pr-2 common-scroller">
                <div className="flex justify-between w-full gap-5 mb-5">
                  <div className="w-full flex flex-col mt-2 name-main-holder">
                    <Label className="w-full mb-2">
                      Name<span className="text-red-500">*</span>
                    </Label>
                    <div className="w-full flex gap-2 name-holder border p-1">
                      {/* Name Field */}
                      <FormField
                        control={b2bForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="form-row w-full border-r">
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="First Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="common-error-msg" />
                          </FormItem>
                        )}
                      />
                      {/* Lastname Field */}
                      <FormField
                        control={b2bForm.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem className="form-row w-full">
                            <FormControl>
                              <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-full email-holder">
                    {/* Email Field */}
                    <FormField
                      control={b2bForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="form-row w-full">
                          <Label>
                            Email<span className="text-red-500">*</span>
                          </Label>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="common-error-msg" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* Country Code & Phone Number */}
                  <FormField
                    control={b2bForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Phone Number<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <div className="flex space-x-2 common-phone-container">
                            {/* Country Code Select */}
                            <div className="w-[120px] phone-contry-code">
                              <PhoneCountryCodeSelect
                                value={selectedCountry}
                                onChange={(value) => {
                                  setSelectedCountry(value);
                                  phoneForm.setValue(
                                    "countryCode",
                                    value?.value || ""
                                  );
                                }}
                              />
                            </div>

                            {/* Phone Number Input */}
                            <Input
                              type="tel"
                              placeholder="Enter phone number"
                              {...field}
                              className="flex-1"
                              pattern="[0-9]*"
                              inputMode="numeric"
                              minLength={10}
                              maxLength={10}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                field.onChange(value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* Company/Entity name */}
                  <FormField
                    control={b2bForm.control}
                    name="companyname"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Company/Entity Name
                          <span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter company/entity name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* Message Field */}
                  <FormField
                    control={b2bForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <div className="flex justify-between items-center">
                          <Label>
                            Complaint Message
                            <span className="text-red-500">*</span>
                          </Label>
                          <div className="message-text">
                            Entered Characters : <span>{messageLength}</span>
                          </div>
                        </div>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="h-24"
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setMessageLength(e.target.value.length);
                            }}
                          />
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Submit Button */}
              <div className="common-button-rows !justify-end">
                <Button variant="link" type="submit" className="submit-common">
                  Submit <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default B2bRegistrationEnquiry;
