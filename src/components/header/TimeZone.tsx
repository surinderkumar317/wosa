"use client";

import { useEffect, useState, useRef } from "react";
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
  searchable: string;
};

const countries: CountryOption[] = [
  { label: "United States", value: "America/New_York", searchable: "usa" },
  { label: "India", value: "Asia/Kolkata", searchable: "india" },
  { label: "United Kingdom", value: "Europe/London", searchable: "uk" },
  { label: "Japan", value: "Asia/Tokyo", searchable: "japan" },
  { label: "Australia", value: "Australia/Sydney", searchable: "australia" },
  { label: "Afghanistan", value: "Asia/Kabul", searchable: "afghanistan" },
  { label: "Albania", value: "Europe/Tirane", searchable: "albania" },
  { label: "Algeria", value: "Africa/Algiers", searchable: "algeria" },
  { label: "Andorra", value: "Europe/Andorra", searchable: "andorra" },
  { label: "Angola", value: "Africa/Luanda", searchable: "angola" },
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

const CountryTimeSelector: React.FC = () => {
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isInitialSelection, setIsInitialSelection] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = countries.filter((country) =>
    country.searchable.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const saved = localStorage.getItem("selected-timezone");
    if (saved) {
      setSelectedTimezone(saved);
      setIsInitialSelection(false);
    } else {
      setIsInitialSelection(true);
      setDialogOpen(true);
    }
  }, []);

  const selectedCountry = countries.find((c) => c.value === selectedTimezone);

  const handleSelect = (value: string) => {
    setSelectedTimezone(value);
    localStorage.setItem("selected-timezone", value);
    setIsInitialSelection(false);
    setDialogOpen(false);
  };

  useEffect(() => {
    if (selectOpen && inputRef.current) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timeout);
    }
  }, [selectOpen]);

  return (
    <div className="space-y-6">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className={`w-full max-w-[700px] px-10 py-20 timezone-modal ${
            isInitialSelection ? "hide-close-icon" : ""
          }`}
        >
          <DialogHeader>
            <h2
              className={`text-2xl font-bold text-center w-full my-6 mb-10 ${
                !isInitialSelection ? "hidden" : ""
              }`}
            >
              Hi! There are multiple time zones in your country. Please select
              one to continue.
            </h2>
            <DialogTitle className="!font-normal mt-7 px-10">
              Select Your Country
            </DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col pb-5 px-10 timezone-text">
            <Select
              value={selectedTimezone || undefined}
              onValueChange={handleSelect}
              open={selectOpen}
              onOpenChange={setSelectOpen}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent
                onPointerDown={(e) => {
                  // Prevent the input from bubbling to close
                  e.stopPropagation();
                }}
              >
                <div
                  className="px-2 py-2"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <input
                    type="text"
                    ref={inputRef}
                    placeholder="Search country..."
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="max-h-44 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-red-500">
                      No matching country found.
                    </div>
                  )}
                </div>
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>

      {selectedTimezone && (
        <div
          className="flex cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <p className="text-[1rem] font-bold flex gap-2 time-zone-text">
            <span>{selectedCountry?.label}</span>
            <span>{formatTimezoneOffset(selectedTimezone)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryTimeSelector;
