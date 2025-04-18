"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CommitteeMember {
  name: string;
  directorship: string;
  designation: string;
}

interface Committee {
  title: string;
  description: string;
  secretaryNote: string;
  members: CommitteeMember[];
}

const committees: Committee[] = [
  {
    title: "Audit Committee",
    description: "The Audit committee comprises of the following:",
    secretaryNote:
      "The Company Secretary & Compliance Officer of the Company will act as the Secretary of the Committee.",
    members: [
      {
        name: "Ms. Sapna",
        directorship: "Non-Executive Independent Director",
        designation: "Chairperson",
      },
      {
        name: "Mr. Pardeep Balyan",
        directorship: "Managing Director",
        designation: "Member",
      },
      {
        name: "Mr. Umesh Chand Sharma",
        directorship: "Non-Executive Independent Director",
        designation: "Member",
      },
    ],
  },
  {
    title: "Stakeholders’ Relationship Committee",
    description:
      "The Stakeholder’s Relationship Committee comprises of the following:",
    secretaryNote:
      "The Company Secretary of the Company will act as the Secretary of the Committee.",
    members: [
      {
        name: "Ms. Sapna",
        directorship: "Non-Executive Independent Director",
        designation: "Chairperson",
      },
      {
        name: "Mr. Rajesh Kumar",
        directorship: "Non-Executive Director",
        designation: "Member",
      },
      {
        name: "Mr. Umesh Chand Sharma",
        directorship: "Non-Executive Independent Director",
        designation: "Member",
      },
    ],
  },
  {
    title: "Nomination and Remuneration Committee",
    description:
      "The Nomination and Remuneration Committee comprises of the following:",
    secretaryNote:
      "The Company Secretary of our Company acts as the Secretary to the Committee.",
    members: [
      {
        name: "Ms. Sapna",
        directorship: "Non-Executive Independent Director",
        designation: "Chairperson",
      },
      {
        name: "Mr. Rajesh Kumar",
        directorship: "Non-Executive Director",
        designation: "Member",
      },
      {
        name: "Mr. Umesh Chand Sharma",
        directorship: "Non-Executive Independent Director",
        designation: "Member",
      },
    ],
  },
];

const Page: React.FC = () => {
  return (
    <div className="committee-board-section">
      <div className="container m-auto py-5">
        <h1 className="text-5xl text-black mb-10 flex justify-center font-bold mt-16">
          Committees Of The Board Of Directors
        </h1>

        {committees.map((committee, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="font-bold text-xl">{committee.title}</h2>
            <p>{committee.description}</p>

            <Table className="border mt-5 committee-table">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-xl font-bold text-black">
                    Name of the Directors
                  </TableHead>
                  <TableHead className="text-xl font-bold text-black">
                    Nature of Directorship
                  </TableHead>
                  <TableHead className="text-xl font-bold text-black">
                    Designation in Committee
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {committee.members.map((member, mIdx) => (
                  <TableRow key={mIdx}>
                    <TableCell className="text-xl text-black">
                      {member.name}
                    </TableCell>
                    <TableCell className="text-xl text-black">
                      {member.directorship}
                    </TableCell>
                    <TableCell className="text-xl text-black">
                      {member.designation}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <p className="my-5">{committee.secretaryNote}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
