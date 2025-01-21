import orderApi from "@/app/order/utils/orderApi";
import { sectionStyles } from '../page';
import OrderButton from "./OrderButton";

interface CartListProps {
    showOrderButton?: boolean;
}

async function CartList ({ showOrderButton = true }: CartListProps) {
    const cartList = await orderApi.getCart();
    const memberInfo = await orderApi.getMemberInfo();
    return (
        <section className={sectionStyles}>
            <h2 className='text-xl font-bold mb-2 flex items-center gap-x-2'>주문상품
                <span className="text-sm text-gray-500">
                    {cartList.length}건
                </span>
            </h2>
            <ul className="flex flex-col gap-y-4 pb-[88px]">
                {cartList.map((item) => (
                    <li key={item.productId} className="border border-gray-200 rounded-lg flex gap-x-2 p-4">
                        <img src={item.productImgUrl} alt={item.productName} width={100} height={100}
                             className="object-cover rounded-lg h-[100px]"/>
                        <div className="flex flex-col gap-y-2 justify-between">
                            <p>{item.productName}</p>
                            <div className="flex items-center">
                                <strong className="text-md">{item.totalPrice.toLocaleString()}원</strong>
                                <span className="text-sm text-gray-200 px-2">|</span>
                                <span className="text-sm text-gray-500">{item.quantity}개</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {showOrderButton && (
                <OrderButton
                cartList={cartList}
                memberInfo={memberInfo}
            />)}
        </section>
    )
}

export default CartList;