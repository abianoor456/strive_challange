import React from 'react';
import { ResultProps } from '@types/index';

const Result: React.FC<ResultProps> = ({ result }) => (
  <div className="mt-8 p-4 border rounded-lg bg-gray-50 shadow-inner">
    <h2 className="text-xl font-semibold text-gray-700 mb-2">Review Result:</h2>
    <p className="text-gray-600 whitespace-pre-wrap">{result}</p>
  </div>
);

export default Result;
