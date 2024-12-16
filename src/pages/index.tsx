import React from "react";
import Layout from "@components/layout/Layout";

const Home: React.FC = () => {
  return (
    <Layout userName="John Doe">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard</h1>
      <p className="text-gray-600 mt-2">This is the main content area.</p>
    </Layout>
  );
};

export default Home;
