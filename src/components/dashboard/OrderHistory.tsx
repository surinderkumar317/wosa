import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Defining TypeScript types for the order data
interface Order {
  title: string;
  product: string;
  transactionDate: string;
  validFrom: string;
  validTill: string;
  status: string;
  statusClass: string;
}

const orders: Order[] = [
  {
    title: "Zigzag package Spouse visa",
    product: "Australia",
    transactionDate: "19th March 25 02:45 PM",
    validFrom: "19th March 25",
    validTill: "19th March 35",
    status: "Active",
    statusClass: "text-lime-600",
  },
  {
    title: "CELPIP | Online | 90 Days",
    product: "Australia",
    transactionDate: "19th March 25 02:45 PM",
    validFrom: "19th March 25",
    validTill: "19th March 35",
    status: "In-Active",
    statusClass: "text-red-600",
  },
  {
    title: "Zigzag package Spouse visa",
    product: "Australia",
    transactionDate: "19th March 25 02:45 PM",
    validFrom: "19th March 25",
    validTill: "19th March 35",
    status: "Active",
    statusClass: "text-lime-600",
  },
  {
    title: "CELPIP | Online | 90 Days",
    product: "Australia",
    transactionDate: "19th March 25 02:45 PM",
    validFrom: "19th March 25",
    validTill: "19th March 35",
    status: "In-Active",
    statusClass: "text-red-600",
  },
];

const OrderHistory: React.FC = () => {
  return (
    <div className="order-history-cont">
      <div className="dash-header flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order History</h2>
      </div>
      <div className="orders-row flex flex-col gap-4 mt-5">
        {orders.map((order, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{order.title}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Product/Services:</strong> {order.product}
              </p>
              <p>
                <strong>Transaction Date:</strong> {order.transactionDate}
              </p>
              <p>
                <strong>Valid From:</strong> {order.validFrom}{" "}
                <strong>Valid Till:</strong> {order.validTill}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={order.statusClass}>{order.status}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
