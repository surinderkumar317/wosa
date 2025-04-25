"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommonImage from "../common/Image";

const WalletBox = () => {
  const currencies = ["2500 INR", "2000 BGN", "1500 AFN"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (currencies.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % currencies.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [currencies.length]);
  return (
    <>
      <Card className="p-5 bg-green-100">
        <CardHeader className="p-0">
          <CardTitle>Wallet</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="p-0 d-card-content">
          <ul className="wallet-money-list">
            {currencies.map((currency, index) => (
              <li
                key={index}
                className={`transition-opacity duration-500 ${
                  currencies.length === 1 || index === activeIndex
                    ? "opacity-100 active"
                    : "opacity-0"
                }`}
              >
                {currency}
              </li>
            ))}
          </ul>
          <div className="dash-icon">
            <CommonImage
              classname={"icon"}
              src={"/dashboard-images/wallet-icn.webp"}
              alt={"Profile Image"}
              width={42}
              height={42}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WalletBox;
