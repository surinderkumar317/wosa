"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SocialIcons from "@/components/header/SocialIcons";
import Navbar from "@/components/header/Navbar";
import { Button } from "@/components/ui/button";
import CommonImage from "@/components/common/Image";
import { VIRTUALOFFICE_URL } from "@/app/constants/common";
import TimeZone from "./TimeZone";
import Login from "../auth/Login";
import Register from "../auth/Register";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll event handler to check if user is scrolling up or down
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsScrolled(true);
      } else {
        // Scrolling up
        setIsScrolled(false);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`header z-50 ${
        isScrolled ? "!-top-32" : ""
      } transition-all duration-300`}
    >
      <div className="header-topbar p-1">
        <div className="container 2xl m-auto flex gap-4 justify-items-center justify-between">
          <div className="social-icons-cont items-center lg:flex hidden">
            <SocialIcons />
          </div>
          <div className="xl:w-[50%] 2xl:w-[60%] marquee-cont text-white flex items-center">
            {/* <Marquee /> */}
          </div>
          <div className="w-1/3 justify-end gap-3 items-center lg:flex hidden">
            <div className="login-reg-cont text-white">
              <ul className="flex gap-3 uppercase items-center whitespace-nowrap">
                <li><TimeZone/></li>
                <li><Login/></li>
                <li><Register/></li>
                <li>
                  <Link href={VIRTUALOFFICE_URL} target="_blank">Book Counselling</Link>
                </li>
              </ul>              
            </div>
            <div className="quick-btn-cont whitespace-nowrap">
              <Button asChild>
                <Link href="/enquiry" className="quick-enquiry">
                  Quick Enquiry
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="navigation-container p-3">
        <div className="container 2xl m-auto flex gap-4 justify-items-center justify-between">
          <div className="logo-cont">
            <Link href="/">
              <CommonImage
                classname={"logo"}
                src={"/images/logo-wide.svg"}
                alt={"Logo"}
                width={277}
                height={54}
              />
            </Link>
          </div>
          <div className="navbar items-center flex">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
