"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneCountryCodeSelect from "@/components/PhoneCountrySelect/PhoneCountrycodeSelect";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormBannerProps {
  heading: string;
}

// Country Code Options
// const countryOptions = [
//   { value: "+91", label: "+91 - IN", searchable: "india" },
//   { value: "+1", label: "+1 - U", searchable: "usa" },
//   { value: "+44", label: "+44 - GB", searchable: "uk" },
//   { value: "+61", label: "+61 - AU", searchable: "australia" },
//   { value: "+81", label: "+81 - JP", searchable: "japan" },
// ];

// Zod Schemas
const phoneSchema = z.object({
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed"),
});

const courseSchema = z.object({
  batch: z.string().min(2, "Batch is required"),
  packagedate: z.date({ required_error: "Select Package Date" }),
});

const courseinfoSchema = z.object({
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

// Format date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

// Component
const CourseModal: React.FC<FormBannerProps> = ({ heading }) => {
  //const [selectedCountry, setSelectedCountry] = useState("+91");
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

  const [searchTerm] = useState("");

  // Place the filter here, inside your component
  // const filteredOptions = countryOptions.filter((country) =>
  //   country.searchable.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { countryCode: "+91", phoneNumber: "" },
  });

  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    setSelectedCountry({ value: "+91", label: "+91 - IN" });
  }, []);

  const courseForm = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      batch: "",
      packagedate: undefined,
    },
  });

  // Registration Form Hook
  const courseinfoForm = useForm({
    resolver: zodResolver(courseinfoSchema),
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

  const handleCourseSubmit = async (data: z.infer<typeof courseSchema>) => {
    console.log("Course Submitted:", data);
    setIsCourseinfoOpen(true); // ✅ just go to the next modal
  };

  const handleCourseinfoSubmit = async (
    data: z.infer<typeof courseinfoSchema>
  ) => {
    console.log("Course Info Submitted:", data);
    courseForm.reset();
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
      courseForm.reset();
      courseinfoForm.reset(); // ✅ include this only if reset is intended
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
                    <div className="w-[180px] phone-contry-code">
                      <PhoneCountryCodeSelect
                        value={selectedCountry}
                        onChange={(value) => {
                          setSelectedCountry(value);
                          phoneForm.setValue("countryCode", value?.value || "");
                        }}
                      />
                    </div>

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
        <DialogContent
          className="common-modal-form w-full max-w-xl top-[5%] translate-y-0"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
          </DialogHeader>

          <Form {...courseForm}>
            <form
              onSubmit={courseForm.handleSubmit(handleCourseSubmit)}
              className="space-y-4 p-0 w-full"
            >
              <div className="flex justify-between w-full gap-5">
                <FormField
                  control={courseForm.control}
                  name="batch"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>
                        Batch<span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={courseForm.control}
                  name="packagedate"
                  render={({ field }) => (
                    <FormItem className="form-row w-full">
                      <Label>
                        Package Date<span className="text-red-500">*</span>
                      </Label>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between text-left font-normal"
                            >
                              {field.value
                                ? formatDate(field.value)
                                : "Pick a date"}
                              <CalendarIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={{ before: new Date() }} // ⛔ Disable past dates
                              //initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="common-button-rows enq-row">
                <Button
                  type="submit"
                  variant="link"
                  className="p-0 submit-common"
                >
                  Next <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* course info Dialog */}
      <Dialog open={isCourseinfoOpen} onOpenChange={handleCloseModals}>
        <DialogContent
          className="common-modal-form w-full max-w-xl top-[5%] translate-y-0"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
          </DialogHeader>
          <Form {...courseinfoForm}>
            <form
              onSubmit={courseinfoForm.handleSubmit(handleCourseinfoSubmit)}
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
                        control={courseinfoForm.control}
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
                        control={courseinfoForm.control}
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
                      control={courseinfoForm.control}
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
                    control={courseinfoForm.control}
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
        <DialogContent
          className="common-modal-form w-full max-w-xl top-[5%] translate-y-0"
          aria-describedby={undefined}
        >
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
        <DialogContent
          className="common-modal-form w-full max-w-xl top-[5%] translate-y-0"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Practicepack Details</DialogTitle>
          </DialogHeader>
          <div className="common-user-info-cont">
            <p>
              Dear <span>{userDetails.name}</span>,
            </p>
            <p>
              Your enquiry has been submitted successfully. Here are your
              details:
            </p>
            <p>
              Unique ID:{" "}
              <span className="userinfo-data">{userDetails.uniqueId}</span>
            </p>
            <p>
              Password:{" "}
              <span className="userinfo-data">{userDetails.password}</span>
            </p>
            <p>Your Password and Other details are send to your email.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseModal;
