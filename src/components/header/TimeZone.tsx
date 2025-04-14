"use client";

import { useEffect, useState } from "react";
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

type CountryOption = {
  label: string;
  value: string;
};

const countries: CountryOption[] = [
  { label: "United States", value: "America/New_York" },
  { label: "India", value: "Asia/Kolkata" },
  { label: "United Kingdom", value: "Europe/London" },
  { label: "Japan", value: "Asia/Tokyo" },
  { label: "Australia", value: "Australia/Sydney" },
];

const formatTimezoneOffset = (timezone: string): string => {
  const now = new Date();
  const options = {
    timeZone: timezone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  } as const;

  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(now);
  const offset = parts.find((p) => p.type === "timeZoneName")?.value || "";
  return offset.replace("GMT", "UTC").replace("UTC", "UTC ");
};

export default function CountryTimeSelector() {
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Show modal only if not selected before
  useEffect(() => {
    const saved = localStorage.getItem("selected-timezone");
    if (saved) {
      setSelectedTimezone(saved);
    } else {
      setOpen(true);
    }
  }, []);

  const selectedCountry = countries.find((c) => c.value === selectedTimezone);

  const handleSelect = (value: string) => {
    setSelectedTimezone(value);
    localStorage.setItem("selected-timezone", value);
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* The dialog only opens once on first load */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[700px] px-10 pt-15">
          <DialogHeader>
            <h2 className="text-2xl font-bold text-center w-full my-6">
              Hi! There are multiple time zones in your country. Please select one to continue.
            </h2>
            <DialogTitle className="!font-normal mt-7">Select Your Country</DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col pb-5">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>

      {/* Show selected timezone anywhere */}
      {selectedTimezone && (
        <div className="flex cursor-pointer" onClick={() => setOpen(true)}>
          <p className="text-[1rem] font-bold flex gap-2">
            <span>{selectedCountry?.label}</span>
            <span>{formatTimezoneOffset(selectedTimezone)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
