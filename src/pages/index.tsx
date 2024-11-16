// src/pages/index.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Result from '../components/Result';

const Home: React.FC = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (repoUrl: string, fileSha: string) => {
    try {
      const response = await axios.post('/api/review-file', { repoUrl, fileSha });
      const { score, reasoning } = response.data;
      setResult(`Score: ${score}\nReasoning: ${reasoning}`);
      setError('');
    } catch (err) {
      console.error('Error calling API:', err);
      setResult('');
      setError('Error fetching file or analyzing code. Please check the URL and SHA.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          GitHub Code Quality Review
        </h1>
        <Form onSubmit={handleFormSubmit} error={error} />
        {result && <Result result={result} />}
      </div>
    </div>
  );
};

export default Home;
