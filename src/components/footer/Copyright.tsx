import React from "react";
import Link from "next/link";
import { SOCIAL_LINKS_FOOTER } from "@/app/constants/links";
import CommonImage from "../common/Image";

interface ISocialIcon {
  href: string;
  src: string;
  alt: string;
}

const FooterCopyright: React.FC = () => {
  const footerSocialIcons: ISocialIcon[] = SOCIAL_LINKS_FOOTER;

  return (
    <div className="footer-copyright flex justify-center items-center gap-8">
      {/* Copyright Text */}
      <div className="footer-copy-text">
        <p>© {new Date().getFullYear()} Western Overseas Study Abroad Limited. All Rights Reserved.</p>
      </div>

      {/* Social Media Icons */}
      <div className="footer-social-media">
        <ul className="flex gap-4">
          {footerSocialIcons.map((icon, index) => (
            <li key={index}>
              <Link
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.alt}
                className="transition-opacity duration-200"
              >
                <CommonImage src={icon.src} alt={icon.alt} width={24} height={24} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterCopyright;
