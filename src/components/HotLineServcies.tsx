import Link from "next/link";
import React from 'react';
import CommonImage from "./common/Image";

interface ContactItem {
    iconClass: string;
    src: string;
    alt: string;
    link: string;
    text: string;
}

interface ImageItem {
    imageClass: string;
    src: string;
    alt: string;
}

interface HotlineData {
    Heading: string;
    ParagraphContent: string;
    contacts: ContactItem[];
    image: ImageItem[];
}

const hotlineContent: HotlineData = {
    Heading: "Hotline Service",
    ParagraphContent: "Western Overseas is here to help! Discover our hotline services and essential contact details to get complete support regarding visa and coaching services. Thank you for your interest and to know more details please visit our nearest branch to get Expert Support.",
    image: [
        {
            imageClass: "hotlinkimage",
            src: "/images/con-info.webp",
            alt: "Hotline Information Image",
        }
    ],
    contacts: [
        {
            iconClass: "phone-icon",
            src: "/images/tele-icn.webp",
            alt: "Phone Icon",
            link: "tel:+919115017017",
            text: "+919115017017"
        },
        {
            iconClass: "whatsapp-icon",
            src: "/images/whatsapp-icon.webp",
            alt: "WhatsApp Icon",
            link: "https://wa.me/+919896512412?text=Hi",
            text: "+919896512412"
        },
        {
            iconClass: "message-icon",
            src: "/images/msg-icon.webp",
            alt: "Message Icon",
            link: "mailto:info@western-overseas.com",
            text: "info@western-overseas.com"
        }
    ]
};

const HotLineServices: React.FC = () =>  {
    return (
        <div className='hotline-section py-24'>
            <div className='container flex lg:flex-row flex-col m-auto hotline-inner-container'>
                <div className='lg:w-3/5 md:w-full sm:w-full'>
                    <h2>{hotlineContent.Heading}</h2>
                    <p>{hotlineContent.ParagraphContent}</p>
                    <ul className="hotlineicons">
                        {hotlineContent.contacts.map((contact, idx) => (
                            <li key={idx} className="flex gap-3 items-center">
                                <CommonImage
                                    classname={contact.iconClass}
                                    src={contact.src}
                                    alt={contact.alt}
                                    width={30}
                                    height={30}
                                />
                                <Link href={contact.link}>{contact.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='lg:w-2/5 md:w-full sm:w-full p-1'>
                    {hotlineContent.image.map((image, imgIdx) => (
                        <CommonImage
                            key={imgIdx}
                            classname={image.imageClass}
                            src={image.src}
                            alt={image.alt}
                            width={680}
                            height={452}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotLineServices;
