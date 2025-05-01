import React from "react";
import Link from "next/link";
import CommonImage from "../common/Image";

const articleData = {
  id: 1,
  title: "IELTS Writing Task 1 Questions & Answers",
  description:
    "IELTS Writing Task 1 requires you to write a summary of at least 150 words about some information.",
  date: "7th Feb 2025",
  dateTime: "2025-02-07",
  images: {
    main: "/images/big-article.webp",
    icon: "/images/post-small-thumb-icon.webp",
    arrow: "/images/common-large-arrow.webp",
  },
  link: "/",
};

const BigArticle: React.FC = () => {
  return (
    <div className="big-article-container hover-section">
      <div className="article-big-img">
        <CommonImage
          src={articleData.images.main}
          alt={articleData.title}
          width={707}
          height={370}
        />
      </div>
      <div className="article-date">
        <CommonImage
          src={articleData.images.icon}
          alt="Calendar icon"
          width={25}
          height={25}
        />
        <p>
          <time dateTime={articleData.dateTime}>{articleData.date}</time>
        </p>
      </div>
      <h4>{articleData.title}</h4>
      <p>{articleData.description}</p>
      <div className="article-readmore">
        <Link href={articleData.link} aria-label={`Read more about ${articleData.title}`}>
          Read More
          <CommonImage
            src={articleData.images.arrow}
            alt="arrow"
            width={43}
            height={12}
          />
        </Link>
      </div>
    </div>
  );
};

export default BigArticle;
