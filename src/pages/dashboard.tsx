import React from "react";
import Layout from "@components/layout/Layout";

const Dashboard: React.FC = () => {
  return (
    <Layout userName="John Doe">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mt-2">Analytics and statistics go here.</p>
    </Layout>
  );
};

export default Dashboard;
