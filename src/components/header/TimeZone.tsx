'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type CountryOption = {
  label: string
  value: string // timezone
}

const countries: CountryOption[] = [
  { label: 'United States', value: 'America/New_York' },
  { label: 'India', value: 'Asia/Kolkata' },
  { label: 'United Kingdom', value: 'Europe/London' },
  { label: 'Japan', value: 'Asia/Tokyo' },
  { label: 'Australia', value: 'Australia/Sydney' },
]

// ✅ Helper to get UTC offset like "UTC +05:30"
const formatTimezoneOffset = (timezone: string): string => {
  const now = new Date()
  const options = {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  } as const

  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now)
  const offset = parts.find((p) => p.type === 'timeZoneName')?.value || ''
  return offset.replace('GMT', 'UTC').replace('UTC', 'UTC ')
}

export default function CountryTimeSelector() {
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Automatically open the dialog on first render
    setOpen(true)
  }, [])

  const selectedCountry = countries.find((c) => c.value === selectedTimezone)

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select a Country</DialogTitle>
          </DialogHeader>

          <Select
            onValueChange={(value) => {
              setSelectedTimezone(value)
              setOpen(false)
            }}
          >
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
        </DialogContent>
      </Dialog>

      {/* ✅ Show only country + UTC offset */}
      {selectedTimezone && (
        <div className="flex animate-fade-in">
          <p className="text-[1rem] font-bold flex gap-2">
            <span>{selectedCountry?.label}</span> <span>{formatTimezoneOffset(selectedTimezone)}</span>
          </p>
        </div>
      )}
    </div>
  )
}
