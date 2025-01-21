// components/OrderHistory.tsx
"use client";

import React, { useEffect, useState } from 'react';

type OrderStatus = 'READY' | 'SHIPPED' | 'CANCEL';

const ORDER_STATUS_MAP: Record<OrderStatus, string> = {
    'READY': '배송 준비중',
    'SHIPPED': '배송중',
    'CANCEL': '배송 취소'
};

const STATUS_COLORS: Record<OrderStatus, string> = {
    'READY': 'bg-yellow-100 text-yellow-800',
    'SHIPPED': 'bg-blue-100 text-blue-800',
    'CANCEL': 'bg-red-100 text-red-800'
};

const OrderCard = ({ order }: { order: Order }) => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
            <div>
                <span className="text-sm text-gray-500">주문번호: {order.id}</span>
                <span className="ml-4 text-sm text-gray-500">
                    {new Date(order.createAt).toLocaleDateString()}
                </span>
            </div>
            <span className={`px-3 py-1 text-sm rounded-full ${STATUS_COLORS[order.status as OrderStatus]}`}>
                {ORDER_STATUS_MAP[order.status as OrderStatus]}
            </span>
        </div>
        
        <div className="divide-y">
            {order.products.map((product, index) => (
                <div key={`${product.id}-${index}`} className="py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        {product.imgUrl && (
                            <img
                                src={product.imgUrl}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                        )}
                        <div>
                            <p className="font-medium text-black">{product.name}</p>
                            <p className="text-sm text-black">수량: {product.quantity}개</p>
                        </div>
                    </div>
                    <p className="font-medium text-black">
                        {product.price.toLocaleString()}원
                    </p>
                </div>
            ))}
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="font-medium text-black">총 결제금액</span>
            <span className="text-lg font-bold text-blue-600">
                {order.totalPrice.toLocaleString()}원
            </span>
        </div>
    </div>
);

const OrderGroup = ({ title, orders, statusColor }: { 
    title: string; 
    orders: Order[]; 
    statusColor: string;
}) => {
    if (orders.length === 0) return null;

    return (
        <div className="space-y-4">
            <h3 className={`text-lg font-medium ${statusColor}`}>{title}</h3>
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
};

export const OrderHistory = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/orders/history', {
                    credentials: 'include'
                });
                const result: OrderResponse = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || '주문 내역을 불러오는데 실패했습니다.');
                }

                if (result.success) {
                    setOrders(result.data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : '주문 내역을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="text-center py-8">로딩 중...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">{error}</div>;
    }

    if (orders.length === 0) {
        return <div className="text-center py-8 text-black">주문 내역이 없습니다.</div>;
    }

    const readyOrders = orders.filter(order => order.status === 'READY');
    const shippedOrders = orders.filter(order => order.status === 'SHIPPED');
    const canceledOrders = orders.filter(order => order.status === 'CANCEL');

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">주문 내역</h2>
            
            <OrderGroup 
                title="배송 준비중" 
                orders={readyOrders} 
                statusColor="text-yellow-800"
            />
            
            <OrderGroup 
                title="배송중" 
                orders={shippedOrders} 
                statusColor="text-blue-800"
            />
            
            <OrderGroup 
                title="배송 취소" 
                orders={canceledOrders} 
                statusColor="text-red-800"
            />
        </div>
    );
};