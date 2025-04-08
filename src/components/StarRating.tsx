"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure you have this utility

interface StarRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  value = 0,
  onChange,
  maxStars = 5,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
        <Star
          key={star}
          className={cn(
            "w-6 h-6 cursor-pointer transition-colors",
            (hovered ?? value) >= star ? "text-yellow-500" : "text-gray-300"
          )}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange?.(star)}
          fill={(hovered ?? value) >= star ? "currentColor" : "none"}
          stroke="currentColor"
        />
      ))}
    </div>
  );
};

export default StarRating;
