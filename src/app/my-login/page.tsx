import Login from "@/components/auth/Login";
import CommonImage from "@/components/common/Image";
import React from "react";

const page = () => {
  return (
    <div className="login-container">
      <div className="container m-auto py-20">
        <div className="login-inner-container">
          <div className="login-icon w-full justify-center flex mb-5">
            <CommonImage
              classname={"logo"}
              src={"/images/click-login-icon.webp"}
              alt={"Login Icon"}
              width={277}
              height={54}
            />
          </div>
          <h1 className="text-center text-4xl font-bold">Welcome Back!</h1>
          <p className="text-center text-xl">
            To keep connected with us please login with your personal info
          </p>
          <div className="login-button flex justify-center py-5">
            <Login buttonText="Click Here To Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
