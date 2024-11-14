import React, { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [fileSha, setFileSha] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const repoUrlRegex = new RegExp(/((http|git|ssh|http(s)|file|\/?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)(\.git)(\/)?/);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoUrlRegex.test(repoUrl)) {
      setError('Please enter a valid GitHub repository URL.');
      return;
    }

    if (!/^[a-fA-F0-9]{40}$/.test(fileSha)) {
      setError('Please enter a valid 40-character SHA.');
      return;
    }

    setError('');
    try {
      //const response = await axios.post('/api/review', { repoUrl, fileSha });
      //setResult(response.data.result);
    } catch (error) {
      console.error('Error fetching file:', error);
      setResult('Error fetching file or analyzing code.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          GitHub Code Quality Review
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="GitHub Repository URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="File SHA"
            value={fileSha}
            onChange={(e) => setFileSha(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200"
          >
            Submit
          </button>
        </form>
        {result && (
          <div className="mt-8 p-4 border rounded-lg bg-gray-50 shadow-inner">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Review Result:
            </h2>
            <p className="text-gray-600 whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
