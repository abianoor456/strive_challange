import React from "react";
import { useRouter } from "next/router";
import Card from "@components/common/Card";

interface ProfileProps {
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
  tags?: string[]; // Optional tags (e.g., skills)
}

const ProfileSection: React.FC<ProfileProps> = ({
  name,
  email = "",
  bio,
  profilePicture,
  tags = [],
}) => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/edit-profile"); // Navigate to the edit profile form
  };

  return (
    <Card
      title={name} // Map 'name' to 'title'
      subtitle={email} // Map 'email' to 'subtitle'
      description={bio} // Map 'bio' to 'description'
      imageUrl={profilePicture} // Map 'profilePicture' to 'imageUrl'
      tags={tags} // Pass 'skills' or tags
      footer={
        <button
          onClick={handleEditProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Edit Profile
        </button>
      }
    />
  );
};

export default ProfileSection;
