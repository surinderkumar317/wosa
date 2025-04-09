"use client";
import Link from "next/link";
import { HEADER_LINKS } from "@/app/constants/links";
import CommonImage from "@/components/common/Image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import TimeZone from "./TimeZone";
import Login from "../auth/Login";

import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Complaints from "../auth/ComplaintModal";
import Feedback from "../auth/FeedbackModal";

interface IMenuItem {
  title: string;
  link: string;
  subMenu?: IMenuItem[];
  icon?: string;
  disabled?: boolean;
}

const menuData: IMenuItem[] = HEADER_LINKS;

const Navbar: React.FC = () => { 

  return (
    <>
      {/* desktop view */}
      <nav className="hidden lg:flex lg:gap-5">
        <ul className="flex gap-6 navi">
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
                              <Link href={nestedItem.link} prefetch={true}>
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
        <Button asChild className="relative -top-1 text-base hover:bg-red-600">
          <Link href="/student-dashboard" prefetch={true}>Dashboard</Link>
        </Button>
      </nav>

      {/* mobile view */}
      <div className="lg:hidden block">
        <Sheet>
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
              <CommonImage
                classname={"logo"}
                src={"/images/logo-wide.svg"}
                alt={"Logo"}
                width={277}
                height={34}
              />
            </div>
            <div className="mobile-buttons flex gap-4 justify-center my-8">
              <Button variant="outline" asChild>
                <Link href="/">Book Counselling</Link>
              </Button>
              <Button variant="destructive" asChild>
                <Link href="/">Quick Enquiry</Link>
              </Button>
            </div>
            <ul className="flex flex-col gap-4 mt-4">
              {menuData.map((menuItem, index) => (
                <li key={index}>
                  <Link
                    href={menuItem.link}
                    className={
                      menuItem.disabled
                        ? "pointer-events-none text-lg font-semibold"
                        : ""
                    }
                  >
                    {menuItem.title}
                  </Link>
                  {menuItem.subMenu && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {menuItem.subMenu.map((sub, subIndex) => (
                        <li className="submenu" key={subIndex}>
                          <Link
                            href={sub.link}
                            className={
                              sub.disabled
                                ? "pointer-events-none flex items-center gap-2 font-semibold"
                                : "flex items-center gap-2 font-semibold"
                            }
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
                                  <Link href={branch.link}>{branch.title}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {/* Show Dashboard Link When Logged In */}
              <li>
                <Link href="/student-dashboard" prefetch={true}>Dashboard</Link>
              </li>
            </ul>
            <ul className="mobile-login-register">
              <li>
                <TimeZone />
              </li>
              <li className="m-login-register">
                <Login />
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
