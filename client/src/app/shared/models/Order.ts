import { IAddress } from './Address';
export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
  }

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shipToAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: string;
    orderItems: IOrderItem[];
    subTotal: number;
    status: string;
    total: number;
  }

export interface IOrderItem {
    productId: number;
    productName: string;
    prictureUrl: string;
    price: number;
    quantity: number;
  }
