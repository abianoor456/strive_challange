
import React, { useState } from 'react';

interface FormProps {
  onSubmit: (repoUrl: string, fileSha: string) => void;
  error: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, error }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [fileSha, setFileSha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(repoUrl, fileSha);
  };

  return (
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
  );
};

export default Form;
