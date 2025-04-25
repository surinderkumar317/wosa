"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OptionBox from "@/components/coaching/OptionBox";
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

interface FormBannerProps {
  heading: string;
}

// Country Code Options
const countryOptions = [
  { value: "+91", label: "+91 - IN", searchable: "india" },
  { value: "+1", label: "+1 - U", searchable: "usa" },
  { value: "+44", label: "+44 - GB", searchable: "uk" },
  { value: "+61", label: "+61 - AU", searchable: "australia" },
  { value: "+81", label: "+81 - JP", searchable: "japan" },
];

// Zod Schemas
const phoneSchema = z.object({
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed"),
});

const eventtimeSchema = z.object({
  location: z.string().min(2, "Please select the location"),
  course: z.string().min(2, "Please select the course"),
});

const prackticeinfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  lastname: z.string().optional(),
  email: z.string().email("Invalid email format"),
  howdidyouhear: z.string().min(2, "Please select how did you hear about us"),
});

const verificationSchema = z.object({
  verificationCode: z
    .string()
    .length(4, "Code must be 4 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

// Component
const EventTimeModal: React.FC<FormBannerProps> = ({ heading }) => {
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isCourseinfoOpen, setIsCourseinfoOpen] = useState(false);
  const [shouldResetForms, setShouldResetForms] = useState(true);

  const [isVarificationOpen, setIsVarificationOpen] = useState(false);
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    uniqueId: "",
    password: "",
  });

  const [isLocationSelected, setIsLocatioinSelected] = useState(false);
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // Place the filter here, inside your component
  const filteredOptions = countryOptions.filter((country) =>
    country.searchable.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { countryCode: "+91", phoneNumber: "" },
  });

  const eventtestForm = useForm<z.infer<typeof eventtimeSchema>>({
    resolver: zodResolver(eventtimeSchema),
    defaultValues: {
      location: "",
      course: "",
    },
  });

  // 👇 Place this AFTER the above
  useEffect(() => {
    const subscription = eventtestForm.watch((value) => {
      setIsLocatioinSelected(!!value.location);
      setIsCourseSelected(!!value.course);
    });
    return () => subscription.unsubscribe();
  }, [eventtestForm]);

  // Reality info Form Hook
  const realityinfoForm = useForm({
    resolver: zodResolver(prackticeinfoSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      howdidyouhear: "",
    },
  });

  const handlePhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    console.log("Phone Data:", data);
    setSubmittedPhoneNumber(`${data.countryCode} ${data.phoneNumber}`); // Store phone number
    setIsCourseOpen(true);
  };

  const handleEventtimeSubmit = async (
    data: z.infer<typeof eventtimeSchema>
  ) => {
    console.log("Submitted Program:", data.location);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    setIsCourseinfoOpen(true);
    setIsCourseOpen(false);
  };

  const handleRealitytestinfoSubmit = async (
    data: z.infer<typeof prackticeinfoSchema>
  ) => {
    console.log("Course Info Submitted:", data);
    eventtestForm.reset();
    phoneForm.reset();
    setIsCourseOpen(false);
    setIsCourseinfoOpen(false);
    setIsVarificationOpen(true);
    setShouldResetForms(true); // ✅ enable reset after final submission

    const generatedUserDetails = {
      name: data.name,
      uniqueId: "UID123456",
      password: "Pass@123",
    };
    setUserDetails(generatedUserDetails);
  };

  const handleCloseModals = () => {
    setIsCourseOpen(false);
    setIsCourseinfoOpen(false);
    setIsFormInfoOpen(false);
    setIsVarificationOpen(false);

    if (shouldResetForms) {
      phoneForm.reset();
      eventtestForm.reset();
      realityinfoForm.reset(); // ✅ include this only if reset is intended
    }
  };

  const verifyForm = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: { verificationCode: "" },
  });

  // Handle Verification Submission
  const handleVarifySubmit = async (data: { verificationCode: string }) => {
    console.log("Verification Code Submitted:", data.verificationCode);
    setIsVarificationOpen(false);
    setIsFormInfoOpen(true); // Open the final dialog
  };

  useEffect(() => {
    let timer: NodeJS.Timeout; // Explicitly define the timer type

    if (isVarificationOpen && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup on unmount
  }, [isVarificationOpen, resendTimer]);

  const handleResendCode = () => {
    setResendTimer(30); // Reset countdown
    console.log("Resending verification code...");
  };

  const [selectedLocation, selectedCourse] = useWatch({
    control: eventtestForm.control,
    name: ["location", "course"],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus(); // Re-focus after dropdown opens
    }, 50); // Small delay ensures it's mounted

    return () => clearTimeout(timer);
  }, [searchTerm]); // Optional: focus each time dropdown resets

  return (
    <div className="enquiryform-container">
      {/* Phone Form */}
      <Form {...phoneForm}>
        <form
          onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
          className="space-y-4 py-5 w-full flex items-center gap-5 relative"
        >
          <FormField
            control={phoneForm.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-[80%]">
                <FormControl>
                  <div className="flex space-x-2 w-full p-2 form-phone-input">
                    {/* Country Code Select */}
                    <Select
                      onValueChange={(value) => {
                        setSelectedCountry(value);
                        phoneForm.setValue("countryCode", value);
                        setSearchTerm("");
                      }}
                      value={selectedCountry}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* 🔍 Search Input */}
                        <div
                          className="px-2 pb-2 pt-1"
                          onMouseDown={(e) => e.stopPropagation()} // Keep dropdown open
                        >
                          <Input
                            ref={inputRef}
                            placeholder="Search country"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            className="h-8 text-sm"
                          />
                        </div>

                        {/* Scrollable country list */}
                        <div className="h-[100px] overflow-y-auto common-scroller">
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
                        </div>
                      </SelectContent>
                    </Select>

                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      inputMode="numeric"
                      minLength={10}
                      maxLength={10}
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage className="common-error-msg" />
              </FormItem>
            )}
          />
          <div className="common-button-rows registration-justify-end">
            <Button type="submit" variant="link" className="p-0 submit-common">
              <i className="fa fa-angle-right"></i>
            </Button>
          </div>
        </form>
      </Form>

      {/* Course Dialog */}
      <Dialog open={isCourseOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
          </DialogHeader>
          <Form {...eventtestForm}>
            <form
              onSubmit={eventtestForm.handleSubmit(handleEventtimeSubmit)}
              className="space-y-4 p-0 w-full overflow-hidden"
            >
              <div className="flex flex-col">
                <div className="flex justify-between w-full gap-5">
                  <FormField
                    control={eventtestForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Location<span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Chandigarh">
                              Chandigarh
                            </SelectItem>
                            <SelectItem value="Amabla">Amabla</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={eventtestForm.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Course<span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PTE">PTE</SelectItem>
                            <SelectItem value="Online">Online</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>

                {!selectedLocation || !selectedCourse ? (
                  <div className="common-button-rows enq-row">
                    <Button
                      type="submit"
                      variant="link"
                      className="p-0 submit-common disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next <i className="fa fa-angle-right"></i>
                    </Button>
                  </div>
                ) : null}
              </div>

              {isLocationSelected && isCourseSelected && (
                <div className="date-time-container">
                  <div className="date-time-scroller overflow-auto pr-2 common-scroller">
                    <div className="flex justify-between w-full flex-col gap-2 reality-datebox-cont">
                      <p>
                        Select Date<span className="text-red-500">*</span>
                      </p>
                      <div className="event-date-container max-w-[520px]">
                        <div className="event-date-box flex min-w-max">
                          {[
                            "APR 17 2025 TO APR 17 2025",
                            "APR 18 2025",
                            "APR 19 2025",
                            "APR 20 2025",
                          ].map((date) => (
                            <OptionBox
                              key={date}
                              value={date}
                              selectedValue={selectedDate}
                              onSelect={setSelectedDate}
                            >
                              <h2 className="!text-xl font-bold">
                                {(() => {
                                  const parts = date.split(/ to /i); // case-insensitive split
                                  if (parts.length === 2) {
                                    return (
                                      <>
                                        <div>{parts[0]}</div>
                                        <div className="text-sm text-muted-foreground">
                                          TO
                                        </div>
                                        <div>{parts[1]}</div>
                                      </>
                                    );
                                  } else {
                                    return <div>{date}</div>;
                                  }
                                })()}
                              </h2>
                              <p className="!text-sm py-2">Available</p>
                              <p className="!text-base font-semibold">
                                INR 1000
                              </p>
                            </OptionBox>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between w-full gap-2 reality-datebox-cont flex-col mt-5">
                      <p>
                        Time Slot<span className="text-red-500">*</span>
                      </p>
                      <div className="event-time-container max-w-[520px]">
                        <div className="event-time-box flex">
                          {[
                            "10:00 AM - 12:00 PM",
                            "11:00 AM",
                            "12:00 PM",
                            "01:00 PM",
                          ].map((time) => (
                            <OptionBox
                              key={time}
                              value={time}
                              selectedValue={selectedTime}
                              onSelect={setSelectedTime}
                            >
                              <p className="!text-sm py-2">{time}</p>
                              <p className="!text-sm">Available</p>
                            </OptionBox>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="common-button-rows enq-row">
                    <Button
                      type="submit"
                      variant="link"
                      className="p-0 submit-common disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedDate || !selectedTime}
                    >
                      Next <i className="fa fa-angle-right"></i>
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* course info Dialog */}
      <Dialog open={isCourseinfoOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
          </DialogHeader>
          <Form {...realityinfoForm}>
            <form
              onSubmit={realityinfoForm.handleSubmit(
                handleRealitytestinfoSubmit
              )}
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
                        control={realityinfoForm.control}
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
                        control={realityinfoForm.control}
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
                      control={realityinfoForm.control}
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
                  <FormField
                    control={realityinfoForm.control}
                    name="howdidyouhear"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          How did you hear about us
                          <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Advertising Van">
                              Advertising Van
                            </SelectItem>
                            <SelectItem value="Cable/FM">Cable/FM</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="common-button-rows">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setShouldResetForms(false); // ✅ set this first
                    setIsCourseinfoOpen(false);
                    setIsCourseOpen(true);
                  }}
                  className="back-btn"
                >
                  <i className="fa fa-angle-left" aria-hidden="true"></i> Back
                </Button>
                <Button variant="link" type="submit" className="submit-common">
                  Submit <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog open={isVarificationOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Verification</DialogTitle>
            <p className="!mt-10">
              A verification code has been sent to your mobile{" "}
              <span>{submittedPhoneNumber}</span>. Please enter the code below.
            </p>
          </DialogHeader>
          <Form {...verifyForm}>
            <form
              onSubmit={verifyForm.handleSubmit(handleVarifySubmit)}
              className="flex gap-4 flex-col"
            >
              <div className="flex items-end gap-5">
                <FormField
                  control={verifyForm.control}
                  name="verificationCode"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>Enter Verification Code</Label>
                      <FormControl>
                        <Input type="text" maxLength={4} {...field} />
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
                {/* Resend Code Section */}
                <div className="flex justify-between items-center relative -inset-1">
                  <Button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendTimer > 0} // Disable while countdown is active
                    className="resend-btn"
                  >
                    {resendTimer > 0
                      ? `Resend Code in ${resendTimer}s`
                      : "Resend Code"}
                  </Button>
                </div>
              </div>
              <div className="common-button-rows clear-both">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setShouldResetForms(false); // ✅ set before closing modal
                    setIsVarificationOpen(false);
                    setIsCourseinfoOpen(true);
                  }}
                  className="back-btn"
                >
                  <i className="fa fa-angle-left" aria-hidden="true"></i> Back
                </Button>
                <Button variant="link" type="submit" className="submit-common">
                  Submit <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* User Info Dialog */}
      <Dialog open={isFormInfoOpen} onOpenChange={handleCloseModals}>
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Package Details</DialogTitle>
          </DialogHeader>
          <div className="common-user-info-cont">
            <p>
              Dear <span>{userDetails.name}</span>,
            </p>
            <p>
              Your enquiry has been submitted successfully. Here are your details:
            </p>
            <p>
              Unique ID: <span className="userinfo-data">{userDetails.uniqueId}</span>
            </p>
            <p>
              Password: <span className="userinfo-data">{userDetails.password}</span>
            </p>
            <p>Your Password and Other details are send to your email.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventTimeModal;
