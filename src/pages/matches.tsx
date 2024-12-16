import React from "react";
import Layout from "@components/layout/Layout";

const Matches: React.FC = () => {
  return (
    <Layout userName="John Doe">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Matches</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700">
          List of matches and chat integration will go here...
        </p>
      </div>
    </Layout>
  );
};

export default Matches;
