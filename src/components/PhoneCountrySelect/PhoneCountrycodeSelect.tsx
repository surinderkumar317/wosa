"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";

type CountryOption = {
  label: string;
  value: string;
};

const countryOptions: CountryOption[] = [
  { value: "+1", label: "+1 - US" },
  { value: "+44", label: "+44 - GB" },
  { value: "+91", label: "+91 - IN" },
  { value: "+61", label: "+61 - AU" },
  { value: "+81", label: "+81 - JP" },
  { value: "+49", label: "+49 - DE" },
  { value: "+33", label: "+33 - FR" },
  { value: "+39", label: "+39 - IT" },
  { value: "+86", label: "+86 - CN" },
  { value: "+7", label: "+7 - RU" },
  { value: "+55", label: "+55 - BR" },
  { value: "+34", label: "+34 - ES" },
  { value: "+27", label: "+27 - ZA" },
  { value: "+82", label: "+82 - KR" },
  { value: "+52", label: "+52 - MX" },
  { value: "+31", label: "+31 - NL" },
  { value: "+47", label: "+47 - NO" },
  { value: "+46", label: "+46 - SE" },
  { value: "+41", label: "+41 - CH" },
  { value: "+65", label: "+65 - SG" },
  { value: "+20", label: "+20 - EG" },
  { value: "+966", label: "+966 - SA" },
  { value: "+971", label: "+971 - AE" },
  { value: "+32", label: "+32 - BE" },
  { value: "+48", label: "+48 - PL" },
  { value: "+90", label: "+90 - TR" },
  { value: "+30", label: "+30 - GR" },
  { value: "+353", label: "+353 - IE" },
  { value: "+358", label: "+358 - FI" },
  { value: "+372", label: "+372 - EE" },
  { value: "+420", label: "+420 - CZ" },
  { value: "+421", label: "+421 - SK" },
  { value: "+380", label: "+380 - UA" },
  { value: "+56", label: "+56 - CL" },
  { value: "+57", label: "+57 - CO" },
  { value: "+591", label: "+591 - BO" },
  { value: "+595", label: "+595 - PY" },
  { value: "+598", label: "+598 - UY" },
  { value: "+64", label: "+64 - NZ" },
  { value: "+62", label: "+62 - ID" },
  { value: "+63", label: "+63 - PH" },
  { value: "+66", label: "+66 - TH" },
  { value: "+84", label: "+84 - VN" },
  { value: "+92", label: "+92 - PK" },
  { value: "+880", label: "+880 - BD" },
  { value: "+977", label: "+977 - NP" },
  { value: "+94", label: "+94 - LK" },
  { value: "+212", label: "+212 - MA" },
  { value: "+213", label: "+213 - DZ" },
  { value: "+216", label: "+216 - TN" },
  { value: "+218", label: "+218 - LY" },
  { value: "+254", label: "+254 - KE" },
  { value: "+255", label: "+255 - TZ" },
  { value: "+256", label: "+256 - UG" },
  { value: "+260", label: "+260 - ZM" },
  { value: "+263", label: "+263 - ZW" },
];


const PhoneCountryCodeSelect: React.FC<{
  value?: CountryOption | null;
  onChange: (value: CountryOption | null) => void;
}> = ({ value, onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setSelectedCountry(value ?? { value: "+91", label: "+91 - IN" });
  }, [value]);

  const handleSelect = (selectedOption: CountryOption | null) => {
    console.log("Selected Country:", selectedOption); // Debugging step
    setSelectedCountry(selectedOption);
    onChange?.(selectedOption); // Ensure `onChange` is called safely
  };
  

  if (!isHydrated) return null; // Prevent mismatched rendering during SSR

  const customStyles = {
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: 200, // Set max height for the dropdown
      overflowY: "auto", // Enable scrolling when options exceed max height
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f1f1f1" : state.isFocused ? "#f1f1f1" : "#fff",
      color: state.isSelected ? "#000" : "#000",
      padding:5,
    }),
  };

  return (
    <Select
      options={countryOptions}
      value={selectedCountry}
      onChange={handleSelect}
      placeholder={selectedCountry ? selectedCountry.label : "Select Country Code"}
      isSearchable
      className="w-full border-none phone-country-code-select"
      styles={customStyles}
    />
  );
};

export default PhoneCountryCodeSelect;
