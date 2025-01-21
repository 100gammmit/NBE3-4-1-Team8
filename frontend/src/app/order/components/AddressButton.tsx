'use client';

import { useState } from "react";
import orderApi, { MemberInfo } from "../utils/orderApi";
import revalidateMemberInfoTag from "../utils/revalidateMemberInfoTag";

interface AddressButtonProps {
    memberInfo: MemberInfo;
}

function AddressButton({ memberInfo }: AddressButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <div>
        <button className="text-blue-400 hover:text-blue-500 duration-200 text-lg text-bold" onClick={() => setIsOpen(true)}>변경</button>
        {isOpen && <AddressModal 
        memberInfo={memberInfo} 
        onClose={() => setIsOpen(false)} 
        />}
    </div>
    )
}

interface AddressModalProps {
    memberInfo: MemberInfo;
    onClose: () => void;
}

function AddressModal({ memberInfo, onClose }: AddressModalProps) {
    const [form, setForm] = useState({
        recipient: memberInfo.username,
        city: memberInfo.address.city,
        district: memberInfo.address.district,
        country: memberInfo.address.country,
        detail: memberInfo.address.detail,
    });
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await orderApi.patchMembers({
                ...memberInfo,
                address: {
                    city: form.city,
                    district: form.district,
                    country: form.country,
                    detail: form.detail
                }
            });
            revalidateMemberInfoTag();
            onClose();

        } catch (error) {
            alert(`배송지 수정을 실패했습니다. 사유: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
        } 
    };
    
    return (
        <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/30" onClick={onClose} />
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90%] max-w-[400px]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg text-center mx-auto">배송지 수정</h2>
                    <button onClick={onClose} className="text-gray-500">✕</button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">받는 사람</label>
                        <input 
                            type="text"
                            className="w-full border p-2 rounded text-sm font-medium bg-gray-100 text-gray-400"
                            value={form.recipient}
                            onChange={e => setForm({...form, recipient: e.target.value})}
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">주소</label>
                        <div className="flex gap-2 mb-2">
                            <input 
                                type="text"
                                className="w-[48%] border p-2 rounded text-sm font-medium"
                                value={form.city}
                                onChange={e => setForm({...form, city: e.target.value})}
                                placeholder="시"
                            />
                            <input 
                                type="text"
                                className="w-[48%] border p-2 rounded text-sm font-medium"
                                value={form.district}
                                onChange={e => setForm({...form, district: e.target.value})}
                                placeholder="구"
                            />
                        </div>
                        <input 
                            type="text"
                            className="w-full border p-2 rounded mb-2 text-sm font-medium"
                            value={form.country}
                            onChange={e => setForm({...form, country: e.target.value})}
                            placeholder="동/읍/면"
                        />
                        <input 
                            type="text"
                            className="w-full border p-2 rounded text-sm font-medium"
                            value={form.detail}
                            onChange={e => setForm({...form, detail: e.target.value})}
                            placeholder="상세주소"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-md hover:bg-black/80 duration-200"
                    >
                        저장
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddressButton;