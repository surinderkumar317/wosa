"use client";

import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CountryOption = {
  label: string; // Country name
  value: string; // Timezone
};

const countries: CountryOption[] = [
  { label: "United States", value: "America/New_York" },
  { label: "India", value: "Asia/Kolkata" },
  { label: "United Kingdom", value: "Europe/London" },
  { label: "Japan", value: "Asia/Tokyo" },
  { label: "Australia", value: "Australia/Sydney" },
  { label: "Afghanistan", value: "Asia/Kabul" },
  { label: "Albania", value: "Europe/Tirane" },
  { label: "Algeria", value: "Africa/Algiers" },
  { label: "Andorra", value: "Europe/Andorra" },
  { label: "Angola", value: "Africa/Luanda" },
  { label: "Argentina", value: "America/Argentina/Buenos_Aires" },
  { label: "Armenia", value: "Asia/Yerevan" },
  { label: "Austria", value: "Europe/Vienna" },
  { label: "Azerbaijan", value: "Asia/Baku" },
  { label: "Bahamas", value: "America/Nassau" },
  { label: "Bahrain", value: "Asia/Bahrain" },
  { label: "Bangladesh", value: "Asia/Dhaka" },
  { label: "Belarus", value: "Europe/Minsk" },
  { label: "Belgium", value: "Europe/Brussels" },
  { label: "Bolivia", value: "America/La_Paz" },
  { label: "Brazil", value: "America/Sao_Paulo" },
  { label: "Bulgaria", value: "Europe/Sofia" },
  { label: "Canada", value: "America/Toronto" },
  { label: "Chile", value: "America/Santiago" },
  { label: "China", value: "Asia/Shanghai" },
  { label: "Colombia", value: "America/Bogota" },
  { label: "Costa Rica", value: "America/Costa_Rica" },
  { label: "Croatia", value: "Europe/Zagreb" },
  { label: "Czech Republic", value: "Europe/Prague" },
  { label: "Denmark", value: "Europe/Copenhagen" },
  { label: "Egypt", value: "Africa/Cairo" },
  { label: "Estonia", value: "Europe/Tallinn" },
  { label: "Finland", value: "Europe/Helsinki" },
  { label: "France", value: "Europe/Paris" },
  { label: "Germany", value: "Europe/Berlin" },
  { label: "Greece", value: "Europe/Athens" },
  { label: "Hong Kong", value: "Asia/Hong_Kong" },
  { label: "Hungary", value: "Europe/Budapest" },
  { label: "Iceland", value: "Atlantic/Reykjavik" },
  { label: "Indonesia", value: "Asia/Jakarta" },
  { label: "Iran", value: "Asia/Tehran" },
  { label: "Iraq", value: "Asia/Baghdad" },
  { label: "Ireland", value: "Europe/Dublin" },
  { label: "Israel", value: "Asia/Jerusalem" },
  { label: "Italy", value: "Europe/Rome" },
  { label: "Jamaica", value: "America/Jamaica" },
  { label: "Kazakhstan", value: "Asia/Almaty" },
  { label: "Kenya", value: "Africa/Nairobi" },
  { label: "Malaysia", value: "Asia/Kuala_Lumpur" },
  { label: "Mexico", value: "America/Mexico_City" },
  { label: "Netherlands", value: "Europe/Amsterdam" },
  { label: "New Zealand", value: "Pacific/Auckland" },
  { label: "Nigeria", value: "Africa/Lagos" },
  { label: "Norway", value: "Europe/Oslo" },
  { label: "Pakistan", value: "Asia/Karachi" },
  { label: "Peru", value: "America/Lima" },
  { label: "Philippines", value: "Asia/Manila" },
  { label: "Poland", value: "Europe/Warsaw" },
  { label: "Portugal", value: "Europe/Lisbon" },
  { label: "Romania", value: "Europe/Bucharest" },
  { label: "Russia", value: "Europe/Moscow" },
  { label: "Saudi Arabia", value: "Asia/Riyadh" },
  { label: "Singapore", value: "Asia/Singapore" },
  { label: "South Africa", value: "Africa/Johannesburg" },
  { label: "South Korea", value: "Asia/Seoul" },
  { label: "Spain", value: "Europe/Madrid" },
  { label: "Sweden", value: "Europe/Stockholm" },
  { label: "Switzerland", value: "Europe/Zurich" },
  { label: "Taiwan", value: "Asia/Taipei" },
  { label: "Thailand", value: "Asia/Bangkok" },
  { label: "Turkey", value: "Europe/Istanbul" },
  { label: "Ukraine", value: "Europe/Kiev" },
  { label: "United Arab Emirates", value: "Asia/Dubai" },
  { label: "Uruguay", value: "America/Montevideo" },
  { label: "Venezuela", value: "America/Caracas" },
  { label: "Vietnam", value: "Asia/Ho_Chi_Minh" },
];


