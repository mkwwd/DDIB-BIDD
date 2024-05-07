"use client";

import OrderForm from "@/app/_components/OrderForm";
import { useEffect, useState } from "react";
import { OrderDetail } from "@/app/_types/types";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetail } from "@/app/_api/order";
import { orderStore, orderAddressStore } from "@/app/_store/product";

export default function OrderDetailView() {
  const orderId = window.location.pathname.split("/").pop() as string;

  const { setOrderInfo } = orderStore();
  const { setOrderAddressInfo } = orderAddressStore();
  const [isDone, setIsDone] = useState(false);

  const { data } = useQuery<OrderDetail>({
    queryKey: ["orderView", orderId],
    queryFn: () => getOrderDetail(orderId),
  });

  useEffect(() => {
    console.log("sd");
    if (data) {
      const productInfo = {
        productId: 0,
        thumbnailImage: data.thumbnailImage,
        companyName: data.companyName,
        name: data.productName,
        totalAmount: data.quantity,
        price: data.price,
        salePrice: data.totalAmount / data.quantity,
        status: data.status,
      };

      const addressInfo = {
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone,
        orderZipcode: data.orderZipcode,
        orderRoadAddress: data.orderRoadAddress,
        orderDetailAddress: data.orderDetailAddress,
      };
      console.log("ss");
      setOrderInfo(productInfo);
      setOrderAddressInfo(addressInfo);
      setIsDone(true);
    }
  }, []);

  return (
    <>
      <OrderForm type="orderView" orderId={data?.orderId} orderDate={data?.orderDate} paymentMethod={data?.paymentMethod} />
      {isDone && <></>}
    </>
  );
}
