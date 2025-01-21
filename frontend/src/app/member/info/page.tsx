// pages/info/index.tsx
import React from 'react';
import {Profile} from '../../components/Profile';
import Link from "next/link";

const InfoPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">내 정보</h1>
                <Profile/>
            </div>
        </div>
    );
};

export default InfoPage;