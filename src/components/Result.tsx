import { ResultProps } from '@/types';
import React from 'react';

const Result: React.FC<ResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-8 p-4 border rounded-lg bg-gray-50 shadow-inner">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Review Result:</h2>
      <p className="text-gray-600"><strong>Score:</strong> {result.score}</p>

      <h3 className="text-lg font-semibold text-gray-700 mt-4">Reasoning:</h3>
      <pre className="text-gray-600 whitespace-pre-wrap">
        {JSON.stringify(result.reasoning, null, 2)}
      </pre>
    </div>
  );
};

export default Result;
