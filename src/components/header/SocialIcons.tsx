import React from 'react';
import { SOCIAL_LINKS_HEADER } from '@/app/constants/links';
import CommonImage from '../common/Image';
import Link from 'next/link';

interface ISocialIcon {
  href: string;
  src: string;
  alt: string;
}

const SocialIcons: React.FC = () => {
  return (
    <ul className="socialIco flex gap-2 items-center">
      {SOCIAL_LINKS_HEADER.map((icon, index) => (
        <li key={index}>
          <Link href={icon.href} target="_blank" rel="noopener noreferrer">
            <CommonImage
              src={icon.src}
              alt={icon.alt}
              width={20}
              height={20}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SocialIcons;
