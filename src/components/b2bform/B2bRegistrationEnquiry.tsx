"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import { toast } from "sonner";
import { Toaster } from "sonner";

// Country Code Options
const countryOptions = [
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+1", label: "🇺🇸 +1 (USA)" },
  { value: "+44", label: "🇬🇧 +44 (UK)" },
  { value: "+61", label: "🇦🇺 +61 (Australia)" },
  { value: "+81", label: "🇯🇵 +81 (Japan)" },
];

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
  name: z.string().min(2, "Name is required"),
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

const B2bRegistrationEnquiry = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("+91");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = countryOptions.filter((country) =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // B2B Form Hook
  const b2bForm = useForm({
    resolver: zodResolver(B2bSchema),
    defaultValues: {
      name: "",
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

  const handleb2bSubmit = async (data: z.infer<typeof B2bSchema>) => {
    console.log("Form Data Submitted:", data);
    toast.success("B2B Registration & Enquiry successful! 🎉");
    setMessageLength(0);
    b2bForm.reset(); // Optional: reset the form
    setIsDialogOpen(false); // 👈 Close the dialog
  };

  return (
    <>
      {/* B2B Dialog */}
      <Toaster position="bottom-center" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="py-6 px-6 text-2xl mt-5">Join Us</Button>
        </DialogTrigger>
        <DialogContent className="common-modal-form w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>B2B Registration & Enquiry</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...b2bForm}>
            <form
              onSubmit={b2bForm.handleSubmit(handleb2bSubmit)}
              className="space-y-4 p-0 w-full"
            >
              <div className="max-h-[65vh] overflow-auto pr-2 common-scroller">
                <div className="flex justify-between w-full gap-5 mb-5">
                  {/* Name Field */}
                  <FormField
                    control={b2bForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Name<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
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
                          <div className="flex space-x-2 w-full">
                            {/* Country Code Select */}
                            <Select
                              onValueChange={(value) => {
                                setSelectedCountry(value);
                                phoneForm.setValue("countryCode", value);
                                setSearchTerm(""); // Clear search when a value is selected
                              }}
                              value={selectedCountry}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue placeholder="Code" />
                              </SelectTrigger>
                              <SelectContent>
                                {/* 🔍 Search Input inside the dropdown */}
                                <div className="px-2 pb-2 pt-1">
                                  <Input
                                    placeholder="Search country"
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                    className="h-8 text-sm"
                                  />
                                </div>
                                <SelectGroup>
                                  {filteredOptions.length > 0 ? (
                                    filteredOptions.map((country) => (
                                      <SelectItem
                                        key={country.value}
                                        value={country.value}
                                      >
                                        {country.label}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <div className="px-3 py-2 text-sm text-muted-foreground">
                                      No results found
                                    </div>
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>

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
