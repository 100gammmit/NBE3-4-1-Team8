"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordResetEmail } from '../../../components/PasswordResetEmail';
import { VerificationCodeInput } from '../../../components/VerifycationCodeInput';

export default function PasswordReset() {
    const [email, setEmail] = useState<string>('');
    const [certificationCode, setCertificationCode] = useState<string>('');
    const [showVerificationInput, setShowVerificationInput] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const router = useRouter();

    const handleSendVerificationCode = async (): Promise<void> => {
        setMessage('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: email, verifyType: "PASSWORD_RESET" })
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('메일함에 인증번호를 확인해주세요!');
                setShowVerificationInput(true);
                setIsEmailSent(true);
            } else {
                setMessage(result.message || '알 수 없는 오류입니다. 관리자에게 문의해주세요');
            }
        } catch (error) {
            setMessage('서버 연결에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleVerifyCode = async (): Promise<void> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    certificationCode: certificationCode,
                    verifyType: "PASSWORD_RESET"
                })
            });

            if (response.ok) {
                alert('임시 비밀번호가 이메일로 전송되었습니다. \n임시 비밀번호로 로그인 해주세요!');
                router.push('/login');
            } else {
                const result = await response.json();
                setMessage(result.message || '알 수 없는 오류입니다. 관리자에게 문의해주세요');
            }
        } catch (error) {
            setMessage('서버 연결에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-black">비밀번호 재설정</h2>
                <div className="space-y-4">
                    <PasswordResetEmail
                        email={email}
                        isEmailSent={isEmailSent}
                        onEmailChange={setEmail}
                        onSendVerification={handleSendVerificationCode}
                    />
                    {showVerificationInput && (
                        <VerificationCodeInput
                            certificationCode={certificationCode}
                            onCodeChange={setCertificationCode}
                            onVerify={handleVerifyCode}
                        />
                    )}
                </div>
                {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
            </div>
        </div>
    );
}