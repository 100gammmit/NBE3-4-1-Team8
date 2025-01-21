"use client";
import React from 'react';

interface VerificationCodeInputProps {
    certificationCode: string;
    onCodeChange: (code: string) => void;
    onVerify: () => void;
}

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
    certificationCode,
    onCodeChange,
    onVerify
}) => {
    return (
        <div className="space-y-4">
            <div>
                <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    value={certificationCode}
                    onChange={(e) => onCodeChange(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Enter verification code"
                />
            </div>
            <div>
                <button
                    onClick={onVerify}
                    className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    인증하기
                </button>
            </div>
        </div>
    );
};