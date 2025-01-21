import orderApi, { Cart } from "./utils/orderApi";
import CartList from './components/CartList';
import {Suspense} from "react";
import AddressButton from "./components/AddressButton";

async function OrderPage() {
    const memberInfo = await orderApi.getMemberInfo();

    if (!memberInfo) {
        return <div>유저 정보를 불러오는 중 오류가 발생하였습니다.</div>;
    }

    return (
        <>
            <section className={sectionStyles}>
                <h2 className='text-xl font-bold mb-2 flex items-center gap-x-2 justify-between items-center'>
                    배송지
                    <AddressButton memberInfo={memberInfo}/>
                </h2>
                <p className="text-lg">
                    {memberInfo.address.city} {memberInfo.address.district} {memberInfo.address.country} {memberInfo.address.detail}
                </p>
                <p className="flex gap-x-1 items-center">{memberInfo.username}
                    <span className="text-sm text-gray-500">({memberInfo.nickname})</span>
                </p>
            </section>
            <Suspense>
                <CartList />
            </Suspense>
        </>
    )
}

export const sectionStyles = "w-full h-full border-t-8 border-gray-200 bg-white p-4 text-gray-900";

export default OrderPage;