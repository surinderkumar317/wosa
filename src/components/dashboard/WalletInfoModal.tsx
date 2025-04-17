import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import CommonImage from "../common/Image";
import FilePreviewModal from "./FilePreviewModal";

interface WalletInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const walletCards = [
  {
    title: "INR",
    amount: "1100",
    icon: "/dashboard-images/wallet-icn.webp",
  },
  {
    title: "INR",
    amount: "1100",
    icon: "/dashboard-images/wallet-icn.webp",
  },
];

const walletHistory = [
  {
    sr: 1,
    currency: "INR",
    amount: 21,
    transactionType: "Money added to wallet",
    type: "Credit",
    balance: 21,
    remarks: "This is a test remarks.",
    doneBy: "Aman Bachhal",
    screenshot: "/images/image-gallery01.webp",
    created: "18-03-2025 05:05 PM",
  },
  {
    sr: 2,
    currency: "INR",
    amount: 21,
    transactionType: "Money added to wallet",
    type: "Credit",
    balance: 21,
    remarks: "This is a test remarks.",
    doneBy: "Aman Bachhal",
    screenshot: "/images/image-gallery01.webp",
    created: "18-03-2025 05:05 PM",
  },
  {
    sr: 3,
    currency: "INR",
    amount: 21,
    transactionType: "Money added to wallet",
    type: "Credit",
    balance: 21,
    remarks: "This is a test remarks.",
    doneBy: "Aman Bachhal",
    screenshot: "/images/image-gallery01.webp",
    created: "18-03-2025 05:05 PM",
  },
];

const WalletInfoModal: React.FC<WalletInfoModalProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full"
        >
          <CommonImage
            classname="dashboard-icon"
            src="/dashboard-images/wallet-icn.webp"
            alt="icon03"
            width={25}
            height={25}
          />
          Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1300px] wallet-modal">
        <DialogHeader>
          <DialogTitle className="text-[30px] font-bold mb-0">
            Wallet Info
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="w-full  bg-gray-100 p-5 overflow-x-auto">
          <div className="flex flex-row gap-4 min-w-max">
            {walletCards.map((card, index) => (
              <Card
                key={index}
                className="w-[15%] relative flex-shrink-0 wallet-box"
              >
                <CardHeader className="py-2 mt-3">
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p>{card.amount}</p>
                </CardContent>
                <div className="wall-img absolute right-5 bottom-3">
                  <CommonImage
                    classname="icon"
                    src={card.icon}
                    alt="Wallet Icon"
                    width={42}
                    height={42}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold">Previous History</h2>
        <div className="h-[250px] w-full rounded-md p-0 overflow-x-auto wallet-table">
          <Table>
            <TableHeader>
              <TableRow className="text-xl">
                <TableHead className="text-black">Sr.</TableHead>
                <TableHead className="text-black">Currency</TableHead>
                <TableHead className="text-black">Amount</TableHead>
                <TableHead className="text-black">Transaction Type</TableHead>
                <TableHead className="text-black">Type</TableHead>
                <TableHead className="text-black">Balance</TableHead>
                <TableHead className="text-black">Remarks</TableHead>
                <TableHead className="text-black">Done By</TableHead>
                <TableHead className="text-black">
                  Transaction Screenshot
                </TableHead>
                <TableHead className="text-black">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {walletHistory.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.sr}</TableCell>
                  <TableCell>{entry.currency}</TableCell>
                  <TableCell>{entry.amount}</TableCell>
                  <TableCell>{entry.transactionType}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.balance}</TableCell>
                  <TableCell>{entry.remarks}</TableCell>
                  <TableCell>{entry.doneBy}</TableCell>
                  <TableCell>
                    <FilePreviewModal
                      trigger={
                        <span className="inline-flex gap-2 items-center cursor-pointer">
                          <CommonImage
                            classname="dashboard-icon"
                            src={entry.screenshot}
                            alt="icon01"
                            width={25}
                            height={25}
                          />
                          <i className="fa-solid fa-download"></i>
                        </span>
                      }
                      type="image"
                      src={entry.screenshot}
                      title="Image Preview"
                    />
                  </TableCell>
                  <TableCell>{entry.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletInfoModal;
