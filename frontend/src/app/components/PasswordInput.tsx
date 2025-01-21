import React from 'react';

interface PasswordInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const PasswordInput = ({ name, placeholder, value, onChange, error }: PasswordInputProps) => {
  return (
    <div className="space-y-2">
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-lg border text-black ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        } focus:outline-none focus:ring-1`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
