import CommonImage from "@/components/common/Image";
import React from "react";

const page = () => {
  return (
    <div className="borad-director-section">
      <h1 className="text-5xl text-black mb-10 flex justify-center font-bold mt-16">
        Board Of Directors
      </h1>
      <div className="director-full-bg">
        <div className="container m-auto">
        <div className="director-section flex items-center">
          <div className="left-content w-2/3 pr-15">
            <h2 className="text-3xl font-bold mb-5">
              Mr. Pardeep Balyan - Chairperson and Managing Director (DIN -
              06594346)
            </h2>
            <p className="leading-7">
              Mr. Pardeep Balyan aged 46 years, is the Promoter, Chairperson &
              Managing Director of our Company. He has been on the Board of
              Directors of our Company since incorporation. He graduated with a
              Bachelor of Arts from Maharshi Dayanand University, Rohtak in 1998
              and having experience of more than 10 year in this Industry. He
              has been awarded as agent British Council Training Suit in the
              year 2020. He has been graduating as an Education New Zealand
              trained agent in the year 2014. He has also completed Education
              Agent training course assessment and was appointed as “Qualified
              Education agent Counsellor in the year 2013. He has also completed
              the Canada Course for Education Agents formal test and is awarded
              as Canada Course Graduate in the year 2015. He looks after of
              routine operational activities of our Company. He guides Company
              in growth strategies and lighting the Company in increasing its
              scale in leaps and bounds. He is responsible for the overall
              operations and strategies of our Company.
            </p>
          </div>
          <div className="right-img w-1/3">
            <CommonImage
              src="/images/pardeep-balyan.png"
              alt="Pardeep Balyan"
              width={500}
              height={500}
              classname="cursor-pointer w-full"
            />
          </div>
        </div>
        </div>
      </div>

      <div className="director-full-bg bg-gray-100 pt-8">
        <div className="container m-auto pt-10">
          <div className="director-section flex items-center flex-row-reverse">
            <div className="left-content w-2/3 pl-10">
              <h2 className="text-3xl font-bold mb-5">
                Mrs. Rekha Rani - Whole Time Director (DIN - 06626196)
              </h2>
              <p className="leading-7">
                Mrs. Rekha Rani aged 40 years, is the Promoter, Whole-Time
                Director of our Company. She has been on the Board of Directors
                of our Company since incorporation. She is graduate in Bachelor
                of Arts from Maharshi Dayanand University, Rohtak in 2006 and
                having an experience of more than 10 years in Immigration
                Industry and related activities. She looks after of routine
                operational activities of our Company
              </p>
            </div>
            <div className="right-img w-1/3">
              <CommonImage
                src="/images/rekha-rani.png"
                alt="Pardeep Balyan"
                width={500}
                height={500}
                classname="cursor-pointer w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="director-full-bg pt-10">
        <div className="container m-auto">
        <div className="director-section flex items-center">
          <div className="left-content w-2/3 pr-15">
            <h2 className="text-3xl font-bold mb-5">
              Mr. Rajesh Kumar - Non Executive Director (DIN - 10746816)
            </h2>
            <p className="leading-7">
                Mr. Rajesh Kumar aged 55 years, is a Non -Executive Director of our Company w.e.f. 25th November, 2024. He has knowledge and experience in the fields of marketing and Employee relationships for more than 12 years. He is resulting oriented, focused, hardworking person and provides advice and guidance to the members of the Board of Directors. He is on the Board of the Company since 25th November, 2024.
            </p>
          </div>
          <div className="right-img w-1/3">
            <CommonImage
              src="/images/rajesh-kumar.png"
              alt="Pardeep Balyan"
              width={500}
              height={500}
              classname="cursor-pointer w-full"
            />
          </div>
        </div>
        </div>
      </div>

      <div className="director-full-bg bg-gray-100 pt-8">
        <div className="container m-auto pt-10">
          <div className="director-section flex items-center flex-row-reverse">
            <div className="left-content w-2/3 pl-10">
              <h2 className="text-3xl font-bold mb-5">
                Mr. Umesh Chand Sharma - Non Executive Independent Director (DIN - 10779613)
              </h2>
              <p className="leading-7">
                Mr. Umesh Chand Sharma aged 63 years, is an Independent Director of our Company w.e.f. October 05, 2024, He is an Associate Member of The Institute of Company Secretaries of India (ICSI). He has more than 30 years working experience in the field of corporate law, Securities law, and allied laws. As an Independent Director of our Company with Corporate acumen & experience, He brings value addition to our Company.
              </p>
            </div>
            <div className="right-img w-1/3">
              <CommonImage
                src="/images/umesh-chand-sharma.png"
                alt="Pardeep Balyan"
                width={500}
                height={500}
                classname="cursor-pointer w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="director-full-bg pt-10">
        <div className="container m-auto">
        <div className="director-section flex items-center">
          <div className="left-content w-2/3 pr-15">
            <h2 className="text-3xl font-bold mb-5">
                Ms. Sapna - Non-Executive Independent Director (DIN - 10294154)
            </h2>
            <p className="leading-7">
               Ms. Sapna aged 30 years, is Independent Director of our Company. She is an Associate Member of The Institute of Company Secretaries of India (ICSI). She is Company Secretary. She has almost 4 year working experience in the field of corporate law, Securities law, Trademark & Secretarial Compliances. As an Independent Director of our Company with Corporate acumen & experience, she brings value addition to our Company.
            </p>
          </div>
          <div className="right-img w-1/3">
            <CommonImage
              src="/images/sapna-non-executive.png"
              alt="Pardeep Balyan"
              width={500}
              height={500}
              classname="cursor-pointer w-full"
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default page;