const formatTimezoneOffset = (timezone: string | null): string => {
  if (!timezone) {
    return "Invalid Timezone"; // Handle null or undefined timezone
  }

  const now = new Date();
  const options = {
    timeZone: timezone,
    timeZoneName: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  } as const;

  try {
    const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(now);
    const offset = parts.find((p) => p.type === "timeZoneName")?.value || "";

    // Check if offset contains GMT or UTC
    if (offset.includes("GMT")) {
      return offset; // Keep GMT format for GMT countries
    } else if (offset.includes("UTC")) {
      return offset.replace("UTC", "UTC "); // Ensure UTC format remains consistent
    } else {
      return `UTC ${offset}`; // Default to UTC if unidentified
    }
  } catch (error) {
    console.error("Error formatting timezone:", error);
    return "Invalid Timezone"; // Handle invalid timezone gracefully
  }
};


const CountryTimeSelector: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [isInitialSelection, setIsInitialSelection] = useState(false);

  // Load the saved country on first render
  useEffect(() => {
    const savedCountry = localStorage.getItem("selected-country");
    if (savedCountry) {
      const parsedCountry = JSON.parse(savedCountry) as CountryOption;
      setSelectedCountry(parsedCountry);
      setIsInitialSelection(false);
    } else {
      setIsInitialSelection(true);
      setOpen(true);
    }
  }, []);

  const handleSelect = (newValue: SingleValue<CountryOption>) => {
    if (newValue) {
      setSelectedCountry(newValue);
      localStorage.setItem("selected-country", JSON.stringify(newValue));
      setIsInitialSelection(false); // Mark as no longer initial selection
      setOpen(false);
    } else {
      console.error("Invalid country selection");
    }
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f1f1f1" : state.isFocused ? "#f1f1f1" : "#fff",
      color: state.isSelected ? "#000" : "#000",
      padding:8,
    }),
  };

  return (
    <div className="space-y-6">
      {/* The dialog opens once for first-time users */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`w-full max-w-[700px] px-10 py-20 timezone-modal ${
            isInitialSelection ? "hide-close-icon" : ""
          }`}
        >
          <DialogHeader>
            {isInitialSelection && ( // Show this heading only for first-time users
              <h2 className="text-2xl font-bold text-center w-full my-6 mb-10">
                Hi! There are multiple time zones in your country. Please select
                one to continue.
              </h2>
            )}
            <DialogTitle className="!font-normal mt-7 px-10">
              Select Your Country
            </DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col pb-5 px-10 timezone-text">
            <div className="space-y-6">
              <Select
                options={countries}
                value={selectedCountry} // Pre-select the stored value
                onChange={handleSelect}
                placeholder="Search country..."
                isSearchable
                className="w-full"
                styles={customStyles}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Display selected country and timezone */}
      {selectedCountry && (
        <div
          className="cursor-pointer"
          onClick={() => setOpen(true)} // Allow user to reopen the dialog
        >
          <p className="text-[1rem] font-bold flex gap-2 time-zone-text">
            {selectedCountry.label} {formatTimezoneOffset(selectedCountry.value)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryTimeSelector;