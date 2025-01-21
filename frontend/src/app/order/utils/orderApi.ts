import { redirect } from "next/navigation";

export interface Cart {
    id: number;
    productName: string;
    quantity: number;
    productPrice: number;
    totalPrice: number;
    productImgUrl: string;
  }

const getCart = async (): Promise<Cart[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
            method: "GET",
            cache: 'no-store',
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    
        const responseData: ApiResponse<Cart[]> = await response.json();

        return responseData.data.content;
    } catch (error) {
        redirect('/');
    }

    return [
      {
        id: 1,
        productName: "testProductName1",
        quantity: 1,
        productPrice: 1000,
        totalPrice: 1000,
        productImgUrl: "https://picsum.photos/200/300",
      },
      {
        id: 2,
        productName: "testProductName2",
        quantity: 2,
        productPrice: 2000,
        totalPrice: 4000,
        productImgUrl: "https://picsum.photos/200/300",
      }
    ]
}

interface MemberInfo {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/info`, {
        method: "GET",
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

    const responseData: ApiResponse<MemberInfo> = await response.json();
    return responseData.data.content;

    return {
      username: '곽영규',
      nickname: "소바맨",
      address: {
        city: "서울",
        district: "강남구",
        country: "대한민국",
        detail: "강남대로 123"
      }
    }
}

const orderApi = {
    getCart,
    getMemberInfo,
}

export default orderApi;