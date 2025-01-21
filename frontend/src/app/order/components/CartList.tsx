import orderApi, {Cart} from "@/app/order/utils/orderApi";
import { sectionStyles, titleStyles } from '../page';

async function CartList () {
    const cartList = await orderApi.getCart();
    return (
        <section className={sectionStyles}>
            <h2 className={titleStyles}>주문상품
                <span className="text-sm text-gray-500">
                    {cartList.length}건
                </span>
            </h2>
            <ul className="flex flex-col gap-y-4 pb-[88px]">
                {cartList.map((item) => (
                    <li key={item.id} className="border border-gray-200 rounded-lg flex gap-x-2 p-4">
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
            <aside className="fixed bottom-0 left-0 right-0 bg-white p-4">
                <button
                    className="w-full bg-black text-white p-4 rounded-lg hover:bg-black/80 transition-colors duration-200 flex items-center justify-center gap-x-1">
                    <span className="font-semibold">{getTotalPrice(cartList).toLocaleString()}원</span>
                    결제하기
                </button>
            </aside>
        </section>
    )
}

const getTotalPrice = (cartResponse: Cart[]) => cartResponse.reduce((acc, item) => acc + item.totalPrice, 0);

export default CartList;