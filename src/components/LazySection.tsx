"use client"
import { useEffect, useState, useRef } from "react";
import Loading from "@/app/loading";

const LazySection = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        rootMargin: "200px", // Preload before appearing
        threshold: 0.1, // Trigger when 10% is visible
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return <div ref={ref}>{isVisible ? children : <Placeholder />}</div>;
};

const Placeholder = () => (
  <div
    style={{
      height: "200px",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Loading />
  </div>
);

export default LazySection;
