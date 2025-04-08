import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import CommonImage from "@/components/common/Image";

interface ContentItem {
  heading: string;
  subheading: string;
}

const contentItems: ContentItem[] = [
  {
    heading: "We are professional Expert in Immigrations Visa",
    subheading: "Our Offices",
  },
];

const OurOffices: React.FC = () => {
  return (
    <div className="our-office-container py-10">
      <div className="ouroffice-content py-10">
        {contentItems.map((item, index) => (
          <div key={index}>
            <h3 className="text-center">{item.heading}</h3>
            <h2>{item.subheading}</h2>
          </div>
        ))}
      </div>
      <div className="our-branch-offices">
        <Tabs defaultValue="branch-one" className="w-full flex">
          <TabsList className="office-tab-list w-1/4">
            <h4>Our Offices</h4>
            <div className="office-tab-scroller scroll-y">
              <TabsTrigger value="branch-one">Ambala</TabsTrigger>
              <TabsTrigger value="branch-two">Amritsar</TabsTrigger>
              <TabsTrigger value="branch-three">Bathinda</TabsTrigger>
              <TabsTrigger value="branch-four">Chandigarh</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent
            value="branch-one"
            className="office-tab-content w-4/5 flex"
          >
            <div className="w-2/5 office-left-content">
              <div className="office-content-top">
                <h2>AMBALA Office</h2>
                <p>                  
                  <CommonImage
                    classname={"map-icon"}
                    src={"/images/branch-map-icon.webp"}
                    alt={"Map Icon"}
                    width={21}
                    height={27}
                  />
                  Office No. 27-28, Shopping Complex, Vikas Vihar, Prem Nagar,
                  Ambala, Haryana 134003
                </p>
              </div>
              <div className="office-content-bottom">
                <h2>Contact Details</h2>
                <ul>
                  <li>
                    <CommonImage
                      classname={"globe-icon"}
                      src={"/images/branch-globe-icon.webp"}
                      alt={"Globe Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="mailto:info.indr@western-overseas.com">
                      info.indr@western-overseas.com
                    </Link>
                  </li>
                  <li>
                     <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="tel:+91-7496973601">+91-7496973601</Link>
                  </li>
                  <li>
                    <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="tel:+91-7206050120">+91- 7206050120</Link>
                  </li>
                  <li>
                    <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="https://wa.me/+919896512412?text=Hi">
                      +91- 9896512412
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-3/5 office-iframe-cont">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13769.85277201028!2d76.7880414!3d30.3662025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc8f4fccf9f29:0x19a60dfeb932f1ed!2sWestern Overseas Ambala!5e0!3m2!1sen!2sin!4v1692257973220!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                allowFullScreen
              />
            </div>
          </TabsContent>
          <TabsContent
            value="branch-two"
            className="office-tab-content w-4/5 flex"
          >
            <div className="w-2/5 office-left-content">
              <div className="office-content-top">
                <h2>Amritsar Office</h2>
                <p>                  
                  <CommonImage
                    classname={"map-icon"}
                    src={"/images/branch-map-icon.webp"}
                    alt={"Map Icon"}
                    width={21}
                    height={27}
                  />
                  Office No. 27-28, Shopping Complex, Vikas Vihar, Prem Nagar,
                  Ambala, Haryana 134003
                </p>
              </div>
              <div className="office-content-bottom">
                <h2>Contact Details</h2>
                <ul>
                  <li>
                    <CommonImage
                      classname={"globe-icon"}
                      src={"/images/branch-globe-icon.webp"}
                      alt={"Globe Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="mailto:info.indr@western-overseas.com">
                      info.indr@western-overseas.com
                    </Link>
                  </li>
                  <li>
                     <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="tel:+91-7496973601">+91-7496973601</Link>
                  </li>
                  <li>
                    <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="tel:+91-7206050120">+91- 7206050120</Link>
                  </li>
                  <li>
                    <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="https://wa.me/+919896512412?text=Hi">
                      +91- 9896512412
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-3/5 office-iframe-cont">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13769.85277201028!2d76.7880414!3d30.3662025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc8f4fccf9f29:0x19a60dfeb932f1ed!2sWestern Overseas Ambala!5e0!3m2!1sen!2sin!4v1692257973220!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                allowFullScreen
              />
            </div>
          </TabsContent>
          <TabsContent
            value="branch-three"
            className="office-tab-content w-4/5 flex"
          >
            <div className="w-2/5 office-left-content">
              <div className="office-content-top">
                <h2>Bathinda Office</h2>
                <p>                  
                  <CommonImage
                    classname={"map-icon"}
                    src={"/images/branch-map-icon.webp"}
                    alt={"Map Icon"}
                    width={21}
                    height={27}
                  />
                  Office No. 27-28, Shopping Complex, Vikas Vihar, Prem Nagar,
                  Ambala, Haryana 134003
                </p>
              </div>
              <div className="office-content-bottom">
                <h2>Contact Details</h2>
                <ul>
                  <li>
                    <CommonImage
                      classname={"globe-icon"}
                      src={"/images/branch-globe-icon.webp"}
                      alt={"Globe Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="mailto:info.indr@western-overseas.com">
                      info.indr@western-overseas.com
                    </Link>
                  </li>
                  <li>
                     <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="tel:+91-7496973601">+91-7496973601</Link>
                  </li>
                  <li>
                    <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="tel:+91-7206050120">+91- 7206050120</Link>
                  </li>
                  <li>
                    <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="https://wa.me/+919896512412?text=Hi">
                      +91- 9896512412
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-3/5 office-iframe-cont">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13769.85277201028!2d76.7880414!3d30.3662025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc8f4fccf9f29:0x19a60dfeb932f1ed!2sWestern Overseas Ambala!5e0!3m2!1sen!2sin!4v1692257973220!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                allowFullScreen
              />
            </div>
          </TabsContent>
          <TabsContent
            value="branch-four"
            className="office-tab-content w-4/5 flex"
          >
            <div className="w-2/5 office-left-content">
              <div className="office-content-top">
                <h2>Chandigarh Office</h2>
                <p>                  
                  <CommonImage
                    classname={"map-icon"}
                    src={"/images/branch-map-icon.webp"}
                    alt={"Map Icon"}
                    width={21}
                    height={27}
                  />
                  Office No. 27-28, Shopping Complex, Vikas Vihar, Prem Nagar,
                  Ambala, Haryana 134003
                </p>
              </div>
              <div className="office-content-bottom">
                <h2>Contact Details</h2>
                <ul>
                  <li>
                    <CommonImage
                      classname={"globe-icon"}
                      src={"/images/branch-globe-icon.webp"}
                      alt={"Globe Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="mailto:info.indr@western-overseas.com">
                      info.indr@western-overseas.com
                    </Link>
                  </li>
                  <li>
                     <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="tel:+91-7496973601">+91-7496973601</Link>
                  </li>
                  <li>
                    <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="tel:+91-7206050120">+91- 7206050120</Link>
                  </li>
                  <li>
                    <CommonImage
                      classname={"phone-icon"}
                      src={"/images/branch-phone-icon.webp"}
                      alt={"Phone Icon"}
                      width={20}
                      height={20}
                    />
                    <Link href="https://wa.me/+919896512412?text=Hi">
                      +91- 9896512412
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-3/5 office-iframe-cont">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13769.85277201028!2d76.7880414!3d30.3662025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc8f4fccf9f29:0x19a60dfeb932f1ed!2sWestern Overseas Ambala!5e0!3m2!1sen!2sin!4v1692257973220!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                allowFullScreen
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OurOffices;
