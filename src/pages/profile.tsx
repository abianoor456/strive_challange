import React from "react";
import Layout from "@components/layout/Layout";
import ProfileSection from "@components/profile/ProfileSection";
import SkillsSection from "@components/profile/SkillsSection";

const Profile: React.FC = () => {
  const studentProfile = {
    name: "John Doe",
    email: "john.doe@student.com",
    bio: "Aspiring full-stack developer passionate about building impactful applications.",
    skills: ["JavaScript", "React", "Node.js", "TypeScript"],
    profilePicture: "https://via.placeholder.com/150",
  };

  return (
    <Layout userName={studentProfile.name}>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Section */}
          <ProfileSection
            name={studentProfile.name}
            email={studentProfile.email}
            bio={studentProfile.bio}
            profilePicture={studentProfile.profilePicture}
            tags={studentProfile.skills} // Pass skills as tags to ProfileSection
          />

          {/* Skills Section */}
          <div>
            <SkillsSection skills={studentProfile.skills} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
