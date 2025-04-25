import React, { useState, useEffect } from "react";
import Link from "next/link";
import CommonImage from "../common/Image";

const BottomarrowPhone: React.FC = () => {
  const [isPhoneListVisible, setIsPhoneListVisible] = useState<boolean>(false);
  const [isArrowVisible, setIsArrowVisible] = useState<boolean>(false);

  // Toggle phone list visibility
  const togglePhoneList = () => {
    setIsPhoneListVisible((prev) => !prev);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 200) {
        setIsArrowVisible(true);
      } else {
        setIsArrowVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed-right-footer">
      {/* Arrow appears when scrolled past the middle of the page */}
      <div
        className={`arrow-fixed ${isArrowVisible ? "" : "hidden"}`}
        onClick={scrollToTop}
      >
        <CommonImage
          src="/images/up-arrow.webp"
          alt="up-arrow"
          width={23}
          height={22}
        />
      </div>

      <div className="phone-fixed">
        <div className="phone-click" onClick={togglePhoneList}>
          {/* Hide phone-fixed.webp when closeIcon.webp is visible */}
          <CommonImage
            src="/images/phone-fixed.webp"
            alt="Phone Fixed"
            width={30}
            height={27}
            classname={isPhoneListVisible ? "hidden" : ""}
          />
          {/* Show closeIcon.webp when phone list is visible */}
          <CommonImage
            src="/images/closeIcon.webp"
            alt="Close Icon"
            width={22}
            height={25}
            classname={isPhoneListVisible ? "" : "hidden"}
          />
        </div>
        <div className={`phone-list ${isPhoneListVisible ? "" : "hidden"}`}>
          <ul>
            <li>
              <Link href="tel:+919115017017">
                <CommonImage
                  src="/images/phone-call.webp"
                  alt="Phone Icon"
                  width={35}
                  height={35}
                />{" "}
                +919115017017
              </Link>
            </li>
            <li>
              <Link href="tel:+917206050110">
                <CommonImage
                  src="/images/phone-call.webp"
                  alt="Phone Icon"
                  width={35}
                  height={35}
                />{" "}
                +917206050110
              </Link>
            </li>
            <li>
              <Link href="https://wa.me/+919896512412?text=Hi">
                <CommonImage
                  src="/images/whatsapp.webp"
                  alt="Whatsapp Icon"
                  width={35}
                  height={35}
                />{" "}
                +919896512412
              </Link>
            </li>
            <li>
              <Link href="mailto:info@western-overseas.com">
                <CommonImage
                  src="/images/email.webp"
                  alt="Email Icon"
                  width={35}
                  height={35}
                />{" "}
                info@western-overseas.com
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BottomarrowPhone;
