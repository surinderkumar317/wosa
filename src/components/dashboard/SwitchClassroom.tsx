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
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommonImage from "../common/Image";
import Link from "next/link";

interface SwitchClassroomProps {
  open: boolean;
  onClose: () => void;
}

const SwitchClassroom: React.FC<SwitchClassroomProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-4 items-center justify-start h-auto p-2 font-bold w-full"
        >
          <CommonImage
            classname="dashboard-icon"
            src="/dashboard-images/Switch_Classroom.webp"
            alt="icon"
            width={25}
            height={25}
          />
          Switch Classroom
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="text-[30px] font-bold mb-0">
            YOUR CLASSROOM
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[470px] w-full rounded-md p-0">
          <div className="flex gap-5 flex-wrap">
            <Card className="w-[48%] relative">
              <CardHeader className="py-2 mt-3">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p>
                  <strong>Classroom Name:</strong> ONL2301
                </p>
                <p>
                  <strong>Current Package:</strong> Online Pack 3
                </p>
                <p>
                  <strong>Validity:</strong> 0th Mar 25 - 19th Mar 25
                </p>
                <p>
                  <strong>Days Left:</strong> 13
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-red-600">Expired</span>
                </p>
              </CardContent>
            </Card>

            <Card className="w-[48%] relative">
              <CardHeader className="py-2 mt-3">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p>
                  <strong>Classroom Name:</strong> ONL2301
                </p>
                <p>
                  <strong>Current Package:</strong> Online Pack 3
                </p>
                <p>
                  <strong>Validity:</strong> 0th Mar 25 - 19th Mar 25
                </p>
                <p>
                  <strong>Days Left:</strong> 13
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-lime-600">Active</span>
                </p>
                <Button asChild className="mt-3">
                  <Link href="/student-classrooms">Enter Class</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="w-[48%] relative">
              <CardHeader className="py-2 mt-3">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p>
                  <strong>Classroom Name:</strong> ONL2301
                </p>
                <p>
                  <strong>Current Package:</strong> Online Pack 3
                </p>
                <p>
                  <strong>Validity:</strong> 0th Mar 25 - 19th Mar 25
                </p>
                <p>
                  <strong>Days Left:</strong> 13
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-red-600">Expired</span>
                </p>
              </CardContent>
            </Card>

            <Card className="w-[48%] relative">
              <CardHeader className="py-2 mt-3">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p>
                  <strong>Classroom Name:</strong> ONL2301
                </p>
                <p>
                  <strong>Current Package:</strong> Online Pack 3
                </p>
                <p>
                  <strong>Validity:</strong> 0th Mar 25 - 19th Mar 25
                </p>
                <p>
                  <strong>Days Left:</strong> 13
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-lime-600">Active</span>
                </p>
                <Button asChild className="mt-3">
                  <Link href="/student-classrooms">Enter Class</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchClassroom;
