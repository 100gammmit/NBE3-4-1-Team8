// PasswordResetEmail.tsx
"use client";
import React from 'react';

interface PasswordResetEmailProps {
    email: string;
    isEmailSent: boolean;
    onEmailChange: (email: string) => void;
    onSendVerification: () => void;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
    email,
    isEmailSent,
    onEmailChange,
    onSendVerification
}) => {
    return (
        <div className="flex items-center">
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="w-4/5 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
                placeholder="이메일을 입력해주세요!"
                disabled={isEmailSent}
            />
            <button
                onClick={onSendVerification}
                className={`ml-2 w-1/5 px-3 py-2 text-white rounded-md ${
                    isEmailSent 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
                {isEmailSent ? '재전송' : '인증번호 전송'}
            </button>
        </div>
    );
};