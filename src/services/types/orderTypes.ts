export interface IOrder {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
}

export interface IOrderProps {
  order: IOrder;
}

export interface IOrderRequest {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export interface IOrderResponse {
  success: boolean;
  name: string;
  order: IOrder;
}

export interface OrderDetailsProps {
  name: string;
  number: number;
}
