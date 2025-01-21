"use client";
import React, { useState } from 'react';
import { useMember } from '../hooks/useMember';

export const Profile: React.FC = () => {
  const { userData, isLoading, error, updateMemberData } = useMember();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserData | null>(null);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  if (!userData) {
    return <div className="text-gray-500 p-4 text-center">No user data available</div>;
  }

  const handleEdit = () => {
    setEditForm(userData);
    setIsEditing(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    addressField?: keyof UserData['address']
  ) => {
    if (!editForm) return;

    if (addressField) {
      setEditForm({
        ...editForm,
        address: {
          ...editForm.address,
          [addressField]: e.target.value
        }
      });
    } else {
      setEditForm({
        ...editForm,
        [field]: e.target.value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    updateMemberData(editForm);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">회원 정보</h2>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              수정
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">아이디</label>
                <p className="mt-1 font-medium text-gray-900">{userData.username}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">닉네임</label>
                <p className="mt-1 font-medium text-gray-900">{userData.nickname}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">주소</label>
                <p className="mt-1 font-medium text-gray-900">
                  {userData.address.city} {userData.address.district} {userData.address.country}
                </p>
                <p className="mt-1 text-gray-600">{userData.address.detail}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500">아이디</label>
                <input
                  type="text"
                  value={editForm?.username}
                  onChange={(e) => handleInputChange(e, 'username')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500">닉네임</label>
                <input
                  type="text"
                  value={editForm?.nickname}
                  onChange={(e) => handleInputChange(e, 'nickname')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm text-gray-500">주소</label>
                <input
                    type="text"
                    value={editForm?.address.city}
                    onChange={(e) => handleInputChange(e, 'address', 'city')}
                    placeholder="도시"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
                <input
                    type="text"
                    value={editForm?.address.district}
                    onChange={(e) => handleInputChange(e, 'address', 'district')}
                    placeholder="지역구"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
                <input
                    type="text"
                    value={editForm?.address.country}
                    onChange={(e) => handleInputChange(e, 'address', 'country')}
                    placeholder="도로명주소"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
                <input
                    type="text"
                    value={editForm?.address.detail}
                    onChange={(e) => handleInputChange(e, 'address', 'detail')}
                    placeholder="상세주소"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
              취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                저장
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};