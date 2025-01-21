"use client";
import {useState, useEffect} from 'react';

export const useMember = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMemberData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch member data');
            }
            const responseData: ApiResponse<UserData> = await response.json();
            const userData = Array.isArray(responseData.data)
                ? responseData.data[0]
                : responseData.data;
            setUserData(userData);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMemberData();
    }, []);

    const updateMemberData = async (newData: UserData) => {
        setUserData(newData);
        // 여기에 PUT/PATCH 요청 추가 가능
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: newData?.nickname,
                    city: newData?.address.city,
                    district: newData?.address.district,
                    country: newData?.address.country,
                    detail: newData?.address.detail
                }),
            });
    };

    return {userData, isLoading, error, updateMemberData};
};