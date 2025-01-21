import { Suspense } from "react";
import CartList from "../components/CartList";

function CompletedPage() {
    return (
        <section className="text-gray-900 h-screen -top-[60px] bg-white flex flex-col items-center justify-center">
            <h1 className="p-4 text-3xl font-bold">주문이 완료되었습니다! 🎉</h1>

        </section>
    )
}

export default CompletedPage;