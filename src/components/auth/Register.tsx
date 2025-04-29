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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "sonner";

// Country Code Options
// const countryOptions = [
//   { value: "+91", label: "+91 - IN", searchable: "india" },
//   { value: "+1", label: "+1 - U", searchable: "usa" },
//   { value: "+44", label: "+44 - GB", searchable: "gb" },
//   { value: "+61", label: "+61 - AU", searchable: "australia" },
//   { value: "+81", label: "+81 - JP", searchable: "japan" },
// ];

const cityList = [
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Chandigarh",
  "Chamba",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Chikmagalur",
  "Chhindwara",
  "Calicut",
  "Churu",
];

const phoneSchema = z.object({
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),
});

const registrationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  lastname: z.string().optional(),
  email: z.string().email("Invalid email format"),
  dob: z.string().refine(
    (val) => {
      const year = new Date(val).getFullYear();
      return (
        /^\d{4}$/.test(year.toString()) &&
        year >= 1900 &&
        year <= new Date().getFullYear()
      );
    },
    { message: "Please enter a valid date of birth" }
  ),
  city: z.string().min(1, "Please enter a valid city"),
  source: z.string().min(1, "Please select an option"),
  interestedServcies: z.string().min(1, "Interested Services is mandatory"),
  interestedSubServcies: z
    .string()
    .min(1, "Interested Sub Services is mandatory"),
  interestedCountries: z.string().min(1, "Interested Country is mandatory"),
});

