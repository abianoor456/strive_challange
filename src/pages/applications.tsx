import React from "react";
import Layout from "@components/layout/Layout";
import Card from "@components/common/Card";

const Applications: React.FC = () => {
  const applications = [
    {
      title: "Amazon",
      subtitle: "Frontend Developer",
      description: "Applied on: 20 May, 2023",
      tags: ["Pending", "Remote", "Part time"],
    },
    {
      title: "Google",
      subtitle: "Backend Developer",
      description: "Applied on: 15 May, 2023",
      tags: ["Interview Scheduled", "Full time"],
    },
  ];

  return (
    <Layout userName="John Doe">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app, index) => (
          <Card
            key={index}
            title={app.title}
            subtitle={app.subtitle}
            description={app.description}
            tags={app.tags}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Applications;
