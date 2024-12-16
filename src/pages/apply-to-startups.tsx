import React, { useState } from "react";
import Layout from "@components/layout/Layout";
import Card from "@components/common/Card";

interface Startup {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  compensation: string; // New field for job compensation
}

const ApplyToStartups: React.FC = () => {
  // Mock startup data
  const allStartups: Startup[] = [
    {
      imageUrl: "https://via.placeholder.com/40",
      title: "Amazon",
      subtitle: "Senior UI/UX Designer",
      description: "20 May, 2023 - San Francisco, CA",
      tags: ["Part time", "Senior level", "Distant"],
      compensation: "$100,000/year",
    },
    {
      imageUrl: "https://via.placeholder.com/40",
      title: "Google",
      subtitle: "Junior UI/UX Designer",
      description: "4 Feb, 2023 - California, CA",
      tags: ["Full time", "Junior level", "Flexible"],
      compensation: "$75,000/year",
    },
    {
      imageUrl: "https://via.placeholder.com/40",
      title: "Airbnb",
      subtitle: "Graphic Designer",
      description: "2 Apr, 2023 - New York, NY",
      tags: ["Part time", "Senior level"],
      compensation: "$50/hour",
    },
  ];

  // State to manage the filters
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>(allStartups);

  // Handler to update selected tags
  const handleTagSelection = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // Remove tag if already selected
        : [...prevTags, tag] // Add tag if not selected
    );
  };

  // Apply filters handler
  const applyFilters = () => {
    const filtered = allStartups.filter((startup) =>
      selectedTags.length
        ? selectedTags.some((tag) => startup.tags.includes(tag))
        : true
    );
    setFilteredStartups(filtered);
  };

  return (
    <Layout userName="John Doe">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8">Apply to Startups</h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 mb-4">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                <div className="space-y-2">
                  {["Part time", "Full time", "Senior level", "Junior level", "Distant"].map(
                    (tag) => (
                      <label key={tag} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagSelection(tag)}
                        />
                        <span>{tag}</span>
                      </label>
                    )
                  )}
                </div>
                <button
                  onClick={applyFilters}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Startup Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredStartups.length > 0 ? (
                filteredStartups.map((startup, index) => (
                  <Card
                    key={index}
                    title={startup.title}
                    subtitle={startup.subtitle}
                    description={startup.description}
                    tags={startup.tags}
                    imageUrl={startup.imageUrl}
                    footer={
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {startup.compensation}
                        </p>
                        <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all">
                          Details
                        </button>
                      </div>
                    }
                  />
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-full">
                  No startups match the selected filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyToStartups;
