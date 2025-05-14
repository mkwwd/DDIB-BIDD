import { ClientAxiosApi } from "@/app/utils/commons";
import { OrderInfo } from "../types/types";

const api = ClientAxiosApi();

async function postReady(orderData: OrderInfo, userPk: string) {
  console.log("pay");
  const { data } = await api.post(`/api/payment/ready/${userPk}`, orderData);
  return data;
}

async function putCancelPay(orderId: string) {
  await api.put(`/api/payment/refund/${orderId}`);
}

export { postReady, putCancelPay };
