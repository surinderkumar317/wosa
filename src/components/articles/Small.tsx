"use client";

import React from "react";
import Link from "next/link";
import CommonImage from "@/components/common/Image";

interface Article {
  id: number;
  imageSrc: string;
  date: string;
  title: string;
  link: string;
}

const articles: Article[] = [
  {
    id: 1,
    imageSrc: "/images/small-articles-img.webp",
    date: "5th Feb 2025",
    title: "Why Master Of Research From Australia",
    link: "/",
  },
  {
    id: 2,
    imageSrc: "/images/small-articles-img.webp",
    date: "5th Feb 2025",
    title: "Why Master Of Research From Australia",
    link: "/",
  },
  {
    id: 3,
    imageSrc: "/images/small-articles-img.webp",
    date: "5th Feb 2025",
    title: "Why Master Of Research From Australia",
    link: "/",
  },
];

const SmallArticles: React.FC = () => {
  return (
    <div className="small-article-container lg:my-0 my-5 hover-section">
      {articles.map((article) => (
        <div key={article.id} className="small-article-box lg:flex lg:flex-row flex-col gap-10">
          <div className="small-art-img">
            <CommonImage src={article.imageSrc} alt="small article image" width={360} height={188} />
          </div>
          <div className="small-art-content-cont">
            <div className="small-date flex items-center gap-2">
              <CommonImage
                classname={"date-icon"}
                src={"/images/post-small-thumb-icon.webp"}
                alt={"date icon"}
                width={25}
                height={25}
              />
              <p>{article.date}</p>
            </div>
            <h4>{article.title}</h4>
            <div className="article-readmore flex gap-2 items-center">
              <Link href={article.link} className="flex items-center gap-2">
                Read More
                <CommonImage
                  classname={"arrow"}
                  src={"/images/common-large-arrow.webp"}
                  alt={"arrow"}
                  width={43}
                  height={12}
                />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmallArticles;
