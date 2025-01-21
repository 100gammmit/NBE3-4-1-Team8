import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export interface Cart {
    id: number;
    productName: string;
    quantity: number;
    productPrice: number;
    totalPrice: number;
    productImgUrl: string;
  }

const getCart = async () => {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
        method: "GET",
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        credentials: "include",
      });

    const responseData: ApiResponse<Cart[]> = await response.json();

    return responseData.data;
}

export interface MemberInfo {
    username: string;
    nickname: string;
    address: Address;
}

interface Address {
    city: string;
    district: string;
    country: string;
    detail: string;
}

const getMemberInfo = async (): Promise<MemberInfo> => {
    const cookieStore = await cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
        method: "GET",
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        credentials: "include",
      });

    const responseData: ApiResponse<MemberInfo> = await response.json();

    return responseData.data;
}

const orderApi = {
    getCart,
    getMemberInfo,
}

export default orderApi;