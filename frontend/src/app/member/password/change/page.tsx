"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordChangeForm } from '../../../components/PasswordChangeForm';

interface PasswordChangeForm {
  originalPassword: string;
  password: string;
  passwordCheck: string;
}

const PasswordChangePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PasswordChangeForm>({
    originalPassword: '',
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = useState<Partial<PasswordChangeForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<PasswordChangeForm> = {};

    if (!formData.originalPassword) {
      newErrors.originalPassword = '현재 비밀번호를 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '새 비밀번호를 입력해주세요';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다';
    }

    if (!formData.passwordCheck) {
      newErrors.passwordCheck = '새 비밀번호 확인을 입력해주세요';
    } else if (formData.password !== formData.passwordCheck) {
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof PasswordChangeForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/password`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalPassword: formData.originalPassword,
          password: formData.password,
          passwordCheck: formData.passwordCheck
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '비밀번호 변경에 실패했습니다.');
      }

      alert('비밀번호가 변경되었습니다!');
      router.push('/');

    } catch (error) {
      setErrors({
        originalPassword: error instanceof Error
          ? error.message
          : '비밀번호 변경에 실패했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-900">비밀번호 변경</h1>
        </div>
        <PasswordChangeForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          successMessage={successMessage}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PasswordChangePage;