export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count: number;
  uid?: string;
  index: number;
}

export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  isAuth?: boolean;
  token?: string;
}

export interface IFormUser {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserResponse {
  success: boolean;
  message?: string;
  user?: IUser;
  accessToken: string;
  refreshToken?: string;
  data: IUserResponse;
}

export interface IServerResponse {
  success: boolean;
  data: IIngredient[];
}

export interface IOrder {
  number: number;
}

export interface IOrderResponse {
  success: boolean;
  name: string;
  order: IOrder;
}

export interface ILocationState {
  from: {
    pathname: string;
  };
  background: Location;
}
