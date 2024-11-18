import React from 'react';
import { ErrorProps } from '@types/index';

const Error: React.FC<ErrorProps> = ({ message }) => (
  <p className="text-red-500 text-sm">{message}</p>
);

export default Error;
