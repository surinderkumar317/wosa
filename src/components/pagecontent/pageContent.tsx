"use client";

import React, { ElementType } from "react";

interface Section {
  heading?: string;
  headingTag?: ElementType; // Change to ElementType instead of keyof JSX.IntrinsicElements
  content: string;
}

const pageSections: Section[] = [
  {
    heading: "Best Immigration and Visa Consultants",
    headingTag: "h2",
    content:
      "There are lots of students in India who dream of studying, working or living abroad. But it is not as easy as it seems. It requires hard work and a lot of money to make it possible. Today, it is a challenge for Students to search for a trustworthy study visa consultant. Most students are unsure whether their visa consultants are genuine or not. Here at Western Overseas, we promise to provide accurate advice about study visas, work permits, visitor visas, and PR related to your profile. Western Overseas is the best Study Visa consultancy established in 2013 by Mr. Pardeep Balyan (Director), a registered and certified immigration consultant. Also, we have Tie-ups with highly reputed professionals, colleges and universities in Canada, Australia, New Zealand, USA/UK, Portugal, Ireland, Poland, Singapore, Cyprus, Sweden, Germany, France, Czech Republic, Switzerland, South Africa, Lithuania, Denmark and South Korea.",
      
  },
  {
    content:
      "Western Overseas has a team of dedicated counsellors with good field experience. So, you can visit our office for guidance, and our experienced counsellors will handle your query and make it clear for you with the guidance of each aspect of the visa Process. We guide our students in each visa process step, which begins with counselling and ends with pre-departure assistance. In this way, our expert study visa consultant provides a smooth pathway to study abroad. With our head office In Chandigarh, we have established twelve branches across Haryana and Punjab in Amritsar, Jalandhar, Patiala, Bathinda, Ambala, Kurukshetra, Karnal, Rohtak, Sonipat, Indore, and Delhi to help students in completing their dreams. ",
  },
  {
    heading: "Our IELTS, PTE, TOEFL, and Spoken English Coaching",
    headingTag: "h3",
    content:
      "Western Overseas have centres in different cities of Punjab and Haryana to prepare you for the language ability tests, i.e., IELTS, PTE and Spoken English. Our IELTS, PTE, and spoken English trainers possess incomparable expertise and teaching skills. We have a team of IDP and British Council-certified faculty. We have designed the curriculum and followed the teaching techniques that are suitable for every student and that are mandatory to achieve success in these language ability tests. We offer online and offline coaching, allowing them to get the desired band score. Also, our centres' facilities include extra grammar improvement classes, multimedia Classes and an up-to-date library of upgraded study material. At Western Overseas, Every module is practised twice daily: Reading, Listening, Writing, and Speaking. Every weekend, we organized mock tests for our students to analyze their practice skills and detect problems in each module.",
  },
  {
    content:
      "Moreover, We are the pioneers of Reality tests to assess your preparation in a real-time environment without wasting huge amounts of money. Over the years, we have been spreading our roots in Different cities. And just because of these efforts of our dedicated team members, now we are one of the top leading and winning education consultants in India. You joined Western Overseas and took one step toward success.",
  },
];

const PageContent: React.FC = () => {
  return (
    <div className="page-content-container py-10">
      <div className="container m-auto">
        {pageSections.map((section, index) => {
          const Tag: ElementType = section.headingTag || "h2"; // Ensure valid JSX element
          return (
            <div key={index}>
              {section.heading && <Tag>{section.heading}</Tag>}
              <p>{section.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageContent;
