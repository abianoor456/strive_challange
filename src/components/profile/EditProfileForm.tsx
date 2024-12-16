import React, { useState } from "react";
import { supabase } from "../../config/superbase";

interface Education {
  degree: string;
  institution: string;
  yearOfGraduation: number;
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface EditProfileFormProps {
  initialProfile: {
    name?: string;
    email?: string;
    bio?: string;
    skills?: string[];
    portfolioLinks?: string[];
    education?: Education[];
    experience?: Experience[];
    cvUrl?: string;
  };
  onSubmit: (updatedProfile: any) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  initialProfile = {
    name: "",
    email: "",
    bio: "",
    skills: [],
    portfolioLinks: [],
    education: [],
    experience: [],
    cvUrl: "",
  },
  onSubmit,
}) => {
  // Initialize all fields with data if available, otherwise use default values
  const [profile, setProfile] = useState({
    name: initialProfile.name || "",
    email: initialProfile.email || "",
    bio: initialProfile.bio || "",
    skills: initialProfile.skills || [],
    portfolioLinks: initialProfile.portfolioLinks || [""],
    education: initialProfile.education || [{ degree: "", institution: "", yearOfGraduation: 0 }],
    experience: initialProfile.experience || [
      { title: "", company: "", duration: "", description: "" },
    ],
    cvUrl: initialProfile.cvUrl || "",
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({
      ...prev,
      skills: e.target.value.split(",").map((s) => s.trim()),
    }));
  };

  const handlePortfolioLinksChange = (index: number, value: string) => {
    const newPortfolioLinks = [...profile.portfolioLinks];
    newPortfolioLinks[index] = value;
    setProfile((prev) => ({ ...prev, portfolioLinks: newPortfolioLinks }));
  };

  const handleAddPortfolioLink = () => {
    setProfile((prev) => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, ""],
    }));
  };

  const handleAddEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", yearOfGraduation: 0 }],
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string | number) => {
    const newEducation = [...profile.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setProfile((prev) => ({ ...prev, education: newEducation }));
  };

  const handleAddExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", duration: "", description: "" },
      ],
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...profile.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setProfile((prev) => ({ ...prev, experience: newExperience }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleUploadCV = async () => {
    if (!cvFile) return alert("Please select a file to upload.");
    setUploading(true);

    try {
      const fileName = `cv-${Date.now()}-${cvFile.name}`;
      const { data, error } = await supabase
        .storage
        .from("strive")
        .upload(fileName, cvFile);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("strive")
        .getPublicUrl(fileName);

      setProfile((prev) => ({ ...prev, cvUrl: publicUrlData.publicUrl }));
      alert("CV uploaded successfully!");
    } catch (error: any) {
      console.error("Error uploading CV:", error.message);
      alert("Failed to upload CV: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('profile', profile)
    onSubmit(profile);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <div className="space-y-4">
        {/* Name */}
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </label>

        {/* Email */}
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </label>

        {/* Bio */}
        <label className="block">
          <span className="text-gray-700">Bio</span>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </label>

        {/* Skills */}
        <label className="block">
          <span className="text-gray-700">Skills (comma-separated)</span>
          <input
            type="text"
            value={profile.skills.join(", ")}
            onChange={handleSkillsChange}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </label>

        {/* Portfolio Links */}
        <label className="block">
          <span className="text-gray-700">Portfolio Links</span>
          {profile.portfolioLinks.map((link, index) => (
            <input
              key={index}
              type="url"
              value={link}
              onChange={(e) => handlePortfolioLinksChange(index, e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAddPortfolioLink}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Portfolio Link
          </button>
        </label>

        {/* Education */}
        <label className="block">
          <span className="text-gray-700">Education</span>
          {profile.education.map((edu, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(index, "institution", e.target.value)
                }
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
              <input
                type="number"
                placeholder="Year of Graduation"
                value={edu.yearOfGraduation}
                onChange={(e) =>
                  handleEducationChange(index, "yearOfGraduation", +e.target.value)
                }
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEducation}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Education
          </button>
        </label>

        {/* Experience */}
        <label className="block">
          <span className="text-gray-700">Experience</span>
          {profile.experience.map((exp, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                placeholder="Title"
                value={exp.title}
                onChange={(e) =>
                  handleExperienceChange(index, "title", e.target.value)
                }
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) =>
                  handleExperienceChange(index, "duration", e.target.value)
                }
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(index, "description", e.target.value)
                }
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddExperience}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Experience
          </button>
        </label>

        {/* Upload CV */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload CV
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />
            <button
              type="button"
              onClick={handleUploadCV}
              disabled={uploading || !cvFile}
              className={`px-4 py-2 text-white rounded-lg font-medium ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {uploading ? "Uploading..." : "Upload CV"}
            </button>
          </div>
          {profile.cvUrl && (
            <p className="mt-2 text-green-600">
              CV Uploaded:{" "}
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View CV
              </a>
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditProfileForm;
