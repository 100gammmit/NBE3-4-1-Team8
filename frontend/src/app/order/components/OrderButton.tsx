'use client';
import {useRouter} from "next/navigation";
import orderApi, {Cart, MemberInfo} from "../utils/orderApi";

interface OrderButtonProps {
    cartList: Cart[];
    memberInfo: MemberInfo;
}

function OrderButton({cartList, memberInfo}: OrderButtonProps) {
    const router = useRouter();

    const deleteCartItems = async (productIds: number[]) => {
            try {
                await Promise.all(
                    productIds.map(id =>
                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
                                method: 'DELETE',
                                credentials: 'include',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    productId: id
                                })
                            }
                        )
                    ));
            } catch
                (error) {
                console.error('장바구니 삭제 중 오류 발생:', error);
            }
        }
    ;

    const handleClick = async () => {
        try {
            // 1. 주문 생성
            await orderApi.postOrder({
                memberId: 1234,
                city: memberInfo.address.city,
                district: memberInfo.address.district,
                country: memberInfo.address.country,
                detail: memberInfo.address.detail,
                productOrdersRequestList: cartList.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity
                })),
            });

            const productIds = cartList.map(item => item.productId);
            await deleteCartItems(productIds);

            router.push('/order/completed');
        } catch (error) {
            alert(`결제가 실패했습니다. 사유: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
        }
    }

    return (
        <aside className="fixed bottom-0 left-0 right-0 bg-white p-4">
            <button
                onClick={handleClick}
                className="w-full bg-black text-white p-4 rounded-lg hover:bg-black/80 transition-colors duration-200 flex items-center justify-center gap-x-1">
                <span className="font-semibold">{getTotalPrice(cartList).toLocaleString()}원</span>
                결제하기
            </button>
        </aside>
    )
}

const getTotalPrice = (cartResponse: Cart[]) => cartResponse.reduce((acc, item) => acc + item.totalPrice, 0);

export default OrderButton;