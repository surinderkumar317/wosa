import React from "react";
import Login from "@/components/auth/Login";
import CommonImage from "@/components/common/Image";

const pageContent = [
  {
    title: "Welcome Back!",
    description: "To keep connected with us please login with your personal info",
    buttonText: "Click Here To Login",
    imageSrc: "/images/click-login-icon.webp",
    imageAlt: "Login Icon",
    imageWidth: 277,
    imageHeight: 54,
  },
];

const Page: React.FC = () => {
  return (
    <div className="login-container">
      <div className="container m-auto py-20">
        {pageContent.map((content, index) => (
          <div key={index} className="login-inner-container">
            <div className="login-icon w-full justify-center flex mb-5">
              <CommonImage
                classname={"logo"}
                src={content.imageSrc}
                alt={content.imageAlt}
                width={content.imageWidth}
                height={content.imageHeight}
              />
            </div>
            <h1 className="text-center text-4xl font-bold">{content.title}</h1>
            <p className="text-center text-xl">{content.description}</p>
            <div className="login-button flex justify-center py-5">
              <Login buttonText={content.buttonText} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
