"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm, FieldErrors } from "react-hook-form";
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
  SelectGroup,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";

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

// Define validation schemas for login
const formSchema = z
  .object({
    loginBy: z.enum(["phone", "email", "uniqueid"]),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .optional()
      .or(z.literal("")), // Allow empty when not selected
    loginEmail: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")), // Allow empty when not selected
    uniqueId: z.string().optional().or(z.literal("")), // Allow empty when not selected
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine(
    (data) => {
      if (data.loginBy === "phone") return data.phoneNumber?.trim();
      return true;
    },
    { path: ["phoneNumber"], message: "Phone Number is required" }
  )
  .refine(
    (data) => {
      if (data.loginBy === "email") return data.loginEmail?.trim();
      return true;
    },
    { path: ["loginEmail"], message: "Email is required" }
  )
  .refine(
    (data) => {
      if (data.loginBy === "uniqueid") return data.uniqueId?.trim();
      return true;
    },
    { path: ["uniqueId"], message: "Unique ID is required" }
  );

// Validation Schemas
const phoneSchema = z.object({
  countryCode: z.string().min(2, "Country code is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Only numbers are allowed"),
});

interface LoginProps {
  buttonText?: string;
}

const Login: React.FC<LoginProps> = ({ buttonText = "Login", }) => {
  // const router = useRouter();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedLoginBy, setSelectedLoginBy] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  //const [selectedCountry, setSelectedCountry] = useState("+91");

  const [searchTerm] = useState("");

  // Place the filter here, inside your component
  // const filteredOptions = countryOptions.filter((country) =>
  //   country.searchable.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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

  const loginForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginBy: "phone",
      phoneNumber: "",
      loginEmail: "",
      uniqueId: "",
      password: "",
    },
  });

  const handleLogin = async (data: z.infer<typeof formSchema>) => {
    console.log("Form Data Submitted:", data);
    toast.success("Login successful! 🎉");
    setIsLoginOpen(false);
    loginForm.reset();
  };

  // Define validation schemas for forgotpassword
  const forgotPasswordSchema = z.object({
    forgotEmail: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
  });
  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { forgotEmail: "" },
  });

  const onInvalid = (errors: FieldErrors) => {
    console.log("Validation Errors:", errors);
    toast.error("Please correct the errors before submitting.");
  };

  // on submit data for forgotpassword forms
  const onSubmitForgotPassword = (
    data: z.infer<typeof forgotPasswordSchema>
  ) => {
    console.log("Forgot Password Data:", data);
    toast.info("Password reset link sent! 📩"); // ✅ Feedback message
    setIsForgotPasswordOpen(false);
    forgotPasswordForm.reset();
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
      {/* Login Dialog */}
      <Toaster position="bottom-center" />

      <Dialog open={isLoginOpen} onOpenChange={(isOpen) => {
        setIsLoginOpen(isOpen);
        if (!isOpen) {
          loginForm.reset();
        }
      }}>
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={() => setIsLoginOpen(true)}>
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(handleLogin, onInvalid)}
              className="space-y-4 p-4 w-full"
            >
              <FormField
                control={loginForm.control}
                name="loginBy"
                render={({ field }) => (
                  <FormItem className="form-row">
                    <Label>
                      Login By<span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setSelectedLoginBy(value);
                          field.onChange(value);
                        }}
                        value={selectedLoginBy}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select login method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="phone">Phone Number</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="uniqueid">Unique ID</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="common-error-msg" />
                  </FormItem>
                )}
              />

              {selectedLoginBy === "phone" && (
                <FormField
                  control={loginForm.control}
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
                                phoneForm.setValue(
                                  "countryCode",
                                  value?.value || ""
                                );
                              }}
                            />
                          </div>

                          {/* Phone Number Input (Only Numbers Allowed) */}
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
                              const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                              field.onChange(value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
              )}

              {selectedLoginBy === "email" && (
                <FormField
                  control={loginForm.control}
                  name="loginEmail"
                  render={({ field }) => (
                    <FormItem className="form-row">
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
              )}

              {selectedLoginBy === "uniqueid" && (
                <FormField
                  control={loginForm.control}
                  name="uniqueId"
                  render={({ field }) => (
                    <FormItem className="form-row">
                      <Label>
                        Unique ID<span className="text-red-500">*</span>
                      </Label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your Unique ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="common-error-msg" />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="form-row">
                    <Label>
                      Password<span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
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
              <div className="common-button-rows">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsForgotPasswordOpen(true);
                    forgotPasswordForm.reset();
                  }}
                  className="p-0 forgot-btn"
                >
                  Forgot Password?
                </Button>
                <Button variant="link" type="submit" className="submit-common">
                  Submit <i className="fa fa-angle-right"></i>
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog
        open={isForgotPasswordOpen}
        onOpenChange={(isOpen) => {
          setIsForgotPasswordOpen(isOpen);
          if (!isOpen) {
            forgotPasswordForm.reset();
          }
        }}
      >
        <DialogContent className="common-modal-form w-full max-w-xl top-[5%] translate-y-0" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
          </DialogHeader>
          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit(onSubmitForgotPassword)}
              className="space-y-4 p-4 w-full"
            >
              <FormField
                control={forgotPasswordForm.control}
                name="forgotEmail"
                render={({ field }) => (
                  <FormItem className="form-row">
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
              <div className="common-button-rows">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsForgotPasswordOpen(false);
                    setIsLoginOpen(true);
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
    </>
  );
};

export default Login;
