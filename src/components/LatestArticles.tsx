"use client";
import Link from "next/link";
import React, { useState } from "react";
import BigArticle from "@/components/articles/Big";
import SmallAarticles from "@/components/articles/Small";
import { Button } from "@/components/ui/button";
import CommonImage from "@/components/common/Image";

const articleText = [
  {
    id: 1,
    tag: "h3",
    title: "Explore the Immigration World with the latest upcoming",
  },
  { id: 2, tag: "h2", title: "Latest Articles, News & Test Prep Materials" },
];

const LatestArticles: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text =
    "To know more about English proficiency tests, visa updates, immigration news, and former test takers, click this section. Here, we regularly update information and articles to ease your journey abroad by explaining all the details step by step. Also, you can find free test preparation materials suggested by our expert trainers to achieve a desirable band score. The IELTS, PTE, TOEFL, etc., are the English proficiency tests that make you eligible to study, work, and migrate abroad. Our experts help you to brush up on your skills: Listening, Reading, Writing, and Speaking. Join classes today to achieve your desired band score! You can check out our latest events to meet our registered and certified immigration agents or best visa consultants to solve your doubts. We provide various services, including study visa, visitor visa, dependent visa, spouse visa, PR, and more. So, Stay tuned for more updates! Western Overseas is a complete organization to ease your migration process from one country to another. We have our branches in (Sonipat, Karnal, kurukshetra, Ambala, Rohtak, Patiala, Amritsar, Jalandhar, Bathinda, Delhi, Indore, Chandigarh). We assist you in profile evaluation, getting the correct documents, professional advice, successful transactions, booking flights, and post-landing services. Our team of experts helps you at every step to overcome new challenges till the visa is received. Also, If you want to add a new experience of foreign languages to your skill set, Western Overseas designs a wide range of courses to learn French, German, Spanish, etc., at an affordable price. Learning a Foreign language will broaden your perspective and open up new opportunities. Let’s grasp the knowledge of new languages and speak with confidence. Moreover, To get the best immigration advice for visa services, visit Western Overseas to meet experienced counselors. We provide the best route matching your profile to achieve immigration objectives successfully. Our whole team does dedicated work to find the best solutions for you. Get free consultation and apply for your visa application to any country like the USA, UK, Australia, Canada, Singapore, Germany, New Zealand, Portugal, Ireland, Poland, Singapore, Cyprus, Sweden, Germany, France, Czech Republic, Switzerland, South Africa, Lithuania, Denmark and South Korea, etc.";

  return (
    <div className="latest-articles-section py-24">
      <div className="container m-auto lg:p-0 px-5">
        <div className="article-content mb-10 text-center">
          {articleText.map((text) => {
            return React.createElement(text.tag, { key: text.id }, text.title);
          })}
        </div>
        <div className="article-container lg:flex gap-10 lg:flex-row flex-col">
          <div className="article-big-post lg:w-1/2 w-full">
            <BigArticle />
          </div>
          <div className="article-small-posts lg:w-1/2 w-full">
            <SmallAarticles />
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="article-button flex justify-center mb-12" asChild>
            <Link href="/post">
              View All{" "}
              <CommonImage
                classname={"arrow"}
                src={"/images/our-services-arrow.webp"}
                alt={"arrow"}
                width={43}
                height={12}
              />
            </Link>
          </Button>
        </div>
        <div className="article-readmore-readless">
          <p>{isExpanded ? text : text.slice(0, 350) + "..."}</p>
          {text.length > 350 && (
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-semibold p-0"
              variant="link">
              {isExpanded ? "Read Less" : "Read More"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
