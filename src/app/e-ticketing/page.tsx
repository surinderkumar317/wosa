import CommonImage from "@/components/common/Image";
import Link from "next/link";
import React from "react";

interface Heading {
  tag: "h1" | "h2";
  text: string;
}

interface Paragraph {
  description: string;
}

interface Benefit {
  title: string;
  description: string;
}

const headings: Heading[] = [{ tag: "h1", text: "About Air Ticketing" }];
const subheadings: Heading[] = [{ tag: "h2", text: "Why Choose Us?" }];

const paracontent: Paragraph[] = [
  {
    description:
      "Welcome to Western Overseas Air Ticketing Services! We are IATA certified and offer you exclusive International air ticket booking services with the lowest fares and offers. Nowadays, most people are aspiring to move abroad and look here and there to find the best and cheapest air tickets. If you are also planning your trip abroad, then no need to worry! Western Overseas facilitates flight booking services and interacts with customers about related queries. Once you receive your visa, call or visit Western Overseas to book your tickets anytime within your budget to make your journey smooth and hassle-free.",
  },
];

const subparacontent: Paragraph[] = [
  {
    description:
      "Our team at Western Overseas will give you proper guidance for what to carry and offer numerous discounts to make your journey affordable and reasonable. Also, we provide 24*7 customer support on any modifications of air tickets. Western overseas teams are always excited to share topics related to immigration and coaching, visa planning, airline ticket booking, latest updates on countries, colleges, and universities. So, hurry up! Once your visa is approved, visit us for any air ticketing assistance.",
  },
];

const benefits: Benefit[] = [
  {
    title: "Expertise and Knowledge",
    description:
      "Western Overseas has a team of trained professionals in the airline industry who have extensive knowledge of air flights, including routes, fares, and travel regulations. So, it is recommended to book flights with valuable advice and guidance.",
  },
  {
    title: "Time-saving",
    description:
      "We at Western Overseas will save you time by handling all the research, paperwork, and booking at our end. Our travel agents will simplify the booking process and ensure smooth transitions.",
  },
  {
    title: "Customized Itineraries",
    description:
      "Choose Western Overseas to meet your specific needs, such as layover durations, preferred airlines, and seating preferences.",
  },
  {
    title: "Cost Savings",
    description:
      "We have access to special deals and discounts that are not readily available to the public. So, Western Overseas can help you find the best fares and offers to fit your budget.",
  },
  {
    title: "Convenience",
    description:
      "Western Overseas will take care of all the details, including coordinating flights, transportation, and travel insurance to make your travel experience more convenient.",
  },
  {
    title: "Assistance",
    description:
      "In case of travel disruptions, like flight cancellations or delays, our travel agents will provide immediate assistance and help you make alternative arrangements.",
  },
  {
    title: "Documentation Assistance",
    description:
      "Our experts will guide you through the counseling, coaching, and visa assistance process, ensuring you have all necessary documentation for international travel.",
  },
  {
    title: "Language Assistance",
    description:
      "If you're traveling to a country where you're not fluent in the local language, we provide translation services or recommend resources to help you communicate effectively.",
  },
  {
    title: "Local Knowledge",
    description:
      "We have access to local contacts in your destination, allowing you to tap into their expertise for recommendations on activities, restaurants, and cultural experiences.",
  },
  {
    title: "Peace of Mind",
    description:
      "Hiring Western Overseas for international trips provides peace of mind, knowing that you have a professional handling the logistics, ensuring compliance with international regulations, and addressing any issues that may arise during your journey.",
  },
];

const contactInfo = [
  {
    type: "email",
    href: "mailto:wosaticketing@western-overseas.com",
    label: "wosaticketing@western-overseas.com",
  },
  {
    type: "email",
    href: "mailto:wosaticketing1@western-overseas.com",
    label: "wosaticketing1@western-overseas.com",
  },
  { type: "phone", href: "tel:9875927153", label: "9875927153" },
  { type: "phone", href: "tel:9875927150", label: "9875927150" },
];

const Eticketing: React.FC = () => (
  <div className="eticketing-container py-10">
    <div className="container m-auto">
      {headings.map((heading, index) =>
        React.createElement(heading.tag, { key: index }, heading.text)
      )}

      {paracontent.map((paragraph, index) => (
        <p key={index}>{paragraph.description}</p>
      ))}

      <CommonImage
        src="/images/iata-logo.webp"
        width={600}
        height={400}
        alt="certificate"
        classname="m-auto"
      />

      {subparacontent.map((subparagraph, index) => (
        <p key={index}>{subparagraph.description}</p>
      ))}

      {subheadings.map((subheading, index) =>
        React.createElement(subheading.tag, { key: index }, subheading.text)
      )}

      <ul>
        {benefits.map((benefit, index) => (
          <li key={index}>
            <strong>{benefit.title}:</strong> {benefit.description}
          </li>
        ))}
      </ul>

      <p>
      Let’s take off to your dream destination! Western Overseas offers you unbeatable deals and huge savings on air flight bookings. Don’t get too late. Just pick up your phone and book your international flights with our customer care executives. By helping a number of customers, we have made planning and booking cheap flights easier. Drop your queries at{" "}
        {contactInfo
          .filter((info) => info.type === "email")
          .map((info, index) => (
            <React.Fragment key={index}>
              <strong><Link href={info.href}>{info.label}</Link></strong>
              {index < contactInfo.length - 3 ? " and " : ""}
            </React.Fragment>
          ))}
        . And for quick support, call us at{" "}
        {contactInfo
          .filter((info) => info.type === "phone")
          .map((info, index) => (
            <React.Fragment key={index}>
              <strong><Link href={info.href}>{info.label}</Link></strong>
              {index < contactInfo.length - 3 ? " or " : ""}
            </React.Fragment>
          ))}
      </p>
    </div>
  </div>
);

export default Eticketing;
