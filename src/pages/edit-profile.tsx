import React from "react";
import EditProfileForm from "@components/profile/EditProfileForm";
import Layout from "@components/layout/Layout"; // Import your Layout component
import axios from 'axios';

const EditProfilePage: React.FC = () => {
  // Mock initial profile data (this can come from an API or database)
  const initialProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Aspiring full-stack developer passionate about building impactful applications.",
    skills: ["React", "Node.js", "TypeScript"],
    cvUrl: "", // Placeholder for the CV URL
  };

  const handleProfileUpdate = async (updatedProfile: any) => {
    try {
      console.log("Updated Profile:", updatedProfile);
  
      const response = await axios.put('/api/update-profile', updatedProfile); // Pass directly
      console.log("Response:", response.data);
  
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  
  return (
    <Layout userName="John Doe"> {/* Wrap in Layout */}
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Profile</h1>
        <EditProfileForm
          initialProfile={initialProfile}
          onSubmit={handleProfileUpdate}
        />
      </div>
    </Layout>
  );
};

export default EditProfilePage;
