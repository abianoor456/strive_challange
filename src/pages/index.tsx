import React, { useState } from 'react';
import axios from 'axios';
import Form from '@components/Form';
import Result from '@components/Result';
import { ReviewResult } from '@types/index';

const Home: React.FC = () => {
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleFormSubmit = async (repoUrl: string, fileSha: string) => {
    setLoading(true);
    setError(''); 
    setResult(null); 
    try {
      const response = await axios.post('/api/review-file', { repoUrl, fileSha });
      const { score, reasoning } = response.data;
      setResult({ score, reasoning });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          GitHub Code Quality Review
        </h1>
        <Form onSubmit={handleFormSubmit} error={error} loading={loading} /> 
        {loading ? (
          <div className="mt-4 text-center text-gray-600">Reviewing...</div> 
        ) : (
          result && <Result result={result} />
        )}
      </div>
    </div>
  );
};

export default Home;
