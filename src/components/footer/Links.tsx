"use client";
import React from "react";
import Link from "next/link";
import { FOOTER_LINKS } from "@/app/constants/links";
import Complaints from "../auth/ComplaintModal";
import Feedback from "../auth/FeedbackModal";

interface ILinkItem {
  name: string;
  href: string;
}

const FooterLinks: React.FC = () => {
  const links: { title: string; items: ILinkItem[] }[] = FOOTER_LINKS;

  return (
    <nav className="footer-links flex lg:flex-row flex-col gap-5" aria-label="Footer Navigation">
      {links.map((category) => (
        <div key={category.title} className="lg:w-1/5 w-full">
          <h3>{category.title}</h3>
          <ul>
            {category.items.map((link) => (
              <li key={`${link.name}-${link.href}`}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
            {/* Render only if category title is 'Other' */}
            {category.title === "Others" && (
              <>
                <li className="footer-complaint-feedback"><Complaints /></li>
                <li className="footer-complaint-feedback"><Feedback /></li>
              </>
            )}           
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default FooterLinks;
