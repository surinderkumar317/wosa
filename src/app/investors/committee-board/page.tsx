import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  return (
    <div className="committee-board-section">
      <div className="container m-auto py-5">
        <h1 className="text-5xl text-black mb-10 flex justify-center font-bold mt-16">
          Committees Of The Board Of Directors
        </h1>
        <h2 className="font-bold text-xl">Audit Committee</h2>
        <p>The Audit committee comprises of the following:</p>

        <Table className="border mt-5 committee-table">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-xl font-bold text-black">Name of the Directors</TableHead>
              <TableHead className="text-xl font-bold text-black">Nature of Directorship</TableHead>
              <TableHead className="text-xl font-bold text-black">Designation in Committee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-xl text-black">Ms. Sapna</TableCell>
              <TableCell className="text-xl text-black">Non-Executive Independent Director</TableCell>
              <TableCell className="text-xl text-black">Chairperson</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xl text-black">Mr. Pardeep Balyan</TableCell>
              <TableCell className="text-xl text-black">Managing Director</TableCell>
              <TableCell className="text-xl text-black">Member</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xl text-black">Mr. Umesh Chand Sharma</TableCell>
              <TableCell className="text-xl text-black">Non-Executive Independent Director</TableCell>
              <TableCell className="text-xl text-black">Member</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p className="my-5">The Company Secretary & Compliance Officer of the Company will act as the Secretary of the Committee.</p>

        <h2 className="font-bold text-xl">Stakeholders’ Relationship Committee</h2>
        <p>The Stakeholder’s Relationship Committee comprises of the following:</p>

        <Table className="border mt-5 committee-table">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-xl font-bold text-black">Name of the Directors</TableHead>
              <TableHead className="text-xl font-bold text-black">Nature of Directorship</TableHead>
              <TableHead className="text-xl font-bold text-black">Designation in Committee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-xl text-black">Ms. Sapna</TableCell>
              <TableCell className="text-xl text-black">Non-Executive Independent Director</TableCell>
              <TableCell className="text-xl text-black">Chairperson</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xl text-black">Mr. Rajesh Kumar</TableCell>
              <TableCell className="text-xl text-black">Non-Executive Director</TableCell>
              <TableCell className="text-xl text-black">Member</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xl text-black">Mr. Umesh Chand Sharma</TableCell>
              <TableCell className="text-xl text-black">Non-Executive Independent Director</TableCell>
              <TableCell className="text-xl text-black">Member</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p className="my-5">The Company Secretary of the Company will act as the Secretary of the Committee.</p>

        <h2 className="font-bold text-xl">Nomination and Remuneration Committee</h2>
        <p>The Nomination and Remuneration Committee comprises of the following:</p>

        <Table className="border mt-5 committee-table">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-xl font-bold text-black">Name of the Directors</TableHead>
              <TableHead className="text-xl font-bold text-black">Nature of Directorship</TableHead>
              <TableHead className="text-xl font-bold text-black">Designation in Committee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-xl text-black">Ms. Sapna</TableCell>
              <TableCell className="text-xl text-black">Non-Executive Independent Director</TableCell>
              <TableCell className="text-xl text-black">Chairperson</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xl text-black">Mr. Rajesh Kumar</TableCell>
              <TableCell className="text-xl text-black">Non-Executive Director</TableCell>
              <TableCell className="text-xl text-black">Member</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xl text-black">Mr. Umesh Chand Sharma</TableCell>
              <TableCell className="text-xl text-black">Non-Executive Independent Director</TableCell>
              <TableCell className="text-xl text-black">Member</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p className="my-5">The Company Secretary of our Company acts as the Secretary to the Committee.</p>
      </div>
    </div>
  );
};

export default page;
