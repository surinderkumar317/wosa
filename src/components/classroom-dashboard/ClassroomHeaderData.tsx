import React from "react";

const classroomHeaderInfo = [
  { label: "CLASSROOM Name", value: "AMB82894" },
  { label: "Package Name", value: "PTE - CORE | 30 DAYS" },
  { label: "VALIDITY", value: "10/03/2025 - 08/04/2025" },
  { label: "DAYS LEFT", value: "6" },
];

const ClassroomHeaderData = () => {
  return (
    <div className="stu-classroom-header bg-primary p-4 flex justify-center items-center gap-5 rounded-xl text-white mb-6">
      {classroomHeaderInfo.map((item, index) => (
        <p key={index}>
          <strong>{item.label}:</strong> {item.value}
        </p>
      ))}
    </div>
  );
};

export default ClassroomHeaderData;
