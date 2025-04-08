import React from "react";
import Image from "next/image";
import Link from "next/link";
import CommonImage from "@/components/common/Image";

import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface Tool {
  id: number;
  imageSrc: string;
  altText: string;
  title: string;
  link: string;
  width: number;
  height: number;
}

interface Content {
  id: number;
  heading: string;
  description: string;
}

const contentData: Content[] = [
  {
    id: 1,
    heading: "Western Overseas Presented Self-Evaluations Tools Take The Benefits Today!",
    description: "Empowering individuals with self-evaluation tools to navigate and achieve their dream of living abroad."
  }
];

const toolsData: Tool[] = [
  {
    id: 1,
    imageSrc: "/images/crs-icn.svg",
    altText: "CRS Calculator",
    title: "CRS Calculators",
    link: "https://western-overseas.com/assessment-tools/crs-calculator",
    width: 70,
    height: 94,
  },
  {
    id: 2,
    imageSrc: "/images/study-visa.svg",
    altText: "Study Visa",
    title: "Study Visa Eligibility",
    link: "https://western-overseas.com/assessment-tools/visa-assessment",
    width: 70,
    height: 65,
  },
  {
    id: 3,
    imageSrc: "/images/eng-level.svg",
    altText: "English Level",
    title: "English Level Assessments",
    link: "https://western-overseas.com/assessment-tools/english-level-assessment",
    width: 70,
    height: 102,
  },
  {
    id: 4,
    imageSrc: "/images/score-convert.svg",
    altText: "Score Converter",
    title: "Score Converter",
    link: "https://western-overseas.com/assessment-tools/score-converter",
    width: 70,
    height: 76,
  },
];

const EvaluationsTools: React.FC = () => {
  return (
    <div className="tool-section py-24">
      <div className="container m-auto lg:px-0 px-4">
        {contentData.map((content) => (
          <div className="tool-content" key={content.id}>
            <h2>
              {content.heading}
            </h2>
            <p>{content.description}</p>
          </div>
        ))}
        <div className="tool-white-container lg:flex-row flex-col">
          {toolsData.map((tool) => (
            <Card className="tool-box shadow-none border-none rounded-none" key={tool.id}>
              <CardContent className="p-0">
                <div className="tool-img-icon m-auto">
                  <Image src={tool.imageSrc} alt={tool.altText} width={tool.width} height={tool.height} />
                </div>
                <h2>{tool.title}</h2>
                <div className="tool-links m-auto">
                  <Link href={tool.link} target="_blank">
                    See More
                    <CommonImage
                      classname={"large-arrow"}
                      src={"/images/common-large-arrow.webp"}
                      alt={"arrow"}
                      width={43}
                      height={12}
                    />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationsTools;
