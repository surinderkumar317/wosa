"use client";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import CommonImage from "./common/Image";

interface Association {
  id: string;
  imgSrc: string;
  title: string;
}

const Accolades: React.FC = () => {
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const [desktopActiveIndexes, setDesktopActiveIndexes] = useState<number[]>([0, 0, 0]);
  const [step, setStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // ✅ Add Loading State

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Simulate loading delay (you can remove this delay if not needed)
    setTimeout(() => setLoading(false), 500); // ✅ Set loading to false after 1.5s

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isPaused && windowWidth !== null && windowWidth <= 992) {
      const interval = setInterval(() => {
        setMobileActiveIndex((prevIndex) => (prevIndex + 1) % 6);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPaused, windowWidth]);

  useEffect(() => {
    if (!isPaused && windowWidth !== null && windowWidth > 992) {
      const interval = setInterval(() => {
        setDesktopActiveIndexes((prevIndexes) => {
          const newIndexes = [...prevIndexes];
          newIndexes[step] = (newIndexes[step] + 1) % 2;
          return newIndexes;
        });

        setStep((prevStep) => (prevStep + 1) % 3);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [step, isPaused, windowWidth]);

  const associations: Association[] = [
    { id: "1", imgSrc: "/images/Website_ICEF.webp", title: "ICEF - Gold Sponsorship" },
    { id: "2", imgSrc: "/images/PIER.webp", title: "PIER" },
    { id: "3", imgSrc: "/images/British-Council.webp", title: "British Council" },
    { id: "4", imgSrc: "/images/Canada-Agent.webp", title: "Canada Agent" },
    { id: "5", imgSrc: "/images/NZ-Certification-for-Web.webp", title: "NZ Certification" },
    { id: "6", imgSrc: "/images/British-Council.webp", title: "British Council" },
  ];

  if (loading || windowWidth === null) {
    return (
      <div className="h-40 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="acolades-section py-12 items-center flex">
      <div className="container acolade-container m-auto pb-5">
        <h2 className="accolades-heading text-center py-10">Accolades</h2>

        {windowWidth <= 992 ? (
          <div className="certificate-common-box w-full flex flex-col items-center">
            {associations.map((award, index) => (
              <div
                key={award.id}
                className={`award-certi flex gap-5 flex-col text-center transition-opacity duration-700 ease-in-out ${
                  index === mobileActiveIndex ? "active" : "hidden"
                }`}
              >
                <div
                  className="as-box transition-transform duration-500 hover:scale-110"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                  onLoad={() => setLoading(false)} // ✅ Set loading false when image loads
                >
                  <CommonImage
                    src={award.imgSrc}
                    width={334}
                    height={405}
                    alt="certificate"                    
                  />
                </div>
                <div className="asso-title">{award.title}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="asso-thumb-container flex flex-col sm:flex-row gap-10 w-full justify-center px-10 mb-10">
            {[0, 1, 2].map((groupIndex) => (
              <div key={groupIndex} className="certificate-common-box w-full">
                {[0, 1].map((awardIndex) => {
                  const award = associations[groupIndex * 2 + awardIndex];
                  return (
                    <div
                      key={award.id}
                      className={`award-certi flex gap-5 flex-col transition-opacity duration-700 ease-in-out ${
                        awardIndex === desktopActiveIndexes[groupIndex] ? "active" : "hidden"
                      }`}
                    >
                      <div
                        className="as-box transition-transform duration-500 hover:scale-110"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        onLoad={() => setLoading(false)} // ✅ Hide loader after image loads
                      >
                        <CommonImage
                          src={award.imgSrc}
                          width={334}
                          height={405}
                          alt="certificate"
                          
                        />
                      </div>
                      <div className="asso-title">{award.title}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accolades;
