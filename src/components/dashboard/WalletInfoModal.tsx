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
import { ScrollArea } from "@/components/ui/scroll-area";
import CommonImage from "../common/Image";
import FilePreviewModal from "./FilePreviewModal";

interface WalletInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

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
      <DialogContent className="w-full max-w-[1800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-[30px] font-bold mb-0">
            Wallet Info
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 bg-gray-100 p-5">
          <Card className="w-[10%] relative">
            <CardHeader className="py-2 mt-3">
              <CardTitle>INR</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <p>1100</p>
            </CardContent>
            <div className="wall-img absolute right-5 bottom-3">
              <CommonImage
                classname={"icon"}
                src={"/dashboard-images/wallet-icn.webp"}
                alt={"Profile Image"}
                width={42}
                height={42}
              />
            </div>
          </Card>

          <Card className="w-[10%] relative">
            <CardHeader className="py-2 mt-3">
              <CardTitle>INR</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <p>1100</p>
            </CardContent>
            <div className="wall-img absolute right-5 bottom-3">
              <CommonImage
                classname={"icon"}
                src={"/dashboard-images/wallet-icn.webp"}
                alt={"Profile Image"}
                width={42}
                height={42}
              />
            </div>
          </Card>
        </div>
        <h2 className="text-xl font-bold">Previous History</h2>
        <ScrollArea className="h-[400px] w-full rounded-md p-0">
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
                <TableHead className="text-black">Transaction Screenshot</TableHead>
                <TableHead className="text-black">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>INR</TableCell>
                <TableCell>21</TableCell>
                <TableCell>Money added to wallet</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell>21</TableCell>
                <TableCell>This is a test remarks.</TableCell>
                <TableCell>Aman Bachhal</TableCell>
                <TableCell><FilePreviewModal/> <i className="fa-solid fa-download"></i></TableCell>
                <TableCell>18-03-2025 05:05 PM</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>INR</TableCell>
                <TableCell>21</TableCell>
                <TableCell>Money added to wallet</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell>21</TableCell>
                <TableCell>This is a test remarks.</TableCell>
                <TableCell>Aman Bachhal</TableCell>
                <TableCell><FilePreviewModal/> <i className="fa-solid fa-download"></i></TableCell>
                <TableCell>18-03-2025 05:05 PM</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>INR</TableCell>
                <TableCell>21</TableCell>
                <TableCell>Money added to wallet</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell>21</TableCell>
                <TableCell>This is a test remarks.</TableCell>
                <TableCell>Aman Bachhal</TableCell>
                <TableCell><FilePreviewModal/> <i className="fa-solid fa-download"></i></TableCell>
                <TableCell>18-03-2025 05:05 PM</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default WalletInfoModal;
