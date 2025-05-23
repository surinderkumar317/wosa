"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HEADER_LINKS } from "@/app/constants/links";
import CommonImage from "@/components/common/Image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import TimeZone from "./TimeZone";
import Login from "../auth/Login";
import { VIRTUALOFFICE_URL } from "@/app/constants/common";

import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Complaints from "../auth/ComplaintModal";
import Feedback from "../auth/FeedbackModal";
import Register from "../auth/Register";

interface IMenuItem {
  title: string;
  link: string;
  subMenu?: IMenuItem[];
  icon?: string;
  disabled?: boolean;
  newTab?: boolean; // 👈 Add this
}

const menuData: IMenuItem[] = HEADER_LINKS;

const Navbar: React.FC = () => {

  const [isSheetOpen, setIsSheetOpen] = useState(false); // State for sheet open/close
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenuData, setFilteredMenuData] = useState(menuData);

  useEffect(() => {
    // Reset search state whenever the sheet is opened
    if (isSheetOpen) {
      setSearchQuery("");
      setFilteredMenuData(menuData);
    }
  }, [isSheetOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filteredData = menuData
      .map((item) => {
        // Check if the main menu title matches
        const mainMatch = item.title.toLowerCase().includes(query);
  
        // Check if any submenu title matches
        const subMenuMatch = item.subMenu?.filter((subItem) =>
          subItem.title.toLowerCase().includes(query)
        );
  
        // If a match is found, return the item with filtered subMenu
        if (mainMatch || (subMenuMatch && subMenuMatch.length > 0)) {
          return {
            ...item,
            subMenu: subMenuMatch, // Only include matched submenus
          };
        }
  
        // Exclude items that don't match
        return null;
      })
      .filter(Boolean); // Filter out null values
  
    setFilteredMenuData(filteredData as IMenuItem[]); // Cast to IMenuItem[]
  };
  
  
  const handleSheetClose = () => {
    console.log("Sheet is closing, resetting search...");
    setSearchQuery("");
    setFilteredMenuData(menuData);
  };

  return (
    <>
      {/* desktop view */}
      <nav className="hidden lg:flex lg:gap-5">
        <ul className="flex 2xl:gap-6 gap-4 navi">
          {menuData.map((menuItem, index) => (
            <li key={index}>
              <Link
                href={menuItem.link}
                className={menuItem.disabled ? "pointer-events-none" : ""}
                prefetch={true}
              >
                {menuItem.title}
              </Link>
              {menuItem.subMenu && (
                <ul className="navi-dropdown">
                  {menuItem.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={subItem.link}
                        className={
                          subItem.disabled ? "pointer-events-none" : ""
                        }
                        prefetch={true}
                      >
                        {subItem.icon && (
                          <CommonImage
                            src={subItem.icon}
                            alt={subItem.title}
                            width={32}
                            height={32}
                          />
                        )}
                        {subItem.title}
                      </Link>
                      {subItem.subMenu && (
                        <ul className="navi-sub-dropdown">
                          {subItem.subMenu.map((nestedItem, nestedIndex) => (
                            <li key={nestedIndex}>
                              <Link
                                href={nestedItem.link}
                                prefetch={true}
                                target={
                                  nestedItem.newTab ? "_blank" : undefined
                                }
                                rel={
                                  nestedItem.newTab
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {nestedItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  {/* Render Complaints & Feedback only inside the "Other" menu */}
                  {menuItem.title === "Other" && (
                    <>
                      <li className="complaint-feedback-btn">
                        <CommonImage
                          src="/menu-icons/complaint.webp"
                          alt="complaint icon"
                          width={32}
                          height={32}
                        />{" "}
                        <Complaints />
                      </li>
                      <li className="complaint-feedback-btn">
                        <CommonImage
                          src="/menu-icons/feedback.webp"
                          alt="feedback icon"
                          width={32}
                          height={32}
                        />{" "}
                        <Feedback />
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
        {/* Show Dashboard Link When Logged In */}
        <Button
          asChild
          className="relative -top-1 text-base hover:bg-red-600 uppercase dashboard-btn tracking-widest font-bold"
        >
          <Link href="/student-dashboard" prefetch={true}>
            Dashboard
          </Link>
        </Button>
      </nav>

      {/* mobile view */}
      <div className="lg:hidden block">
        <Sheet 
         open={isSheetOpen}
         onOpenChange={(isOpen) => {
           setIsSheetOpen(isOpen); // Manage the sheet's open state
           if (isOpen) {
             // Reset search state when the sheet is opened
             setSearchQuery("");
             setFilteredMenuData(menuData);
           }
           if (!isOpen) {
             handleSheetClose(); // Reset menu when closing the sheet
           }
         }}
        >
          <SheetTrigger>
            <CommonImage
              classname={"mobile-menu"}
              src={"/images/mobile-menu.png"}
              alt={"Mobile Menu"}
              width={30}
              height={30}
            />
          </SheetTrigger>
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>Menu</SheetTitle>
            </VisuallyHidden>
          </SheetHeader>
          <SheetContent className="mobile-navigation">
            <div className="mobile-logo flex justify-center mt-6">
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
            <div className="mobile-buttons flex gap-4 justify-center my-8">
              <Button variant="outline" asChild>
                <Link href={VIRTUALOFFICE_URL} target="_blank">
                  Book Counselling
                </Link>
              </Button>
              <Button variant="destructive" asChild>
                <Link href="/enquiry"
                  onClick={() => setIsSheetOpen(false)} // ✅ Close sheet on click
                >Quick Enquiry</Link>
              </Button>
            </div>

             {/* Search Input */}
            <div className="mt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search menu..."
                className="w-full p-2 border rounded"
              />
            </div>
            <ul className="flex flex-col gap-4 mt-4 mobile-list">
            {filteredMenuData.length > 0 ? (
                filteredMenuData.map((menuItem, index) => (
                  <li key={index}>
                    {/* your Link rendering logic here */}
                    <Link
                      href={menuItem.link}
                      className={menuItem.disabled ? "pointer-events-none text-lg font-semibold" : ""}
                      onClick={() => setIsSheetOpen(false)} // Close the sheet when a link is clicked
                    >
                      {menuItem.title}
                    </Link>

                    {/* submenus */}
                    {menuItem.subMenu && (
                      <ul className="ml-4 mt-2 space-y-2">
                        {menuItem.subMenu.map((sub, subIndex) => (
                          <li className="submenu" key={subIndex}>
                            <div className="flex items-center gap-2">
                              <Link
                                href={sub.link}
                                className={
                                  sub.disabled
                                    ? "pointer-events-none flex items-center gap-2 font-semibold"
                                    : "flex items-center gap-2 font-semibold"
                                }
                                onClick={() => setIsSheetOpen(false)} // Close the sheet when a link is clicked
                              >
                                {sub.icon && (
                                  <CommonImage
                                    src={sub.icon}
                                    alt={sub.title}
                                    width={16}
                                    height={16}
                                  />
                                )}
                                {sub.title}
                              </Link>

                              {/* nested submenu toggle button */}
                              {sub.subMenu && (
                                <button
                                  type="button"
                                  className="ml-auto"
                                  onClick={(e) => {
                                    const parent =
                                      e.currentTarget.closest(".submenu");
                                    if (
                                      parent?.classList.contains(
                                        "open-subdropdown"
                                      )
                                    ) {
                                      parent.classList.remove(
                                        "open-subdropdown"
                                      );
                                    } else {
                                      document
                                        .querySelectorAll(
                                          ".submenu.open-subdropdown"
                                        )
                                        .forEach((el) =>
                                          el.classList.remove(
                                            "open-subdropdown"
                                          )
                                        );
                                      parent?.classList.add("open-subdropdown");
                                    }
                                  }}
                                >
                                  <i className="fa-solid fa-angle-down"></i>
                                </button>
                              )}
                            </div>

                            {/* sub-submenu */}
                            {sub.subMenu && (
                              <ul className="ml-6 mt-1 space-y-1 mobile-subdropdowns">
                                {sub.subMenu.map((branch, branchIndex) => (
                                  <li
                                    key={branchIndex}
                                    className={
                                      branch.disabled
                                        ? "opacity-50 pointer-events-none"
                                        : ""
                                    }
                                  >
                                    <Link
                                      href={branch.link}
                                      onClick={() => setIsSheetOpen(false)} // Close the sheet when a link is clicked
                                    >
                                      {branch.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-center text-muted-foreground text-sm py-4">
                  No menu found
                </li>
              )}

              {/* Show Dashboard Link */}
              <li>
                <Link href="/student-dashboard" 
                  onClick={() => setIsSheetOpen(false)} // ✅ Close sheet on click
                  prefetch={true}
                >
                  Dashboard
                </Link>
              </li>
            </ul>

            <ul className="mobile-login-register">
              <li className="m-timezone-list">
                <TimeZone />
              </li>
              <li className="m-login-register">
                <Login />
              </li>
              <li className="m-login-register">
                <Register />
              </li>
              <li>
                <Complaints />
              </li>
              <li>
                <Feedback />
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Navbar;
