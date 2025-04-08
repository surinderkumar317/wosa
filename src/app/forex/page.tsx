import Link from 'next/link';
import React from 'react';

interface Service {
  title: string;
  description: string;
  subServices?: SubService[];
}

interface SubService {
  title: string;
  description: string;
}

interface Contact {
  type: 'email' | 'phone';
  value: string;
}

const headings = [{ title: 'Foreign Exchange | Western Overseas' }];

const paragraphs = [
  'Moving to a new place or country requires a different currency. So, Western Overseas helps you with foreign exchange services to ensure hassle-free use of money and transfer it easily during your stay. Foreign exchange is a global marketplace used for currency exchange for different countries. So, if you are planning to study, work, and migrate to another country, then put your worries about foreign exchange to rest. Once you receive your visa, air ticket, and insurance, the only thing left is foreign exchange. So, Western Overseas offers you comprehensive and convenient forex solutions.',
  'Western Overseas is the best and most reliable foreign exchange service provider for overseas study, business, and living expenses at the best rates. Also, we offer various foreign exchange services as mentioned above, such as remittance, foreign currency change, travel cards etc. you can choose Western overseas for affordable and competitive rates in the industry. We are a user-friendly platform to exchange your currency within a short time. Our team will ensure the safety of your money, and we use the best systems to protect data to get it delivered safely.',
  'Our key features for currency exchange are speed, security, accessibility, and cost. We partnered with the best networks for efficient transactions and services with 24/7 availability. We always prioritize safety measures to protect the funds and information of clients. We offer the best rates and flexible options for your budget and needs. We use the best ways to initiate the transfers and exchange services. So, if you are looking for the best foreign exchange organization globally, Western Overseas will be happy to assist you!',
];

const services: Service[] = [
  {
    title: 'Remittance',
    description:
      'It allows individuals to send and receive money from and to relatives, friends, and family abroad. Western Overseas offers remittance services with secured execution facilities.',
    subServices: [
      {
        title: 'Tuition Fee Remittance',
        description:
          "Western Overseas is a secured platform to pay tuition fees abroad in your college or university bank account. To initiate the fee payment, we need college or university bank details and a swift code of your bank account, and it takes up to 12 to 48 hours to reach the receiver's account. With our foreign exchange services, you can pay college fees for overseas study and living expenses anywhere in the world.",
      },
      {
        title: 'Maintenance & Gift Remittance',
        description:
          "You can also convert your home country currency for your overseas destination's living expenses, maintenance, and financial needs. Once you start staying in a different country, you have transportation, dining, shopping and accommodation costs, so to manage all of these expenses, you can choose maintenance remittance. Also, your relatives from other countries can send you remittances as gifts for festivals and occasions.",
      },
      {
        title: 'GIC Payment',
        description:
          "GIC stands for Guaranteed Investment Certificate. It's a Canadian term used for investment for some fixed period and gets back to students in the form of living expenses every month. So, having a GIC before applying for a study visa is mandatory. So, Western Overseas assists you in opening a GIC account and transferring 10,000 CAD to this account.",
      },
      {
        title: 'Block Account',
        description:
          'A block account is evidence you can provide to prove adequate access to financial funds during your visa application, especially to European countries. We will help you set up your account and transfer funds at fair charges to cover expenses during your stay abroad.',
      },
    ],
  },
  {
    title: 'Travel Card',
    description:
      'If you travel and love to visit different countries, this is for you! The travel card will help you with travel and tourism to other countries. You can spend with travel cards visiting, dining, and shopping even in varied destinations. Make your travel card today with Western Overseas to ease your international payments.',
  },
  {
    title: 'Foreign Currency',
    description:
      'If you are planning to move to another country, visit Western Overseas to convert your local currency to foreign currency to fulfill your financial needs. If you want to make international payments affordably and conveniently, such as paying for goods and services, investments, salaries, etc., choose Western overseas to convert your home currency to foreign currency.',
  },
];

const contacts: Contact[] = [
  { type: 'email', value: 'forexwosa1@gmail.com' },
  { type: 'email', value: 'forexwosa@gmail.com' },
  { type: 'phone', value: '9115992002' },
  { type: 'phone', value: '9517771305' },
];

const Forex: React.FC = () => {
  return (
    <div className="forex-container py-10">
      <div className="container m-auto">
        {headings.map((heading, index) => (
          <h1 key={index}>{heading.title}</h1>
        ))}

        <p>{paragraphs[0]}</p>

        {/* First Subheading */}
        <h2>What We Offer in Our Services?</h2>

        <ul>
          {services.map((service, index) => (
            <li key={index}>
              <strong>{service.title}:</strong> {service.description}
              {service.subServices && (
                <ul className='sub-list'>
                  {service.subServices.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <strong>{sub.title}:</strong> {sub.description}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Second Subheading */}
        <h2>Why Choose Western Overseas?</h2>

        <p className='mb-5'>{paragraphs[1]}</p>
        <p className='mb-5'>{paragraphs[2]}</p>

        <p>
          Drop your queries at{' '}
          {contacts.map((contact, index) => (
            <React.Fragment key={index}>
              <strong>
                <Link href={`${contact.type === 'email' ? 'mailto' : 'tel'}:${contact.value}`}>
                  {contact.value}
                </Link>
              </strong>
              {index < contacts.length - 1 && ', '}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Forex;
