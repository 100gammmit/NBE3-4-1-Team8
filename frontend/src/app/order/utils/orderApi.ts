export interface Cart {
    id: number;
    productName: string;
    quantity: number;
    productPrice: number;
    totalPrice: number;
    productImgUrl: string;
}

const getCart = async () => {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
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
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
        method: "GET",
        cache: 'no-store',
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        credentials: "include",
        next: {
            tags: [memberInfoTag],
        }
    });

    const responseData: ApiResponse<MemberInfo> = await response.json();

    return responseData.data;
}

export const memberInfoTag = 'memberInfo';

const patchMembers = async (newData: MemberInfo) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
        method: "PATCH",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nickname: newData?.nickname,
            city: newData?.address.city,
            district: newData?.address.district,
            country: newData?.address.country,
            detail: newData?.address.detail
        }),
    });
}

interface PostOrderPayload extends Address {
    city: string;
    district: string;
    country: string;
    detail: string;
    memberId: number;
    productOrdersRequestList: ProductOrderRequest[];
}

interface ProductOrderRequest {
    productId: number;
    quantity: number;
}

const postOrder = async (payload: PostOrderPayload) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
}

const orderApi = {
    getCart,
    getMemberInfo,
    patchMembers,
    postOrder,
}

export default orderApi;