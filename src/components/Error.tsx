import { ErrorProps } from '@/types';
import React from 'react';

const Error: React.FC<ErrorProps> = ({ message }) => (
  <p className="text-red-500 text-sm">{message}</p>
);

export default Error;
