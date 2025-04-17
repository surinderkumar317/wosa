import React from "react";
import CommonImage from "@/components/common/Image";

const directorList = [
  {
    name: "Mr. Pardeep Balyan",
    title: "Chairperson and Managing Director",
    din: "06594346",
    img: "/images/pardeep-balyan.png",
    align: "left",
    content: `Mr. Pardeep Balyan aged 46 years, is the Promoter, Chairperson & Managing Director of our Company. He has been on the Board of Directors of our Company since incorporation. He graduated with a Bachelor of Arts from Maharshi Dayanand University, Rohtak in 1998 and having experience of more than 10 year in this Industry. He has been awarded as agent British Council Training Suit in the year 2020. He has been graduating as an Education New Zealand trained agent in the year 2014. He has also completed Education Agent training course assessment and was appointed as “Qualified Education agent Counsellor in the year 2013. He has also completed the Canada Course for Education Agents formal test and is awarded as Canada Course Graduate in the year 2015. He looks after of routine operational activities of our Company. He guides Company in growth strategies and lighting the Company in increasing its scale in leaps and bounds. He is responsible for the overall operations and strategies of our Company.`,
  },
  {
    name: "Mrs. Rekha Rani",
    title: "Whole Time Director",
    din: "06626196",
    img: "/images/rekha-rani.png",
    align: "right",
    content: `Mrs. Rekha Rani aged 40 years, is the Promoter, Whole-Time Director of our Company. She has been on the Board of Directors of our Company since incorporation. She is graduate in Bachelor of Arts from Maharshi Dayanand University, Rohtak in 2006 and having an experience of more than 10 years in Immigration Industry and related activities. She looks after of routine operational activities of our Company.`,
  },
  {
    name: "Mr. Rajesh Kumar",
    title: "Non Executive Director",
    din: "10746816",
    img: "/images/rajesh-kumar.png",
    align: "left",
    content: `Mr. Rajesh Kumar aged 55 years, is a Non -Executive Director of our Company w.e.f. 25th November, 2024. He has knowledge and experience in the fields of marketing and Employee relationships for more than 12 years. He is resulting oriented, focused, hardworking person and provides advice and guidance to the members of the Board of Directors. He is on the Board of the Company since 25th November, 2024.`,
  },
  {
    name: "Mr. Umesh Chand Sharma",
    title: "Non Executive Independent Director",
    din: "10779613",
    img: "/images/umesh-chand-sharma.png",
    align: "right",
    content: `Mr. Umesh Chand Sharma aged 63 years, is an Independent Director of our Company w.e.f. October 05, 2024, He is an Associate Member of The Institute of Company Secretaries of India (ICSI). He has more than 30 years working experience in the field of corporate law, Securities law, and allied laws. As an Independent Director of our Company with Corporate acumen & experience, He brings value addition to our Company.`,
  },
  {
    name: "Ms. Sapna",
    title: "Non-Executive Independent Director",
    din: "10294154",
    img: "/images/sapna-non-executive.png",
    align: "left",
    content: `Ms. Sapna aged 30 years, is Independent Director of our Company. She is an Associate Member of The Institute of Company Secretaries of India (ICSI). She is Company Secretary. She has almost 4 year working experience in the field of corporate law, Securities law, Trademark & Secretarial Compliances. As an Independent Director of our Company with Corporate acumen & experience, she brings value addition to our Company.`,
  },
];

const page = () => {
  return (
    <div className="borad-director-section">
      <h1 className="text-5xl text-black mb-10 flex justify-center font-bold mt-16">
        Board Of Directors
      </h1>

      {directorList.map((director, idx) => (
        <div
          key={idx}
          className={`director-full-bg ${idx % 2 !== 0 ? "bg-gray-100" : ""} pt-10`}
        >
          <div className="container m-auto">
            <div
              className={`director-section flex items-center ${
                director.align === "right" ? "flex-row-reverse" : ""
              } gap-10`}
            >
              <div className="left-content w-full md:w-2/3">
                <h2 className="text-3xl font-bold mb-5">
                  {director.name} - {director.title} (DIN - {director.din})
                </h2>
                <p className="leading-7 text-base text-gray-800">{director.content}</p>
              </div>
              <div className="right-img w-full md:w-1/3">
                <CommonImage
                  src={director.img}
                  alt={director.name}
                  width={500}
                  height={500}
                  classname="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
