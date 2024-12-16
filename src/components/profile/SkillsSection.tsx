import React from "react";
import Card from "@components/common/Card";

interface SkillsSectionProps {
  skills: string[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <Card
      title="Skills" // Card title
      description={
        skills.length > 0
          ? "Here are some of the skills I possess:"
          : "No skills added yet."
      }
      tags={skills} // Pass skills as tags
    
      footer={
        skills.length > 0 ? (
          <span className="text-sm text-gray-500">
            Highlighted for showcasing expertise.
          </span>
        ) : (
          <button
            onClick={() => alert("Add Skills")}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Add Skills
          </button>
        )
      }
    />
  );
};

export default SkillsSection;
