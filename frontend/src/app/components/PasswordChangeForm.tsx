import React from 'react';
import { PasswordInput } from '../components/PasswordInput';

interface PasswordFormData {
  originalPassword: string;
  password: string;
  passwordCheck: string;
}

interface PasswordChangeFormProps {
  formData: PasswordFormData;
  errors: Partial<PasswordFormData>;
  isSubmitting: boolean;
  successMessage: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordChangeForm = ({
  formData,
  errors,
  isSubmitting,
  successMessage,
  onSubmit,
  onChange,
}: PasswordChangeFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <PasswordInput
        name="originalPassword"
        placeholder="현재 비밀번호"
        value={formData.originalPassword}
        onChange={onChange}
        error={errors.originalPassword}
      />

      <PasswordInput
        name="password"
        placeholder="새 비밀번호"
        value={formData.password}
        onChange={onChange}
        error={errors.password}
      />

      <PasswordInput
        name="passwordCheck"
        placeholder="새 비밀번호 확인"
        value={formData.passwordCheck}
        onChange={onChange}
        error={errors.passwordCheck}
      />

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-lg text-white font-medium
          ${isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
      >
        {isSubmitting ? '변경 중...' : '비밀번호 변경'}
      </button>
    </form>
  );
};
