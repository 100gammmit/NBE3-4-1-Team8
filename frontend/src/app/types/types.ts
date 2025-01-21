interface Product {
    id: number;
    name: string;
    content: string;
    price: number;
    imgUrl: string;
}

interface ApiPaginationResponse<T> {
    timestamp: string;
    message: string | null;
    data: {
        content: T;
        pageable: {
            pageNumber: number | null;
            pageSize: number | null;
            offset: number | null;
        } | null;
        totalElements: number | null;
        totalPages: number | null;
        number: number | null;
        size: number | null;
    };
    success: boolean;
}

interface ApiResponse<T> {
    timestamp: string;
    message: string | null;
    data: T;
    success: boolean;
}

interface Address {
    city: string;
    district: string;
    country: string;
    detail: string;
}

interface UserData {
    username: string;
    nickname: string;
    address: Address;
}

interface PasswordChangeForm {
    originalPassword: string;
    password: string;
    passwordCheck: string;
}

// types/order.ts
interface OrderProduct {
    id: number;
    name: string;
    price: number;
    imgUrl: string | null;
    quantity: number;
}

interface Order {
    id: number;
    products: OrderProduct[];
    totalPrice: number;
    status: string;
    createAt: string;
    modifiedAt: string;
}

interface OrderResponse {
    timestamp: string;
    message: string | null;
    data: Order[];
    success: boolean;
}