const verificationSchema = z.object({
  verificationCode: z
    .string()
    .length(4, "Code must be 4 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

type RegistrationData = z.infer<typeof registrationSchema>;

const Register: React.FC = () => {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  //const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [isVarificationOpen, setIsVarificationOpen] = useState(false);
  const [isFormInfoOpen, setIsFormInfoOpen] = useState(false);
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    uniqueId: "",
    password: "",
  });
  const [searchTerm] = useState("");
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);

  // Place the filter here, inside your component
  // const filteredOptions = countryOptions.filter((country) =>
  //   country.searchable.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const [cityValue, setCityValue] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Update filteredCities when cityValue changes
  useEffect(() => {
    const input = cityValue.toLowerCase();
    if (input.length >= 1) {
      const filtered = cityList.filter((city) =>
        city.toLowerCase().startsWith(input)
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [cityValue]);

  const handleCitySelect = (city: string) => {
    setCityValue(city);
    registrationForm.setValue("city", city);
    setShowDropdown(false);
  };

  const handleCityClear = () => {
    setCityValue("");
    registrationForm.setValue("city", "");
    setShowDropdown(false);
  };

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

  const registrationForm = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      dob: "",
      city: "",
      source: "",
      interestedServcies: "",
      interestedSubServcies: "",
      interestedCountries: "",
    },
  });

  const verifyForm = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: { verificationCode: "" },
  });

  const handlePhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    console.log("Phone Form Data:", data);
    setSubmittedPhoneNumber(`${data.countryCode} ${data.phoneNumber}`);
    setIsPhoneOpen(false);
    setIsRegistrationOpen(true);
  };

  const handleRegistrationSubmit = async (
    data: z.infer<typeof registrationSchema>
  ) => {
    console.log("Registration Form Data:", data);
    toast.success("Register successful! 🎉");
    setIsRegistrationOpen(false);
    registrationForm.reset();
    setRegistrationData(data);
    setIsVarificationOpen(true);

    const generatedUserDetails = {
      name: data.name,
      uniqueId: "UID123456",
      password: "Pass@123",
    };
    setUserDetails(generatedUserDetails);
  };

  const handleVarifySubmit = async (data: { verificationCode: string }) => {
    console.log("Verification code submitted:", data.verificationCode); // Optional logging
    setIsVarificationOpen(false);
    setIsFormInfoOpen(true);
  };

  const handleResendCode = () => {
    setResendTimer(30);
    console.log("Resending verification code...");
  };

  const handleCloseModals = () => {
    setIsVarificationOpen(false);
    setIsFormInfoOpen(false);
    phoneForm.reset();
    registrationForm.reset();
  };

  useEffect(() => {
    if (isRegistrationOpen && registrationData) {
      registrationForm.reset(registrationData);
    }
  }, [isRegistrationOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVarificationOpen && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVarificationOpen, resendTimer]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus(); // Re-focus after dropdown opens
    }, 50); // Small delay ensures it's mounted

    return () => clearTimeout(timer);
  }, [searchTerm]); // Optional: focus each time dropdown resets

  return (
    <>
      {/* Phone Number Dialog */}
      <Toaster position="bottom-center" />
      <Dialog open={isPhoneOpen} 
        onOpenChange={(isOpen) => {
          setIsPhoneOpen(isOpen);
          if (!isOpen) {
            phoneForm.reset();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={() => setIsPhoneOpen(true)}>
            Register
          </Button>
        </DialogTrigger>
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Registration</DialogTitle>
          </DialogHeader>
          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
              className="space-y-4 p-4 w-full"
            >
              {/* Country Code & Phone Number */}
              <FormField
                control={phoneForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="form-row">
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
                              phoneForm.setValue("countryCode", value?.value || "");
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
              {/* Next Button */}
              <div className="common-button-rows registration-justify-end">
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

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen}
        onOpenChange={(isOpen) => {
          setIsRegistrationOpen(isOpen);
          if (!isOpen) {
            registrationForm.reset();
          }
        }}
      >
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Registration</DialogTitle>
          </DialogHeader>
          <Form {...registrationForm}>
            <form
              onSubmit={registrationForm.handleSubmit(handleRegistrationSubmit)}
              className="space-y-4 p-0 w-full"
            >
              <div className="max-h-[70vh] overflow-auto pr-2 common-scroller">
                <div className="flex justify-between w-full gap-5 mb-5">
                  <div className="w-full flex flex-col mt-2 name-main-holder">
                    <Label className="w-full mb-2">
                      Name<span className="text-red-500">*</span>
                    </Label>
                    <div className="w-full flex gap-2 name-holder border p-1">
                      {/* Name Field */}
                      <FormField
                        control={registrationForm.control}
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
                        control={registrationForm.control}
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
                      control={registrationForm.control}
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
                  {/* Date of birth Field */}
                  <FormField
                    control={registrationForm.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>
                          Date of Birth<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Enter your Date of Birth"
                            {...field}
                            onInput={(e) => {
                              const value = e.currentTarget.value;
                              const year = value.split("-")[0];
                              if (year.length > 4) {
                                const trimmed = `${year.slice(0, 4)}-${
                                  value.split("-")[1] || "01"
                                }-${value.split("-")[2] || "01"}`;
                                e.currentTarget.value = trimmed;
                                field.onChange(trimmed);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                  {/* City Field */}
                  <FormField
                    control={registrationForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="form-row w-full relative">
                        <Label>
                          City<span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="Enter your city"
                              value={cityValue}
                              onChange={(e) => {
                                setCityValue(e.target.value);
                                field.onChange(e.target.value);
                              }}
                              onFocus={() => {
                                if (cityValue) setShowDropdown(true);
                              }}
                              onBlur={() => {
                                setTimeout(() => setShowDropdown(false), 100);
                              }}
                              className="pr-10"
                            />
                            {cityValue && (
                              <button
                                type="button"
                                onClick={handleCityClear}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
                              >
                                &times;
                              </button>
                            )}
                            {showDropdown && filteredCities.length > 0 && (
                              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-44 overflow-y-auto">
                                {filteredCities.map((city, index) => (
                                  <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleCitySelect(city)}
                                  >
                                    {city}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between w-full gap-5 mb-5">
                  <FormField
                    control={registrationForm.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem className="form-row w-full">
                        <Label>How did you hear about us?</Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="friend">Friend</SelectItem>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="internet">Internet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between w-full gap-5 flex-wrap">
                  {/* Interested Servcies Field */}

                  {/* Interested Services */}
                  <FormField
                    control={registrationForm.control}
                    name="interestedServcies"
                    render={({ field }) => (
                      <FormItem className="form-row w-[45%]">
                        <Label>
                          Interested Services
                          <span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              setSelectedService(value);
                              field.onChange(value);
                              setSelectedSubService("");
                              registrationForm.setValue(
                                "interestedSubServcies",
                                ""
                              );
                              registrationForm.setValue(
                                "interestedCountries",
                                ""
                              );
                            }}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Interested Services" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Visa">Visa</SelectItem>
                              <SelectItem value="Reality Test">
                                Reality Test
                              </SelectItem>
                              <SelectItem value="Exam Booking">
                                Exam Booking
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="common-error-msg" />
                      </FormItem>
                    )}
                  />

                  {/* Interested Sub Services - Conditional */}
                  {selectedService && (
                    <FormField
                      control={registrationForm.control}
                      name="interestedSubServcies"
                      render={({ field }) => (
                        <FormItem className="form-row w-[45%]">
                          <Label>
                            Interested Sub Services
                            <span className="text-red-500">*</span>
                          </Label>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                setSelectedSubService(value);
                                field.onChange(value);
                                registrationForm.setValue(
                                  "interestedCountries",
                                  ""
                                );
                              }}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Interested Sub Services" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Study Visa">
                                  Study Visa
                                </SelectItem>
                                <SelectItem value="Visitor Visa">
                                  Visitor Visa
                                </SelectItem>
                                <SelectItem value="Work Visa">
                                  Work Visa
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="common-error-msg" />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Interested Country - Conditional */}
                  {selectedSubService && (
                    <FormField
                      control={registrationForm.control}
                      name="interestedCountries"
                      render={({ field }) => (
                        <FormItem className="form-row w-[45%]">
                          <Label>
                            Interested Country
                            <span className="text-red-500">*</span>
                          </Label>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Interested Country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="India">India</SelectItem>
                                <SelectItem value="Australia">
                                  Australia
                                </SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="common-error-msg" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="common-button-rows">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsRegistrationOpen(false);
                    setIsPhoneOpen(true);
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
                    setIsVarificationOpen(false);
                    setIsRegistrationOpen(true);
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
            <DialogTitle>Enquiry Details</DialogTitle>
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
              Unique ID: <span className="userinfo-data">{userDetails.uniqueId}</span>
            </p>
            <p>
              Password: <span className="userinfo-data">{userDetails.password}</span>
            </p>
            <p>Your Password and Other details are send to your email.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
